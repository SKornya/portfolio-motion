import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { skills } from '../data/content';
import styles from './Skills.module.less';

const STAGGER_MS = 90;
/** Пауза после входа на экран, затем каскад списка */
const REVEAL_DELAY_MS = 650;

function fitSkillsList(list: HTMLElement) {
  const parent = list.parentElement;
  if (!parent) {
    return;
  }

  const probe = list.cloneNode(true) as HTMLElement;
  probe.setAttribute('aria-hidden', 'true');
  probe.style.position = 'absolute';
  probe.style.left = '0';
  probe.style.top = '0';
  probe.style.width = `${list.clientWidth}px`;
  probe.style.height = `${list.clientHeight}px`;
  probe.style.visibility = 'hidden';
  probe.style.pointerEvents = 'none';
  probe.style.zIndex = '-1';
  probe.style.setProperty('--fit', '1');

  Array.from(probe.children).forEach((child) => {
    const item = child as HTMLElement;
    item.style.maxHeight = 'none';
    item.style.overflow = 'visible';
    item.style.opacity = '1';
    item.style.transform = 'none';
  });

  parent.appendChild(probe);
  const available = list.clientHeight;
  const needed = probe.scrollHeight;
  parent.removeChild(probe);

  const compact = window.matchMedia('(max-width: 430px)').matches;
  const minFit = compact ? 0.36 : 0.52;
  const next = available > 0 && needed > available ? Math.max(minFit, (available / needed) * 0.96) : 1;
  list.style.setProperty('--fit', next.toFixed(3));
}

type Props = {
  active: boolean;
};

export function Skills({ active }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const [listRevealed, setListRevealed] = useState(false);

  useEffect(() => {
    if (!active) {
      setListRevealed(false);
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setListRevealed(true);
      return;
    }

    const id = window.setTimeout(() => setListRevealed(true), REVEAL_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [active]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const apply = () => fitSkillsList(list);
    const observer = new ResizeObserver(apply);
    observer.observe(list);
    apply();
    void document.fonts.ready.then(apply);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.screen} aria-labelledby="skills-title">
      <div className={styles.panel}>
        <h2 id="skills-title" className={styles.title}>
          НАВЫКИ
        </h2>
        <div ref={listRef} className={styles.list}>
          {skills.map((skill, index) => {
            const enterDelay = index * STAGGER_MS;
            const exitDelay = (skills.length - 1 - index) * STAGGER_MS;
            return (
              <article
                key={skill.num}
                className={`${styles.item} ${listRevealed ? styles.visible : ''}`}
                style={{ transitionDelay: `${listRevealed ? enterDelay : exitDelay}ms` }}
              >
                <p className={styles.num}>{skill.num}</p>
                <div className={styles.copy}>
                  <h3 className={styles.heading}>{skill.title}</h3>
                  <p className={styles.text}>{skill.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
