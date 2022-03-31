/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import styles from 'styles/Marketing.module.scss';
import {
  Row, Col, FormControl, InputGroup,
} from 'react-bootstrap';
import Inte from 'assets/images/Integrations.svg';
import Fa from 'assets/images/FacebookPixel.svg';
import Ga from 'assets/images/GooglePixel.svg';
import Ta from 'assets/images/TikTokPixel.svg';
import { InfoCircle } from 'react-bootstrap-icons';

export default function Integrations(
) {
  return (
    <>
      <h3 className="my-3 mx-0 ps-0 ">Integrations</h3>
      <section className={styles.marketing__box_1}>
        <h4 className="mt-0">
          Connect your pixels
        </h4>
        <p className="mt-2">Track customer data and behavior on your online store</p>
        <div>
          <Row>
            <div className="d-flex">
              <Fa className="me-2" />
              <Col lg={6} className="style.marketing_inputIconBox">
                <InputGroup className="mb-3 ">
                  <FormControl
                    placeholder="Enter Facebook Pixel"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                {/* <InfoCircle className="styles.marketing_inputIcon" fill="0F0E0E" /> */}
              </Col>
            </div>
          </Row>
          <Row>
            <div className="d-flex">
              <Ta className="me-2" />
              <Col lg={6}>
                <InputGroup className="mb-3 ">
                  <FormControl
                    placeholder="Enter Tik Tok Pixel"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Col>
            </div>
          </Row>
          <Row>
            <div className="d-flex">
              <Ga className="me-2" />
              <Col lg={6}>
                <InputGroup className="mb-3 ">
                  <FormControl
                    placeholder="Enter Google Pixel"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Col>
            </div>
          </Row>
        </div>
      </section>
      <section className={styles.marketing__box_1}>
        <Row>
          <Col lg={1} className="me-0 mt-2">
            <Inte />
          </Col>
          <Col lg={10} className="ms-2 px-0">
            <h4 className="mt-0">
              Integrations
            </h4>
            <p>Enhance your Groupshop experience with email and SMS marketing solutions.</p>
          </Col>
        </Row>
      </section>
    </>
  );
}
