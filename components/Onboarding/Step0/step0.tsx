import React from 'react';
import Dialogue from 'components/Layout/Dialogue2/dialogue';
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
      <Container fluid className={styles.welcome}>
        <Row>
          <Col lg={5} className={styles.sideImg} />
          <Col lg={7} d-flex justify-content-center>
            <Container fluid className="mt-4">
              <Row>
                <Row className={styles.welcome_taghead}>
                  <Col lg={6} className="me-4 mt-5">
                    <h3 className="text-center pr-4">Welcome to</h3>
                    <HeadLogo />
                  </Col>
                  <Col lg={2}>
                    <img src={Brand1.src} alt="Brand1" />
                  </Col>
                </Row>
              </Row>
              <section className="mx-4">
                <Row className="mb-1  mx-3 ">
                  <Col>
                    <h4 className="">We know that nothing beats a friend’s recommendation.</h4>
                  </Col>
                </Row>
                <Row className="justify-content-center mx-3">
                  <Col>
                    <h4 className="">
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
                    <Face />
                  </Col>
                  <Col xs={9}>
                    <p className="text-start">
                      Friends get a
                      {' '}
                      <strong> special discount </strong>
                      and your customers
                      <strong> earn real cashback </strong>
                      every time someone shops with
                      them.
                    </p>
                  </Col>
                </Row>
                <Row className={[styles.rect_box, 'mt-3 mx-5'].join(' ')}>
                  <Col xs={2} className="mx-2">
                    <Icon />
                  </Col>
                  <Col xs={9} className="mt-3">
                    <p className="text-start">
                      <b>TLDR - Fewer paid ads, more organic leads.</b>
                    </p>
                  </Col>
                </Row>
                <Row className="mt-4 justify-content-center">
                  {/* <Col xs={3} md={4}> </Col> */}
                  <Col xs={6} md={4} className="mx-2 d-flex justify-content-center ">
                    <Button onClick={() => setParams({ ins: 1 })}>Get Started</Button>
                  </Col>
                  {/* <Col xs={3} md={4}>&nbsp; </Col> */}
                </Row>
              </section>
            </Container>
          </Col>
        </Row>
      </Container>
    </Dialogue>
  );
};

export default Step0;
