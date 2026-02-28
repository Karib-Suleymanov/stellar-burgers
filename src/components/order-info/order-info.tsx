import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  selectFeedOrders,
  selectIngredients,
  selectOrderData,
  selectOrderDataLoading,
  selectOrderError,
  selectProfileOrders
} from '@selectors';
import { clearOrderData, fetchOrderByNumber } from '@slices';
import { TIngredient } from '@utils-types';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

import { useDispatch, useSelector } from '../../services/store';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();

  const { number } = useParams();
  const orderNumber = Number(number);

  const feedOrders = useSelector(selectFeedOrders);
  const profileOrders = useSelector(selectProfileOrders);
  const orderData = useSelector(selectOrderData);
  const orderDataLoading = useSelector(selectOrderDataLoading);
  const orderError = useSelector(selectOrderError);
  const ingredients = useSelector(selectIngredients);
  const [hasRequestedOrder, setHasRequestedOrder] = useState(false);

  const orderFromLists = useMemo(() => {
    if (!Number.isFinite(orderNumber)) {
      return null;
    }

    return [...feedOrders, ...profileOrders].find(
      (item) => item.number === orderNumber
    );
  }, [feedOrders, profileOrders, orderNumber]);

  const resolvedOrder = orderFromLists || orderData;

  useEffect(() => {
    if (!Number.isFinite(orderNumber) || orderFromLists) {
      return;
    }

    setHasRequestedOrder(true);
    void dispatch(fetchOrderByNumber(orderNumber));
  }, [dispatch, orderFromLists, orderNumber]);

  useEffect(
    () => () => {
      dispatch(clearOrderData());
    },
    [dispatch]
  );

  const orderInfo = useMemo(() => {
    if (!resolvedOrder || !ingredients.length) {
      return null;
    }

    const date = new Date(resolvedOrder.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = resolvedOrder.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...resolvedOrder,
      ingredientsInfo,
      date,
      total
    };
  }, [resolvedOrder, ingredients]);

  if (!Number.isFinite(orderNumber)) {
    return <p className='text text_type_main-medium'>Заказ не найден</p>;
  }

  if (hasRequestedOrder && orderError && !orderDataLoading && !orderInfo) {
    return <p className='text text_type_main-medium'>Заказ не найден</p>;
  }

  if (orderDataLoading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
