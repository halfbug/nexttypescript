import React from 'react';
import styles from 'styles/GradientProgressBar.module.scss';

interface IGradientProgressProps {
  progress: number,
  className: string,
  isRewardBased?: boolean,
  rewards?: string[]
}

const GradientProgressBar = ({
  progress, className, isRewardBased,
  rewards = [],
}: IGradientProgressProps) => {
  const gradientBar = () => (
    <div
      style={{ backgroundSize: `${progress}%`, backgroundRepeat: 'repeat-y' }}
      className={[styles.gradientProgressbar, className].join(' ')}
    />
  );
  return (
    <>
      {!isRewardBased
        ? (gradientBar())
        : (
          <div className="position-relative">
            <div className={styles.gradientProgressbar__sectionsWrapper}>
              {rewards.map((value, index) => (
                <div
                  className={index === 0
                    ? styles.gradientProgressbar__section
                    : styles.gradientProgressbar__sectionBorder}
                />
              ))}
            </div>
            {gradientBar()}
            <div className={styles.gradientProgressbar__pillsWrapper}>
              {rewards.map((value, index) => (
                <div
                  className={progress >= ((100 / rewards.length) * (index + 1))
                    ? styles.gradientProgressbar__activePill
                    : styles.gradientProgressbar__pill}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
};

GradientProgressBar.defaultProps = {
  isRewardBased: false,
  rewards: [],
};

export default GradientProgressBar;
