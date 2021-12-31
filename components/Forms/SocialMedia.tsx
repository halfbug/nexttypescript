import * as React from 'react';
import {
  Form, Row, Col, InputGroup, Container,
} from 'react-bootstrap';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useMutation } from '@apollo/client';
import { UPDATE_STORE } from 'store/store.graphql';
import {
  Facebook, Instagram, Pinterest, Twitter, Tiktok, CheckCircle,
} from 'react-bootstrap-icons';
import { IStore } from 'types/store';

interface IValues {
    facebook: string;
    instagram: string;
    twitter: string;
    pinterest: string;
    youtube: string;
    tiktok: string;
    // setFieldValue: ()=>void;
}

export default function SocialMedia() {
  const [, setParams] = useQueryString();
  const [smUrl, setsmUrl] = React.useState('instagram');

  const [addSM, { data, loading, error }] = useMutation<IStore>(UPDATE_STORE);
  // if (error) return `Submission error! ${error.message}`;
  const { store, dispatch } = React.useContext(StoreContext);

  const validationSchema = yup.object({
    facebook: yup
      .string()
      .min(10, 'Too Short')
      .max(200, 'Too Long !! Invalid length'),

  });
  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: {
      facebook: '',
      instagram: '',
      tiktok: '',
      youtube: '',
      pinterest: '',
      twitter: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const {
        facebook, instagram, tiktok, youtube, pinterest, twitter,
      } = valz;
      console.log(valz);
      await addSM({
        variables: {
          updateStoreInput: {
            id: store.id,
            shop: store.shop,
            socialMedia: {
              facebook,
              instagram,
              tiktok,
              youtube,
              pinterest,
              twitter,
            },
          },
        },
      });
      dispatch({ type: 'UPDATE_STORE', payload: valz });
    },
  });

  return (
    <Container fluid>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="p-2">
          <Col>
            <h4 className="mt-4 text-center">Add your social links</h4>
          </Col>
        </Row>
        <Row className="p-0">
          <Col className="p-0 d-flex justify-content-center" onClick={() => setsmUrl('instagram')}>
            <Instagram className="fs-3 fw-bold" />
          </Col>
          <Col className="p-0 d-flex justify-content-center" onClick={() => setsmUrl('pinterest')}><Pinterest className="fs-3 fw-bold" /></Col>
          <Col className="p-0 d-flex justify-content-center" onClick={() => setsmUrl('tiktok')}><Tiktok className="fs-3 fw-bold" /></Col>
          <Col className="p-0 d-flex justify-content-center" onClick={() => setsmUrl('twitter')}><Twitter className="fs-3 fw-bold" /></Col>
          <Col className="p-0 d-flex justify-content-center" onClick={() => setsmUrl('facebook')}><Facebook className="fs-3 fw-bold" /></Col>
        </Row>
        <Row className="p-1 mt-2">
          <Col xs={8}>
            <Form.Group className="w-100" controlId="sm">
              <Form.Control
                onChange={handleChange}
                className="px-2"
                id={`${smUrl}`}
                name={`${smUrl}`}
                type="text"
                size="sm"
                placeholder={`Enter ${smUrl} account URL...`}
              />
              {/* <Form.Control.Feedback type="invalid">
                {errors.brandName}
              </Form.Control.Feedback> */}

            </Form.Group>
          </Col>
          <Col className="align-middle" xs={4}>
            <CheckCircle />
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
