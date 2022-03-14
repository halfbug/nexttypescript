import React, { useState, useEffect, useContext } from 'react';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import {
  Form, Button, Row, Col, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import * as yup from 'yup';
import useAlert from 'hooks/useAlert';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_QR_DEAL } from 'store/store.graphql';

export interface IQRCode {
  email: string;
  ordernumber: string;
}

interface IStep1Props {
  setShowStep1: any;
  setShowStep2: any;
  setShowStep3: any;
  setdealLink: any;
 }

export default function QrStep1(
  {
    setShowStep1, setShowStep2, setShowStep3, setdealLink,
  }: IStep1Props,
) {
  const validationSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Required'),
    ordernumber: yup.number().required('Required'),
  });

  const { showError } = useAlert();

  const [getDealLink, { loading, data }] = useLazyQuery(GET_QR_DEAL, {
    onError(error) {
      console.log('Record not found!');
      showError('Record not found!');
    },

  });

  useEffect(() => {
    if (data) {
      setShowStep1(false);
      setShowStep2(true);
      setTimeout(() => {
        setdealLink(data.getQrDealLink.url);
        setShowStep2(false);
        setShowStep3(true);
      }, 2000);
    }
  }, [data]);

  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<IQRCode> = useFormik<IQRCode>({
    initialValues: {
      email: '',
      ordernumber: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<IQRCode>) => {
      if (validateForm) validateForm(valz);
      console.log(valz);
      const { email, ordernumber } = valz;
      getDealLink({ variables: { email, ordernumber } });
    },
  });

  return (
    <Row>
      <Col xs={12} md={6}>
        <h2>
          Access your personalized store with exclusive discounts
          and cashback for you and your friends.
        </h2>
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col lg={7} className="mt-4">
              <section className="qr-step1">
                <Row className="mt-2">
                  <Col lg={7}>
                    <Form.Group className="mb-2">
                      <Form.Text className="text-muted">
                        Email
                      </Form.Text>
                      <Form.Control
                        type="email"
                        placeholder="Email..."
                        name="email"
                        isInvalid={!!errors.email}
                        onChange={(e) => handleChange(e)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={5} />
                </Row>
                <Row className="mt-2">
                  <Col lg={7}>
                    <Form.Group className="mb-2">
                      <Form.Text className="text-muted">
                        Order Number
                      </Form.Text>
                      <Form.Control
                        type="text"
                        placeholder="Order Number..."
                        name="ordernumber"
                        isInvalid={!!errors.ordernumber}
                        onChange={(e) => setFieldValue('ordernumber', e.currentTarget.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.ordernumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={5}>
                    <Form.Text className="text-muted">
                      You can find your order number on the order confirmation
                      email from the brand you used Groupshop
                      with as well as the order summary slip included in your package.
                    </Form.Text>
                  </Col>
                </Row>
              </section>

            </Col>
          </Row>
          <Row>
            <Col xs={4} className="d-flex justify-content-end">
              <Button type="submit"> Get my Groupshop </Button>
            </Col>

          </Row>
        </Form>
      </Col>
      <Col xs={12} md={6}>
        Image
      </Col>
    </Row>
  );
}
