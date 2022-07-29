import Button from 'components/Buttons/Button/Button';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from 'styles/OnBoardingFlow.module.scss';
import LeEsableIcon from 'assets/images/lesable.svg';

const OnBoardingWelcome = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div onClick={handleShow} onKeyDown={handleShow} role="button" tabIndex={0}>ON-BOARDING FLOW - INFLUENCER</div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
        dialogClassName={styles.welcome__modal}
        contentClassName={styles.welcome__modal__content}
      >
        <Modal.Header className={styles.welcome__modal__closebtnlg} />
        <div className="styles.welcome__modal__imgBox">
          <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />
        </div>
        <Modal.Body className={styles.welcome__modal__body}>
          <LeEsableIcon />
          <h2>
            Welcome to Groupshop!
          </h2>
          <div className={styles.welcome__modal__body__description}>
            Think of your Groupshop as a
            <strong> personalized store </strong>
            where you
            <strong> share your favorite products </strong>
            from Le Sablé with friends and followers.
          </div>
          <div className={styles.welcome__modal__body__box1__content}>🛒   📩   🤑</div>
          <div className={styles.welcome__modal__body__sharingTxt}>
            3 steps to get started
          </div>
          <div className={styles.welcome__modal__body__box1}>
            <p className={styles.welcome__modal__body__description}>
              <strong>Customize </strong>
              your Groupshop by curating your favorite Le Sablé products.
            </p>
          </div>
          <div className={styles.welcome__modal__body__box2}>
            <p className={styles.welcome__modal__body__description}>
              <strong>Share </strong>
              your Groupshop with friends and followers to give them access to
              <strong> up to 40% off. </strong>
            </p>
            <p className={styles.welcome__modal__body__box2__p2}>
              You can also shop these discounts yourself, we won’t judge.
            </p>
          </div>
          <div className={styles.welcome__modal__body__box3}>
            <p className={styles.welcome__modal__body__description}>
              <strong>Earn 10% of every order </strong>
              everytime someone shops. No limits.
            </p>
          </div>
          <div className={styles.welcome__modal__body__description}>
            Customize your Groupshop now and share it when you’re done.
          </div>

          <div className="d-flex justify-content-center my-4">
            <Button
              className={styles.welcome__modal__body__btn}
              onClick={handleClose}
            >
              Get Started
            </Button>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default OnBoardingWelcome;
