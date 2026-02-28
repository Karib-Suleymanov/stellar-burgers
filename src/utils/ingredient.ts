import { TIngredient } from '@utils-types';

export function isIngredientBun({ type }: TIngredient): boolean {
  return type === 'bun';
}

export function isIngredientMain({ type }: TIngredient): boolean {
  return type === 'main';
}

export function isIngredientSauce({ type }: TIngredient): boolean {
  return type === 'sauce';
}
