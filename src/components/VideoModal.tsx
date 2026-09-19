import { useEffect } from 'react';
import { resolveVideo } from '../data/videoSrc';
import styles from './VideoModal.module.less';

export type VideoPayload = {
  src: string;
  title: string;
};

type Props = {
  video: VideoPayload | null;
  onClose: () => void;
};

export function VideoModal({ video, onClose }: Props) {
  useEffect(() => {
    if (!video) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, video]);

  if (!video) {
    return null;
  }

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={video.title}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        {renderPlayer(video.src, video.title)}
      </div>
    </div>
  );
}

function renderPlayer(src: string, title: string) {
  const video = resolveVideo(src);

  if (video.kind === 'embed') {
    return (
      <iframe
        className={styles.player}
        src={video.src}
        title={title}
        allow="autoplay; fullscreen; encrypted-media"
        allowFullScreen
      />
    );
  }

  if (video.kind === 'file') {
    return <video className={styles.player} src={video.src} controls autoPlay preload="metadata" />;
  }

  return <p className={styles.empty}>Видео ещё не загружено. Ссылку можно добавить в данные проекта.</p>;
}
