import { useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { projects, type Project } from '../data/content';
import styles from './Projects.module.less';

type Props = {
  cardIndex: number;
  active: boolean;
  onWatch: (project: Project) => void;
};

export function Projects({ cardIndex, active, onWatch }: Props) {
  // Keep the last card while another screen owns `step`
  const [shownIndex, setShownIndex] = useState(0);
  if (active && cardIndex !== shownIndex) {
    setShownIndex(cardIndex);
  }

  return (
    <section className={styles.screen} aria-label="Проекты">
      <h2 className={styles.title}>ПРОЕКТЫ</h2>
      <div className={styles.stage}>
        {projects.map((project, index) => {
          const offset = index - shownIndex;
          const position = offset === 0 ? 'current' : offset < 0 ? 'behind' : 'ahead';
          return (
            <div
              key={project.num}
              className={`${styles.slide} ${styles[position]}`}
              style={{ zIndex: offset === 0 ? 5 : 4 - Math.abs(offset) }}
            >
              <ProjectCard project={project} onWatch={onWatch} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
