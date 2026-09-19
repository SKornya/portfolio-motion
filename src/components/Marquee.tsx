import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import styles from './Marquee.module.less';

type Props = {
  items: ReactNode[];
  reverse?: boolean;
  duration?: number;
  gap?: number;
  className?: string;
};

export function Marquee({ items, reverse = false, duration = 40, gap = 35, className }: Props) {
  const setRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const node = setRef.current;
    if (!node) {
      return;
    }

    let frame = 0;
    const apply = (width: number) => {
      setDistance((prev) => (Math.abs(prev - width) > 1 ? width : prev));
    };

    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = node.scrollWidth;
        if (width > 0) {
          apply(width);
        }
      });
    };

    const images = Array.from(node.querySelectorAll('img'));
    const pending = images.filter((image) => !image.complete);
    pending.forEach((image) => {
      image.addEventListener('load', measure);
      image.addEventListener('error', measure);
    });

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measure);
      pending.forEach((image) => {
        image.removeEventListener('load', measure);
        image.removeEventListener('error', measure);
      });
    };
  }, [items.length, gap]);

  return (
    <div
      className={[
        styles.row,
        reverse ? styles.reverse : '',
        distance > 0 ? styles.ready : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          '--duration': `${duration}s`,
          '--gap': `${gap}px`,
          '--distance': `${distance}px`,
        } as CSSProperties
      }
    >
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <div key={copy} ref={copy === 0 ? setRef : undefined} className={styles.set} aria-hidden={copy > 0}>
            {items.map((item, index) => (
              <div key={`${copy}-${index}`} className={styles.item}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
