import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import styles from './QrCode.module.less';

type Props = {
  href: string;
  label: string;
};

const SIZE = 180;

const icons = {
  telegram: svgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#2AABEE"/><path fill="#fff" d="M5.4 11.8 17.6 7c.6-.2 1.1.2.9.9l-2.1 9.8c-.1.7-.6.8-1.1.5l-3.4-2.5-1.6 1.6c-.2.2-.4.3-.6.3l.2-3.4 6.2-5.6c.3-.2 0-.4-.3-.1l-7.6 4.8-3.2-1c-.7-.2-.7-.6.4-.8z"/></svg>`,
  ),
  vk: svgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#0077FF"/><path fill="#fff" d="M13.1 17.6c-5.4 0-8.5-3.7-8.6-9.8h2.7c.1 4.5 2.1 6.4 3.7 6.8V7.8h2.6v3.9c1.5-.2 3.1-2 3.6-3.9H19c-.5 2.4-2.2 4.1-3.2 4.8 1.1.6 3 2.1 3.7 5h-2.8c-.6-1.7-2-3.1-3.9-3.3v3.3h-.7z"/></svg>`,
  ),
};

function svgDataUri(markup: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
}

function serviceImage(href: string, label: string) {
  const key = `${href} ${label}`.toLowerCase();
  if (key.includes('t.me') || key.includes('telegram')) {
    return icons.telegram;
  }
  if (key.includes('vk.com') || key.includes('vk')) {
    return icons.vk;
  }
  return undefined;
}

export function QrCode({ href, label }: Props) {
  const hostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const qr = new QRCodeStyling({
      width: SIZE,
      height: SIZE,
      type: 'svg',
      data: href,
      image: serviceImage(href, label),
      margin: 6,
      qrOptions: {
        errorCorrectionLevel: 'H',
      },
      dotsOptions: {
        type: 'rounded',
        color: '#292929',
        roundSize: false,
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#292929',
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#292929',
      },
      backgroundOptions: {
        color: '#ffffff',
        round: 12,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.32,
        margin: 4,
      },
    });

    host.replaceChildren();
    qr.append(host);

    return () => {
      host.replaceChildren();
    };
  }, [href, label]);

  return (
    <a className={styles.card} href={href} target="_blank" rel="noreferrer" aria-label={label}>
      <span ref={hostRef} className={styles.frame} />
    </a>
  );
}
