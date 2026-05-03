import { Dialog } from '@/shared/ui/dialog';

interface ProfileDialogProps {
  open?: boolean;
  onClose?: () => void;
}

export function ProfileDialog({ open, onClose }: ProfileDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <h2>Мой профиль</h2>
    </Dialog>
  );
}
