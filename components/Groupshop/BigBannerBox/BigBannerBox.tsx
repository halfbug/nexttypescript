/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import {
  Col, Row, Container, Button,
} from 'react-bootstrap';

// interface IProps {
//   children: React.ReactNode;
// }

const BigBannerBox = () => (
  <Container className={styles.groupshop__hero_big_banner_box}>
    <Row className="rounded-3 py-4 px-2">
      <Col>
        <Row>
          <Col className={styles.groupshop__hero_big_banner_box_off}>30% off</Col>
        </Row>
        <Row>
          <Col className={styles.groupshop__hero_big_banner_box_shoppers}>
            For the next two shoppers only
          </Col>
        </Row>
        {/* <Row>
          <Col className={styles.groupshop__hero_big_banner_box_orders}>
            orders over $25
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className={styles.groupshop__hero_big_banner_box_2off}>
            20% off
          </Col>
        </Row>
        <Row>
          <Col className={styles.groupshop__hero_big_banner_box_orders}>
            all other orders
          </Col>
        </Row> */}
      </Col>
    </Row>
  </Container>
);

// Hero.defaultProps = {
//   user: {},
// };

export default BigBannerBox;
