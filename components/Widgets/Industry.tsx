import React from 'react';
import styles from 'styles/GeneralForm.module.scss';
import {
  Col, Row, Form,
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
        <h6 className={['pt-2', styles.generalform_light_txt].join(' ')}>
          This informs calculations for your Analytics page.
        </h6>
      </Row>
      {/* <select
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
        <option value="Clothing/Fashion">Clothing/Fashion</option>
        <option value="Beauty & Self-Care">Beauty & Self-Care</option>
        <option value="Accessories">Accessories</option>
        <option value="Wellness">Wellness</option>
        <option value="Home">Home</option>
        <option value="Food & Beverage">Food & Beverage</option>
        <option value="Outdoors">Outdoors</option>
        <option value="Pets">Pets</option>
      </select> */}
      <Form.Select
        aria-label="Default select example"
        className={['mt-2', styles.generalform__select].join(' ')}
        onChange={(e) => {
          handleForm('industry', e.currentTarget.value);
        }}
        defaultValue={values.industry}
        value={values.industry}
      >
        <option>Click to select</option>
        <option value="Clothing/Fashion">Clothing/Fashion</option>
        <option value="Beauty & Self-Care">Beauty & Self-Care</option>
        <option value="Accessories">Accessories</option>
        <option value="Wellness">Wellness</option>
        <option value="Home">Home</option>
        <option value="Food & Beverage">Food & Beverage</option>
        <option value="Outdoors">Outdoors</option>
        <option value="Pets">Pets</option>
      </Form.Select>
    </section>

  );
}
