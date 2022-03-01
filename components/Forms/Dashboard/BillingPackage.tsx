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

export interface BillingPackageProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleForm: any;
  setFieldValue?: any;
}

export default function BillingPackage() {
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
        <Row>
          <Col lg={12} className={['my-2', styles.letsgo].join(' ')}>
            <h3>Plans</h3>
            <Row className={styles.box_row}>
              <Col className={styles.box_1}>
                <div className={styles.box_row_boxheading}>Explore</div>
                <div className="d-flex justify-content-center">
                  <div className={styles.free}>Free</div>
                </div>
                <p>First 100 Groupshops</p>
              </Col>
              <Col className={styles.box_4}>
                <div className={styles.box_row_boxheading}>Launch</div>
                <div className="d-flex justify-content-center">
                  <div className={styles.btn}>25¢ per Groupshop</div>
                </div>
                <p>
                  Up to 1,000 Groupshops
                  {' '}
                  <br />
                  {' '}
                  per month
                </p>
              </Col>
              <Col className={styles.box_3}>
                <div className={styles.box_row_boxheading}>Growth</div>
                <div className="d-flex justify-content-center">
                  <div className={styles.btn}>20¢ per Groupshop</div>
                </div>
                <p>
                  Up to 2,500 Groupshops
                  {' '}
                  <br />
                  {' '}
                  per month

                </p>
              </Col>
              <Col className={styles.box_2}>
                <div className={styles.box_row_boxheading}>Unicorn</div>
                <div className="d-flex justify-content-center">
                  <div className={styles.btn}>10¢ per Groupshop</div>
                </div>
                <p>
                  2,500+ Groupshops
                  {' '}
                  <br />
                  {' '}
                  per month

                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

    </section>
  );
}
