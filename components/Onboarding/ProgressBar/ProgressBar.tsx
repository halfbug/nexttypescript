import React from 'react';
import SmallLogo from 'assets/images/logosmall.svg';
import styles from 'styles/Progressbar.module.scss';
import Slogo from 'assets/images/small-logo.png';

console.log('🚀 ~ file: ProgressBar.tsx ~ line 3 ~ SmallLogo', SmallLogo);

const ProgressBar = ({ progress }:any) => (
  <div
    className={[styles.progressbar, styles[`progressbar--${progress}`]].join(' ')}

  >
    <div style={{
      backgroundImage: `url(${Slogo.src})`,
      width: '100%',
      height: '18px',
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'auto',
      backgroundPosition: 'center',
    }}
    />
  </div>

);

export default ProgressBar;
