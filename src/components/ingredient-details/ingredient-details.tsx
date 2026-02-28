import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { selectIngredientById, selectIngredientsLoading } from '@selectors';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id = '' } = useParams();

  const isLoading = useSelector(selectIngredientsLoading);
  const ingredientData = useSelector((state) =>
    selectIngredientById(state, id)
  );

  if (isLoading && !ingredientData) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return <p className='text text_type_main-medium'>Ингредиент не найден</p>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
