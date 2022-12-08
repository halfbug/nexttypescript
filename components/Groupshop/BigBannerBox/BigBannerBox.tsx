/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styles from 'styles/Groupshop.module.scss';
import {
  Col, Row, Container, Button,
} from 'react-bootstrap';
import useDeal from 'hooks/useDeal';
import { Member } from 'types/groupshop';

interface IProps {
  text: string;
  isInfluencerGS?: boolean;
  isChannel?: boolean;
}

const BigBannerBox = ({ text, isInfluencerGS, isChannel }: IProps) => {
  const {
    milestones, getBannerTotalCashBack, currencySymbol, baseLine, channelBaseLine,
  } = useDeal();

  return (
    <Container className={styles.groupshop__hero_big_banner_box}>
      <Row className="rounded-3 py-4 px-2">
        <Col>
          <Row>
            <Col className={styles.groupshop__hero_big_banner_box_off}>
              {milestones.length ? milestones[milestones.length - 1].discount : ''}
              { isInfluencerGS && baseLine}
              { isChannel && channelBaseLine}
              {' '}
              off
            </Col>
          </Row>
          <Row>
            <Col className={styles.groupshop__hero_big_banner_box_shoppers}>
              { text }
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
};
BigBannerBox.defaultProps = {
  isInfluencerGS: false,
  isChannel: false,
};

export default BigBannerBox;
