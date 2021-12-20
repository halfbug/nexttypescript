import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
// import Button from '../../Buttons/Button/Button';
import { Container, Row, Col } from 'react-bootstrap';
import styles from 'styles/Step0.module.scss';
import HeadLogo from 'assets/images/Logo.svg';
import Cart from 'assets/images/cart.svg';
import Face from 'assets/images/face.svg';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';
// import SideImg from 'assets/images/step0img.svg';
// import ConeEmoji from 'assets/images/Cone.svg';
// import BrandlogoBlack from 'assets/images/brandmark1.svg';
import Icon from 'assets/images/Cone.svg';
// import ProgressBar from '../ProgressBar/ProgressBar';

// console.log('🚀 ~ file: step0.tsx ~ line 8 ~ Cart', Cart);

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
          <Col md={4} className={styles.sideImg} />
          <Col md={8}>
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
              <Col>
                <h4>
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
                <p className="text-start">
                  <strong>TLDR - Fewer paid ads, more organic leads.</strong>
                </p>
              </Col>
            </Row>

            <Row className="mt-5 justify-content-center">
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
