import { createPortal } from 'react-dom';
import classes from './dialog.module.css';

export interface DialogProps {
  open?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export function Dialog({ open = false, children, onClose }: DialogProps) {
  if (!open) return null;

  return createPortal(
    <div className={classes.wrapper} onClick={onClose}>
      <div
        className={classes.dialog}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
