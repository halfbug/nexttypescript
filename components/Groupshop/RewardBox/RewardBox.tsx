/* eslint-disable no-undef */
import React, { useState, useContext, useEffect } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Col, Modal, Row,
} from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import Button from 'components/Buttons/Button/Button';
import Members from '../Members/Members';

interface RewardBoxProps extends RootProps {
    show: boolean;
    handleClose(e: any): any;
    // addToCart(e: any): any;
}

const RewardBox = ({
  show = false, handleClose,
}: RewardBoxProps) => {
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        centered
        size="lg"
        dialogClassName={styles.groupshop_modal_detail}
        backdrop="static"
        fullscreen="lg-down"
        contentClassName={styles.groupshop_modal_content}
      >
        <Modal.Header closeButton className="pb-0 bg-white" />
        <Modal.Body className="px-5 bg-white">
          <Row>
            <Col xs={12} sm={12} md={12} className="d-flex justify-content-center mt-2">
              Next 2 shoppers get
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={12} sm={12} md={12} className="d-flex justify-content-center mt-2">
              SHOPPING WITH
            </Col>
            <Col xs={12} className="d-flex justify-content-center mt-2">
              <Members names={['Elisa C.a', 'Neil D.', 'Paul B.', 'Maddy S.']} cashback={['$23', '$20']} />
              <ShareButton
                placement="bottom"
                shareurl=""
                label="Invite"
                className={styles.groupshop__top_invite}
                icon={<Plus size={18} className="me-0 pe-0" />}
                onClick={() => {}}
              />
            </Col>
            <Col xs={12} className="d-flex justify-content-center align-items-center mt-5">
              <Button className="align-self-center fs-4 my-2 px-5" onClick={() => {}}>How it Works</Button>
              <ShareButton placement="auto" shareurl="" className="px-2 rounded-pill bg-white" />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
};

// ProductDetail.defaultProps = {
//   user: {},
// };

export default RewardBox;
