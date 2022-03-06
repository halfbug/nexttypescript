import React from 'react';
import styles from 'styles/Progressbar.module.scss';

const ProgressBar = ({ progress }:any) => (
  <div
    className={[styles.progressbar, styles[`progressbar--${progress}`]].join(' ')}

  >
    <div style={{
      // backgroundImage: `url(${Slogo2.src})`,
      backgroundImage: 'url(/images/small-logo2.png)',
      width: '100%',
      height: '29.68px',
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'auto',
      backgroundPosition: 'center',
    }}
    />
  </div>

);

export default ProgressBar;
