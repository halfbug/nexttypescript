/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import styles from 'styles/DbSetting.module.scss';
import {
  Row, Col, Form, Button, InputGroup,
} from 'react-bootstrap';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useMutation } from '@apollo/client';
import { UPDATE_STORE } from 'store/store.graphql';
import { IStore } from 'types/store';
import UploadButton from 'components/Buttons/UploadBtn';
import BrandName from 'components/Widgets/BrandName';
import { Industry } from 'components/Widgets/Industry';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';

interface IValues {
    brandName: string | undefined;
    industry: string | undefined;
    logoImage: string | undefined;
    // onChange: any;
    // setFieldValue: ()=>void;
  }

export default function GeneralSettings() {
  const [updateBI, { data, loading, error }] = useMutation<IStore>(UPDATE_STORE);
  const [formData, setformData] = useState({
    brandName: '',
    logoImage: '',
    industry: '',
  });

  const { store, dispatch } = React.useContext(StoreContext);

  useEffect(() => {
    if (store?.brandName || store?.logoImage || store?.industry) {
    //   const { brandName, logoImage, industry } = store;
      console.log(store);
      const newState = {
        brandName: store?.brandName!,
        logoImage: store?.logoImage!,
        industry: store?.industry!,
      };
      setformData({ ...newState });
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
    initialValues: formData,
    validationSchema,
    validateOnChange: false,
    enableReinitialize: true,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const { brandName, industry, logoImage } = valz;
      console.log({ valz });

      await updateBI({
        variables: {
          updateStoreInput: {
            id: store.id,
            shop: store.shop,
            brandName,
            industry,
            logoImage,
          },
        },
      });
      dispatch({ type: 'UPDATE_STORE', payload: valz });
    },
  });
  const handleForm = (field: string, value: string) => {
    setFieldValue(field, value);
    console.log("🚀 ~ file: GeneralSettings.tsx ~ line 83 ~ handleForm ~ value", field);
    handleSubmit();
  };
  return (
    <Form noValidate onSubmit={handleSubmit}>

      <Row className={styles.setting_col}>
        <Col lg={8}>
          <BrandName
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            handleForm={handleForm}
            touched={touched}
          />

          <Row className="mt-3"><h4>Upload your logo</h4></Row>
          <Row>

            <Form.Group className="mb-3 d-flex" controlId="brandinfoUploadLogo">
              {/* // eslint-disable-next-line react/jsx-no-bind */}
              <UploadButton
                icon={(<WhiteButton>Upload</WhiteButton>)}
                setFieldValue={setFieldValue}
                field="logoImage"
                value={values.logoImage}
                handleForm={handleForm}
              />
              <Form.Text className="text-muted p-2 align-self-center">
                Under 5 MB (Formats: PNG, JPG, JPEG)
              </Form.Text>
            </Form.Group>
          </Row>
          <Row />
        </Col>
        <Col lg={4} className={styles.setting_col_greenbox}>
          <Industry
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            handleForm={handleForm}
            touched={touched}
          />

        </Col>
      </Row>
    </Form>
  );
}
