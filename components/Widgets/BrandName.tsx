import * as React from 'react';
import styles from 'styles/GeneralForm.module.scss';
import {
  Row, Col, Form,
} from 'react-bootstrap';

export interface BrandNameProps {
values: any;
errors: any;
touched: any;
handleChange: any;
handleForm: any;
setFieldValue: any;
}

export default function BrandName(
  {
    values, errors, touched, handleChange, handleForm, setFieldValue,
  }
  : BrandNameProps,
) {
  return (
    <section>
      <Row><h4>Enter your brand name</h4></Row>
      <Row>
        <h6>
          This identifies your business on your customers’ Groupshop page
        </h6>
      </Row>

      <Row>
        <Col xs={9}>
          <Form.Group className="" controlId="brandNamevalidation">
            <Form.Control
              type="text"
              name="brandName"
              value={values.brandName}
              onChange={(e) => {
                // setFieldValue('brandName', e.currentTarget.value);
                handleForm('brandName', e.currentTarget.value);
              }}
              isInvalid={touched.brandName && !!errors.brandName}
              placeholder="Brand Name ..."
            />

            <Form.Control.Feedback type="invalid">
              {errors.brandName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={3}>
          <Form.Text className="text-muted align-baseline">
            {values.brandName.length}
            /20
          </Form.Text>
        </Col>
      </Row>
    </section>
  );
}
