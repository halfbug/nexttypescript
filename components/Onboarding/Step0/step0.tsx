import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
// import Button from '../../Buttons/Button/Button';
import { Container, Row, Col } from 'react-bootstrap';
import styles from 'styles/Step0.module.scss';
import HeadLogo from 'assets/images/Logo.svg';
import Cart from 'assets/images/cart.svg';
import Face from 'assets/images/face.svg';
import Button from 'components/Buttons/Button/Button';

// console.log('🚀 ~ file: step0.tsx ~ line 8 ~ Cart', Cart);

interface IStep0Props {
  show: boolean,
}

const Step0 = ({ show }:IStep0Props) => (
  <Dialogue show={show}>
    {/* <div className={styles.WelcomeModal}> */}
    <Container className={styles.welcome}>
      <Row className="my-4">
        <Col>
          <h3 className="font-weight-bold">Welcome to</h3>
          <HeadLogo />
        </Col>
      </Row>
      <Row className="my-3">

        <Col>
          <h4>We know that nothing beats a friend’s recommendation.</h4>
        </Col>

      </Row>
      <Row className="justify-content-center">
        <Col xs={2}> </Col>
        <Col xs={8}>
          <h4>
            Groupshop makes shopping together
            a breeze with rewards that get your customers excited.
          </h4>
        </Col>
        <Col xs={2}> </Col>
      </Row>
      <Row className="mt-3 mx-5">
        <Col xs={1}> </Col>
        <Col xs={2} className="mx-2">
          <Cart />
        </Col>
        <Col xs={7}>
          <p className="text-start">
            When your customers
            {' '}
            <strong>shop</strong>
            {' '}
            from your store, we create
            a dedicated Groupshop page for them to
            {' '}
            <strong>share</strong>
            {' '}
            with
            friends.
          </p>
        </Col>
        <Col xs={2}> </Col>
      </Row>
      <Row className="mt-3 mx-5">
        <Col xs={1}> </Col>
        <Col xs={2} className="mx-2">
          {/* <img src={Face.src} alt="icon" /> */}
          <Face />
        </Col>
        <Col xs={7}>
          <p className="text-start">
            Friends get a special discount and your customers
            <strong> earn </strong>
            real cashback every time someone shops with
            them.
          </p>
        </Col>
        <Col xs={2}> </Col>
      </Row>
      <Row className="m-2">
        <Col xs={3} md={4}> </Col>
        <Col xs={6} md={4} className="mx-2">
          <p className="fw-bold m-0 fs-5">FEWER PAID ADS,</p>
          <hr className="brand--gradiant mx-4" />
        </Col>
        <Col xs={3} md={4}> </Col>
      </Row>
      <Row>
        <Col xs={3} md={4}> </Col>
        <Col xs={6} md={4} className="mx-2">
          <p className="fw-bold m-0 fs-5">
            MORE ORGANIC LEADS
          </p>
          <hr className="brand--gradiant mx-2" />
        </Col>
        <Col xs={3} md={4}> </Col>
      </Row>
      <Row className="m-5 justify-content-center">
        {/* <Col xs={3} md={4}> </Col> */}
        <Col xs={6} md={4} className="mx-2 d-flex justify-content-center ">
          <Button>GET STARTED</Button>
        </Col>
        {/* <Col xs={3} md={4}>&nbsp; </Col> */}
      </Row>
    </Container>
    {/* </div> */}
  </Dialogue>
);

export default Step0;
