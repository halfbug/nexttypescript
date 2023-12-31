/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
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
    milestones, getBannerTotalCashBack, currencySymbol, cashback,
  } = useDeal();

  const [prev, setprev] = React.useState(0);
  useEffect(() => {
    setprev(milestones.length - 2 < 0 ? 0 : milestones.length - 2);
  }, [milestones]);

  return (

    <>

      <Row className={styles.groupshop__hero_small_banner_box}>
        <Col>
          <Row className={styles.groupshop__hero_small_banner_box_off}>
            <Col>
              {bannerDiscount?.length ? bannerDiscount[prev] : ''}
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
                    {/* {getBannerTotalCashBack(bannerDiscount[prev])} */}
                    {cashback().totalUnlockedAmount.toString().replace('.00', '') || 0}
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
