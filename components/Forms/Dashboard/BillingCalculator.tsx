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
    <section className={styles.billing}>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="w-75">
          <Col className={styles.billing_calculator_rectangle}>
            <Row>
              <Col><h5>Estimate your monthly cost</h5></Col>
            </Row>
            <Row>
              <Col className='text-muted'>Enter your store’s average sales volume per month to estimate your cost.</Col>
            </Row>
            <Row>
              <Col className=''><h6>Average number of orders per month</h6></Col>
            </Row>
            <Row>
              <Col className=''>
                <Form.Group className="col-11" controlId="brandNamevalidation">
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
            <Row>
              <Col>
                <Slider label='Explore' />
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

    </section>
  );
}
