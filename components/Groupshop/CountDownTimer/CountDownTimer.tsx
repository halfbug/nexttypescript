import useCountDown from 'hooks/useCountDown';
import React from 'react';
import dStyles from 'styles/Drops.module.scss';

const CountDownTimer = () => {
  const {
    count: {
      days, hours: hrs, minutes: mins, seconds: secs,
    },
  } = useCountDown();
  return (
    <div className={dStyles.drops__countdown}>
      <p>
        <span>
          {hrs + (days * 24)}
          {' '}
          hrs
        </span>
        :
        <span>
          {mins}
          {' '}
          mins
        </span>
        :
        <span>
          {secs}
          {' '}
          secs
        </span>
      </p>
    </div>
  );
};

export default CountDownTimer;
