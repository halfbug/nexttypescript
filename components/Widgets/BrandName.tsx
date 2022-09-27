import * as React from 'react';
import styles from 'styles/GeneralForm.module.scss';
import {
  Row, Col, Form,
} from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import UploadButton from 'components/Buttons/UploadBtn';
import useCampaign from 'hooks/useCampaign';
import useUtilityFunction from 'hooks/useUtilityFunction';

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
  const { getKeyFromS3URL } = useUtilityFunction();
  console.log({ values });

  return (
    <section className={styles.generalform_purplebox}>
      <Row><h4>Your Brand Name</h4></Row>
      <Row>
        <h6 className={['pt-1', styles.generalform_light_txt].join(' ')}>
          This identifies your business on your customers’ Groupshop page
        </h6>
      </Row>

      <Row className="mt-3">
        <Col lg={9} className="d-flex ">
          <Form.Group className="col-10 pe-2" controlId="brandNamevalidation">
            <Form.Control
              type="text"
              name="brandName"
              value={values.brandName}
              className={styles.generalform__name}
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
          <Form.Text className={['col-2', styles.generalform_count_txt].join(' ')}>
            {values.brandName.length}
            /20
          </Form.Text>
        </Col>
      </Row>
      <Row className="mt-3"><h4>Your Brand Logo</h4></Row>
      <Row>
        <h6 className={['pt-1', styles.generalform_light_txt].join(' ')}>
          This identifies your business on your customers’ Groupshop page
        </h6>
      </Row>
      <Row>

        <Form.Group className="mb-3 py-2 " controlId="brandinfoUploadLogo">
          {/* // eslint-disable-next-line react/jsx-no-bind */}
          <UploadButton
            icon={(
              <WhiteButton
                className={['px-3', styles.generalform_btn].join(' ')}
              >
                Upload
              </WhiteButton>
)}
            setFieldValue={setFieldValue}
            field="logoImage"
            value={values.logoImage}
            handleForm={handleForm}
            className={styles.generalform_Obupload}
            url={getKeyFromS3URL(values.logoImage)}
          />
          <Row className="mx-auto">
            <Form.Text className={styles.generalform_smalltxt}>
              (Formats: PNG, JPG, JPEG)
            </Form.Text>
          </Row>
        </Form.Group>
      </Row>
    </section>
  );
}
