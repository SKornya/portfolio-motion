import { useLayoutEffect, useRef } from 'react';
import { skills } from '../data/content';
import styles from './Skills.module.less';

function fitSkillsList(list: HTMLElement) {
  const items = Array.from(list.children) as HTMLElement[];
  list.style.setProperty('--fit', '1');

  const restore = items.map((item) => {
    const { maxHeight, overflow, opacity, transform } = item.style;
    item.style.maxHeight = 'none';
    item.style.overflow = 'visible';
    item.style.opacity = '1';
    item.style.transform = 'none';
    return () => {
      item.style.maxHeight = maxHeight;
      item.style.overflow = overflow;
      item.style.opacity = opacity;
      item.style.transform = transform;
    };
  });

  const available = list.clientHeight;
  const needed = list.scrollHeight;
  restore.forEach((reset) => reset());

  const next = available > 0 && needed > available ? Math.max(0.52, (available / needed) * 0.98) : 1;
  list.style.setProperty('--fit', next.toFixed(3));
}

type Props = {
  step: number;
  active: boolean;
};

export function Skills({ step, active }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const storedStep = useRef(0);
  if (active) {
    storedStep.current = step;
  }
  const visibleCount = storedStep.current + 1;

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
          {skills.map((skill, index) => (
            <article
              key={skill.num}
              className={`${styles.item} ${index < visibleCount ? styles.visible : ''}`}
            >
              <p className={styles.num}>{skill.num}</p>
              <div className={styles.copy}>
                <h3 className={styles.heading}>{skill.title}</h3>
                <p className={styles.text}>{skill.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
