/* eslint-disable no-undef */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { RootProps } from 'types/store';
import {
  Col, Modal, Row, Button,
} from 'react-bootstrap';
import Cart from 'assets/images/CartBig.svg';
import Envelop from 'assets/images/EnvelopeBig.svg';
import Cross from 'assets/images/CrossLg.svg';
import ArrowDown from 'assets/images/arrow-down.svg';
import useGtm from 'hooks/useGtm';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import { useMediaQuery } from 'react-responsive';
import NativeShareButton from 'components/Buttons/NativeShareButton/NativeShareButton';
import useDeal from 'hooks/useDeal';

interface RewardBox2Props extends RootProps {
  show: boolean;
  discount?: string;
  handleClose(e: any): any;
  shareurl: any;
  fullshareurl: any;
  // addToCart(e: any): any;
  brandName?: string;
  maxPercent?: string | undefined;

}

const RewardBox2 = ({
  show = false, handleClose, discount, shareurl, fullshareurl, brandName, maxPercent,
}: RewardBox2Props) => {
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };
  const { googleEventCode } = useGtm();
  const isDesktop = useMediaQuery({
    query: '(min-width: 476px)',
  });

  const {
    isExpired,
  } = useDeal();

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        size="lg"
        centered
        dialogClassName={styles.groupshop_rewardBox2_modal}
        contentClassName={styles.groupshop_rewardBox2_modal__content}
      >
        {/* <Modal.Header className={styles.groupshop_RewardBox2_modal_header}>
          <Row onClick={handleClose}><ArrowDown /></Row>
        </Modal.Header> */}
        <Modal.Header className={styles.groupshop_rewardBox2_modal__closebtnlg}>
          <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Header className={styles.groupshop_rewardBox2_modal__closebtnsm}>
          <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className={styles.groupshop_rewardBox2_modal__body}>
          <Row>
            <Col lg={12}>
              <div className={styles.groupshop_rewardBox2_modal__top}>
                <h2>
                  New to Groupshop?
                </h2>
                <p>Here are the two ways you can earn rewards:</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className={styles.groupshop_rewardBox2_modal__info1}>
                {isDesktop ? (
                  <>
                    <div>
                      <Cart />
                    </div>
                    <div>
                      <p>
                        <b>Shop</b>
                        {' '}
                        exclusive discounts on this Groupshop
                        &
                        get
                        {' '}
                        {`${discount}%`}
                        {' '}
                        off your order today.

                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Cart />
                    </div>
                    <div
                      onClick={handleClose}
                      onKeyUp={handleClose}
                      onKeyDown={handleClose}
                      role="button"
                      tabIndex={0}
                      className="d-inline"
                    >
                      <p>
                        <b>Shop</b>
                        {' '}
                        exclusive discounts on this Groupshop
                        &
                        get
                        {' '}
                        {`${discount}%`}
                        {' '}
                        off your order today.

                      </p>
                    </div>
                  </>
                ) }
              </div>
              { isDesktop ? (
                <div className={styles.groupshop_rewardBox2_modal__info2}>
                  <div>
                    <Envelop />
                  </div>
                  <div>
                    <p>
                      {' '}
                      <b>Share</b>
                      {' '}
                      this Groupshop and earn cashback when friends shop after you.
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className={[styles.groupshop_rewardBox2_modal__info2, 'd-inline'].join(' ')}
                  onClick={() => navigator?.share({
                    title: 'Groupshop',
                    text: `Shop ${brandName} on my Groupshop & get up to ${maxPercent} off ${shareurl}`,
                  })}
                  onKeyUp={() => navigator?.share({
                    title: 'Groupshop',
                    text: `Shop ${brandName} on my Groupshop & get up to ${maxPercent} off ${shareurl}`,
                  })}
                  onKeyDown={() => navigator?.share({
                    title: 'Groupshop',
                    text: `Shop ${brandName} on my Groupshop & get up to ${maxPercent} off ${shareurl}`,
                  })}
                  role="button"
                  tabIndex={0}
                >
                  <div>
                    <Envelop />
                  </div>
                  <div>
                    <p>
                      <b>Share</b>
                      {' '}
                      this Groupshop and earn cashback when friends shop after you.
                    </p>
                  </div>
                </div>
              )}
            </Col>
            <Col lg={12}>
              <div className={styles.groupshop_rewardBox2_modal__btnSection}>
                <Button
                  onClick={handleClose}
                  className={styles.groupshop_rewardBox2_modal__blackBtn}
                >
                  Shop & Save
                </Button>
                <span className="px-3 fs-5">or</span>
                {
                  isDesktop ? (
                    <ShareButton
                      placement="auto"
                      shareurl={shareurl}
                      fullshareurl={fullshareurl}
                      // label="Share & Unlock"
                      label={isExpired ? 'Share & Unlock' : 'Share & Earn'}
                      onClick={() => googleEventCode('earn-cashback-modal')}
                      icon={false}
                      className={styles.groupshop_rewardBox2_modal__greenBtn}
                    />
                  ) : (
                    <NativeShareButton
                      label={isExpired ? 'Share & Unlock' : 'Share & Earn'}
                      className={styles.groupshop_rewardBox2_modal__greenBtn}
                      shareurl={shareurl}
                      text={`Shop ${brandName} on my Groupshop & get up to ${maxPercent} off`}
                    />
                  )
              }
              </div>
            </Col>
          </Row>
          <Row />
        </Modal.Body>
      </Modal>
    </>
  );
};
RewardBox2.defaultProps = {
  discount: '20%',
  brandName: '',
  maxPercent: '',

};

export default RewardBox2;
