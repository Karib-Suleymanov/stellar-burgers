import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices/orders/ordersThunks';
import { getProfileOrders } from '../../services/slices/orders/ordersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getProfileOrders); // список заказов юзера
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
