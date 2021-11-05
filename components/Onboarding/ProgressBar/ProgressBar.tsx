import React from 'react';
import HeadLogo from 'assets/images/Logo.svg';

const ProgressBar = ({ progressWidth }:any) => (
  <>
    <span
      style={{
        background:
              'linear-gradient(270deg, #FEE750 0%, #F4DEC4 25.31%, #CCB2F9 44.79%, #CCB2F9 50%, #CCB2F9 55.21%, #F4DEC4 80.31% , #FEE750 100% )',
        width: progressWidth,
      }}
    >
      <HeadLogo />
      <HeadLogo />
      <HeadLogo />
    </span>
  </>
);

export default ProgressBar;
