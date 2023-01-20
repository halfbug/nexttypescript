import React from 'react';
import styles from 'styles/Modal.module.scss';
import { RootProps } from 'types/store';
import {
  Button,
  Carousel,
  Col, Modal, Row,
} from 'react-bootstrap';
import GroupshopIcon from 'assets/images/groupshop-white-icon.svg';
import useAppContext from 'hooks/useAppContext';

interface HowShopDropVideoBoxProps extends RootProps {
    show: boolean;
    handleClose(e: any): any;

}

const HowShopDropVideoBox = ({
  show = false, handleClose,
}: HowShopDropVideoBoxProps) => {
  const { gsctx } = useAppContext();
  const { customerDetail, store } = gsctx;

  const closeModal = (e: any) => {
    handleClose(e);
  };

  // temporary link for video
  const tmpVideoSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        size="lg"
        centered
        backdrop="static"
        dialogClassName={styles.howShopDropVideoBox_modal}
        contentClassName={styles.howShopDropVideoBox_modal__content}
      >
        <Modal.Header className={styles.howShopDropVideoBox_modal__closebtnlg}>
          {/* <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row> */}
        </Modal.Header>
        <Modal.Header className={styles.howShopDropVideoBox_modal__closebtnsm}>
          {/* <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row> */}
        </Modal.Header>
        <Modal.Body className={styles.howShopDropVideoBox_modal__body}>
          <Row className="mx-0">
            <Col lg={12} className="px-0">
              <div className={styles.howShopDropVideoBox_modal__top}>
                <h3>
                  {customerDetail?.firstName?.charAt(0)?.toUpperCase()!
                  + customerDetail?.firstName?.slice(1)!}
                  , you’re off the waitlist.
                </h3>
                <div className={styles.howShopDropVideoBox_modal__top__howTxt}>
                  Swipe through to learn how it works.
                </div>
              </div>
            </Col>
          </Row>
          {/* <Row className="mx-0">
            <Col lg={12} className="px-0">
              <div className={styles.howShopDropVideoBox_modal__top}>
                <div className={styles.howShopDropVideoBox_modal__top__icon}>
                  <GroupshopIcon />
                </div>
                <h3>
                  How to Shop the Drops
                </h3>
                <div className={styles.howShopDropVideoBox_modal__top__howTxt}>
                  Swipe through to learn how it works.
                </div>
              </div>
            </Col>
          </Row> */}
          <Row className="mx-0">
            <Carousel
              className={styles.howShopDropVideoBox_modal__carousel}
              controls={false}
            >
              <Carousel.Item
                className={styles.howShopDropVideoBox_modal__carousel__item}
                interval={50000}
              >
                <div className={styles.howShopDropVideoBox_modal__carousel__item__content}>
                  <video autoPlay muted loop>
                    <source src={tmpVideoSrc} type="video/mp4" />
                  </video>
                  <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                    <div className={styles.howShopDropVideoBox_modal__top__icon}>
                      <GroupshopIcon />
                    </div>
                    <div className="my-auto">
                      <p>
                        Every week we drop
                        {' '}
                        <b>exclusive discounts</b>
                        {' '}
                        on products that almost never get discounted.
                      </p>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item className={styles.howShopDropVideoBox_modal__carousel__item}>
                <div className={styles.howShopDropVideoBox_modal__carousel__item__content}>
                  <video autoPlay muted loop>
                    <source src={tmpVideoSrc} type="video/mp4" />
                  </video>
                  <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                    <div className={styles.howShopDropVideoBox_modal__top__icon}>
                      <GroupshopIcon />
                    </div>
                    <div className="my-auto">
                      <p>
                        <b>You have 24 hours</b>
                        {' '}
                        to shop this drop. After 24 hours, you’ll have to
                        {' '}
                        rejoin the waitlist.
                      </p>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item className={styles.howShopDropVideoBox_modal__carousel__item}>
                <div className={styles.howShopDropVideoBox_modal__carousel__item__content}>
                  <video autoPlay muted loop>
                    <source src={tmpVideoSrc} type="video/mp4" />
                  </video>
                  <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                    <div className={styles.howShopDropVideoBox_modal__top__icon}>
                      <GroupshopIcon />
                    </div>
                    <div className="my-auto">
                      <p>
                        You get
                        {' '}
                        <b>
                          {store?.drops?.rewards?.baseline}
                          % off
                        </b>
                        {' '}
                        everything to start.
                      </p>
                      <p>
                        <b>Spotlight</b>
                        {' '}
                        products have an extra discount and rotate daily.
                      </p>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item className={styles.howShopDropVideoBox_modal__carousel__item}>
                <div className={styles.howShopDropVideoBox_modal__carousel__item__content}>
                  <video autoPlay muted loop>
                    <source src={tmpVideoSrc} type="video/mp4" />
                  </video>
                  <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                    <div className={styles.howShopDropVideoBox_modal__top__icon}>
                      <GroupshopIcon />
                    </div>
                    <div className="my-auto">
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
                      </p>
                      <div className={styles.howShopDropVideoBox_modal__carousel__item__tierTxt}>
                        Place your first order to unlock a new tier of discounts.
                        Invite friends to shop after you & get cashback on your order when they shop
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item className={styles.howShopDropVideoBox_modal__carousel__item}>
                <div className={styles.howShopDropVideoBox_modal__carousel__item__content}>
                  <video autoPlay muted loop>
                    <source src={tmpVideoSrc} type="video/mp4" />
                  </video>
                  <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                    <div className={styles.howShopDropVideoBox_modal__top__icon}>
                      <GroupshopIcon />
                    </div>
                    <div className="my-auto">
                      <p className="mb-0">
                        ⏳
                        <b>Need more time?</b>
                      </p>
                      <p>
                        We'll add 24 hours when you shop and another 24 hours each time a friend
                        {' '}
                        shops.
                      </p>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </Row>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className={styles.howShopDropVideoBox_modal__btnSection}>
                <Button variant="light" onClick={handleClose}>
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

export default HowShopDropVideoBox;
