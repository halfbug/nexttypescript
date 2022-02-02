import React from 'react';
import styles from 'styles/GeneralForm.module.scss';

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
    <>
      <h4 className={styles.generalform_subheading}>Your Industry</h4>
      {' '}
      <select
        className="form-select"
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
    </>

  );
}
