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
        <h6 className="text-muted">
          This informs calculations for your Analytics page.
        </h6>
      </Row>
      <select
        className="mt-3 form-select w-75"
        aria-label="Default select example"
        name="industry"
        onChange={(e) => {
          handleForm('industry', e.currentTarget.value);
        }}
      >
        <option>Click to select</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </section>

  );
}
