import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { clearConstructor, clearOrderModal, createOrder } from '@slices';
import {
  selectConstructorItems,
  selectOrderModalData,
  selectOrderRequest,
  selectUser
} from '@selectors';

import { getCookie } from '../../utils/cookie';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user && !getCookie('accessToken')) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    const submitOrder = async () => {
      try {
        await dispatch(createOrder(ingredientsIds)).unwrap();
        dispatch(clearConstructor());
      } catch {}
    };

    void submitOrder();
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
