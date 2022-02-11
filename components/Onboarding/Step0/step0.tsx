import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
// import Button from '../../Buttons/Button/Button';
import { Container, Row, Col } from 'react-bootstrap';
import styles from 'styles/Step0.module.scss';
import HeadLogo from 'assets/images/Logo.svg';
import Brand1 from 'assets/images/brandmark1.png';
import Cart from 'assets/images/cart.svg';
import Face from 'assets/images/face.svg';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';
import Icon from 'assets/images/Cone.svg';
import OB1head from 'assets/images/OB1 Head.svg';

interface IStep0Props {
  show: boolean,
}

const Step0 = ({ show }: IStep0Props) => {
  const [, setParams] = useQueryString();

  return (
    <Dialogue show={show}>
      {/* <ProgressBar progress="100" /> */}
      <Container className={styles.welcome}>
        <Row>
          <Col lg={5} className={styles.sideImg} />
          <Col lg={7} d-flex justify-content-center mx-3>
            <Row>
              <Col className="justify-content-center align-items-center">
                {/* <Row className="mx-2 mt-3">
                  <Col lg={6} className="m-4 mt-3">
                    <h3 className="font-weight-bold">Welcome to</h3>
                    <HeadLogo />
                  </Col>
                  <Col lg={3}>
                    <img src={Brand1.src} alt="Brand1" />
                  </Col>
                </Row> */}
                <OB1head />
              </Col>
            </Row>
            <Row className="my-3  mx-3 ">

              <Col>
                <h4 className="fw-bold">We know that nothing beats a friend’s recommendation.</h4>
              </Col>

            </Row>
            <Row className="justify-content-center mx-3">
              <Col>
                <h4 className="fw-bold">
                  Groupshop makes shopping together
                  a breeze with rewards that get your customers excited.
                </h4>
              </Col>
            </Row>
            <Row className="mt-3 mx-5">
              <Col xs={2} className="mx-2">
                <Cart />
              </Col>
              <Col xs={9}>
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
            </Row>
            <Row className="mt-3 mx-5">
              <Col xs={2} className="mx-2">
                {/* <img src={Face.src} alt="icon" /> */}
                <Face />
              </Col>
              <Col xs={9}>
                <p className="text-start">
                  Friends get a special discount and your customers
                  <strong> earn </strong>
                  real cashback every time someone shops with
                  them.
                </p>
              </Col>
            </Row>
            <Row className={[styles.rect_box, 'mt-3 mx-5'].join(' ')}>
              <Col xs={2} className="mx-2">
                <Icon />
              </Col>
              <Col xs={9}>
                <p className="text-start fw-bold">
                  <b>TLDR - Fewer paid ads, more organic leads.</b>
                </p>
              </Col>
            </Row>
            <Row className="mt-4 justify-content-center">
              {/* <Col xs={3} md={4}> </Col> */}
              <Col xs={6} md={4} className="mx-2 d-flex justify-content-center ">
                <Button onClick={() => setParams({ ins: 1 })}>GET STARTED</Button>
              </Col>
              {/* <Col xs={3} md={4}>&nbsp; </Col> */}
            </Row>
          </Col>
        </Row>
      </Container>
    </Dialogue>
  );
};

export default Step0;
