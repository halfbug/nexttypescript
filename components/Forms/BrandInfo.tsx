import * as React from 'react';
import {
  Form, Row, Col, InputGroup,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';

interface IValues {
  brandName: string;
}

export default function BrandInfo() {
  const [, setParams] = useQueryString();

  const validationSchema = yup.object({
    brandName: yup
      .string()
      .required('Brand Name is required.')
      .min(5, 'Too Short please give least five characters')
      .max(20, 'Too Long !! only 20 characters allowed.'),

  });
  const {
    handleSubmit, values, handleChange, touched, errors,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: {
      brandName: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (valz, { validateForm }:FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      setParams({ ins: 2 });
      console.log(valz);
      // setTimeout(() => resetForm(), 5000);
    },
  });

  return (
    <Form noValidate onSubmit={handleSubmit}>
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
              onChange={handleChange}
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
      <Row className="mt-3"><h4>Upload your logo</h4></Row>
      <Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Large file input example</Form.Label>
            <Form.Control type="file" size="lg" />
          </Form.Group>
          <Form.Text className="text-muted">
            Under 5 MB (Formats: PNG, JPG, JPEG)
          </Form.Text>
        </Form.Group>
      </Row>
      <Row><h4>Select your industury</h4></Row>
      <Row>
        {' '}
        <InputGroup>
          <select className="form-select" aria-label="Default select example">
            <option selected>Click to select</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </InputGroup>
      </Row>
      <Row />
      <Row className="mt-5 justify-content-center">
        <Col xs={4}>
          {/* <Button>Previous</Button> */}
        </Col>
        <Col xs={4} className="text-center">
          <span className="text-muted">1/4</span>
        </Col>
        <Col xs={4} className="d-flex justify-content-end">
          <Button type="submit"> Next </Button>
          {/* onClick={() => setParams({ ins: 2 })} */}
        </Col>

      </Row>

    </Form>
  );
}
