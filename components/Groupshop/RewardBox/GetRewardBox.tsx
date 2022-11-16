import React from 'react';
import styles from 'styles/Modal.module.scss';
import { RootProps } from 'types/store';
import {
  Button,
  Col, Form, Modal, Row,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import LeEsableIcon from 'assets/images/lesable.svg';
import ArrowDown from 'assets/images/arrow-down.svg';
import useGtm from 'hooks/useGtm';
import { useMediaQuery } from 'react-responsive';
import useDeal from 'hooks/useDeal';

interface GetRewardBoxProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;

}

const GetRewardBox = ({
  show = false, handleClose,
}: GetRewardBoxProps) => {
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };
  const { googleEventCode } = useGtm();
  const isDesktop = useMediaQuery({
    query: '(min-width: 476px)',
  });

  const {
    isExpired,
  } = useDeal();

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        size="lg"
        centered
        dialogClassName={styles.getRewardBox_modal}
        contentClassName={styles.getRewardBox_modal__content}
      >
        <Modal.Header className={styles.getRewardBox_modal__closebtnlg}>
          <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Header className={styles.getRewardBox_modal__closebtnsm}>
          <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className={styles.getRewardBox_modal__body}>
          <Row>
            <Col lg={12} className="px-0">
              <div className={styles.getRewardBox_modal__top}>
                <div className={styles.getRewardBox_modal__top__icon}>
                  <LeEsableIcon />
                </div>
                <h2>
                  Get Access to 20% Off
                  <br />
                  + unlimited rewards
                </h2>
                <span>
                  Join Jelcie’s Groupshop rewards and get immediate access to
                  exclusive discounts and a personalized store with your favorite
                  products to share with friends!
                </span>
              </div>
            </Col>
          </Row>
          <Row className={styles.getRewardBox_modal__form}>
            <Col sm={6} md={6} lg={6}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter First Name"
                name="firstName"
              />
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter Last Name"
                name="lastName"
              />
            </Col>
            <Col lg={12}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                name="email"
              />
            </Col>
            <Col lg={12} className="pt-1">
              <Form.Label>Phone Number (Optional)</Form.Label>
              <Row>
                <Col md={12} lg={6}>
                  <Form.Control
                    type="input"
                    placeholder="+1  |"
                    name="phoneNumber"
                  />
                </Col>
                <Col md={12} lg={6}>
                  <p className={styles.getRewardBox_modal__form__agree}>
                    By filling this box, you agree to receive recurring
                    personalized marketing text messages from
                    Groupshop and Jelcie at the cell number entered below.
                    Msg & data rates may apply.
                  </p>
                </Col>
              </Row>
            </Col>
            {/* <Col md={12} lg={6}>
              <span className={styles.getRewardBox_modal__form__agree}>
                By filling this box, you agree to receive recurring
                personalized marketing text messages from
                Groupshop and Jelcie at the cell number entered below.
                Msg & data rates may apply.
              </span>
            </Col> */}
          </Row>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className={styles.getRewardBox_modal__btnSection}>
                <Button variant="dark" onClick={handleClose}>
                  Get Rewards
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GetRewardBox;
