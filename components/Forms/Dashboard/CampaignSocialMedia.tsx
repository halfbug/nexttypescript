/* eslint-disable no-nested-ternary */
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
  handleForm?: any;
  values?: any;
  setFieldValue?: any;
  touched?: any;
  errors?: any;
}

export default function CampaignSocialMedia({
  handleForm, setFieldValue, values, touched, errors,
}: IProps) {
  const [, setParams] = useQueryString();
  const [smUrl, setsmUrl] = React.useState('instagram');
  const [field, setfield] = React.useState('instagram');

  const [addSM, { data, loading, error }] = useMutation<IStore>(UPDATE_CAMPAIGN);
  console.log({ errors });

  return (

    <>
      <Row className="mb-2">
        <Col>
          <h4 className="">Add your social links</h4>
        </Col>
      </Row>
      <Row>
        <div className="col-8 d-flex ">
          <Button
            className={['px-1 me-1', styles.groupshop_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('instagram')}
          >
            <Instagram className="fs-3 fw-bold" />
          </Button>
          <Button
            className={['px-1 mx-1', styles.groupshop_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('tiktok')}
          >
            <Tiktok className="fs-3 fw-bold" />

          </Button>
          <Button
            className={['px-1 mx-1', styles.groupshop_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('twitter')}
          >
            <Twitter className="fs-3 fw-bold" />

          </Button>
          <Button
            className={['px-1 mx-1', styles.groupshop_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('facebook')}
          >
            <Facebook className="fs-3 fw-bold" />
          </Button>
        </div>
      </Row>
      <Row className="p-1 mt-2">
        <Col lg={10} className="d-flex">
          <Form.Group className="w-100" controlId="sm">
            <Form.Control
              onChange={(e) => {
                // setval(e.currentTarget.value);
                setfield('instagram');
                handleForm('instagram', e.currentTarget.value);
              }}
              className={smUrl === 'instagram' ? 'd-block' : 'd-none'}
              // id={`${smUrl}`}
              name="instagram"
              type="text"
              size="lg"
              placeholder="Enter instagram account URL..."
              value={values.instagram}
              isInvalid={!!errors.instagram}
            />
            <Form.Control.Feedback type="invalid">
              {errors.instagram}
            </Form.Control.Feedback>

            <Form.Control
              onChange={(e) => {
                handleForm('tiktok', e.currentTarget.value);
                // setval(e.currentTarget.value);
                setfield('tiktok');
                // debouncedSearch('tiktok', e.currentTarget.value);
              }}
              className={smUrl === 'tiktok' ? 'd-block' : 'd-none'}
              // className="px-2"
              // id={`${smUrl}`}
              name="tiktok"
              type="text"
              size="lg"
              placeholder="Enter tiktok account URL..."
              value={values.tiktok}
              isInvalid={!!errors.tiktok}
            />
            <Form.Control.Feedback type="invalid">
              {errors.tiktok}
            </Form.Control.Feedback>
            <Form.Control
              onChange={(e) => {
                handleForm('twitter', e.currentTarget.value);
                // setval(e.currentTarget.value);
                setfield('twitter');
                // debouncedSearch('twitter', e.currentTarget.value);
              }}
              className={smUrl === 'twitter' ? 'd-block' : 'd-none'}
              // className="px-2"
              // id={`${smUrl}`}
              name="twitter"
              type="text"
              size="lg"
              placeholder="Enter twitter account URL..."
              value={values.twitter}
              isInvalid={!!errors.twitter}
            />
            <Form.Control.Feedback type="invalid">
              {errors.twitter}
            </Form.Control.Feedback>
            <Form.Control
              className={smUrl === 'facebook' ? 'd-block' : 'd-none'}
              // className="px-2 "
              // id={`${smUrl}`}
              name="facebook"
              type="text"
              size="lg"
              onChange={(e) => {
                handleForm('facebook', e.currentTarget.value);
                // setval(e.currentTarget.value);
                setfield('facebook');
                // debouncedSearch('facebook', e.currentTarget.value);
              }}
              placeholder="Enter facebook account URL..."
              value={values.facebook}
              isInvalid={!!errors.facebook}
            />
            <Form.Control.Feedback type="invalid">
              {errors.facebook}
            </Form.Control.Feedback>
            {/* <Form.Control.Feedback type="invalid">
                {errors.brandName}
              </Form.Control.Feedback> */}

          </Form.Group>
          {(errors[field] !== undefined) ? (
            <IconButton
              icon={<CheckCircle size={18} color="grey" />}
            />
          )
            : (
              <IconButton
                icon={<CheckCircle size={18} color="green" />}
              />
            )}
        </Col>
      </Row>
    </>
  );
}
