import { Dialog } from '@/shared/ui/dialog';

interface ProfileDialogProps {
  onClose?: () => void;
}

export function ProfileDialog({ onClose }: ProfileDialogProps) {
  return (
    <Dialog onClose={onClose}>
      <h2>Мой профиль</h2>
    </Dialog>
  );
}
