import { images } from '../assets/media';
import { GradientButton } from '../components/GradientButton';
import { hero } from '../data/content';
import styles from './Hero.module.less';

type Props = {
  onContact: () => void;
};

export function Hero({ onContact }: Props) {
  return (
    <section className={styles.screen} aria-label="Портфолио">
      <img className={styles.face} src={images.heroFace} alt="" />
      <div className={styles.frame}>
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.note}>
          {hero.note.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div className={styles.cta}>
          <GradientButton onClick={onContact}>Связаться</GradientButton>
        </div>
      </div>
    </section>
  );
}
