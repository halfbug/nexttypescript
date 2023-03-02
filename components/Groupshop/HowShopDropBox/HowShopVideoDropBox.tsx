import React from 'react';
import styles from 'styles/Modal.module.scss';
import { RootProps } from 'types/store';
import {
  Button,
  Carousel,
  Col, Modal, Row, Spinner,
} from 'react-bootstrap';
import GroupshopIcon from 'assets/images/groupshop-white-icon.svg';
import useAppContext from 'hooks/useAppContext';

interface HowShopDropVideoBoxProps extends RootProps {
    show: boolean;
    handleClose(e: any): any;
    btnDisable: boolean;

}

const HowShopDropVideoBox = ({
  show = false, handleClose, btnDisable,
}: HowShopDropVideoBoxProps) => {
  const { gsctx } = useAppContext();
  const { customerDetail, store } = gsctx;

  const closeModal = (e: any) => {
    handleClose(e);
  };

  // temporary link for video
  const tmpVideoSrc = [
    'https://s3.amazonaws.com/gsvid/pickinguppresents2a0.mp4',
    'https://s3.amazonaws.com/gsvid/shoppingbagsdarkb8f.mp4',
    'https://s3.amazonaws.com/gsvid/shoppingbagslight3e3.mp4',
    'https://s3.amazonaws.com/gsvid/shoppingcartfrenzd7c.mp4',
    'https://s3.amazonaws.com/gsvid/singlefilelineec0.mp4',
  ];
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
        <Modal.Body className={styles.howShopDropVideoBox_modal__body}>
          <div className={styles.howShopDropVideoBox_modal__top}>
            <h3>
              { (customerDetail?.firstName !== '' && customerDetail?.firstName !== null) && (
                customerDetail?.firstName?.charAt(0)?.toUpperCase()!
                + customerDetail?.firstName?.split(' ')[0]?.slice(1)!
              )}
              { (customerDetail?.firstName === null || customerDetail?.firstName === '') && (
                  customerDetail?.fullName?.charAt(0)?.toUpperCase()!
                + customerDetail?.fullName?.split(' ')[0]?.slice(1)!
              )}
              , you’re off the waitlist.
            </h3>
            <div className={styles.howShopDropVideoBox_modal__top__howTxt}>
              Swipe through to learn how it works.
            </div>
          </div>
          <Carousel
            className={styles.howShopDropVideoBox_modal__carousel}
            bsPrefix="videoCarousel carousel"
            controls={false}
          >
            <Carousel.Item
              className={styles.howShopDropVideoBox_modal__carousel__item}
              interval={50000}
            >
              <div className={styles.howShopDropVideoBox_modal__carousel__item__content}>
                <video key={1} src={tmpVideoSrc[0]} autoPlay muted loop playsInline preload="auto" />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__videoOverlay} />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                  <div className={styles.howShopDropVideoBox_modal__top__icon}>
                    <GroupshopIcon />
                  </div>
                  <div className="mt-5 pt-5">
                    <p className="mt-5 pt-5">
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
                <video key={2} src={tmpVideoSrc[1]} autoPlay muted loop playsInline preload="auto" />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__videoOverlay} />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                  <div className={styles.howShopDropVideoBox_modal__top__icon}>
                    <GroupshopIcon />
                  </div>
                  <div className="my-auto">
                    <p className="mb-5 pb-5">
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
                <video key={3} src={tmpVideoSrc[2]} autoPlay muted loop playsInline preload="auto" />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__videoOverlay} />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                  <div className={styles.howShopDropVideoBox_modal__top__icon}>
                    <GroupshopIcon />
                  </div>
                  <div className="mt-5 pt-5">
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
                    <br />
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
                <video key={4} src={tmpVideoSrc[3]} autoPlay muted loop playsInline preload="auto" />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__videoOverlay} />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                  <div className={styles.howShopDropVideoBox_modal__top__icon}>
                    <GroupshopIcon />
                  </div>
                  <div className="mt-5 pt-5">
                    <p className="mt-2 mb-0">
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
                <video key={5} src={tmpVideoSrc[4]} autoPlay muted loop playsInline preload="auto" />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__videoOverlay} />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                  <div className={styles.howShopDropVideoBox_modal__top__icon}>
                    <GroupshopIcon />
                  </div>
                  <div className="mt-5 pt-5">
                    <p className="mt-5 pt-4 mb-0">
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
          <div className={styles.howShopDropVideoBox_modal__btnSection}>
            <Button
              variant="light"
              disabled={btnDisable}
              onClick={handleClose}
            >
              {btnDisable ? <Spinner animation="border" size="sm" /> : 'Drop in and shop'}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HowShopDropVideoBox;
