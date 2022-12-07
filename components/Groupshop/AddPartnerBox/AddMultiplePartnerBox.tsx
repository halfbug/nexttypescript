/* eslint-disable no-undef */
import React from 'react';
import styles from 'styles/Partner.module.scss';
import { RootProps } from 'types/store';
import {
  Col, Form, Modal, Row,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';

interface AddMultiplePartnerBoxProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;
}

const AddMultiplePartnerBox = ({
  show = false, handleClose,
}: AddMultiplePartnerBoxProps) => {
  const closeModal = (e: any) => {
    handleClose(e);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        size="lg"
        centered
        dialogClassName={styles.partner_addMultiplePartner_modal}
        contentClassName={styles.partner_addMultiplePartner_modal__content}
      >
        <Modal.Header className={styles.partner_addMultiplePartner_modal__closebtnlg}>
          <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className={styles.partner_addMultiplePartner_modal__body}>
          <Row>
            <Col lg={12}>
              <div className={styles.partner_addMultiplePartner_modal__top}>
                <h4 className="fw-500">
                  Add multiple partners
                </h4>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Enter each email address seperated by a comma as follows
                  hi@gmail.com,example@gmail.com"
                  className={[styles.partner_addMultiplePartner_modal__textarea, 'p-3'].join(' ')}
                />
                <div className={styles.partner_addMultiplePartner_modal__btnSection}>
                  <WhiteButton onClick={handleClose} className="border-dark bg-white fw-500 mb-2">
                    Done
                  </WhiteButton>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
AddMultiplePartnerBox.defaultProps = {
};

export default AddMultiplePartnerBox;
