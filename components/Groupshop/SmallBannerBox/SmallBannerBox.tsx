/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Col, Row, Container } from 'react-bootstrap';

// interface IProps {
//   children : React.ReactNode;
// }

const SmallBannerBox = () => (

  <>

    <Row className={styles.groupshop__hero_small_banner_box}>
      <Col>
        <Row className={styles.groupshop__hero_small_banner_box_off}>
          <Col>10% off</Col>
        </Row>
        <Row className={styles.groupshop__hero_small_banner_box_cashback}>
          <Col>+ $23 cashback</Col>
        </Row>
      </Col>
    </Row>
  </>
);

// Hero.defaultProps = {
//   user: {},
// };

export default SmallBannerBox;
