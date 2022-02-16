/* eslint-disable no-unused-vars */
import InfoButton from 'components/Buttons/InfoButton/InfoButton';
import React, {
  useState,
} from 'react';
import {
  Modal, Col, Row,
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
        className={styles.groupshop_modal_info}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Row className="styles.groupshop_imgBox">
            <img src="/images/purple-head.png" alt="headtag" width={783} height={40} />
          </Row>
          <Row>
            <div className="d-block justify-content-center align-content-center">
              <Row>
                <div className="justify-content-center align-content-center mt-3 mb-2">
                  <h3 className="align-content-center text-center fw-bolder lh-base">
                    Shopping together has never
                    <br />
                    been so rewarding
                  </h3>

                </div>
              </Row>
            </div>
          </Row>
          <Row className="styles.groupshop_search_modelCenter">
            <Row className="d-flex justify-content-center align-content-center">
              <Row className="my-2  mx-3 ">

                <Col>
                  <h4 className="align-content-center text-center">
                    Welcome to Groupshop ‒ a personalized store where you
                    and your friends shop together and
                    {' '}
                    <span className="fw-bold">earn real cashback and discounts.</span>
                  </h4>
                </Col>

              </Row>
              <Row className=" justify-content-center align-content-center">
                <Col className={styles.groupshop_tostart}>
                  <h4 className="fw-bold align-content-center text-center">
                    To start earning
                  </h4>
                </Col>
              </Row>
              <Row className="mt-3 justify-content-center align-content-center">
                <Col xs={2} className="mx-2">
                  <Cart />
                </Col>
                <Col xs={9}>
                  <h4 className="text-start">
                    <strong> Shop</strong>
                    {' '}
                    limited-time offers from Insert Name Here and complete your order.
                  </h4>
                </Col>
              </Row>
              <Row className="mt-3 justify-content-center align-content-center">
                <Col xs={2} className="mx-2">
                  {/* <img src={Face.src} alt="icon" /> */}
                  <Envp />
                </Col>
                <Col xs={9}>
                  <h4 className="text-start">
                    Share this Groupshop link with friends to give them access to
                    {' '}
                    <strong> exclusive discounts.</strong>
                  </h4>
                </Col>
              </Row>
              <Row className="mt-3 justify-content-center align-content-center">
                <Col xs={2} className="mx-2">
                  <Face />
                </Col>
                <Col xs={9}>
                  <h4 className="text-start fw-bold">
                    <strong> Earn cashback*</strong>
                    {' '}
                    every time they shop, and keep unlocking additional rewards.
                  </h4>
                </Col>
              </Row>
              <Row>
                <h4 className="align-content-center text-center fw-bold mt-3 "> The more friends shop, the more rewards for everyone!</h4>
              </Row>
              <Row className="mt-2 mb-4 justify-content-center">
                <Col xs={6} md={4} className="mx-2 d-flex justify-content-center ">
                  <Button>Start Shopping</Button>
                </Col>
              </Row>
              <Row>
                <p className="align-content-center text-center">
                  *Your cashback gets reimbursed
                  automatically to the payment method you used for your order.
                </p>

              </Row>
            </Row>
          </Row>
        </Modal.Body>

      </Modal>
    </>
  );
};

// InfoBox.defaultProps = {
//   user: {},
// };

export default InfoBox;
