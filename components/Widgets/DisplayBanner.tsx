/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, Form,
} from 'react-bootstrap';
import Banner from 'assets/images/display banner.png';

export interface DisplayBannerProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleForm: any;
  setFieldValue?: any;
}

export default function DisplayBanner(
  {
    values, errors, touched, handleChange, handleForm,
  }
    : DisplayBannerProps,
) {
  return (
    <section className={styles.layout__box_orange}>
      <Row>
        <Col xxl={7} xl={6} lg={4}>
          <h4 className="mt-0">
            Display banners on your order summary page

          </h4>
          <h6 className="text-muted mt-2">Showcase Groupshop's exclusive benefits with dedicated banners after checkout.</h6>
          <Row>
            <Col lg={12} className="mt-2 px-1">
              <Form.Check
                className="p-2"
                onChange={(e) => handleChange(e)}
                type="radio"
              >
                <Form.Check.Input type="radio" name="display" className={styles.layout__checkbox__input} />
                <Form.Check.Label className={styles.layout__checkbox__input__label}>
                  Show both
                  <span className={styles.badge}>Recommended</span>
                </Form.Check.Label>
              </Form.Check>
              <Form.Check
                className="p-2"
                onChange={(e) => handleChange(e)}
                type="radio"
              >
                <Form.Check.Input type="radio" name="display" className={styles.layout__checkbox__input} />
                <Form.Check.Label className={styles.layout__checkbox__input__label}>
                  Show left one only
                </Form.Check.Label>
              </Form.Check>
              <Form.Check
                className="p-2"
                onChange={(e) => handleChange(e)}
                type="radio"
              >
                <Form.Check.Input type="radio" name="display" className={styles.layout__checkbox__input} />
                <Form.Check.Label className={styles.layout__checkbox__input__label}>
                  Show right one only
                </Form.Check.Label>
              </Form.Check>
              <Form.Check
                className="p-2"
                onChange={(e) => handleChange(e)}
                type="radio"
              >
                <Form.Check.Input type="radio" name="display" className={styles.layout__checkbox__input} />
                <Form.Check.Label className={styles.layout__checkbox__input__label}>
                  Don’t show
                </Form.Check.Label>
              </Form.Check>
            </Col>
          </Row>
        </Col>
        <Col xxl={5} xl={6} lg={8} className="d-flex justify-content-end">
          <img src={Banner.src} alt="Banner" width="413" height="215" />
        </Col>
      </Row>
    </section>
  );
}
