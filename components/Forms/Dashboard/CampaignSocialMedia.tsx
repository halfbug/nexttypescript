/* eslint-disable react/require-default-props */
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
import SocialButton from 'components/Buttons/SocialButton/SocialButton';
import IconButton from 'components/Buttons/IconButton';

interface IProps {
  handleChange: any;
  values?: any;
  setFieldValue?: any;
  // touched?: any;
  // errors?: any;
}

export default function CampaignSocialMedia({ handleChange, setFieldValue, values }: IProps) {
  const [, setParams] = useQueryString();
  const [smUrl, setsmUrl] = React.useState('instagram');

  const [addSM, { data, loading, error }] = useMutation<IStore>(UPDATE_CAMPAIGN);
  // if (error) return `Submission error! ${error.message}`;
  const { store, dispatch } = React.useContext(StoreContext);

  return (

    <>
      <Row className="px-2">
        <Col>
          <h4 className="">Add your social links</h4>
        </Col>
      </Row>
      <Row className="p-1 justify-content-center">
        <Col
          className="p-0 d-flex justify-content-center"
        >
          <Button
            className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('instagram')}
            // name="instagram"
          >
            <Instagram className="fs-3 fw-bold" />
          </Button>
        </Col>
        <Col className="p-0 d-flex justify-content-center">
          <Button
            className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('pinterest')}
            // name="pinterest"
          >
            <Pinterest className="fs-3 fw-bold" />
          </Button>
        </Col>
        <Col className="p-0 d-flex justify-content-center">
          <Button
            className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('tiktok')}
            // name="tiktok"
          >
            <Tiktok className="fs-3 fw-bold" />

          </Button>
        </Col>
        <Col className="p-0 d-flex justify-content-center">
          <Button
            className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('twitter')}
            // name="twitter"
          >
            <Twitter className="fs-3 fw-bold" />

          </Button>
        </Col>
        <Col className="p-0 d-flex justify-content-center">
          <Button
            className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('facebook')}
            // name="facebook"
          >
            <Facebook className="fs-3 fw-bold" />

          </Button>
        </Col>
      </Row>
      <Row className="p-1 mt-2">
        <Col lg={10}>
          <Form.Group className="w-100" controlId="sm">
            <Form.Control
              onChange={(e) => {
                setFieldValue('instagram', e.currentTarget.value);
              }}
              className={smUrl === 'instagram' ? 'd-block' : 'd-none'}
              // id={`${smUrl}`}
              name="instagram"
              type="text"
              size="lg"
              placeholder="Enter instagram account URL..."
              value={values.instagram}
            />
            <Form.Control
              onChange={(e) => {
                setFieldValue('pinterest', e.currentTarget.value);
              }}
              className={smUrl === 'pinterest' ? 'd-block' : 'd-none'}
              // className="px-2"
              // id={`${smUrl}`}
              name="pinterest"
              type="text"
              size="lg"
              placeholder="Enter pinterest account URL..."
              value={values.pinterest}
            />
            <Form.Control
              onChange={(e) => {
                setFieldValue('tiktok', e.currentTarget.value);
              }}
              className={smUrl === 'tiktok' ? 'd-block' : 'd-none'}
              // className="px-2"
              // id={`${smUrl}`}
              name="tiktok"
              type="text"
              size="lg"
              placeholder="Enter tiktok account URL..."
              value={values.tiktok}
            />
            <Form.Control
              onChange={(e) => {
                setFieldValue('twitter', e.currentTarget.value);
              }}
              className={smUrl === 'twitter' ? 'd-block' : 'd-none'}
              // className="px-2"
              // id={`${smUrl}`}
              name="twitter"
              type="text"
              size="lg"
              placeholder="Enter twitter account URL..."
              value={values.twitter}
            />
            <Form.Control
              className={smUrl === 'facebook' ? 'd-block' : 'd-none'}
              // className="px-2 "
              // id={`${smUrl}`}
              name="facebook"
              type="text"
              size="lg"
              onChange={(e) => {
                setFieldValue('facebook', e.currentTarget.value);
              }}
              placeholder="Enter facebook account URL..."
              value={values.facebook}
            />
            {/* <Form.Control.Feedback type="invalid">
                {errors.brandName}
              </Form.Control.Feedback> */}

          </Form.Group>
        </Col>
        <Col className="align-middle py-2 px-1" lg={2}>
          <IconButton
            icon={<CheckCircle size={18} color="grey" />}
            type="submit"
          // onClick={() => handleSubmit}
          />
        </Col>
      </Row>
    </>
  );
}