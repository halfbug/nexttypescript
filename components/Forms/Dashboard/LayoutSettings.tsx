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
  bannerProductPage: any;
  bannerCartPage: any;
  bannerLocation: string | undefined;
  bannerDesign: string | undefined;
  bannerSummaryPage: string | undefined;
  callToActionText: string | undefined;
  }

export default function LayoutSettings() {
  const [updateLayout, { data, loading, error }] = useMutation<IStore>(UPDATE_STORE);
  const [formData, setformData] = useState({
    bannerProductPage: 1,
    bannerCartPage: 1,
    bannerLocation: '',
    bannerDesign: '',
    bannerSummaryPage: '',
    callToActionText: '',
  });

  const { store, dispatch } = React.useContext(StoreContext);

  useEffect(() => {
    if (store?.settings) {
      //   const { brandName, logoImage, industry } = store;
      console.log(store);
      const newState = {
        bannerProductPage: store?.bannerProductPage!,
        bannerCartPage: store?.bannerCartPage!,
        bannerLocation: store?.bannerLocation!,
        bannerDesign: store?.bannerDesign!,
        bannerSummaryPage: store?.bannerSummaryPage!,
        callToActionText: store?.callToActionText!,
      };
      setformData({ ...newState });
    }
  }, [store]);

  const validationSchema = yup.object({});
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
      const {
        // eslint-disable-next-line max-len
        bannerProductPage, bannerCartPage, bannerLocation, bannerDesign, bannerSummaryPage, callToActionText,
      } = valz;
      console.log({ valz });

      await updateLayout({
        variables: {
          updateStoreInput: {
            id: store.id,
            shop: store.shop,
            settings: {
              bannerProductPage: Boolean(parseInt(bannerProductPage, 10)),
              bannerCartPage: Boolean(parseInt(bannerCartPage, 10)),
              bannerLocation: "location",
              // bannerDesign: "GS_WHITE",
              // bannerSummaryPage: "RIGHT",
              callToActionText: "call text",

            },
          },
        },
      });
      dispatch({ type: 'UPDATE_STORE', payload: valz });
    },
  });
  const handleForm = (field: string, value: string) => {
    setFieldValue(field, value);
    handleSubmit();
  };
  console.log(store);
  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row className={styles.layout}>
        <h3>Product Page Banners</h3>
        <Col lg={7}>
          <ShowBanner
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            handleForm={handleForm}
            handleSubmit={handleSubmit}
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
