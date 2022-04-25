import React from 'react';
import styles from 'styles/Groupshop.module.scss';
// import Button from 'components/Buttons/Button/Button';
import {
  Placeholder,
} from 'react-bootstrap';
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
      <p className="d-flex align-items-center">
        {!isExpired && 'EXPIRES IN'}
        <span className={styles.groupshop_counter_top_txt}>
          {diffDays}
          D
        </span>
        {' '}
        <span>
          :
        </span>
        <span className={styles.groupshop_counter_top_txt}>
          {diffHrs}
          H
        </span>
        {' '}
        <span>
          :
        </span>
        <span className={styles.groupshop_counter_top_txt}>
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
