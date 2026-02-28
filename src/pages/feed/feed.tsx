import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { selectFeedLoading, selectFeedOrders } from '@selectors';
import { fetchFeeds } from '@slices';
import { FC, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);

  const handleGetFeeds = useCallback(() => {
    void dispatch(fetchFeeds());
  }, [dispatch]);

  useEffect(() => {
    handleGetFeeds();

    const timerId = window.setInterval(handleGetFeeds, 3000);
    return () => {
      window.clearInterval(timerId);
    };
  }, [handleGetFeeds]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
