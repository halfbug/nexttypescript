/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Col, Row } from 'react-bootstrap';

interface HeroProps {
  children : React.ReactNode;
  bannerImage: any;
}

const Hero = ({
  bannerImage, children,
}: HeroProps) => (
  <>
    <div className={styles.groupshop__hero} style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className={styles.groupshop__overlay} />
      {children}
    </div>
  </>
);

// Hero.defaultProps = {
//   user: {},
// };

export default Hero;
