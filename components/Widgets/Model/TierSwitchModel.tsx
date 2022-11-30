import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styles from 'styles/Campaign.module.scss';
import { partnerTierInfo } from 'types/store';

interface TierSwitchModelProps {
    show : boolean;
    handleClose(e:any): any;
    handleShow(e:any): any;
    handleToggle: () => void;
    id: string;
    partnerInfo: partnerTierInfo | undefined;
  }

export default function TierSwitchModel({
  handleToggle, handleShow, handleClose, show, id, partnerInfo,
}: TierSwitchModelProps) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        // backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName={styles.campaignDeactivate_modal}
        contentClassName={styles.campaignDeactivate_modal__content}
      >
        <Modal.Header className="border-bottom-0" closeButton />
        <Modal.Body className={styles.campaignDeactivate_modal__body}>
          <h2>
            You are switching to Tier
            {' '}
            {partnerInfo?.tierName ?? ''}
            {' '}
            👀
          </h2>
          <div className={styles.campaignDeactivate_modal__body__info}>
            {/* <span>
              xxxxxxxxxx.
            </span>
            <br /> */}
            <br />
            <span className={styles.campaignDeactivate_modal_modeltext_normal}>
              Add upto
              {' '}
              {partnerInfo?.tierLimit ?? ''}
              {' '}
              partner accounts for just $
              {partnerInfo?.tierCharges ?? ''}
              /month
            </span>
          </div>
          <div className={styles.campaignDeactivate_modal__btnSection}>
            <Button
              className={styles.campaignDeactivate_modal__whiteBtn}
              onClick={handleToggle}
            >
              Proceed
            </Button>
            <Button
              className={styles.campaignDeactivate_modal__purpleBtn}
              onClick={handleClose}
              variant="primary"
            >
              Go Back
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
