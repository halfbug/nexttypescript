import React from 'react';
import {
  Col, Form, Row, ToggleButton, ToggleButtonGroup,
} from 'react-bootstrap';
import styles from 'styles/Partner.module.scss';
import { Check2Circle, BoxArrowUp } from 'react-bootstrap-icons';
import UploadLogo from 'assets/images/upload.svg';

export default function NewPartnerForm() {
  return (
    <section className={styles.partner__box_1}>
      <h4 className="mt-0">
        Add New Partners
      </h4>
      <Row className={styles.partner__light_txt}>
        Add your influencer partners and we’ll auto-generate their Groupshop page.
        Learn more about the benefits of using Groupshop for your affiliate programs here.

      </Row>
      <Row className="mt-3 mb-4">
        <Col xl={7} lg={6} md={8}>
          <Form.Group className="" controlId="brandNamevalidation">
            <Form.Control
              type="text"
              name="brandName"
              placeholder="Enter Email Address"
            />
          </Form.Group>
        </Col>
        <Col xl={5} lg={6} md={8}>
          <ToggleButtonGroup
            type="radio"
            name="bannerProductPage"
          >
            <ToggleButton
              variant="outline-dark"
              className={styles.partner__dark_btn}
              value={1}
            >
              <Check2Circle className="fs-5" />
              {' '}
              <span className={styles.partner__dark_btn__txt}>Add Affiliate</span>
            </ToggleButton>

            <ToggleButton
              variant="outline-dark"
              className={styles.partner__dark_btn}
              value={0}
            >
              <BoxArrowUp className="fs-5" />
              {' '}
              <span className={styles.partner__dark_btn__txt}>Bulk Upload</span>
            </ToggleButton>

          </ToggleButtonGroup>
        </Col>
      </Row>
      <h4 className="mt-0">
        Reward Settings
      </h4>
      <Row className={styles.partner__light_txt}>
        Your affiliate partners and customers who have already earned 100% cashback earn a
        fixed commission on every sale. Set that percentage below.
      </Row>
      <Row className={styles.partner__percentage_area}>
        <Col lg={2} md={2} sm={3} className={styles.partner__percentage_area__percentage}>20%</Col>
        <Col lg={2} md={2} sm={3} className={styles.partner__percentage_area__editbtn}>Edit</Col>
      </Row>
    </section>
  );
}
