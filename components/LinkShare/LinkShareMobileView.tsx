import React, { useState } from 'react';
import styles from 'styles/LinkShareMobileView.module.scss';
import { Col, Modal, Row } from 'react-bootstrap';
import Cross from 'assets/images/cross.svg';
import CopyToClipboard from 'components/Buttons/CopyToClipboard/CopyToClipboard';
import SocialButton from '../Buttons/SocialButton/SocialButton';

const LinkShareMobileView = () => {
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
        dialogClassName={styles.linkShare__modal}
        contentClassName={styles.linkShare__modal__content}
      >
        <Modal.Header className={styles.linkShare__modal__closebtnlg}>
          <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className={styles.linkShare__modal__body}>
          <CopyToClipboard value="www.inh.groupshop.com/inh..." />
          <div className={styles.linkShare__modal__body__social_icons}>
            <SocialButton network="Email" url="" />
            <SocialButton network="Instagram" url="" />
            <SocialButton network="Pinterest" url="" />
            <SocialButton network="Twitter" url="" />
            <SocialButton network="Facebook" url="" />
          </div>
          <div className={styles.linkShare__modal__body__heading}>Give friends 15% off</div>
          <div className={styles.linkShare__modal__body__description}>
            Share the link to give friends access to exclusive discounts and earn cashback
            everytime they shop with you.
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default LinkShareMobileView;
