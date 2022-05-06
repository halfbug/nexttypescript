/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Col, Row } from 'react-bootstrap';

interface HeroProps {
  children : React.ReactNode;
}

const Hero = ({
  children,
}: HeroProps) => (
  <div className={styles.groupshop__hero} style={{ backgroundImage: 'url(/images/gs-banner.jpeg)' }}>
    {children}
  </div>
);

// Hero.defaultProps = {
//   user: {},
// };

export default Hero;
