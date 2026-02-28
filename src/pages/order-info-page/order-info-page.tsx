import { FC } from 'react';

import { OrderInfo } from '@components';

import styles from './order-info-page.module.css';

export const OrderInfoPage: FC = () => (
  <main className={styles.wrap}>
    <OrderInfo />
  </main>
);
