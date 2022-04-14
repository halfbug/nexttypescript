import * as React from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, ToggleButtonGroup, ToggleButton, Container, Button,
} from 'react-bootstrap';
import { Check2Circle, InfoCircle, XCircle } from 'react-bootstrap-icons';

export interface ShowBannerProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleForm: any;
  handleSubmit: any;
  setFieldValue?: any;
}

export default function ShowBanner(
  {
    values, errors, touched, handleChange, handleForm, handleSubmit,
  }
    : ShowBannerProps,
) {
  console.log(values);
  return (
    <section className={styles.layout__box_3}>
      <h4 className="mt-0">
        Show Groupshop banner on product pages
        <span className={styles.badge}>Recommended</span>
      </h4>
      <Row className={styles.layout__light_txt}>
        Help customers learn about Groupshop’s rewards as they shop on your store.
      </Row>
      <Row className="mt-2 me-2 mb-2">
        <Col lg={12} md={6} className="text-right">
          <ToggleButtonGroup
            type="radio"
            name="bannerProductPage"
            value={values.bannerProductPage}
          >
            <ToggleButton
              variant="outline-success"
              className={styles.layout__enable_btn}
              id="bannerProductPage-e"
              value={1}
              // eslint-disable-next-line eqeqeq
              // checked={values.bannerProductPage === true}
              // onClick={handleSubmit}
              onChange={(e) => {
                handleForm('bannerProductPage', e.currentTarget.value);
              }}
            >
              <Check2Circle className="fs-4" />
              {' '}
              Enabled
            </ToggleButton>

            <ToggleButton
              variant="outline-danger"
              className={styles.layout__disable_btn}
              id="bannerProductPage-d"
              value={0}
              // checked={values.bannerProductPage === false}
              // onCLick={handleChange}
              onChange={(e) => {
                handleForm('bannerProductPage', e.currentTarget.value);
              }}
            >
              <XCircle className="fs-5" />
              {' '}
              Disabled
            </ToggleButton>

          </ToggleButtonGroup>
        </Col>
      </Row>
      <hr className={styles.layout__sperator} />
      <h4>
        Show Groupshop banner on cart page
        <span className={styles.badge}>Recommended</span>
      </h4>
      <Row className={styles.layout__light_txt}>
        Remind customers about Groupshop’s rewards right before their purchase.
      </Row>
      <Row className="mt-2 me-2 mb-2">
        <Col lg={12} md={6} className="text-right">
          <ToggleButtonGroup
            type="radio"
            name="bannerCartPage"
          >
            <ToggleButton
              variant="outline-success"
              className={styles.layout__enable_btn}
              id="bannerCartPage-e"
              value={1}
              checked={values.bannerCartPage === 1}
              // onChange={handleChange}
              onChange={(e) => {
                handleForm('bannerCartPage', e.currentTarget.value);
              }}
            >
              <Check2Circle className="fs-4" />
              {' '}
              Enabled
            </ToggleButton>

            <ToggleButton
              variant="outline-danger"
              className={styles.layout__disable_btn}
              id="bannerCartPage-d"
              value={0}
              checked={values.bannerCartPage === 0}
              // onChange={handleChange}
              onChange={(e) => {
                handleForm('bannerCartPage', e.currentTarget.value);
              }}
            >
              <XCircle className="fs-5" />
              {' '}
              Disabled
            </ToggleButton>

          </ToggleButtonGroup>
        </Col>
      </Row>
    </section>
  );
}
