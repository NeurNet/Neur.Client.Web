import type { UserRole } from '../model/types';

export function mapUserRole(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'Администратор';
    case 'teacher':
      return 'Преподаватель';
    case 'student':
      return 'Студент';
    default:
      return role;
  }
}
