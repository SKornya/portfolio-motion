import type { ButtonHTMLAttributes } from 'react';
import styles from './GradientButton.module.less';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'lg' | 'sm';
};

export function GradientButton({ size = 'lg', className, children, ...props }: Props) {
  return (
    <button
      type="button"
      className={[styles.button, styles[size], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
