import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'components/Buttons/Button/Button';
import {
  Col, Row, Button, Container, Placeholder,
} from 'react-bootstrap';
import { ArrowDown, CaretDown, Eye } from 'react-bootstrap-icons';
import { RootProps } from 'types/store';
import useDeal from 'hooks/useDeal';

interface CounterProps extends RootProps{
  expireDate : Date;
}

const Counter = ({
  expireDate, pending,
}: CounterProps) => {
  const { getDateDifference, isExpired } = useDeal();

  const { days: diffDays, hrs: diffHrs, mins: diffMins } = getDateDifference();

  if (pending) {
    return (
      <div className={styles.groupshop_counter_top}>
        <p>

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
        {!isExpired && 'EXPIRES IN'}
        <span>
          {diffDays}
          D
        </span>
        {' '}
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
        {' '}
        {isExpired && 'EXPIRED'}
      </p>
    </div>
  );
};

// Counter.defaultProps = {
//   user: {},
// };

export default Counter;
