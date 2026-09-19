/** Visible app height — tracks Android Chrome bottom URL bar via visualViewport. */

export function getAppHeight() {
  return Math.round(window.visualViewport?.height ?? window.innerHeight);
}

export function syncAppHeight() {
  const height = getAppHeight();
  document.documentElement.style.setProperty('--app-height', `${height}px`);
  return height;
}

export function subscribeAppHeight(onChange: (height: number) => void) {
  const update = () => onChange(syncAppHeight());
  update();

  window.addEventListener('resize', update);
  window.visualViewport?.addEventListener('resize', update);
  window.visualViewport?.addEventListener('scroll', update);

  return () => {
    window.removeEventListener('resize', update);
    window.visualViewport?.removeEventListener('resize', update);
    window.visualViewport?.removeEventListener('scroll', update);
  };
}
