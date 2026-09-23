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
      <div className={styles.frame}>
        <h1 className={styles.title}>{hero.title}</h1>
        <div className={styles.cta}>
          <GradientButton onClick={onContact}>Связаться</GradientButton>
        </div>
      </div>
      <img className={styles.face} src={images.heroFace} alt="" />
    </section>
  );
}
