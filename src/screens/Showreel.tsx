import { images } from '../assets/media';
import { showreel } from '../data/content';
import styles from './Showreel.module.less';

type Props = {
  onPlay: () => void;
};

export function Showreel({ onPlay }: Props) {
  return (
    <section className={styles.screen} aria-label="Шоурил">
      <img className={styles.tv} src={images.showreelTv} alt="" />
      <h2 className={styles.title}>{showreel.title}</h2>
      <button type="button" className={styles.play} onClick={onPlay} aria-label="Смотреть шоурил">
        <svg viewBox="0 0 88 88" aria-hidden>
          <circle cx="44" cy="44" r="40" />
          <path d="M36 28v32l28-16z" />
        </svg>
      </button>
    </section>
  );
}
