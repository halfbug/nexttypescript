import React from 'react';
import styles from 'styles/GradientProgressBar.module.scss';

interface IGradientProgress {
  progress: number,
  className: string
}

const GradientProgressBar = ({ progress, className }: IGradientProgress) => (
  <div
    style={{ backgroundSize: `${progress}%`, backgroundRepeat: 'repeat-y' }}
    className={[styles.gradientProgressbar, className].join(' ')}
  />
);

export default GradientProgressBar;
