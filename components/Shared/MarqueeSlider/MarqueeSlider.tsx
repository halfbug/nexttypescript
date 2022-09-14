/* eslint-disable jsx-a11y/no-distracting-elements */
/* eslint-disable max-len */

import React from 'react';
import styles from './MarqueeSlider.module.scss';
// @ts-ignore

const MarqueeSlider = () => (
  <div className={styles.MarqueeSliderContainer}>
    {/*
 // @ts-ignore */}
    <marquee width="100%" direction="left">
      <p>
        <span>
          shop with friends, get up to 100% cashback
        </span>
        <span>
          access exclusive discounts
        </span>
        <span>
          own your store
        </span>
        <span>
          share your favorite products with your favorite people
        </span>
        <span>
          get rewarded for your influence
        </span>
        <span>
          you win, your friends win
        </span>
      </p>
      {/*
 // @ts-ignore */}
    </marquee>
  </div>
);

export default MarqueeSlider;
