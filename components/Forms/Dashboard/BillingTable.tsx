/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Billing.module.scss';
import {
  Row, Col, Form, Table,
} from 'react-bootstrap';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { IBilling } from 'types/store';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import Slider from '../../Widgets/Slider/Slider';

export interface BillingTableProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleForm: any;
  setFieldValue?: any;
}

export default function BillingTable() {
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
        <Row className="">
          <Col>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-end mx-5"><WhiteButton>Load more</WhiteButton></Col>
        </Row>
      </Form>

    </section>
  );
}
