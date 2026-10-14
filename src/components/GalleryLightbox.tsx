import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

export type GalleryPayload = {
  images: string[];
  title: string;
};

type Props = {
  gallery: GalleryPayload | null;
  onClose: () => void;
};

export function GalleryLightbox({ gallery, onClose }: Props) {
  return (
    <Lightbox
      open={Boolean(gallery)}
      close={onClose}
      slides={(gallery?.images ?? []).map((src, index) => ({ src, alt: `${gallery?.title} — ${index + 1}` }))}
      carousel={{ finite: false }}
      controller={{ closeOnBackdropClick: true }}
      plugins={[Thumbnails, Zoom, Counter]}
      thumbnails={{ position: 'bottom', border: 0, borderRadius: 8, padding: 8, gap: 8 }}
      styles={{
        container: { backgroundColor: 'rgba(0, 0, 0, 0.92)' },
      }}
    />
  );
}
