/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Billing.module.scss';
import {
  Row, Col, Form,
} from 'react-bootstrap';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { IBilling } from 'types/store';
import Slider from '../../Widgets/Slider/Slider';

export interface BillingCalculatorProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleForm: any;
  setFieldValue?: any;
}

export default function BillingCalculator() {
  const validationSchema = yup.object({
    nooforder: yup.number(),
  });
  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<IBilling> = useFormik<IBilling>({
    initialValues: {
      nooforder: 0,
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IBilling>) => {
      if (validateForm) validateForm(valz);
      console.log({ valz });
    },
  });

  return (
    <Row className={styles.billing}>
      <Col lg={9}>
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col className={styles.billing_calculator_rectangle}>
              <Row>
                <Col><h5>Estimate your monthly cost</h5></Col>
              </Row>
              <Row>
                <p className='text-muted mb-2'>Enter your store’s average sales volume per month to estimate your cost.</p>
              </Row>
              <Row>
                <Col className={styles.billing_averageline}>Average number of orders per month</Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <Form.Group className="" controlId="brandNamevalidation">
                    <Form.Control
                      type="text"
                      name="nooforder"
                      value={values.nooforder ? values.nooforder : ''}
                      onChange={handleChange}
                      isInvalid={touched.nooforder && !!errors.nooforder}
                      placeholder="Enter number"
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.nooforder}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Slider />
              {/* <input
                id="ex22"
                type="text"
                data-slider-id="slider22"
                data-slider-min="0"
                data-slider-max="5000"
                data-slider-step="1"
                data-slider-value="14"
                data-slider-rangeHighlights='[{ "start": 0, "end": 100, "class": "category1" },
                                   { "start": 101, "end": 1000, "class": "category2" },
                                   { "start": 1001, "end": 2500 },
                                   { "start": 2500, "end": 5000 }]'
              /> */}
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
