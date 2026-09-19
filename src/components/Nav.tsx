import { hashFor, navItems, screens } from '../data/content';
import styles from './Nav.module.less';

type Props = {
  index: number;
  step: number;
  onNavigate: (hash: string) => void;
};

function isNavActive(itemHash: string, currentHash: string) {
  if (itemHash === 'projects') {
    return currentHash === 'projects' || currentHash.startsWith('project-');
  }
  return currentHash === itemHash;
}

export function Nav({ index, step, onNavigate }: Props) {
  const currentHash = hashFor(index, step);
  const theme = screens[index]?.theme ?? 'dark';

  return (
    <nav className={`${styles.nav} ${styles[theme]}`} aria-label="Разделы">
      {navItems.map((item) => (
        <button
          key={item.hash}
          type="button"
          className={`${styles.link} ${isNavActive(item.hash, currentHash) ? styles.linkActive : ''}`}
          onClick={() => onNavigate(item.hash)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
