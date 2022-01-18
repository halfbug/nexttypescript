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

interface IProps {
  handleChange: any;
  // values?: any;
  setFieldValue?: any;
  // touched?: any;
  // errors?: any;
}

export default function CampaignSocialMedia({ handleChange, setFieldValue }: IProps) {
  const [, setParams] = useQueryString();
  const [smUrl, setsmUrl] = React.useState('instagram');

  const [addSM, { data, loading, error }] = useMutation<IStore>(UPDATE_CAMPAIGN);
  // if (error) return `Submission error! ${error.message}`;
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <Container fluid>
      <Row className="p-2">
        <Col>
          <h4 className="mt-4 text-center">Add your social links</h4>
        </Col>
      </Row>

      <Row className="p-0">
        <Col
          className="p-0 d-flex justify-content-center"
        >
          <Button
            className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('instagram')}
            onChange={(e) => {
              setFieldValue('instagram', e.currentTarget.value);
            }}
            name="instagram"
          >
            <Instagram className="fs-3 fw-bold" />
          </Button>
        </Col>
        <Col className="p-0 d-flex justify-content-center">
          <Button
            className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('pinterest')}
            onChange={(e) => {
              setFieldValue('pinterest', e.currentTarget.value);
            }}
            name="pinterest"
          >
            <Pinterest className="fs-3 fw-bold" />
          </Button>
        </Col>
        <Col className="p-0 d-flex justify-content-center" onChange={handleChange} onClick={() => setsmUrl('tiktok')}>
          <Button
            className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('tiktok')}
            onChange={(e) => {
              setFieldValue('tiktok', e.currentTarget.value);
            }}
            name="tiktok"
          >
            <Tiktok className="fs-3 fw-bold" />

          </Button>
        </Col>
        <Col className="p-0 d-flex justify-content-center" onChange={handleChange} onClick={() => setsmUrl('twitter')}>
          <Button
            className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('twitter')}
            onChange={(e) => {
              setFieldValue('twitter', e.currentTarget.value);
            }}
            name="twitter"
          >
            <Twitter className="fs-3 fw-bold" />

          </Button>
        </Col>
        <Col className="p-0 d-flex justify-content-center" onChange={handleChange} onClick={() => setsmUrl('facebook')}>
          <Button
            className={['rounded-pill p-2', styles.groupshop_instagram].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('facebook')}
            onChange={(e) => {
              setFieldValue('facebook', e.currentTarget.value);
            }}
            name="facebook"
          >
            <Facebook className="fs-3 fw-bold" />

          </Button>
        </Col>
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
    </Container>
  );
}
