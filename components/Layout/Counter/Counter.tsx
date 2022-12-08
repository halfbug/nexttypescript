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
  isRetail?: boolean;
}

const Counter = ({
  expireDate, pending, isRetail,
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
        <span className={styles.groupshop_counter_top__expires}>{!isExpired && 'EXPIRES IN'}</span>
        <span className={styles.groupshop_counter_top_txt}>
          {diffDays}
          D
        </span>
        {' '}
        <span className={styles.groupshop_counter_dots}>
          :
        </span>
        <span className={styles.groupshop_counter_top_txt}>
          {diffHrs}
          H
        </span>
        {' '}
        <span className={styles.groupshop_counter_dots}>
          :
        </span>
        <span className={styles.groupshop_counter_top_txt}>
          {diffMins}
          M
        </span>
        {' '}
        <span className={styles.groupshop_counter_top__expired}>
          {isExpired && !isRetail && 'EXPIRED – INVITE 1 FRIEND TO RESTART'}
        </span>
      </p>
    </div>
  );
};

Counter.defaultProps = {
  isRetail: false,
};

export default Counter;
