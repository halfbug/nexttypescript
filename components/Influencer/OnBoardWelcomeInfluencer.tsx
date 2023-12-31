import Button from 'components/Buttons/Button/Button';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import styles from 'styles/OnBoardingFlowRegular.module.scss';
// import GroupshopIcon from 'assets/images/groupshop-icon.svg';
// import useLogo from 'hooks/useLogo';
import useAppContext from 'hooks/useAppContext';

// import images
import Cart from 'assets/images/cart.svg';
import Envp from 'assets/images/envelop.svg';
import GSLogo from 'assets/images/logosmall.svg';
import PuprpleHeadMobile2 from 'assets/images/purple-head-mobile2.jpg';

interface OBProps {
  show: boolean;
  handleClose(e: any): any;
  setshowps: any;
  setshowob1: any;
}

const OBWelcomeInfluencer = ({
  show, handleClose, setshowps, setshowob1,
}: OBProps) => {
  // const storeLogo = useLogo();
  const { gsctx, dispatch } = useAppContext();

  const handleNext = async () => {
    setshowob1(false);
    setshowps(true);
  };
  const isDesktop = useMediaQuery({
    query: '(min-width: 476px)',
  });
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
        dialogClassName={styles.welcome__modal}
        contentClassName={styles.welcome__modal__content}
      >
        <Modal.Header className={styles.welcome__modal__closebtnlg} />
        <div className={styles.welcome__modal__imgBox}>
          <img src={PuprpleHeadMobile2.src} alt="headtag" className="img-fluid" />
        </div>
        <Modal.Body className={styles.welcome__modal__body}>
          {!isDesktop && (
          <div className={styles.welcome__modal__body__top}>
            <img
              src={gsctx?.store?.logoImage}
              alt={gsctx?.store?.brandName}
              className={styles.welcome__modal__body__mainiconMobile}
            />

            <div className={styles.welcome__modal__body__top__vertical_seprator} />
            <div className={styles.welcome__modal__body__top__right}>
              <GSLogo />
            </div>
          </div>
          )}
          <h2 className={styles.welcome__modal__body__welcomeTxt}>
            Welcome to Microstore!
          </h2>
          {/* <h2 className={styles.welcome__modal__body__welcomeTxtMobile}>
            New to Microstore?
          </h2> */}
          {/* <div className={styles.welcome__modal__body__description}>
            The
            <strong> personalized store </strong>
            where you and your friends
            <strong> shop together </strong>
            and
            <strong> earn 100% cashback and discounts. </strong>
          </div> */}
          {/* <div className={styles.welcome__modal__body__descriptionMobile}>
            Here are the two ways you can earn rewards with
            {gsctx?.store?.brandName}
          </div> */}
          <div className={styles.welcome__modal__body__getStarted}>
            {/* 3 steps to get started */}
            How it works
          </div>
          <div className={styles.welcome__modal__body__box2influencer}>
            <span className={styles.welcome__modal__body__iconMobile}><Cart /></span>
            <p className={styles.welcome__modal__body__description}>
              <strong> Share </strong>
              your Microstore with friends & followers
              to give them access to
              <strong>
                {' '}
                up to
                {' '}
                {gsctx.discountCode.percentage}
                % off.
                {' '}
              </strong>
              <p className={[styles.welcome__modal__body__descriptionSmall,
                styles.welcome__modal__body__box2__p2, 'd-lg-block d-none'].join(' ')}
              >
                You can also shop these discounts yourself, we won’t judge.
              </p>
            </p>
          </div>
          <div className={styles.welcome__modal__body__box3influencer}>
            <span className={styles.welcome__modal__body__iconMobile}><Envp /></span>
            <p className={styles.welcome__modal__body__description}>
              <strong>
                {' '}
                Earn
                {' '}
                {gsctx.partnerCommission}
                {' '}
                of every order
              </strong>
              {' '}
              everytime someone shops. No limits, all cash.
            </p>
          </div>

          {/* <div className={styles.welcome__modal__body__boxMobile}>
            <div className={styles.welcome__modal__body__boxMobile__txt}>
              <div className={styles.welcome__modal__body__boxMobile__txt__icon}>🛒</div>
              <div>
                <strong> Shop </strong>
                {gsctx?.store?.brandName}
                {' '}
                - you and your firends get
                <strong>
                  {' '}
                  {gsctx.discountCode.percentage}
                  {' '}
                  % off
                  {' '}
                </strong>
                your order
              </div>
            </div>
          </div> */}
          {/* <div className={styles.welcome__modal__body__boxMobile}>
            <div className={styles.welcome__modal__body__boxMobile__txt}>
              <div className={styles.welcome__modal__body__boxMobile__txt__icon}>📩</div>
              <div>
                <strong> Share </strong>
                this group shop and
                <strong> earn 100% cashback </strong>
                on your order when friends shop
              </div>
            </div>
          </div> */}
        </Modal.Body>
        <hr className={styles.welcome__modal__body__horizontal_seprator} />
        <Modal.Body className={styles.welcome__modal__body}>
          <div className={[styles.welcome__modal__body__description, 'text-center w-100'].join(' ')}>

            Customize your Microstore now and share it when you’re done.
          </div>

          <div className="d-flex justify-content-center my-4">
            <Button
              className={[styles.welcome__modal__body__btn].join('')}
              onClick={handleNext}
            >
              Customize Microstore
            </Button>

            {/* <Button
              className={styles.welcome__modal__body__btnMobile}
              onClick={handleNext}
            >
              Customize Microstore
            </Button> */}
          </div>
          {/* <div className={styles.welcome__modal__body__btnskip}
          onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
            Skip for now
        </div> */}
          <div
            className={styles.welcome__modal__body__btnskipMobie}
            onClick={handleClose}
            onKeyDown={handleClose}
            role="button"
            tabIndex={0}
          >
            Skip to shop
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};
// OBWelcomeInfluencer.defaultProps = {
//   setShowRewards: () => {},
// };

export default OBWelcomeInfluencer;
