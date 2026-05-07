import type { ModelType } from '../model/types';

export function mapModelType(type: ModelType): string {
  switch (type) {
    case 'text':
      return 'Текст';
    case 'code':
      return 'Код';
    case 'images':
      return 'Изображения';
    default:
      return type;
  }
}
