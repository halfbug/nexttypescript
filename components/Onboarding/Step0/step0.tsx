import React from 'react';
import Dialogue from 'components/Layout/Dialogue2/dialogue';
// import Button from '../../Buttons/Button/Button';
import { Container, Row, Col } from 'react-bootstrap';
import styles from 'styles/Step0.module.scss';
import HeadLogo from 'assets/images/s1-logo.svg';
import Brand1 from 'assets/images/brandmark1.png';
import Cart from 'assets/images/cart.svg';
import Face from 'assets/images/face.svg';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';
import Icon from 'assets/images/Cone.svg';

interface IStep0Props {
  show: boolean,
}

const Step0 = ({ show }: IStep0Props) => {
  const [, setParams] = useQueryString();

  return (
    <Dialogue show={show}>
      {/* <ProgressBar progress="100" /> */}
      <Container fluid className={[styles.welcome].join('')}>
        <Row>
          <Col lg={5} className={styles.sideImg} />
          <Col lg={7} className="d-flex justify-content-center">
            <Container fluid className="mt-4">
              <div>
                <Row className={[styles.welcome_taghead, 'pe-0 me-0'].join('')}>
                  <Col className="d-flex justify-content-end pe-0 me-0">
                    <img src={Brand1.src} alt="Brand1" />
                  </Col>
                </Row>
              </div>
              <section className="mx-4">
                <Col className=" my-5">
                  <h3 className="text-center mb-4">Welcome to</h3>
                  <HeadLogo />
                </Col>
                <Row className="mb-1">
                  <Col>
                    <h4 className="">We know that nothing beats a recommendation.</h4>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col>
                    <h4 className="">
                      Groupshop makes shopping & sharing a breeze
                      {' '}
                      <br />
                      with rewards that get your customers excited.
                    </h4>
                  </Col>
                </Row>
                {/* <Row className="mt-3 mx-5">
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
                </Row> */}
                <Row className="mt-4 justify-content-center">
                  {/* <Col xs={3} md={4}> </Col> */}
                  <Col xs={6} md={4} className="mt-3 mx-2 d-flex justify-content-center ">
                    <Button className="px-4" onClick={() => setParams({ ins: 1 })}>Get Started</Button>
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
