import React from 'react';
import styles from 'styles/GradientProgressBar.module.scss';

interface IGradientProgress {
  progress: number,
  className: string
}

const GradientProgressBar = ({ progress, className }: IGradientProgress) => (
  <div
    className={[styles.gradientProgressbar, styles[`gradientProgressbar--${progress}`], className].join(' ')}
  />
);

export default GradientProgressBar;
