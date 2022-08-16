import React from 'react';
import styles from 'styles/GeneralForm.module.scss';
import Multiselect from 'multiselect-react-dropdown';
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
  const updateIndustry = (value: any) => {
    setFieldValue('industry', value);
  };
  return (
    <section className={styles.generalform_greenbox}>
      <h4 className={styles.generalform_subheading}>Your Industry</h4>
      <Row className="pt-1">
        <h6 className={styles.generalform_light_txt}>
          This informs calculations for your Analytics page.
        </h6>
      </Row>
      <Multiselect
        isObject={false}
        selectedValues={values.industry}
        onKeyPressFn={(e) => {
          updateIndustry(e);
        }}
        onSearch={(e) => {
          updateIndustry(e);
        }}
        onRemove={(e) => {
          updateIndustry(e);
        }}
        onSelect={(e) => {
          updateIndustry(e);
        }}
        options={[
          'Womens Apparel', 'Mens Apparel', 'Kids & Baby', 'Womens footwear', 'Mens Footwear', 'Hair care',
          'Wellness', 'Make up', 'Skin care', 'Self Care', 'Fitness', 'Food & Drink', 'Home & Garden',
          'Outdoors', 'Womens Accessories', 'Mens Accessories', 'Jewelry', 'Fitness', 'Health',
        ]}
      />
    </section>

  );
}
