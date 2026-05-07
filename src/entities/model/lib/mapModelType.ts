import type { ModelType } from '../model/types';

export function mapModelType(type: ModelType): string {
  switch (type) {
    case 'text':
      return 'Текст';
    case 'code':
      return 'Код';
    case 'image':
      return 'Изображения';
    default:
      return type;
  }
}
