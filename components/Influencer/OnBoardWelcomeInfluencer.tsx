import Button from 'components/Buttons/Button/Button';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from 'styles/OnBoardingFlowRegular.module.scss';
// import GroupshopIcon from 'assets/images/groupshop-icon.svg';
// import useLogo from 'hooks/useLogo';
import useAppContext from 'hooks/useAppContext';

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
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        dialogClassName={styles.welcome__modal}
        contentClassName={styles.welcome__modal__content}
      >
        <Modal.Header className={styles.welcome__modal__closebtnlg} />
        <div className={styles.welcome__modal__imgBox}>
          <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />
        </div>
        <Modal.Body className={styles.welcome__modal__body}>
          <h2 className={styles.welcome__modal__body__welcomeTxt}>
            Welcome to Groupshop!
          </h2>
          <h2 className={styles.welcome__modal__body__welcomeTxtMobile}>
            Welcome to Groupshop!
          </h2>
          {/* <div className={styles.welcome__modal__body__description}>
            The
            <strong> personalized store </strong>
            where you and your friends
            <strong> shop together </strong>
            and
            <strong> earn 100% cashback and discounts. </strong>
          </div> */}
          <div className={styles.welcome__modal__body__descriptionMobile}>
            The
            <strong> personalized store</strong>
            where you and your friends
            <strong>shop together </strong>
            and
            <strong>earn real cashback and discounts.</strong>
            {/* {' '}
            {gsctx.store?.brandName}
            : */}
          </div>
          <div className={styles.welcome__modal__body__getStarted}>
            {/* 3 steps to get started */}
            How it works
          </div>
          <div className={styles.welcome__modal__body__box2}>
            <p className={styles.welcome__modal__body__description}>
              <strong> Share </strong>
              your Groupshop with friends and followers
              <br />
              to give them access to
              <strong>
                {' '}
                up to
                {' '}
                {gsctx.discountCode.percentage}
                % off.
                {' '}
              </strong>
            </p>
            <p className={[styles.welcome__modal__body__descriptionSmall, styles.welcome__modal__body__box2__p2].join(' ')}>
              You can also shop these discounts yourself, we won’t judge.
            </p>
          </div>
          <div className={styles.welcome__modal__body__box3}>
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
              everytime someone
              <br />
              shops. No limits, all cash.
            </p>
          </div>

          <div className={styles.welcome__modal__body__boxMobile}>
            <p className={styles.welcome__modal__body__boxMobile__txt}>
              {/* <div className={styles.welcome__modal__body__boxMobile__txt__icon}>🛒</div> */}
              <div>
                Using Groupshop, you can
                {' '}
                <strong>earn up to 100% cashback </strong>
                on your recent
                {' '}
                {gsctx.store?.brandName}
                {' '}
                order.
              </div>
            </p>
          </div>
        </Modal.Body>
        <hr className={styles.welcome__modal__body__horizontal_seprator} />
        <Modal.Body className={styles.welcome__modal__body}>
          <div className={[styles.welcome__modal__body__description, styles.welcome__modal__body__w50].join(' ')}>
            <div className={styles.welcome__modal__body__description2}>
              Customize your Groupshop now and share it when you’re done!
            </div>
          </div>

          <div className="d-flex justify-content-center my-4">
            <Button
              className={[styles.welcome__modal__body__btn].join('')}
              onClick={handleNext}
            >
              Customize Groupshop
            </Button>

            <Button
              className={styles.welcome__modal__body__btnMobile}
              onClick={handleNext}
            >
              Customize Groupshop
            </Button>
          </div>
          {/* <div className={styles.welcome__modal__body__btnskip}
          onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
            Skip for now
          </div>
          <div className={styles.welcome__modal__body__btnskipMobie}
          onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
            Skip to shop
          </div> */}
        </Modal.Body>

      </Modal>
    </>
  );
};
// OBWelcomeInfluencer.defaultProps = {
//   setShowRewards: () => {},
// };

export default OBWelcomeInfluencer;