/* eslint-disable no-undef */
import React, { useState, useContext, useEffect } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Col, Modal, ProgressBar, Row,
} from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import Button from 'components/Buttons/Button/Button';
import GradientCircle from 'assets/images/gradient-circle.svg';
import ArrowDown from 'assets/images/arrow-down.svg';
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
        size="sm"
        dialogClassName={styles.groupshop_rewardBox_modal}
        backdrop="static"
        contentClassName={styles.groupshop_rewardBox_content}
      >
        <Row className={styles.groupshop__info_modal__closebtnlg}>
          <Modal.Header className="border-0" closeButton />
        </Row>
        <Modal.Header className={styles.groupshop__info_modal__closebtnsm}>
          <Row onClick={handleClose}><ArrowDown /></Row>
        </Modal.Header>
        <Modal.Body className="px-0 bg-white">
          <Row>
            <Col xs={12} sm={12} md={12} className={styles.groupshop_rewardBox_heading}>
              Next 2 shoppers get
            </Col>
            <Col xs={12} sm={12} md={12} className={styles.groupshop_rewardBox_state}>
              <span>Unlocked </span>
              <span>Current Rewards</span>
              <span>Locked</span>
            </Col>
            <Row className="m-0">
              <Col xs={12} sm={12} md={12} className={styles.groupshop_rewardBox_pointer_wrapper}>
                <div className={styles.groupshop_rewardBox_pointer}>
                  <span />
                </div>
                <div className={styles.groupshop_rewardBox_pointer}>
                  <span />
                </div>
                <div className={styles.groupshop_rewardBox_pointer}>
                  <span />
                </div>
              </Col>
              <div className={styles.groupshop_rewardBox_bar}>
                <span />
              </div>
            </Row>
            <Col xs={12} sm={12} md={12} className={[styles.groupshop_rewardBox_reward, 'mt-2'].join(' ')}>
              <p>
                10%
                <span> off +</span>
                {' '}
              </p>
              <p>
                10%
                <span> off +</span>
                {' '}
              </p>
              <p>
                10%
                <span> off +</span>
                {' '}
              </p>
            </Col>
            <Col xs={12} sm={12} md={12} className={[styles.groupshop_rewardBox_reward, 'mb-3'].join(' ')}>
              <p>
                $23%
                <span> cashback</span>
                {' '}
              </p>
              <p>
                $53
                <span> cashback</span>
                {' '}
              </p>
              <p>
                $83
                <span> cashback</span>
                {' '}
              </p>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={12} sm={12} md={12} className={styles.groupshop_rewardBox_heading}>
              SHOPPING WITH
            </Col>
            <Col xs={12} className="d-flex justify-content-center mt-4">
              <Members names={['Elisa C.a', 'Neil D.', 'Paul B.']} cashback={['$23', '$20']} />
            </Col>
            <Col xs={12} className="d-flex justify-content-center mt-2">
              <Members names={['Maddy S.']} cashback={['$23', '$20']} />
              <ShareButton
                placement="bottom"
                shareurl=""
                label="Invite"
                className={styles.groupshop_rewardBox_invite}
                icon={<Plus size={18} className="me-0 pe-0" />}
                onClick={() => { }}
              />
            </Col>
            <Col xs={12} className="d-flex justify-content-center align-items-center mt-5">
              <Button className="align-self-center fs-4 my-2 px-5" onClick={() => {}}>How it Works</Button>
              <ShareButton
                placement="auto"
                shareurl=""
                className={styles.groupshop_rewardBox_inviteArrow}
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

// ProductDetail.defaultProps = {
//   user: {},
// };

export default RewardBox;
