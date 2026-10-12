import { useEffect, useRef } from 'react';
import { images } from '../assets/media';
import { QrCode } from '../components/QrCode';
import { contacts } from '../data/content';
import styles from './Contacts.module.less';

type Props = {
  open: boolean;
};

export function Contacts({ open }: Props) {
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    drawerRef.current?.toggleAttribute('inert', !open);
  }, [open]);

  return (
    <aside
      ref={drawerRef}
      className={`${styles.drawer} ${open ? styles.open : ''}`}
      aria-labelledby="contacts-title"
    >
      <div className={styles.panel} data-scrollable>
        <div className={styles.grid}>
          <div>
            <h2 className={styles.heading}>{contacts.socialTitle}</h2>
            <div className={styles.list}>
              {contacts.socials.map((item) => (
                <a key={item.label} className={styles.link} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ))}
            </div>
            <div className={styles.qrs}>
              {contacts.socials.map((item) => (
                <QrCode key={item.label} href={item.href} label={item.label} />
              ))}
            </div>
          </div>
          <div>
            <h2 id="contacts-title" className={styles.heading}>
              {contacts.contactsTitle}
            </h2>
            <div className={styles.list}>
              {contacts.details.map((item) =>
                item.href ? (
                  <a key={item.label} className={styles.link} href={item.href}>
                    {item.label}
                  </a>
                ) : (
                  <p key={item.label} className={styles.plain}>
                    {item.label}
                  </p>
                ),
              )}
            </div>
          </div>
        </div>
        <div className={styles.icons}>
          {images.contacts.map((src) => (
            <img key={src} className={styles.icon} src={src} alt="" />
          ))}
        </div>
      </div>
    </aside>
  );
}
