/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  Form, Row, Col, InputGroup,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useMutation } from '@apollo/client';
import { UPDATE_STORE } from 'store/store.graphql';
import { IStore } from 'types/store';
import UploadButton from 'components/Buttons/UploadBtn';
import styles from 'styles/Step1.module.scss';
import useCampaign from 'hooks/useCampaign';
import useUtilityFunction from 'hooks/useUtilityFunction';

interface IValues {
  brandName: string;
  industry: string;
  logoImage: string;
  // setFieldValue: ()=>void;
}

export default function BrandInfo() {
  const [, setParams] = useQueryString();

  const [addBI, { data, loading, error }] = useMutation<IStore>(UPDATE_STORE);
  // if (error) return `Submission error! ${error.message}`;
  const { store, dispatch } = React.useContext(StoreContext);
  console.log({ store });
  const [state, setstate] = React.useState({
    brandName: '',
    industry: '',
    logoImage: '',
  });
  React.useEffect(() => {
    if (store.brandName) {
      const newState: IValues = {
        brandName: store?.brandName!,
        industry: store?.industry!,
        logoImage: store?.logoImage!,
      };
      setstate({ ...newState });
    }
  }, [store]);
  const validationSchema = yup.object({
    brandName: yup
      .string()
      .required('Brand Name is required.')
      .min(5, 'Too Short please give least five characters')
      .max(20, 'Too Long !! only 20 characters allowed.'),

  });

  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: state,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const { brandName, industry, logoImage } = valz;

      await addBI({
        variables: {
          updateStoreInput: {
            id: store.id,
            shop: store.shop,
            brandName,
            industry,
            logoImage,
            installationStep: 2,
          },
        },
      });
      dispatch({ type: 'UPDATE_STORE', payload: valz });
      setParams({ ins: 2 });
      // console.log(valz);
      // setTimeout(() => resetForm(), 5000);
    },
  });
  const { getKeyFromS3URL } = useUtilityFunction();

  return (
    <Form noValidate onSubmit={handleSubmit} className={['mx-4', styles.welcome].join(' ')}>
      <h4 className="mt-3 mb-0">Enter your brand name</h4>
      <p>
        This identifies your business on your customers’ Groupshop page
      </p>

      <Row>
        <Col lg={10} className="d-flex ">
          <Form.Group className="col-11" controlId="brandNamevalidation">
            <Form.Control
              type="text"
              name="brandName"
              value={values.brandName}
              onChange={handleChange}
              isInvalid={touched.brandName && !!errors.brandName}
              placeholder="Brand Name ..."
            />

            <Form.Control.Feedback type="invalid" className={styles.welcome_error}>
              {errors.brandName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Text className={['col-2', styles.welcome_text_limit].join(' ')}>
            {values.brandName.length}
            {' '}
            /20
            {/* 0/20 */}
          </Form.Text>
        </Col>
      </Row>
      <Row className="mt-4"><h4>Upload your logo</h4></Row>
      <Row>
        <Form.Group className="mb-3 d-flex flex-wrap" controlId="brandinfoUploadLogo">
          {/* // eslint-disable-next-line react/jsx-no-bind */}
          <Col>
            <UploadButton
              setFieldValue={setFieldValue}
              field="logoImage"
              value={values.logoImage}
              className={styles.welcome_Obupload}
              url={getKeyFromS3URL(values.logoImage)}
            />

          </Col>
          <Col lg={9} className="d-flex align-items-center justify-content-start">
            <Form.Text className={['text-center d-flex align-self-center mx-2', styles.welcome_format].join(' ')}>
              Under 500 KB
              <br />
              (Formats: PNG, JPG, JPEG)

            </Form.Text>
          </Col>
        </Form.Group>
      </Row>
      <Row><h4>Select your industry</h4></Row>
      <Row>
        <Col lg={6}>
          {' '}
          <InputGroup>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleChange}
              name="industry"
              defaultValue={values.industry}
              value={values.industry}
            >
              <option className={styles.welcome_select} style={{ opacity: '0.1' }}>
                Click to select
              </option>
              <option value="Clothing/Fashion">Clothing/Fashion</option>
              <option value="Beauty & Self-Care">Beauty & Self-Care</option>
              <option value="Accessories">Accessories</option>
              <option value="Wellness">Wellness</option>
              <option value="Home">Home</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Outdoors">Outdoors</option>
              <option value="Pets">Pets</option>
            </select>
          </InputGroup>
        </Col>
      </Row>
      <Row />
      <Row className="mt-5 justify-content-center">
        <Col lg={4}>
          {/* <Button>Previous</Button> */}
        </Col>
        <Col lg={4} className="text-center d-flex align-items-center ">
          <span className="text-muted">1/4</span>
        </Col>
        <Col lg={4} className="d-flex justify-content-end ">
          <Button type="submit" className={styles.welcome_btn_next}> Next </Button>
          {/* onClick={() => setParams({ ins: 2 })} */}
        </Col>

      </Row>

    </Form>
  );
}
