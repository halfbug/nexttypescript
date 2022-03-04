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

            <Form.Control.Feedback type="invalid">
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
        {/* <Col lg={2} className={styles.welcome_digits}>
          <Form.Text className="mx-0 text-muted align-baseline">
            0/20
          </Form.Text>
        </Col> */}
      </Row>
      <Row className="mt-4"><h4>Upload your logo</h4></Row>
      <Row>
        <Form.Group className="mb-3 d-flex " controlId="brandinfoUploadLogo">
          {/* // eslint-disable-next-line react/jsx-no-bind */}
          <UploadButton
            setFieldValue={setFieldValue}
            field="logoImage"
            value={values.logoImage}
          />
          <Col lg={9} className="d-flex align-items-center justify-content-start">
            <Form.Text className="text-muted text-center d-flex align-self-center mx-2">

              Under 5 MB
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
              defaultValue=""
              value={values.industry}
            >
              <option value="" className={styles.welcome_select}>Click to select</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
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
