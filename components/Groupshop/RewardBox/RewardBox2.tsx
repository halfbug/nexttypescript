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

interface RewardBox2Props extends RootProps {
    show: boolean;
    handleClose(e: any): any;
    // addToCart(e: any): any;
}

const RewardBox2 = ({
  show = false, handleClose,
}: RewardBox2Props) => {
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };
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
          <Row onClick={handleClose}><Cross /></Row>
        </Modal.Header>
        <Modal.Header className={styles.groupshop_rewardBox2_modal__closebtnsm}>
          <Row onClick={handleClose}><ArrowDown /></Row>
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
                <div>
                  <Cart />
                </div>
                <div>
                  <p>
                    <b>Shop</b>
                    {' '}
                    exclusive discounts on this Groupshop
                    &
                    get 20% off your order today.

                  </p>
                </div>
              </div>
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
            </Col>
            <Col lg={12}>
              <div className={styles.groupshop_rewardBox2_modal__btnSection}>
                <Button className={styles.groupshop_rewardBox2_modal__blackBtn}>
                  Shop & Save
                </Button>
                <span className="px-3 fs-5">or</span>
                <Button className={styles.groupshop_rewardBox2_modal__greenBtn}>
                  Share & Earn
                </Button>
              </div>
            </Col>
          </Row>
          <Row />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RewardBox2;