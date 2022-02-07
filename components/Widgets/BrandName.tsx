import * as React from 'react';
import styles from 'styles/GeneralForm.module.scss';
import {
  Row, Col, Form,
} from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import UploadButton from 'components/Buttons/UploadBtn';

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
    <section className={styles.generalform_purplebox}>
      <Row><h4>Your Brand Name</h4></Row>
      <Row>
        <h6 className="text-muted">
          This identifies your business on your customers’ Groupshop page
        </h6>
      </Row>

      <Row className="mt-3">
        <Col xs={7}>
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
        <Col xs={2}>
          <Form.Text className="text-muted align-baseline">
            {values.brandName.length}
            /20
          </Form.Text>
        </Col>
      </Row>
      <Row className="mt-3"><h4>Your Brand Logo</h4></Row>
      <Row>
        <h6 className="text-muted">
          This identifies your business on your customers’ Groupshop page
        </h6>
      </Row>
      <Row>

        <Form.Group className="mb-3 w-50 py-2" controlId="brandinfoUploadLogo">
          {/* // eslint-disable-next-line react/jsx-no-bind */}
          <UploadButton
            icon={(<WhiteButton>Upload</WhiteButton>)}
            setFieldValue={setFieldValue}
            field="logoImage"
            value={values.logoImage}
            handleForm={handleForm}
          />
          <Row className="mx-auto">
            <Form.Text className="text-muted d-flex justify-content-center">
              Under 5 MB (Formats: PNG, JPG, JPEG)
            </Form.Text>
          </Row>
        </Form.Group>
      </Row>
    </section>
  );
}
