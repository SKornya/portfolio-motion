import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { hashFor, resolveHash, screens } from '../data/content';
import { getAppHeight, subscribeAppHeight } from './appHeight';

gsap.registerPlugin(Observer);

const INTERACTIVE = 'a, button, input, textarea, select, [contenteditable]';
const TOUCH_IGNORE = 'a, button, input, textarea, video, [role="dialog"]';
const WHEEL_IGNORE = '[role="dialog"]';

/** Overflowing `[data-scrollable]` areas scroll themselves; the wheel chains to paging at their edges. */
function scrollsNatively(event: Event, target: Element) {
  const area = target.closest<HTMLElement>('[data-scrollable]');
  if (!area || area.scrollHeight <= area.clientHeight) {
    return false;
  }
  if (event instanceof WheelEvent) {
    return event.deltaY < 0
      ? area.scrollTop > 0
      : area.scrollTop + area.clientHeight < area.scrollHeight - 1;
  }
  return true;
}

type Options = {
  locked: boolean;
};

export function useFullpage({ locked }: Options) {
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const stepRef = useRef(0);
  const busyRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);

  const applyHash = useCallback((nextIndex: number, nextStep: number) => {
    const hash = hashFor(nextIndex, nextStep);
    if (window.location.hash.replace(/^#/, '') !== hash) {
      history.replaceState(null, '', `#${hash}`);
    }
  }, []);

  const commit = useCallback((nextIndex: number, nextStep: number) => {
    indexRef.current = nextIndex;
    stepRef.current = nextStep;
    setIndex(nextIndex);
    setStep(nextStep);
    applyHash(nextIndex, nextStep);
  }, [applyHash]);

  const trackOffset = useCallback((screenIndex: number) => -screenIndex * getAppHeight(), []);

  const goTo = useCallback(
    (nextIndex: number, nextStep = 0, instant = false) => {
      const clampedIndex = Math.max(0, Math.min(screens.length - 1, nextIndex));
      const maxStep = (screens[clampedIndex]?.steps ?? 1) - 1;
      const clampedStep = Math.max(0, Math.min(maxStep, nextStep));

      if (clampedIndex === indexRef.current && clampedStep === stepRef.current && !instant) {
        return;
      }
      if (busyRef.current && !instant) {
        return;
      }

      const track = trackRef.current;
      if (!track) {
        return;
      }

      const screenChanged = clampedIndex !== indexRef.current;
      commit(clampedIndex, clampedStep);

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const moveDuration = instant || prefersReduced ? 0 : screenChanged ? 1.05 : 0.6;
      const cooldown = instant || prefersReduced ? 0 : 0.32;
      busyRef.current = true;

      const release = () => {
        if (cooldown <= 0) {
          busyRef.current = false;
          return;
        }
        gsap.delayedCall(cooldown, () => {
          busyRef.current = false;
        });
      };

      const y = trackOffset(clampedIndex);

      if (!screenChanged || moveDuration === 0) {
        gsap.set(track, { y });
        gsap.delayedCall(moveDuration, release);
      } else {
        gsap.to(track, {
          y,
          duration: moveDuration,
          ease: 'power3.inOut',
          overwrite: 'auto',
          onComplete: release,
        });
      }
    },
    [commit, trackOffset],
  );

  const move = useCallback(
    (direction: 1 | -1) => {
      if (busyRef.current) {
        return;
      }
      const nextStep = stepRef.current + direction;
      if (nextStep >= 0 && nextStep < (screens[indexRef.current]?.steps ?? 1)) {
        goTo(indexRef.current, nextStep);
        return;
      }
      const nextIndex = indexRef.current + direction;
      if (nextIndex < 0 || nextIndex >= screens.length) {
        return;
      }
      goTo(nextIndex, direction === 1 ? 0 : 999);
    },
    [goTo],
  );

  useEffect(() => {
    const initial = resolveHash(window.location.hash);
    goTo(initial.index, initial.step, true);

    const onHash = () => {
      const next = resolveHash(window.location.hash);
      goTo(next.index, next.step, true);
    };

    window.addEventListener('hashchange', onHash);
    const unsubscribeHeight = subscribeAppHeight(() => {
      const track = trackRef.current;
      if (!track) {
        return;
      }
      gsap.set(track, { y: trackOffset(indexRef.current) });
    });

    return () => {
      window.removeEventListener('hashchange', onHash);
      unsubscribeHeight();
    };
  }, [goTo, trackOffset]);

  useEffect(() => {
    // Off-screen sections must not take focus: focusing them scrolls the
    // overflow-hidden viewport and desyncs it from the track transform.
    const track = trackRef.current;
    if (!track) {
      return;
    }
    Array.from(track.children).forEach((screen, screenIndex) => {
      screen.toggleAttribute('inert', screenIndex !== index);
    });
  }, [index]);

  useEffect(() => {
    // While a media overlay is open, do not capture wheel/touch — its own
    // controls (scrubbing, swiping, zoom) need the gestures.
    if (locked) {
      return;
    }

    const acc = { value: 0, direction: 0 };

    const consume = (delta: number, wheel: boolean) => {
      if (busyRef.current) {
        acc.value = 0;
        return;
      }
      const sign = Math.sign(delta);
      if (sign !== 0 && acc.direction !== 0 && sign !== acc.direction) {
        acc.value = 0;
      }
      if (sign !== 0) {
        acc.direction = sign;
      }
      acc.value += delta;
      // wheelSpeed: -1 flips wheel to match touch (swipe up / scroll down → next)
      const threshold = wheel ? 90 : 40;
      if (acc.value >= threshold) {
        acc.value = 0;
        move(-1);
      } else if (acc.value <= -threshold) {
        acc.value = 0;
        move(1);
      }
    };

    const observer = Observer.create({
      target: window,
      type: 'wheel,touch',
      wheelSpeed: -1,
      tolerance: 12,
      preventDefault: true,
      // Touches on controls are left alone so taps stay reliable; the wheel
      // pages from anywhere, including over buttons.
      ignoreCheck: (event, isTouch) => {
        const target = event.target as Element | null;
        if (!target?.closest) {
          return false;
        }
        return Boolean(target.closest(isTouch ? TOUCH_IGNORE : WHEEL_IGNORE)) || scrollsNatively(event, target);
      },
      onChangeY: (self) => {
        consume(self.deltaY, self.event?.type === 'wheel');
      },
    });

    const onKey = (event: KeyboardEvent) => {
      if (busyRef.current) {
        return;
      }
      // Space must still activate the focused button or link
      if (event.key === ' ' && (event.target as Element | null)?.closest?.(INTERACTIVE)) {
        return;
      }
      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        move(1);
      }
      if (['ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        move(-1);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        goTo(0, 0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        goTo(screens.length - 1, 1);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      observer.kill();
      window.removeEventListener('keydown', onKey);
    };
  }, [goTo, locked, move]);

  return { trackRef, index, step, goTo };
}
