/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
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
import SliderImage1 from 'assets/images/slider-1.png';
import SliderImage2 from 'assets/images/slider-2.png';
import SliderImage3 from 'assets/images/slider-3.png';

interface HowShopDropVideoBoxProps extends RootProps {
    show: boolean;
    handleClose(e: any): any;
    btnDisable: boolean;
    spinner: boolean;
}

const HowShopDropVideoBox = ({
  show = false, handleClose, btnDisable, spinner,
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
        <div className={styles.howShopDropVideoBox_modal__body}>
          <div className={styles.howShopDropVideoBox_modal__top}>
            <h3>
              { (customerDetail?.firstName !== '' && customerDetail?.firstName !== null) && (
                customerDetail?.firstName?.charAt(0)?.toUpperCase()!
                + customerDetail?.firstName?.split(' ')[0]?.slice(1)!
              )}
              { ((customerDetail?.firstName === null || customerDetail?.firstName === '') && (customerDetail?.fullName !== null && customerDetail?.fullName !== '')) && (
                  customerDetail?.fullName?.charAt(0)?.toUpperCase()!
                + customerDetail?.fullName?.split(' ')[0]?.slice(1)!

              )}
              { ((customerDetail?.firstName === null || customerDetail?.firstName === '') && (customerDetail?.fullName === null || customerDetail?.fullName === '')) && (
                customerDetail?.phone
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
              interval={500000}
            >
              <img src={SliderImage1.src} alt="slider-img" className="img-fluid" />
                {/* <video key={1} src={tmpVideoSrc[0]} autoPlay muted loop playsInline preload="auto" />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__videoOverlay} />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                  <div className={styles.howShopDropVideoBox_modal__top__icon}>
                    <GroupshopIcon />
                  </div>
                  <div className="pt-5">
                    <p>
                      Every week we drop
                      {' '}
                      <b>exclusive discounts</b>
                      {' '}
                      on products that almost
                      {' '}
                      <i>never</i>
                      {' '}
                      get discounted.
                    </p>
                  </div>
                </div> */}
            </Carousel.Item>
            <Carousel.Item className={styles.howShopDropVideoBox_modal__carousel__item}>
              <img src={SliderImage2.src} alt="slider-img" className="img-fluid" />
                {/* <video key={2} src={tmpVideoSrc[1]} autoPlay muted loop playsInline preload="auto" />
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
                </div> */}
            </Carousel.Item>
            <Carousel.Item className={styles.howShopDropVideoBox_modal__carousel__item}>
              <img src={SliderImage3.src} alt="slider-img" className="img-fluid" />
                {/* <video key={3} src={tmpVideoSrc[2]} autoPlay muted loop playsInline preload="auto" />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__videoOverlay} />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                  <div className={styles.howShopDropVideoBox_modal__top__icon}>
                    <GroupshopIcon />
                  </div>
                  <div className="pt-5">
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
                      products have an extra discount and rotate
                      {' '}
                      <i>daily</i>
                      .
                    </p>
                  </div>
                </div>  */}
            </Carousel.Item>
            {/* <Carousel.Item className={styles.howShopDropVideoBox_modal__carousel__item}>
              <div className={styles.howShopDropVideoBox_modal__carousel__item__content}>
                <video key={4} src={tmpVideoSrc[3]} autoPlay muted loop playsInline preload="auto" />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__videoOverlay} />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                  <div className={styles.howShopDropVideoBox_modal__top__icon}>
                    <GroupshopIcon />
                  </div>
                  <div className="pt-5">
                    <p>
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
            </Carousel.Item> */}
            {/* <Carousel.Item className={styles.howShopDropVideoBox_modal__carousel__item}>
              <div className={styles.howShopDropVideoBox_modal__carousel__item__content}>
                <video key={5} src={tmpVideoSrc[4]} autoPlay muted loop playsInline preload="auto" />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__videoOverlay} />
                <div className={styles.howShopDropVideoBox_modal__carousel__item__caption}>
                  <div className={styles.howShopDropVideoBox_modal__top__icon}>
                    <GroupshopIcon />
                  </div>
                  <div className="pt-5">
                    <p>
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
            </Carousel.Item> */}
          </Carousel>
          <div className={styles.howShopDropVideoBox_modal__btnSection}>
            <Button
              variant="light"
              disabled={btnDisable}
              onClick={handleClose}
            >
              {btnDisable && spinner ? <Spinner animation="border" size="sm" /> : 'Get Started'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HowShopDropVideoBox;
