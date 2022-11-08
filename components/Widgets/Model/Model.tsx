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
        contentClassName={styles.campaignDeactivate_modal_content}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure? 👀 </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>
            If you turn off this campaign, your Post-Purchase Groupshop will
            become inactive.
          </strong>
          <br />
          <br />
          Meant to switch to a different campaign instead?
          Simply toggle an existing campaign on or create a new one.
          {' '}
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
