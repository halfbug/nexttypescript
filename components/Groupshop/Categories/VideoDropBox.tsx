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
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
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

const DropVideoBox = ({
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
            Hey
{' '}
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
              , welcome to Drops!
            </h3>
            {/* <div className={styles.howShopDropVideoBox_modal__top__howTxt}>
              Swipe through to learn how it works.
            </div> */}
          </div>
          <div className={styles.howShopDropVideoBox_modal__heading2}>
            <strong>SELECT</strong>
              {' '}
              ALL THE
              {' '}
              <br />
              CATEGORIES YOU
              {' '}
              <strong>lOVE</strong>
              ...
              <div className={['pb-4, text-capitalize, text-center', styles.howShopDropVideoBox_modal__heading2__howTxt2].join(' ')}>
                  DON'T WORRY, YOU CAN STILL ACCESS THE REST
              </div>
          </div>
          <div className={['bg-white, pb-10, px-10', styles.modalBg].join(' ')}>

<div className="px-3 py-4 text-center justify-center">
<Stack direction="horizontal" gap={3} className="flex flex-wrap mt-8 mb-3 text-center flex justify-content-center">
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Creams & Serums
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Eye Makeup
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Face Cleansers
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Foundation
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Nails
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Shampoo
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Lipstick
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Bath & Body
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Fitness
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Perfume
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Clean Beauty
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Cologne
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Anti-Ageing
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Curly Hair
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Conditioner
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Home
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Mists & Toners
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Makeup Tools
      </Badge>
      <Badge pill bg="light" text="dark" className={styles.badge}>
      Hair Treatments
      </Badge>
</Stack>

</div>
          <div className={[styles.howShopDropVideoBox_modal__btnSection2, ' '].join('')}>
            <Button
              variant="light"
              disabled={btnDisable}
              onClick={handleClose}
            >
              {btnDisable && spinner ? <Spinner animation="border" size="sm" /> : 'Get Started'}
            </Button>
            <br />
          </div>
          </div>
          <Button
            className="text-center text-white justify-center flex w-100 fs-3"
            variant=""
            disabled={btnDisable}
            onClick={handleClose}
          >
              {btnDisable && spinner ? <Spinner animation="border" size="sm" /> : 'Skip & Shop'}
          </Button>
        </div>

      </Modal>
    </>
  );
};

export default DropVideoBox;
