/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import footerLogo1 from 'public/images/logo-thin.png';
import SocialButton from 'components/Buttons/SocialButton/SocialButton';
import styles from 'styles/Groupshop.module.scss';

import {
  Col, Row, Button, FormControl, InputGroup, Container,
} from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import useDeal from 'hooks/useDeal';

interface FooterProps {
  LeftComp: React.ReactNode;
  RightComp: React.ReactNode;
}
const Footer = ({
  LeftComp, RightComp,
}: FooterProps) => {
  const { getDateDifference, isExpired } = useDeal();
  const { days, hrs, mins } = getDateDifference();
  return (

    <Container fluid className={styles.groupshop_footer}>
      <hr />
      <Row className={styles.groupshop_footer_f1}>
        <Col lg={3}>
          <section>
            <p className="mb-5 w-75 ">{isExpired ? <strong>THIS GROUPSHOP HAS EXPIRED </strong> : <b>Complete your order in time to benefit from these exclusive rewards!</b>}</p>
            <Row className={styles.groupshop_footer_counter}>
              <Col className="d-flex col-3 ">
                <div className="text-center me-2">
                  <span>
                    {' '}
                    {days}
                  </span>
                  <p className="mt-1">DAYS</p>
                </div>
                <div className="py-3">
                  {' '}
                  :
                </div>
              </Col>
              <Col className="d-flex col-3  ">
                <div className="text-center mx-2">
                  <span>
                    {hrs}
                  </span>
                  <p className="mt-1">HOURS</p>
                </div>
                <div className="py-3">
                  {' '}
                  :
                </div>
              </Col>
              <Col className="d-flex col-3 ">
                <div className="text-center mx-3">
                  <span>
                    {mins}
                  </span>
                  <p className="mt-1">MINUTES</p>
                </div>
              </Col>
            </Row>
          </section>
        </Col>
        <Col lg={4}>
          <Row className={['mt-5 mx-2 mb-2', styles.groupshop_footer__logo].join(' ')}>
            {/* <img src={footerLogo.src} alt="brandLogo" /> */}
            <img src="/images/logo-thin.svg" alt="Groupshop" />
          </Row>
          <Row className={styles.groupshop_socialIcon}>

            <section className="d-flex justify-content-center px-2">
              <div className="mx-1">
                {' '}
                <SocialButton network="Instagram" url={'  '} />
              </div>

              <div className="mx-1">
                {' '}
                <SocialButton network="Youtube" url={' '} />
                {' '}
              </div>

              <div className="mx-1">
                {' '}
                <SocialButton network="Tiktok" url={'  '} />
                {' '}
              </div>
              <div className="mx-1">
                {' '}
                <SocialButton network="Twitter" url={'  '} />
                {' '}
              </div>
            </section>

          </Row>
          <Row className={['d-flex', styles.groupshop_footer_link].join(' ')}>
            <div className=" text-center ">
              <Button variant="link"><strong>About</strong></Button>
              <Button variant="link"><strong>FAQ</strong></Button>
            </div>
          </Row>
        </Col>
        <Col lg={3}>
          <section>
            <p>
              <strong>Want your own store? </strong>
              Be the first to find out when
              you can shop your favorite brands on Groupshop.
            </p>
            <InputGroup className=" my-3" id="borderclr">
              <FormControl
                placeholder="Enter your email"
                aria-label="Email"
                aria-describedby="basic-addon2"
                className="border-bottom rounded-0 border-0 px-2"
              />
              <Button size="sm" variant="outline" className={styles.groupshop_footer_sub}>
                <ChevronRight size={16} />
              </Button>
            </InputGroup>
          </section>
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
};

export default Footer;
