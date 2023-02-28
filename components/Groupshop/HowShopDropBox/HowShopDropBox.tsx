import React from 'react';
import styles from 'styles/Modal.module.scss';
import ArrowDown from 'assets/images/arrow-down.svg';
import { RootProps } from 'types/store';
import {
  Button,
  Carousel,
  Col, Modal, Row,
} from 'react-bootstrap';
import GroupshopIcon from 'assets/images/Logo-small.svg';
import useAppContext from 'hooks/useAppContext';

interface HowShopDropBoxProps extends RootProps {
    show: boolean;
    handleClose(e: any): any;

}

const HowShopDropBox = ({
  show = false, handleClose,
}: HowShopDropBoxProps) => {
  const { gsctx: { store } } = useAppContext();
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
        dialogClassName={styles.howShopDropBox_modal}
        contentClassName={styles.howShopDropBox_modal__content}
      >
        <Modal.Header className={styles.howShopDropBox_modal__closebtnlg}>
          {/* <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row> */}
        </Modal.Header>
        <Modal.Header className={styles.howShopDropBox_modal__closebtnsm}>
          <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className={styles.howShopDropBox_modal__body}>
          <Row className="mx-0">
            <Col lg={12} className="px-0">
              <div className={styles.howShopDropBox_modal__top}>
                <div className={styles.howShopDropBox_modal__top__icon}>
                  <GroupshopIcon />
                </div>
                <h3>
                  How to Shop the Drops
                </h3>
                <div className={styles.howShopDropBox_modal__top__howTxt}>
                  Swipe through to learn how it works.
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mx-0">
            <Carousel
              className={styles.howShopDropBox_modal__carousel}
              controls={false}
            >
              <Carousel.Item
                className={styles.howShopDropBox_modal__carousel__item}
                interval={50000}
              >
                <div className={styles.howShopDropBox_modal__carousel__item__content}>
                  <div>
                    <p>
                      Every week we drop exclusive discounts on products that almost never get
                      {' '}
                      discounted.
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item className={styles.howShopDropBox_modal__carousel__item}>
                <div className={styles.howShopDropBox_modal__carousel__item__content}>
                  <div>
                    <p>
                      <b>You have 24 hours</b>
                      {' '}
                      to shop this drop. After 24 hours, you’ll have to
                      {' '}
                      rejoin the waitlist.
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item className={styles.howShopDropBox_modal__carousel__item}>
                <div className={styles.howShopDropBox_modal__carousel__item__content}>
                  <div>
                    <p>
                      You get
                      {' '}
                      <b>
                        {store?.drops?.rewards?.baseline}
                        % off
                      </b>
                      {' '}
                      everything to start.
                      <b>Spotlight</b>
                      {' '}
                      products have an extra discount and rotate daily.
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item className={styles.howShopDropBox_modal__carousel__item}>
                <div className={styles.howShopDropBox_modal__carousel__item__content}>
                  <div>
                    <p className="mb-0">
                      🤑
                      <b> Want more rewards?</b>
                    </p>
                    <p>
                      Unlock up
                      {' '}
                      {store?.drops?.rewards?.maximum}
                      % off &
                      {' '}
                      {store?.drops?.rewards?.maximum! - store?.drops?.rewards?.baseline!}
                      % cashback on your order.
                      Place your first order to unlock a new tier of discounts.
                      Invite friends to shop after you & get cashback on your order when they shop
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item className={styles.howShopDropBox_modal__carousel__item}>
                <div className={styles.howShopDropBox_modal__carousel__item__content}>
                  <div>
                    <p className="mb-0">
                      ⏳
                      <b>Need more time?</b>
                    </p>
                    <p>
                      We’ll add 24 hours when you shop and another 24 hours each time a friend
                      {' '}
                      shops.
                    </p>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </Row>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className={styles.howShopDropBox_modal__btnSection}>
                <Button variant="dark" onClick={handleClose}>
                  Drop in and shop
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HowShopDropBox;
