import type { Project } from '../data/content';
import { GradientButton } from './GradientButton';
import styles from './ProjectCard.module.less';

type Props = {
  project: Project;
  onWatch: (project: Project) => void;
};

export function ProjectCard({ project, onWatch }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <p className={styles.num}>{project.num}</p>
        <div className={styles.copy}>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.result}>{project.result}</p>
        </div>
        <GradientButton size="sm" onClick={() => onWatch(project)}>
          Смотреть
        </GradientButton>
      </div>
      <div className={styles.grid}>
        <div className={styles.large}>
          <img src={project.large} alt={`Превью видео: ${project.title}`} />
        </div>
        <div className={styles.stack}>
          {project.small.map((src) => (
            <div key={src} className={styles.small}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
