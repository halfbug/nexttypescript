/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Col, Row, Container } from 'react-bootstrap';
import useDeal from 'hooks/useDeal';

interface IProps {
  bannerDiscount : (string | undefined)[] | undefined;
}
const SmallBannerBox = ({
  bannerDiscount,
}: IProps) => {
  const {
    milestones, getBannerTotalCashBack, currencySymbol,
  } = useDeal();
  return (

    <>

      <Row className={styles.groupshop__hero_small_banner_box}>
        <Col>
          <Row className={styles.groupshop__hero_small_banner_box_off}>
            <Col>
              {bannerDiscount?.length ? bannerDiscount[0] : ''}
              {' '}
              off
            </Col>
          </Row>
          <Row className={styles.groupshop__hero_small_banner_box_cashback}>
            <Col>
              {bannerDiscount?.length
                ? (
                  <>
                    +
                    {' '}
                    {currencySymbol}
                    {getBannerTotalCashBack(milestones[milestones.length - 1].discount)}
                    {' '}
                    cashback
                  </>
                ) : '' }

            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

// Hero.defaultProps = {
//   user: {},
// };

export default SmallBannerBox;
