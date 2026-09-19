import { images } from '../assets/media';
import { GradientButton } from '../components/GradientButton';
import { about } from '../data/content';
import styles from './About.module.less';

type Props = {
  onContact: () => void;
};

export function About({ onContact }: Props) {
  return (
    <section className={styles.screen} aria-labelledby="about-title">
      <h2 id="about-title" className={styles.title}>
        {about.title}
      </h2>
      <div className={styles.body}>
        <img className={`${styles.fig} ${styles.left}`} src={images.fig03} alt="" />
        <img className={`${styles.fig} ${styles.right}`} src={images.fig04} alt="" />
        <p className={styles.text}>
          {about.lead}
          <br />
          {about.text}
        </p>
        <GradientButton onClick={onContact}>Связаться</GradientButton>
      </div>
    </section>
  );
}
