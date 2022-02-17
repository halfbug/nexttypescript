/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import footerLogo from 'public/images/groupshoplogo.png';
import footerLogo1 from 'public/images/logo-thin.png';
import SocialButton from 'components/Buttons/SocialButton/SocialButton';
import styles from 'styles/Groupshop.module.scss';

import {
  Col, Row, Button, FormControl, InputGroup, Container,
} from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';

interface FooterProps {
  LeftComp: React.ReactNode;
  RightComp: React.ReactNode;
}
const Footer = ({
  LeftComp, RightComp,
}: FooterProps) => (

  <Container fluid className={styles.groupshop_footer}>
    <hr />
    <Row className={styles.groupshop_footer_f1}>
      <Col lg={3}>
        <p className="mb-5 w-75"><b>Complete your order in time to benefit from these exclusive rewards!</b></p>
        <Row className={styles.groupshop_footer_counter}>
          <Col className="d-flex ">
            <div className="text-center m-1">
              <span>
                {' '}
                3
              </span>
              <p className="fw-bold">DAYS</p>
            </div>
            <div className="py-4 mx-2">
              {' '}
              :
            </div>

          </Col>
          <Col className="d-flex mx-0 px-0">
            <div className="text-center m-1">
              <span>
                15
              </span>
              <p className="fw-bold">HOURS</p>
            </div>
            <div className="py-4 mx-2">
              {' '}
              :
            </div>

          </Col>
          <Col className="d-flex mx-0 px-0">
            <div className="text-center m-1">
              <span>
                3
              </span>
              <p className="fw-bold">MINUTES</p>
            </div>
          </Col>

        </Row>
      </Col>
      <Col lg={3}>
        <Row className={['mx-5 my-4', styles.groupshop_footer__logo].join(' ')}>
          <img src={footerLogo.src} alt="brandLogo" />
        </Row>
        <Row className={styles.groupshop_socialIcon}>
          <Row className="mx-5 w-75 px-0">
            <Row className="mx-2">
              <Col><SocialButton network="Instagram" url={'  '} /></Col>
              <Col>
                <SocialButton network="Youtube" url={' '} />
              </Col>
              <Col><SocialButton network="Tiktok" url={'  '} /></Col>
              <Col><SocialButton network="Twitter" url={'  '} /></Col>
            </Row>
          </Row>
        </Row>
        <Row className={['d-flex', styles.groupshop_footer_link].join(' ')}>
          <div className=" text-center ">
            <Button variant="link" className="fw-bold">About</Button>
            <Button variant="link" className="fw-bold">FAQ</Button>
          </div>
        </Row>
      </Col>
      <Col lg={3}>
        <p className="w-75">
          <b>Want your own store? </b>
          Be the first to find out when you can shop your favorite brands on Groupshop.
        </p>
        <InputGroup className=" my-3 w-75" id="borderclr">
          <FormControl
            placeholder="Enter your email"
            aria-label="Email"
            aria-describedby="basic-addon2"
            className="border-0 border-bottom px-2"
          />
          <Button size="sm" variant="outline" className={styles.groupshop_footer_sub}>
            <ChevronRight size={16} />
          </Button>
        </InputGroup>
      </Col>
    </Row>
    <hr />
    <Row>
      <div className={styles.groupshop_footer_f2}>
        <p>Powered by</p>
        <img src={footerLogo1.src} alt="Logo" className=" mx-1" width={112} />
      </div>
    </Row>
  </Container>

);

export default Footer;
