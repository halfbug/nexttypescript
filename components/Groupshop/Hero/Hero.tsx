/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import dStyles from 'styles/Drops.module.scss';
import { Col, Row } from 'react-bootstrap';

interface HeroProps {
  children : React.ReactNode;
  bannerImage: any;
  isDrops?: boolean;
}

const Hero = ({
  bannerImage, children, isDrops,
}: HeroProps) => (
  <>
    <div className={isDrops ? dStyles.drops__hero : styles.groupshop__hero} style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className={isDrops ? dStyles.drops__overlay : styles.groupshop__overlay} />
      {children}
    </div>
  </>
);

Hero.defaultProps = {
  isDrops: false,
};

export default Hero;
