/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'components/Buttons/Button/Button';
import {
  Col, Row, Button, Container, Placeholder,
} from 'react-bootstrap';
import { ArrowDown, CaretDown, Eye } from 'react-bootstrap-icons';
import { RootProps } from 'types/store';

interface CounterProps extends RootProps{
  expireDate : Date;
}

const Counter = ({
  expireDate, pending,
}: CounterProps) => {
  const currentDate = new Date();
  console.log('🚀 ~ file: Counter.tsx ~ line 20 ~ currentDate', currentDate);
  const expiryDate = new Date(expireDate);
  console.log('🚀 ~ file: Counter.tsx ~ line 22 ~ expiryDate', expiryDate);
  const diff = expiryDate.getTime() - currentDate.getTime();
  console.log('🚀 ~ file: Counter.tsx ~ line 22 ~ diff', diff);

  const diffDays = Math.floor(diff / 86400000); // days
  const diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
  const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
  if (pending) {
    return (
      <div className={styles.groupshop_counter_top}>
        <p>
          EXPIRES IN
          <Placeholder xs={1} bg="secondary" animation="glow" />
          {' '}
          <Placeholder xs={1} bg="secondary" animation="glow" />
          {' '}
          <Placeholder xs={1} bg="secondary" animation="glow" />
        </p>
      </div>
    );
  }
  return (
    <div className={styles.groupshop_counter_top}>
      <p>
        EXPIRES IN
        <span>
          {diffDays}
          D
        </span>

        :
        <span>
          {diffHrs}
          H
        </span>
        {' '}
        :
        <span>
          {diffMins}
          M
        </span>

      </p>
    </div>
  );
};

// Counter.defaultProps = {
//   user: {},
// };

export default Counter;
