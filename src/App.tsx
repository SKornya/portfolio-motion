import { useCallback, useState } from 'react';
import { Nav } from './components/Nav';
import { VideoModal, type VideoPayload } from './components/VideoModal';
import { resolveHash, screens, showreel } from './data/content';
import { useFullpage } from './fullpage/useFullpage';
import { About } from './screens/About';
import { Contacts } from './screens/Contacts';
import { Hero } from './screens/Hero';
import { Projects } from './screens/Projects';
import { Showreel } from './screens/Showreel';
import { Skills } from './screens/Skills';
import { Works } from './screens/Works';
import styles from './App.module.less';

const skillsIndex = screens.findIndex((screen) => screen.id === 'skills');
const projectsIndex = screens.findIndex((screen) => screen.id === 'projects');
const showreelIndex = screens.findIndex((screen) => screen.id === 'showreel');

export function App() {
  const [video, setVideo] = useState<VideoPayload | null>(null);
  const { trackRef, index, step, goTo } = useFullpage({ locked: Boolean(video) });

  const goHash = useCallback(
    (hash: string) => {
      const next = resolveHash(hash);
      goTo(next.index, next.step);
    },
    [goTo],
  );

  const openVideo = useCallback((src: string, title: string) => {
    setVideo({ src, title });
  }, []);

  return (
    <div className={styles.viewport}>
      <Nav index={index} step={step} onNavigate={goHash} />
      <div ref={trackRef} className={styles.track}>
        <Hero onContact={() => goHash('contacts')} />
        <Works />
        <About onContact={() => goHash('contacts')} />
        <Skills step={step} active={index === skillsIndex} />
        <Projects
          cardIndex={step}
          active={index === projectsIndex}
          onWatch={(item) => openVideo(item.videoUrl, item.title)}
        />
        <Showreel onPlay={() => openVideo(showreel.videoUrl, showreel.title)} />
      </div>
      <Contacts open={index === showreelIndex && step === 1} />
      <VideoModal video={video} onClose={() => setVideo(null)} />
    </div>
  );
}
