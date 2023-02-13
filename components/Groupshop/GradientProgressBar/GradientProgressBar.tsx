import React from 'react';
import styles from 'styles/GradientProgressBar.module.scss';

interface IGradientProgress {
  progress: number,
  className: string
}

const GradientProgressBar = ({ progress, className }: IGradientProgress) => (
  <div
    style={{ backgroundSize: `${progress}%`, backgroundRepeat: 'no-repeat' }}
    className={[styles.gradientProgressbar, className].join(' ')}
  />
);

export default GradientProgressBar;
