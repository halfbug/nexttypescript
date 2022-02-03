import * as React from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, Form,
} from 'react-bootstrap';

export interface DisplayBannerProps {
values: any;
errors: any;
touched: any;
handleChange: any;
handleForm: any;
setFieldValue?: any;
}

export default function DisplayBanner(
  {
    values, errors, touched, handleChange, handleForm,
  }
  : DisplayBannerProps,
) {
  return (
    <section className={styles.layout}>
      abcd
    </section>
  );
}
