import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';

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
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If you turn off this campaign, your Groupshop will become inactive.

          Meant to switch to a different campaign instead?
          Simply toggle an existing campaign on or create a new one.
          {' '}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggle}>
            Proceed
          </Button>
          <Button variant="primary" onClick={handleClose}>Go Back</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
