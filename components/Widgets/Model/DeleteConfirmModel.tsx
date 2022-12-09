import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styles from 'styles/Campaign.module.scss';

interface DeleteConfirmModelProps {
    deleteStatus : boolean;
    handleClose(e:any): any;
    handleProcess(e:any): any;
  }

export default function DeleteConfirmModel({
  handleProcess, handleClose, deleteStatus,
}: DeleteConfirmModelProps) {
  return (
    <>
      <Modal
        show={deleteStatus}
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
            Confirmation
          </h2>
          <div className={styles.campaignDeactivate_modal__body__info}>
            <span>
              Are you sure you want to deactivate this channel? 👀
            </span>
            <br />
          </div>
          <div className={styles.campaignDeactivate_modal__btnSection}>
            <Button
              className={styles.campaignDeactivate_modal__whiteBtn}
              onClick={handleProcess}
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
