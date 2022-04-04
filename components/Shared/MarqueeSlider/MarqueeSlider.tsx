/* eslint-disable jsx-a11y/no-distracting-elements */
/* eslint-disable max-len */

import React from 'react';
import styles from './MarqueeSlider.module.scss';
// @ts-ignore

const MarqueeSlider = () => (
  <div className={styles.MarqueeSliderContainer}>
    {/*
 // @ts-ignore */}
    <marquee width="100%" direction="right">
      <p>shop with friends, get up to 90% cashback   •  access exclusive discounts   •   own your store   •   share your favorite products with your favorite people   •   get rewarded for your influence   •  you win, your friends win</p>
      {/*
 // @ts-ignore */}
    </marquee>
  </div>
);

export default MarqueeSlider;
