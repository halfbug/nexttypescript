/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import styles from 'styles/LayoutForm.module.scss';
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
import BannerDesign from 'components/Widgets/BannerDesign';
import ShowBanner from 'components/Widgets/ShowBanner';
import BannerLocation from 'components/Widgets/BannerLocation';
import DisplayBanner from 'components/Widgets/DisplayBanner';

interface IValues {
    brandName: string | undefined;
    industry: string | undefined;
    logoImage: string | undefined;
    // onChange: any;
    // setFieldValue: ()=>void;
  }

export default function LayoutSettings() {
  const [updateLayout, { data, loading, error }] = useMutation<IStore>(UPDATE_STORE);
  const [formData, setformData] = useState({
    brandName: '',
    logoImage: '',
    industry: '',
  });

  const { store, dispatch } = React.useContext(StoreContext);

  //   useEffect(() => {
  //     if (store?.brandName || store?.logoImage || store?.industry) {
  //     //   const { brandName, logoImage, industry } = store;
  //       console.log(store);
  //       const newState = {
  //         brandName: store?.brandName!,
  //         logoImage: store?.logoImage!,
  //         industry: store?.industry!,
  //       };
  //       setformData({ ...newState });
  //     }
  //   }, [store]);

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

      await updateLayout({
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
    console.log("🚀 ~ file: LayoutSettings.tsx ~ line 83 ~ handleForm ~ value", field);
    handleSubmit();
  };
  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row className="fw-bolder, lh-base, px-0, fs-3, mt-5, mb-2"><h4>Product Page Banners</h4></Row>
      <Row className={styles.layout}>
        <Col lg={7}>
          <ShowBanner
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            handleForm={handleForm}
            touched={touched}
          />
        </Col>
        <Col lg={5}>
          <BannerLocation
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            handleForm={handleForm}
            touched={touched}
          />
        </Col>
        <Col lg={7}>
          <BannerDesign
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleForm={handleForm}
            touched={touched}
          />
        </Col>
        <Col lg={12}>
          <DisplayBanner
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
