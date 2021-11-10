import * as React from 'react';
import {
  Form, Row, Col,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import Exclaim from 'assets/images/exclaimation.svg';
import RBButton from 'components/Buttons/RoundedButton/RBButton';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import Button2 from 'components/Buttons/Button2/Button2';

interface IValues {
  campaignName: string;
  inlineRadio: string;
}

export default function OBCampaign() {
  const [, setParams] = useQueryString();

  const validationSchema = yup.object({
    campaignName: yup
      .string()
      .required('Campaign Name is required.')
      .min(5, 'Too Short please give least five characters')
      .max(20, 'Too Long !! only 20 characters allowed.'),
    inlineRadio: yup
      .string()
      .required('Select product options'),
  });

  const {
    handleSubmit, values, handleChange, touched, errors,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: {
      campaignName: '',
      inlineRadio: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (valz, { validateForm }:FormikHelpers<IValues>) => {
      console.log(valz);
      if (validateForm) validateForm(valz);
      setParams({ ins: 3 });
      // setTimeout(() => resetForm(), 5000);
    },
  });
  console.log(errors);

  return (
    <Col className="text-sm-start" md={8}>

      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mt-3"><h4>Name your Groupshop campaign</h4></Row>
        <Row>
          <Col xs={9}>
            <Form.Group className="mb-3" controlId="campainNameValidation">
              <Form.Control
                type="email"
                placeholder="My first campaign..."
                name="campaignName"
                value={values.campaignName}
                onChange={handleChange}
                isInvalid={touched.campaignName && !!errors.campaignName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.campaignName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Text className="text-muted">
              {values.campaignName.length}
              /20
            </Form.Text>
          </Col>
        </Row>
        <Row className="mt-3">
          <h4>
            Select
            {' '}
            &
            {' '}
            add products from your store
          </h4>
        </Row>
        <Row className="text-muted"><h6>Customers can get discounts on the products selected below</h6></Row>
        <Row className="mt-2">
          <Col>
            <Form.Check
              inline
              label="Best sellers"
              onChange={handleChange}
              type="radio"
              name="inlineRadio"
              isInvalid={touched.inlineRadio && !!errors.inlineRadio}
              value="bestseller"
            />
            <Form.Check
              inline
              onChange={handleChange}
              label="Newest products"
              type="radio"
              name="inlineRadio"
              value="newproducts"
              isInvalid={touched.inlineRadio && !!errors.inlineRadio}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Form.Check
              inline
              label="Specific products/collections (up to 80 products)"
              onChange={handleChange}
              type="radio"
              name="inlineRadio"
              isInvalid={touched.inlineRadio && !!errors.inlineRadio}
              value=""
            />

          </Col>
          <Form.Control.Feedback type="invalid">
            {errors.inlineRadio}
          </Form.Control.Feedback>
        </Row>
        <Row className="mt-3 justify-content-center">
          <Col>
            <Button2
              onClick={() => setParams({ ins: '2a' })}
              variant="outline-secondary"
            >
              Edit products/collections
            </Button2>
            {/* <button
            type="button"
            onClick={() => setParams({ ins: '2a' })}>
            Edit products/collections</button> */}
          </Col>
        </Row>
        <Row className="m-2 justify-content-center">
          <Col className="text-muted">25 product(s)/2 collection(s) selected</Col>
        </Row>
        <Row className="mt-3">
          <Col xs={8}><h4>Allow customers to join existing Groupshop pages</h4></Col>
          <Col className="text-left"><Exclaim /></Col>
        </Row>
        <Row className="text-muted"><h6>When enabled, customers can access discounts from existing Groupshop pages</h6></Row>
        <Row className="mt-2">
          {/* <Col xs={3} md={4}> </Col> */}
          <Col xs={2} className="text-right">
            <RBButton>Enable</RBButton>
          </Col>
          <Col xs={9} className="text-left">
            <RBButton>Disable</RBButton>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={4}>
            <Button onClick={() => setParams({ ins: 1 })}>Previous</Button>
          </Col>
          <Col xs={4} className="text-center">
            <span className="text-muted">2/4</span>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button type="submit"> Next </Button>
            {/* onClick={() => setParams({ ins: 3 })} */}
          </Col>
          {/* <Col xs={3} md={4}>&nbsp; </Col> */}
        </Row>

      </Form>
    </Col>
  );
}
