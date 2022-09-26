/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, Form, Button,
} from 'react-bootstrap';

import B1 from 'assets/images/GS-1.png';
import B2 from 'assets/images/GS-2.png';
import B3 from 'assets/images/GS-3.png';
import B4 from 'assets/images/GS-4.png';
import BannerComponent from './BannerComponent';

export interface BannerDesignProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleForm: any;
  handleSubmit: any;
  setFieldValue?: any;
}

export default function BannerDesign(
  {
    values, errors, touched, handleChange, handleSubmit, handleForm, setFieldValue,
  }
    : BannerDesignProps,
) {
  const [bannerDesignStyle, setbannerDesignStyle] = useState('Modern');
  const [customColor, setcustomColor] = useState('#3C3C3C');
  const [modernClass, setmodernClass] = useState('');
  const [classicClass, setclassicClass] = useState('');

  useEffect(() => {
    if (values.settings?.layout) {
      setbannerDesignStyle(values.settings?.layout?.bannerStyle);
      setcustomColor(values.settings?.layout?.bannerCustomColor);
      setmodernClass((values.settings?.layout?.bannerStyle === 'Modern') ? 'active-btn' : '');
      setclassicClass((values.settings?.layout?.bannerStyle === 'Classic') ? 'active-btn' : '');
    }
  }, [values]);

  const handleFields = (field: string, value: string) => {
    if (field === 'bannerDesign') {
      setFieldValue('settings.layout.bannerStyle', 'Classic');
      setFieldValue('settings.layout.bannerDesign', value);
      setFieldValue('settings.layout.bannerCustomColor', customColor);
    } else {
      setFieldValue('settings.layout.bannerStyle', bannerDesignStyle);
      setFieldValue(field, value);
      setmodernClass((bannerDesignStyle === 'Modern') ? 'active-btn' : '');
      setclassicClass((bannerDesignStyle === 'Classic') ? 'active-btn' : '');
    }
    handleSubmit();
  };

  return (
    <section className={styles.layout__box_1}>
      <h4 className="mt-0">
        Banner Design

      </h4>
      <div className={styles.layout__style_btns}>
        <div className={styles.layout__light_meduim_txt}>
          Select style:

        </div>
        <Button onClick={() => { setbannerDesignStyle('Modern'); setmodernClass('active-btn'); setclassicClass(''); }} variant="outline-primary" className={`${styles.layout__modern_btn} ${modernClass}`}>
          Modern

        </Button>
        {' '}
        <Button onClick={() => { setbannerDesignStyle('Classic'); setclassicClass('active-btn'); setmodernClass('Modern'); }} variant="outline-primary" className={`${styles.layout__classic_btn} ${classicClass}`}>
          Classic

        </Button>
        {' '}
      </div>
      <Row className={bannerDesignStyle === 'Modern' ? 'd-flex flex-wrap' : 'd-none'}>
        <Col lg={12} className="mt-2 px-1">
          <Form.Check
            className={styles.layout__checkbox}
            type="radio"
          >
            <Form.Check.Input
              type="radio"
              name="bnr"
              checked={values?.settings?.layout?.bannerDesign === 'Modern_1'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="Modern_1"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label>
              <div className="mx-2">
                <BannerComponent image={B1} />
              </div>
            </Form.Check.Label>
          </Form.Check>

          <Form.Check
            className="p-2 d-flex align-items-center"
            type="radio"
          >
            <Form.Check.Input
              type="radio"
              name="bnr"
              checked={values?.settings?.layout?.bannerDesign === 'Modern_2'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="Modern_2"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label>
              <div className="mx-2">
                <BannerComponent image={B2} />
              </div>
            </Form.Check.Label>
          </Form.Check>

          <Form.Check
            className="p-2 d-flex align-items-center"
            type="radio"
          >
            <Form.Check.Input
              type="radio"
              name="bnr"
              checked={values?.settings?.layout?.bannerDesign === 'Modern_3'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="Modern_3"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label>
              <div className="mx-2">
                <BannerComponent image={B3} />
              </div>
            </Form.Check.Label>
          </Form.Check>

          <Form.Check
            className="p-2 d-flex align-items-center"
            type="radio"
          >
            <Form.Check.Input
              type="radio"
              name="bnr"
              checked={values?.settings?.layout?.bannerDesign === 'Modern_4'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="Modern_4"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label>
              <div className=" mx-2">
                <BannerComponent image={B4} />
              </div>
            </Form.Check.Label>
          </Form.Check>
        </Col>
      </Row>
      <Row className={bannerDesignStyle === 'Classic' ? 'd-flex flex-wrap' : 'd-none'}>
        <Col lg={12} className="mt-2 px-1">

          <Form.Check
            className={styles.layout__checkbox}
            type="radio"
          >
            <Form.Check.Input
              type="radio"
              name="bnr"
              checked={values?.settings?.layout?.bannerDesign === 'Classic_1'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="Classic_1"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label>
              <div className="mx-2">
                <BannerComponent image={B2} />
              </div>
            </Form.Check.Label>
          </Form.Check>

          <Form.Check
            className="p-2 d-flex align-items-center"
            type="radio"
          >
            <Form.Check.Input
              type="radio"
              name="bnr"
              checked={values?.settings?.layout?.bannerDesign === 'Classic_2'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="Classic_2"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label>
              <div className="mx-2">
                <BannerComponent image={B3} />
              </div>
            </Form.Check.Label>
          </Form.Check>

          <Form.Check
            className="p-2 d-flex align-items-center"
            type="radio"
          >
            <Form.Check.Input
              type="radio"
              name="bnr"
              checked={values?.settings?.layout?.bannerDesign === 'Classic_3'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="Classic_3"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label>
              <div className="mx-2">
                <BannerComponent image={B1} />
              </div>
            </Form.Check.Label>
          </Form.Check>

          <Form.Check
            className="p-2 d-flex align-items-center"
            type="radio"
          >
            <Form.Check.Input
              type="radio"
              name="bnr"
              checked={values?.settings?.layout?.bannerDesign === 'bannerCustomColor'}
              onChange={(e) => {
                handleFields('bannerDesign', e.currentTarget.value);
              }}
              value="bannerCustomColor"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label>
              <div className=" mx-2">
                Custom Color
              </div>
            </Form.Check.Label>
          </Form.Check>

          <Form.Group className="d-flex ">
            <span className={styles.ob_settings__bannerCustomColor}>
              <Form.Label htmlFor="bannerCustomColor" className="m-0 py-1 px-3 pe-5">Click to pick</Form.Label>
              <Form.Control
                onChange={(e) => {
                  handleForm('settings.layout.bannerCustomColor', e.currentTarget.value);
                }}
                type="color"
                name="bannerCustomColor"
                id="bannerCustomColor"
                isInvalid={touched?.bannerCustomColor && !!errors?.bannerCustomColor}
                defaultValue={customColor}
                title="Choose your color"
                className="p-0 m-0 rounded-end"
                bsPrefix="onboarding"
                value={values?.settings?.layout?.bannerCustomColor}
              />
            </span>
            {' '}
            <Form.Control.Feedback type="invalid">
              {errors?.bannerCustomColor}
            </Form.Control.Feedback>
          </Form.Group>

        </Col>
      </Row>
      {/* <hr className={styles.layout__sperator} />
      <h4 className="mt-0">
        Select the call-to-action that customer will see
      </h4>
      <Row>
        <Col lg={12} className="mt-2 px-1">
          <Form.Check
            className="p-2"
            type="radio"
          >
            <Form.Check.Input
              type="radio"
              value="1"
              checked={values?.settings?.layout?.callToActionText === '1'}
              onChange={(e) => {
                handleForm('settings.layout.callToActionText', e.currentTarget.value);
              }}
              name="calltoaction"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label className={styles.layout__checkbox__input__label}>
              <span className="pe-1">Shop with friends, get $50 cashback.</span>
              <span className={styles.badge}>Recommended</span>
            </Form.Check.Label>
          </Form.Check>
          <Form.Check
            className="px-2 py-1"
            type="radio"
          >
            <Form.Check.Input
              type="radio"
              value="2"
              checked={values?.settings?.layout?.callToActionText === '2'}
              onChange={(e) => {
                handleForm('settings.layout.callToActionText', e.currentTarget.value);
              }}
              name="calltoaction"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label className={styles.layout__checkbox__input__label}>
              Shop with friends, get up to 90% back.
            </Form.Check.Label>
          </Form.Check>
        </Col>
      </Row> */}

    </section>
  );
}
