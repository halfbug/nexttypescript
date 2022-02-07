/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, Form,
} from 'react-bootstrap';

export interface BannerLocationProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleForm: any;
  setFieldValue?: any;
}

export default function BannerLocation(
  {
    values, errors, touched, handleChange, handleForm,
  }
    : BannerLocationProps,
) {
  return (
    <section className={styles.layout__box_1}>
      <h4 className="mt-0">
        Choose the location of  your
        <br />
        product page banner
      </h4>
      <Row>
        <Col lg={12} className="mt-2">
          <Form.Check
            className="p-2"
            onChange={(e) => handleChange(e)}
            type="radio"
              // eslint-disable-next-line react/jsx-closing-bracket-location
              >
            <Form.Check.Input type="radio" name="location" />
            <Form.Check.Label className="mx-2">
              Below product price tag
              <span className={styles.badge}>Recommended</span>
            </Form.Check.Label>
          </Form.Check>
          <Form.Check
            className="p-2"
            onChange={(e) => handleChange(e)}
            type="radio"
          >
            <Form.Check.Input type="radio" name="location" />
            <Form.Check.Label className="mx-2">
              Below Add to cart
            </Form.Check.Label>
          </Form.Check>
          <Form.Check
            className="p-2"
            onChange={(e) => handleChange(e)}
            type="radio"
          >
            <Form.Check.Input type="radio" name="location" />
            <Form.Check.Label className="mx-2">
              Customize location (Advanced)
            </Form.Check.Label>
          </Form.Check>
        </Col>
      </Row>
    </section>
  );
}
