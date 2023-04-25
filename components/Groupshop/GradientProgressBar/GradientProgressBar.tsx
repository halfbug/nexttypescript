import React, { useEffect, useState } from 'react';
import styles from 'styles/GradientProgressBar.module.scss';
import { CartRewards } from 'types/store';
import useDrops from 'hooks/useDrops';

interface IGradientProgressProps {
  progress: number,
  cartValue?: number,
  className: string,
  rewards?: CartRewards[]
}

const GradientProgressBar = ({
  progress, className,
  rewards = [], cartValue = 0,
}: IGradientProgressProps) => {
  const { totalRewardsValue } = useDrops();
  const [fill, setFill] = useState<number>(0);
  const [rewardArr, setRewardArr] = useState<CartRewards[]>([]);

  useEffect(() => {
    const temp:any = rewards.slice().sort((a, b) => (+a.rewardValue) - (+b.rewardValue));
    const numArray = temp.map((ele: any, index: number) => {
      const arr = [...temp];
      const newArr = arr.splice(0, (index + 1));
      return {
        value: newArr.reduce((curr, next) => curr + (+next.rewardValue), 0),
        realValue: ele.rewardValue,
        no: index + 1,
      };
    });
    const nearestSmall = numArray.reduce((acc: any, curr: any) => {
      if (curr.value < cartValue && curr.value > acc.value) {
        return curr;
      }
      return acc;
    }, { value: 0 });
    setRewardArr(temp);

    const a = Number.isNaN((100 * nearestSmall.no) / totalRewardsValue().totalRewards!)
      ? 0 : (100 * nearestSmall.no) / totalRewardsValue().totalRewards!;
    setFill(a);
  }, [rewards, cartValue]);

  const gradientBar = () => (
    <div
      style={{ backgroundSize: `${fill}%`, backgroundRepeat: 'repeat-y' }}
      className={[styles.gradientProgressbar, className].join(' ')}
    />
  );

  const checkRewards = (index: number) => {
    if (index === 0) {
      return parseInt(rewardArr[index].rewardValue, 10);
    }
    if (rewards.length) {
      const arr = [...rewardArr];
      const temp = arr.splice(0, (index + 1));
      const num = temp
        .map((ele) => parseInt(ele.rewardValue, 10))
        .reduce((curr, next) => curr + next, 0);
      return num;
    }
    return 0;
  };

  return (
    <>
      <div className="position-relative">
        <div className={styles.gradientProgressbar__sectionsWrapper}>
          {rewardArr.map((value, index) => (
            <div
              className={index === 0
                ? styles.gradientProgressbar__section
                : styles.gradientProgressbar__sectionBorder}
            />
          ))}
        </div>
        {gradientBar()}
        <div className={styles.gradientProgressbar__pillsWrapper}>
          {rewardArr.map((value, index) => (
            <div
              className={cartValue
                  >= checkRewards(index) ? styles.gradientProgressbar__activePill
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
  rewards: [],
  cartValue: 0,
};

export default GradientProgressBar;
