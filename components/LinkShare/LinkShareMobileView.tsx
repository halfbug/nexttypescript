import React, { useState } from 'react';
import styles from 'styles/LinkShareMobileView.module.scss';
import { Col, Modal, Row } from 'react-bootstrap';
import Cross from 'assets/images/cross.svg';
import CopyToClipboard from 'components/Buttons/CopyToClipboard/CopyToClipboard';
import { RootProps } from 'types/store';
import useDeal from 'hooks/useDeal';
import SocialButton from '../Buttons/SocialButton/SocialButton';

interface LinkShareMobileProps extends RootProps {
  show : boolean;
  handleClose(e:any): any;
  shareurl : string;
}

const LinkShareMobileView = ({ show, handleClose, shareurl }: LinkShareMobileProps) => {
  const { gsctx, banner } = useDeal();
  const { discountCode: { percentage } } = gsctx;
  const closeModal = (e: any) => {
    handleClose(e);
  };
  return (
    <>
      <div role="button" tabIndex={0}>onbaording share mobile</div>
      <Modal
        show={show}
        onHide={closeModal}
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
          <CopyToClipboard value={shareurl} />
          <div className={styles.linkShare__modal__body__social_icons}>
            <SocialButton network="Email" url={shareurl} />
            <SocialButton network="Instagram" url={shareurl} />
            <SocialButton network="Pinterest" url={shareurl} media={banner} />
            <SocialButton network="Twitter" url={shareurl} />
            <SocialButton network="Facebook" url={shareurl} />
          </div>
          <div className={styles.linkShare__modal__body__heading}>
            Give friends
            {' '}
            {percentage}
            % off
          </div>
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
