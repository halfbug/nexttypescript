import React from 'react';
import dStyles from 'styles/Drops.module.scss';

const CountDownTimer = () => (
  <div className={dStyles.drops__countdown}>
    <p>
      <span>
        00
        {' '}
        hrs
      </span>
      :
      <span>
        01
        {' '}
        mins
      </span>
      :
      <span>
        01
        {' '}
        secs
      </span>
    </p>
  </div>
);

export default CountDownTimer;
