/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, Form, Button, InputGroup,
} from 'react-bootstrap';
import { Industry } from 'components/Widgets/Industry';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import BannerDesign from 'components/Widgets/BannerDesign';
import ShowBanner from 'components/Widgets/ShowBanner';
import BannerLocation from 'components/Widgets/BannerLocation';
import DisplayBanner from 'components/Widgets/DisplayBanner';

export interface SettingsToolsProps {
    setFieldValue: any;
    handleSubmit: any;
    handleChange: any;
    errors: any;
    values: any;
    touched: any;
}

export default function LayoutSettings({
  setFieldValue, handleSubmit, handleChange, errors, values, touched,
} : SettingsToolsProps) {
  const handleForm = (field: string, value: string) => {
    setFieldValue(field, value);
    handleSubmit();
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row className={styles.layout}>
        <div className={styles.layout_settings}>Banner Design</div>
        <Col xl={7} lg={8} md={12}>
          {/* <ShowBanner
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            handleForm={handleForm}
            handleSubmit={handleSubmit}
            touched={touched}
          /> */}
          <section className={styles.layout__box_1}>
            <BannerDesign
              values={values}
              errors={errors}
              handleForm={handleForm}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              touched={touched}
            />
            <hr className={styles.layout__bannerDivider} />
            <BannerLocation
              values={values}
              errors={errors}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              handleForm={handleForm}
              touched={touched}
            />
          </section>
        </Col>
        <Col xl={5} lg={8} md={12} />
        <Col xl={12} lg={12} md={12}>
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
