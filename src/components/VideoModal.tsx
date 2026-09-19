import { useEffect, useRef, useState } from 'react';
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

/** Drive's player chrome lays out for ~desktop widths; below this it breaks. */
const DRIVE_LAYOUT_WIDTH = 720;

export function VideoModal({ video, onClose }: Props) {
  useEffect(() => {
    if (!video) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
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
    return <DriveEmbed src={video.src} title={title} />;
  }

  if (video.kind === 'file') {
    return (
      <video
        className={styles.filePlayer}
        src={video.src}
        controls
        playsInline
        preload="metadata"
      />
    );
  }

  return <p className={styles.empty}>Видео ещё не загружено. Ссылку можно добавить в данные проекта.</p>;
}

type DriveEmbedProps = {
  src: string;
  title: string;
};

function DriveEmbed({ src, title }: DriveEmbedProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || typeof ResizeObserver === 'undefined') {
      return;
    }

    const apply = () => {
      const width = node.clientWidth;
      if (width <= 0) {
        return;
      }
      setScale(Math.min(1, width / DRIVE_LAYOUT_WIDTH));
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const layoutScale = scale > 0 ? scale : 1;

  return (
    <div ref={frameRef} className={styles.embed}>
      <iframe
        className={styles.player}
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          width: `${100 / layoutScale}%`,
          height: `${100 / layoutScale}%`,
          transform: `scale(${layoutScale})`,
        }}
      />
    </div>
  );
}
