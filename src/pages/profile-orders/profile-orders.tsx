import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { selectProfileOrders, selectProfileOrdersLoading } from '@selectors';
import { fetchProfileOrders } from '@slices';
import { FC, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersLoading);

  const handleGetOrders = useCallback(() => {
    void dispatch(fetchProfileOrders());
  }, [dispatch]);

  useEffect(() => {
    handleGetOrders();

    const timerId = window.setInterval(handleGetOrders, 3000);
    return () => {
      window.clearInterval(timerId);
    };
  }, [handleGetOrders]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
