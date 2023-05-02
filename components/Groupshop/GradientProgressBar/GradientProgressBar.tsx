import React, { useEffect, useState } from 'react';
import styles from 'styles/GradientProgressBar.module.scss';
import useDrops from 'hooks/useDrops';

interface IGradientProgressProps {
  progress: number,
  cartValue?: number,
  className: string,
}

const GradientProgressBar = ({
  progress, className,
  cartValue = 0,
}: IGradientProgressProps) => {
  const { totalRewardsValue, rewardArr: rewardArray } = useDrops();
  const [fill, setFill] = useState<number>(0);

  useEffect(() => {
    const numArray = rewardArray.map((ele: any, index: number) => {
      const arr = [...rewardArray];
      const newArr = arr.splice(0, (index + 1));
      const diff = +rewardArray[index]?.rewardValue - +rewardArray[index - 1]?.rewardValue;
      return {
        value: newArr.reduce((curr, next) => curr + (+next.rewardValue), 0),
        realValue: +ele.rewardValue,
        no: index + 1,
        rval: index === 0 ? +rewardArray[0].rewardValue : diff,
      };
    });
    const nearestSmall = numArray.reduce((acc: any, curr: any) => {
      if (curr.realValue <= cartValue && curr.realValue >= acc.realValue) {
        return curr;
      }
      return acc;
    }, { realValue: 0 });

    const a = Number.isNaN((100 * nearestSmall.no) / totalRewardsValue().totalRewards!)
      ? 0 : (100 * nearestSmall.no) / totalRewardsValue().totalRewards!;
    setFill(a);
  }, [rewardArray, cartValue]);

  const gradientBar = () => (
    <div
      style={{ backgroundSize: `${fill}%`, backgroundRepeat: 'repeat-y' }}
      className={[styles.gradientProgressbar, className].join(' ')}
    />
  );

  const checkRewards = (index: number) => parseInt(rewardArray[index].rewardValue, 10) <= cartValue;

  return (
    <>
      <div className="position-relative">
        <div className={styles.gradientProgressbar__sectionsWrapper}>
          {rewardArray.map((value, index) => (
            <div
              className={index === 0
                ? styles.gradientProgressbar__section
                : styles.gradientProgressbar__sectionBorder}
            />
          ))}
        </div>
        {gradientBar()}
        <div className={styles.gradientProgressbar__pillsWrapper}>
          {rewardArray.map((value, index) => (
            <div
              className={checkRewards(index) ? styles.gradientProgressbar__activePill
                : styles.gradientProgressbar__pill}
            >
              {value.rewardTitle}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

GradientProgressBar.defaultProps = {
  cartValue: 0,
};

export default GradientProgressBar;
