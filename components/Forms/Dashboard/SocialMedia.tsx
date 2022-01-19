import * as React from 'react';
import {
  Form, Row, Col, InputGroup, Container, Button,
} from 'react-bootstrap';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useMutation } from '@apollo/client';
import { UPDATE_CAMPAIGN } from 'store/store.graphql';
import {
  Facebook, Instagram, Pinterest, Twitter, Tiktok, CheckCircle,
} from 'react-bootstrap-icons';
import styles from 'styles/Groupshop.module.scss';
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

  const [addSM, { data, loading, error }] = useMutation<IStore>(UPDATE_CAMPAIGN);
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
          updateCampaignInput: {
            storeId: store.id,
            id: store.singleEditCampaignId,
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

    <Form noValidate onSubmit={handleSubmit}>
      <Row className="px-2 ">
        <Col>
          <h4 className="">Add your social links</h4>
        </Col>
      </Row>
      <Row className="p-1 justify-content-center">
        <Col className="p-0 d-flex justify-content-center" onClick={() => setsmUrl('instagram')}>
          <Button className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')} variant="secondary"><Instagram className="fs-3 fw-bold" /></Button>
        </Col>
        <Col className="p-0 d-flex justify-content-center" onChange={handleChange} onClick={() => setsmUrl('pinterest')}>
          <Button className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')} variant="secondary"><Pinterest className="fs-3 fw-bold" /></Button>
        </Col>
        <Col className="p-0 d-flex justify-content-center" onChange={handleChange} onClick={() => setsmUrl('tiktok')}>
          <Button className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')} variant="secondary"><Tiktok className="fs-3 fw-bold" /></Button>
        </Col>
        <Col className="p-0 d-flex justify-content-center" onChange={handleChange} onClick={() => setsmUrl('twitter')}>
          <Button className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')} variant="secondary"><Twitter className="fs-3 fw-bold" /></Button>
        </Col>
        <Col className="p-0 d-flex justify-content-center" onChange={handleChange} onClick={() => setsmUrl('facebook')}>
          <Button className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')} variant="secondary"><Facebook className="fs-3 fw-bold" /></Button>
        </Col>
      </Row>
      <Row className="p-1 mt-2">
        <Col lg={10}>
          <Form.Group className="w-100" controlId="sm">
            <Form.Control
              onChange={handleChange}
              className="px-2"
              id={`${smUrl}`}
              name={`${smUrl}`}
              type="text"
              size="lg"
              placeholder={`Enter ${smUrl} account URL...`}
            />
            {/* <Form.Control.Feedback type="invalid">
                {errors.brandName}
              </Form.Control.Feedback> */}

          </Form.Group>
        </Col>
        <Col className="align-middle py-2 px-1" lg={2}>
          <CheckCircle size={18} color="grey" />
        </Col>
      </Row>
    </Form>

  );
}
