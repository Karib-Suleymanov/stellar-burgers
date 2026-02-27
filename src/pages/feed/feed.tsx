import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedOrders,
  getFeedsIsLoading
} from '../../services/slices/feeds/feedsSlice';
import { fetchFeeds } from '../../services/slices/feeds/feedsThunks';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeedOrders);
  const isLoading = useSelector(getFeedsIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
