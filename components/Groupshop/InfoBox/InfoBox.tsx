/* eslint-disable no-unused-vars */
import InfoButton from 'components/Buttons/InfoButton/InfoButton';
import React, {
  useState,
} from 'react';
import {
  Modal, Col, Row, Container,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import styles from 'styles/Groupshop.module.scss';
import Cart from 'assets/images/cart.svg';
import Face from 'assets/images/face.svg';
import Envp from 'assets/images/envelop.svg';

// interface InfoBoxProps extends RootProps {
//   show : boolean;
//   handleClose(e:any): any;
//   // handleSearch(e:any): any;
// }

const InfoBox = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <InfoButton handleClick={handleShow} message="How does this work?" />
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        width={681}
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
      >
        <Modal.Header closeButton className="border-0" />
        <Modal.Body className="p-0">
          <Row className="styles.groupshop_infoBox_imgBox">
            <img src="/images/purple-head.png" alt="headtag" />
          </Row>
          <Row>
            <div className={styles.groupshop_infoBox}>
              <h2>
                Shopping together has never
                <br />
                been so rewarding.
              </h2>
            </div>
          </Row>
          <section className={styles.groupshop_infoBox}>
            <Row className="d-flex justify-content-center">
              <p>
                Welcome to Groupshop ‒ a personalized store where you
                and your friends shop together and
                {' '}
                <strong>earn real cashback and discounts.</strong>
              </p>
            </Row>
            <Row className={styles.groupshop_infoBox_tostart}>
              <h3>
                To start earning
              </h3>
            </Row>
            <Row className="my-2 d-flex justify-content-center">
              <Col xs={2} className="d-flex justify-content-end">
                <Cart />
              </Col>
              <Col xs={9}>
                <p className="text-start">
                  <strong> Shop</strong>
                  {' '}
                  limited-time offers from Insert Name Here and complete your order.
                </p>
              </Col>
            </Row>
            <Row className="my-2 d-flex justify-content-center">
              <Col xs={2} className="d-flex justify-content-end">
                {/* <img src={Face.src} alt="icon" /> */}
                <Envp />
              </Col>
              <Col xs={9}>
                <p className="text-start">
                  Share this Groupshop link with friends to give them access to
                  {' '}
                  <strong> exclusive discounts.</strong>
                </p>
              </Col>
            </Row>
            <Row className="my-2 d-flex justify-content-center">
              <Col xs={2} className="d-flex justify-content-end">
                <Face />
              </Col>
              <Col xs={9}>
                <p className="text-start">
                  <strong> Earn</strong>
                  {' '}
                  cashback* every time they shop, and keep unlocking additional rewards.
                </p>
              </Col>
            </Row>
            <Row>
              <h4 className="align-content-center text-center fw-bold ">
                {' '}
                The more friends shop, the more
                <br />
                rewards for everyone!

              </h4>
            </Row>
            <Row className="d-flex justify-content-center my-4">
              <Button className={styles.groupshop_infoBox_shoppingBtn}>Start Shopping</Button>
            </Row>
            <Row>
              <div className={styles.groupshop_infoBox_lastLine}>
                *Your cashback gets reimbursed
                automatically to the payment
                <br />
                method you used for your order.
              </div>
            </Row>
          </section>
        </Modal.Body>

      </Modal>
    </>
  );
};

// InfoBox.defaultProps = {
//   user: {},
// };

export default InfoBox;
