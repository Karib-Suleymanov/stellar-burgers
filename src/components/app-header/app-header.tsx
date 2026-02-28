import { FC } from 'react';
import { useMatch } from 'react-router-dom';

import { AppHeaderUI } from '@ui';
import { selectUser } from '@selectors';

import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  const ingredientDetailsMatch = useMatch('/ingredients/:id');

  return (
    <AppHeaderUI
      userName={user?.name}
      isIngredientDetails={!!ingredientDetailsMatch}
    />
  );
};
