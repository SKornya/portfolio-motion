import { images } from '../assets/media';
import { Marquee } from '../components/Marquee';
import styles from './Works.module.less';

export function Works() {
  return (
    <section className={styles.screen} aria-label="Работы и клиенты">
      <div className={styles.stack}>
        <Marquee
          duration={36}
          gap={70}
          items={images.logos.map((logo) => (
            <img key={logo.alt} className={styles.logo} src={logo.src} alt={logo.alt} />
          ))}
        />
        <Marquee
          reverse
          duration={48}
          gap={28}
          items={images.worksTop.map((src, index) => (
            <div key={src} className={`${styles.thumb} ${styles.thumbTop}`}>
              <img src={src} alt={`Кадр работы ${index + 1}`} />
            </div>
          ))}
        />
        <Marquee
          duration={52}
          gap={28}
          items={images.worksBottom.map((src, index) => (
            <div key={src} className={`${styles.thumb} ${styles.thumbBottom}`}>
              <img src={src} alt={`Кадр работы ${index + 9}`} />
            </div>
          ))}
        />
      </div>
    </section>
  );
}
