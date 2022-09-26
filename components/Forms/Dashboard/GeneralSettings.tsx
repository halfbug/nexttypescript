/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import styles from 'styles/GeneralForm.module.scss';
import {
  Row, Col, Form, Button, InputGroup,
} from 'react-bootstrap';
import BrandName from 'components/Widgets/BrandName';
import { Industry } from 'components/Widgets/Industry';
import DBSettings from 'components/Forms/Dashboard/DBSettings';
import SettingSocialMedia from 'components/Forms/Dashboard/SettingSocialMedia';

export interface SettingsToolsProps {
    setFieldValue: any;
    handleSubmit: any;
    handleChange: any;
    errors: any;
    values: any;
    touched: any;
}

export default function GeneralSettings({
  setFieldValue, handleSubmit, handleChange, errors, values, touched,
} : SettingsToolsProps) {
  const handleForm = (field: string, value: string) => {
    console.log('image uploaded and in db too');
    setFieldValue(field, value);
    console.log("🚀 ~ file: GeneralSettings.tsx ~ line 83 ~ handleForm ~ value", field);
    handleSubmit();
  };

  const handleCustomBg = (field: string, value: string) => {
    if (field === 'customBg') {
      setFieldValue('imageUrl', '');
      setFieldValue('youtubeUrl', '');
      setFieldValue('customColor', '');
    } else {
      setFieldValue('customColor', '');
      setFieldValue('customBg', '');
    }
    setFieldValue(field, value);
    handleSubmit();
  };
  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row className={styles.generalform}>
        <h3 className=" pt-3 pb-2">Brand Details</h3>
        <Col lg={7}>
          <BrandName
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            handleForm={handleForm}
            touched={touched}
          />
        </Col>
        <Col lg={5}>
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
      <Row className={styles.generalform}>
        <h3 className=" pt-3 pb-2">Branding</h3>
        <Col lg={7}>
          <DBSettings
            values={values}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            setFieldValue={setFieldValue}
            handleCustomBg={handleCustomBg}
            isEdit={false}
            handleForm={handleForm}
          />
        </Col>
        <Col lg={5}>
          <SettingSocialMedia
            setFieldValue={setFieldValue}
            values={values}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        </Col>
      </Row>
    </Form>
  );
}
