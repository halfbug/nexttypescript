/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import footerLogo1 from 'public/images/groupshopLogo.svg';
import SocialButton from 'components/Buttons/SocialButton/SocialButton';
import styles from 'styles/Groupshop.module.scss';
// import{ Button from 'components/Buttons/Button/Button';
// import Button from 'components/Buttons/Button/Button';
import {
  Col, Row, Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';

interface FooterProps {
  LeftComp: React.ReactNode;
  RightComp: React.ReactNode;
}
const Footer = ({
  LeftComp, RightComp,
}: FooterProps) => (

  <>
    <hr />
    <Row className=" w-100 align-items-center">
      <Col xs={12}>
        {' '}
        <div className="d-flex justify-content-around">
          <Col sm={3} className="p-2 justify-content-start">
            <p className=""><b>Complete your order in time to benefit from these exclusive rewards!</b></p>
            <div className={styles.groupshop_counter_footer}>
              <p className="pt-2">
                <span>
                  {' '}
                  3
                </span>
                {' '}
                :
                <span>
                  {' '}
                  15
                </span>
                {' '}
                :
                <span>
                  {' '}
                  3
                </span>

              </p>
              <div className="d-flex">
                <span className="px-2 fw-bold fs-6">
                  {' '}
                  DAYS
                </span>

                <span className="px-3 fw-bold fs-6">
                  {' '}
                  HRS
                </span>

                <span className="px-3 fw-bold fs-6">
                  {' '}
                  MINS
                </span>

              </div>
            </div>
          </Col>
          <Col sm={3} className="p-0 justify-content-center ">
            <Row className="pt-2 d-flex justify-content-center">
              {' '}
              <img src={footerLogo1} width={166.26} height="12.26" className="justify-content-center" alt="brandLogo" />
            </Row>
            <Row className="mx-0, px-0 pt-3">
              <Col className="d-flex justify-content-end"><SocialButton network="Instagram" url={'  '} /></Col>
              <Col className="d-flex justify-content-end">
                <SocialButton network="Youtube" url={' '} />
              </Col>
              <Col className="d-flex justify-content-end"><SocialButton network="Tiktok" url={'  '} /></Col>
              <Col className="d-flex justify-content-end"><SocialButton network="Twitter" url={'  '} /></Col>
            </Row>
            <Row className="mx-0, px-0 pt-3">
              <Col className="d-flex justify-content-end fw-bold ">About</Col>
              <Col className="d-flex justify-content-start fw-bold ">FAQ</Col>
            </Row>
          </Col>
          <Col sm={3} className="p-2 justify-content-end">
            <p className="">
              {' '}
              <b>Want your own store?</b>
              Be the first to find out when you can shop your favorite brands on Groupshop.

            </p>
            <InputGroup className=" mx-0 px-1 col-lg-6">
              <FormControl
                placeholder="Enter your email"
                aria-label="Email"
                aria-describedby="basic-addon2"
                className="border-0 border-bottom px-2"
              />
              <Button size="lg" variant="outline-primary border border-primary">
                <ChevronRight size={16} />
              </Button>
            </InputGroup>
          </Col>
        </div>
      </Col>
    </Row>
    {/* <hr /> */}
    <Row className=" border-top d-flex justify-content-center">
      <div className="mt-1 d-flex justify-content-center align-items-center ">
        {' '}
        <p className="mt-3 d-flex justify-content-center align-items-center mx-2">Powered by</p>
        {' '}
        {' '}
        <img src={footerLogo1} alt="Logo" className="d-flex justify-content-center align-items-center mx-1" width={112} />
      </div>
    </Row>
  </>

);

// Footer.defaultProps = {
//   user: {},
// };

export default Footer;
