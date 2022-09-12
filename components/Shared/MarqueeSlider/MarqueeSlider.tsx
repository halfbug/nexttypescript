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
        <span className="px-3">
          •
        </span>
        shop with friends, get up to 90% cashback
        <span className="px-3">
          •
        </span>
        access exclusive discounts
        <span className="px-3">
          •
        </span>
        own your store
        <span className="px-3">
          •
        </span>
        share your favorite products with your favorite people
        <span className="px-3">
          •
        </span>
        get rewarded for your influence
        <span className="px-3">
          •
        </span>
        you win, your friends win
      </p>
      {/*
 // @ts-ignore */}
    </marquee>
  </div>
);

export default MarqueeSlider;
