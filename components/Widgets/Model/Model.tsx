import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styles from 'styles/Campaign.module.scss';

interface ModelProps {
    show : boolean;
    handleClose(e:any): any;
    handleShow(e:any): any;
    handleToggle: () => void;
    id: string;
  }

export default function Model({
  handleToggle, handleShow, handleClose, show, id,
}: ModelProps) {
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
            Are you sure? 👀
          </h2>
          <div className={styles.campaignDeactivate_modal__body__info}>
            <span>
              If you turn off this campaign, your Post-Purchase Groupshop will
              become inactive.
            </span>
            <br />
            <br />
            <span className={styles.campaignDeactivate_modal_modeltext_normal}>
              Meant to switch to a different campaign instead?
              Simply toggle an existing campaign on or
              {' '}
              <span className={styles.campaignDeactivate_modal_italic}>create a new one.</span>
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
