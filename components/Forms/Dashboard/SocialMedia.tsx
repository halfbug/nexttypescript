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
import IconButton from 'components/Buttons/IconButton';

interface IValues {
    facebook: string;
    instagram: string;
    twitter: string;
    pinterest: string;
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
      pinterest: '',
      twitter: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const {
        facebook, instagram, tiktok, pinterest, twitter,
      } = valz;
      console.log(valz);
      const smObj: null | any = await addSM({
        variables: {
          updateCampaignInput: {
            storeId: store.id,
            id: store.singleEditCampaignId,
            socialLinks: {
              facebook,
              instagram,
              tiktok,
              pinterest,
              twitter,
            },
          },
        },
      });
      // dispatch({ type: 'UPDATE_STORE', payload: { socialLinks: valz } });
      const updatedCampaigns = store?.campaigns?.map((item:any) => {
        if (item.id === smObj.id) {
          return smObj;
        }
        return item;
      });
      dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: updatedCampaigns } });
      console.log('🚀 ~ file: UpdateCampaign.tsx ~ line 32 ~ UpdateCampaign ~ store', store);
    },
  });
  console.log({ store });
  return (

    <Form noValidate onSubmit={handleSubmit}>
      <Row className="px-2 ">
        <Col>
          <h4 className="">Add your social links</h4>
        </Col>
      </Row>
      <Row className="p-1 justify-content-center">
        <Col className="p-0 d-flex justify-content-center">
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
          <IconButton icon={<CheckCircle size={18} color="grey" />} onClick={() => handleSubmit} />
        </Col>
      </Row>
    </Form>

  );
}
