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
          <picture>
            <source media="(max-width: 860px)" srcSet={project.mobileLarge} />
            <img src={project.large} alt="" />
          </picture>
        </div>
        <div className={styles.stack}>
          {project.small.map((src, index) => (
            <div key={src} className={styles.small}>
              <picture>
                {index === 0 ? (
                  <source media="(max-width: 860px)" srcSet={project.mobileSmall} />
                ) : null}
                <img src={src} alt="" />
              </picture>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
