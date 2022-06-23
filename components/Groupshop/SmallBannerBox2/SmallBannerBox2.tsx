/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Col, Row, Container } from 'react-bootstrap';
import useDeal from 'hooks/useDeal';
import { GroupshopContext } from 'store/groupshop.context';

interface IProps {
  bannerDiscount : (string | undefined)[] | undefined;
}

const SmallBannerBox2 = ({
  bannerDiscount,
}: IProps) => {
  const {
    milestones, getBannerTotalCashBack, currencySymbol,
  } = useDeal();
  const { gsctx, dispatch } = useContext(GroupshopContext);
  React.useEffect(() => {
    console.log('im in smallbannerbox use effect');

    if (bannerDiscount?.length && !gsctx.expectedCashBack) {
      console.log(bannerDiscount);

      // eslint-disable-next-line max-len
      dispatch({ type: 'UPDATE_GROUPSHOP', payload: { ...gsctx, expectedCashBack: parseInt(getBannerTotalCashBack(bannerDiscount[milestones.length]), 10) } });
      // dispatch({ type: 'UPDATE_GROUPSHOP', payload: { ...gsctx, expectedCashBack: 5 } });
    }
  }, [gsctx]);
  return (
    <>
      <Row className={styles.groupshop__hero_small_banner_box}>
        <Col>
          <Row className={styles.groupshop__hero_small_banner_box_off}>
            <Col>
              {bannerDiscount?.length ? bannerDiscount[milestones.length] : ''}
              {' '}
              off
            </Col>
          </Row>
          <Row className={styles.groupshop__hero_small_banner_box_cashback}>
            <Col>
              {bannerDiscount?.length
                ? (
                  <>
                    {currencySymbol}
                    {getBannerTotalCashBack(bannerDiscount[milestones.length] ?? 0)}
                    {' '}
                    cashback
                  </>
                ) : ''}
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

export default SmallBannerBox2;
