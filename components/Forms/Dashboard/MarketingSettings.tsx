/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import styles from 'styles/Marketing.module.scss';
import {
  Row, Col, Form, Button, InputGroup,
} from 'react-bootstrap';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useMutation } from '@apollo/client';
import { UPDATE_STORE } from 'store/store.graphql';
import { IStore, ISocialLink, ISettings } from 'types/store';
import MarketingTools from 'components/Widgets/MarketingTools';
import CustomerActivation from 'components/Widgets/CustomerActivation';
import Integrations from 'components/Widgets/Integrations';

export interface SettingsToolsProps {
    setFieldValue: any;
    handleSubmit: any;
    handleChange: any;
    errors: any;
    values: any;
    touched: any;
}

export default function MarketingSettings({
  setFieldValue, handleSubmit, handleChange, errors, values, touched,
} : SettingsToolsProps) {
  const handleForm = (field: string, value: string) => {
    setFieldValue(field, value);
    handleSubmit();
  };

  return (
    <Row className={styles.marketing}>
      <Col lg={8}>
        <h3 className="pb-1">Marketing Tools</h3>
        {/* <MarketingTools
          values={values}
          handleForm={handleForm}
        /> */}
        <CustomerActivation />
        <Integrations
          values={values}
          handleForm={handleForm}
        />
      </Col>
    </Row>
  );
}
