import * as React from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, Form,
} from 'react-bootstrap';

export interface BannerDesignProps {
values: any;
errors: any;
touched: any;
handleChange: any;
handleForm: any;
setFieldValue?: any;
}

export default function BannerDesign(
  {
    values, errors, touched, handleChange, handleForm,
  }
  : BannerDesignProps,
) {
  return (
    <section className={styles.layout}>
      abcd
    </section>
  );
}
