import Button from 'components/Buttons/Button/Button';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from 'styles/OnBoardingFlowRegular.module.scss';
import LeEsableIcon from 'assets/images/lesable.svg';
import GroupshopIcon from 'assets/images/groupshop-icon.svg';

const OnBoardShareMobile = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div onClick={handleShow} onKeyDown={handleShow} role="button" tabIndex={0}>onbaording share mobile</div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName={styles.share__modal}
        contentClassName={styles.share__modal__content}
      >
        <Modal.Body className={styles.share__modal__body}>
          <div className={styles.share__modal__body__mainiconarea}>
            <LeEsableIcon />
            <div className={styles.share__modal__body__mainiconarea__vertical_seprator} />
            <GroupshopIcon className={styles.share__modal__body__mainiconarea__icon} />
          </div>
          <h2>
            Shop, share, earn
          </h2>
          <div className={styles.share__modal__body__description}>
            You’ve customized your Groupshop! Now explore your store,
            <strong> invite your friends </strong>
            to give them access to exclusive discounts, and start earning when they shop.
          </div>

          <div className="d-flex justify-content-center my-4">
            <Button
              className={styles.share__modal__body__btn}
              onClick={handleClose}
            >
              Start Earning
            </Button>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default OnBoardShareMobile;
