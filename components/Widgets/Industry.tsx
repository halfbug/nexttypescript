import React from 'react';
import styles from 'styles/GeneralForm.module.scss';
import {
  Col, Row,
} from 'react-bootstrap';

export interface IAppProps {
values: any;
errors: any;
touched: any;
handleChange: any;
handleForm: any;
setFieldValue: any;

}

export function Industry(
  {
    values, errors, touched, handleChange, handleForm, setFieldValue,
  }
      : IAppProps,
) {
  return (
    <section className={styles.generalform_greenbox}>
      <h4 className={styles.generalform_subheading}>Your Industry</h4>
      <Row>
        <h6 className={styles.generalform_light_txt}>
          This informs calculations for your Analytics page.
        </h6>
      </Row>
      <select
        aria-label="Default select example"
        name="industry"
        className={styles.generalform__select}
        onChange={(e) => {
          handleForm('industry', e.currentTarget.value);
        }}
        defaultValue={values.industry}
        value={values.industry}
      >
        <option>Click to select</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </section>

  );
}
