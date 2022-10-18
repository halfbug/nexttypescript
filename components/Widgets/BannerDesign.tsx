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
import ClassicBanner from './ClassicBanner';
import ClassicBannerBlack from './ClassicBannerBlack';
import ClassicCustomBanner from './ClassicCustomBanner';

// import Classic2 from 'assets/images/BannerDark.png';

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
    values, errors, touched, handleSubmit, handleForm, setFieldValue,
  }
    : BannerDesignProps,
) {
  const [bannerDesignStyle, setbannerDesignStyle] = useState('0');
  const [customColor, setcustomColor] = useState('#3C3C3C');

  useEffect(() => {
    if (values.settings?.layout) {
      setbannerDesignStyle(values.settings?.layout?.bannerStyle);
      setcustomColor(values.settings?.layout?.bannerCustomColor);
    }
  }, [values]);

  const handleFields = (field: string, value: string) => {
    if (field === 'bannerDesign') {
      setFieldValue('settings.layout.bannerStyle', '1');
      setFieldValue('settings.layout.bannerDesign', value);
      setFieldValue('settings.layout.bannerCustomColor', customColor);
    } else {
      setFieldValue('settings.layout.bannerStyle', bannerDesignStyle);
      setFieldValue(field, value);
    }
    handleSubmit();
  };

  return (
    <section>
      <h4 className="mt-0">
        Banner Design

      </h4>
      <div className={styles.layout__style_btns}>
        <div className={styles.layout__light_meduim_txt}>
          Select style:

        </div>
        <Button
          onClick={() => { setbannerDesignStyle('0'); }}
          variant="outline-primary"
          style={{ backgroundColor: bannerDesignStyle === '0' ? '#D5FA52' : '' }}
          className={`${styles.layout__modern_btn}`}
        >
          Modern

        </Button>
        {' '}
        <Button
          onClick={() => { setbannerDesignStyle('1'); }}
          variant="outline-primary"
          style={{ backgroundColor: bannerDesignStyle === '1' ? '#DCD0E8' : '' }}
          className={`${styles.layout__classic_btn}`}
        >
          Classic

        </Button>
        {' '}
      </div>
      <Row className={bannerDesignStyle === '0' ? 'd-flex flex-wrap' : 'd-none'}>
        <Col lg={12} className="mt-2 px-1">
          <Form.Check
            className={styles.layout__checkbox}
            type="radio"
          >
            <Form.Check.Input
              type="radio"
              name="bnr"
              checked={values?.settings?.layout?.bannerDesign === '001'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="001"
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
              checked={values?.settings?.layout?.bannerDesign === '002'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="002"
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
              checked={values?.settings?.layout?.bannerDesign === '003'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="003"
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
              checked={values?.settings?.layout?.bannerDesign === '004'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="004"
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
      <Row className={bannerDesignStyle === '1' ? 'd-flex flex-wrap' : 'd-none'}>
        <Col lg={12} className="mt-2 px-1">

          <Form.Check
            className={styles.layout__checkbox}
            type="radio"
          >
            <Form.Check.Input
              type="radio"
              name="bnr"
              checked={values?.settings?.layout?.bannerDesign === '101'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="101"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label>
              <div className="mx-2">
                {/* <BannerComponent image={Classic1} /> */}
                <ClassicBanner />
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
              checked={values?.settings?.layout?.bannerDesign === '102'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="102"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label>
              <div className="mx-2">
                <ClassicBannerBlack />

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
              checked={values?.settings?.layout?.bannerDesign === '103'}
              onChange={(e) => {
                handleFields('settings.layout.bannerDesign', e.currentTarget.value);
              }}
              value="103"
              className={styles.layout__checkbox__input}
            />
            <Form.Check.Label>
              <div className="mx-2">
                <ClassicCustomBanner />
              </div>
            </Form.Check.Label>
          </Form.Check>

          {/* <Form.Check
            className="p-2 d-flex align-items-center"
            type="radio"
          > */}
          {/* <Form.Check.Input
              type="radio"
              name="bnr"
              checked={values?.settings?.layout?.bannerDesign === '104'}
              onChange={(e) => {
                handleFields('bannerDesign', e.currentTarget.value);
              }}
              value="104"
              className={styles.layout__checkbox__input}
            /> */}
          {/* <Form.Check.Label>
            <div className=" mx-2">
              Custom Color
            </div>
          </Form.Check.Label> */}
          {/* </Form.Check> */}
          {/* <Form.Label htmlFor="exampleColorInput">Custom Color</Form.Label>
          <Form.Control
            type="color"
            id="exampleColorInput"
            defaultValue="#D3DEDC"
            title="Choose your color"
          /> */}
          <div className="row mx-3 col-8">
            <Form.Group className="row mx-3">
              <span className={[styles.ob_settings__bannerCustomColor, 'w-50 d-flex align-items-center  border border-2 rounded-3 pe-0'].join(' ')}>
                <Form.Label htmlFor="bannerCustomColor" className="text-nowrap mb-0  pt-0  form-label form-labelGS">Custom Color</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    handleForm('settings.layout.bannerCustomColor', e.currentTarget.value);
                  }}
                  type="color"
                  name="bannerCustomColor"
                  id="bannerCustomColor"
                  isInvalid={touched?.bannerCustomColor && !!errors?.bannerCustomColor}
                  // defaultValue="#D3DEDC"
                  defaultValue={customColor}
                  title="Choose your color"
                  className="ms-3 w-100 border-dark p-0 m-0 rounded-end pe-0"
                  bsPrefix="onboarding"
                  value={values?.settings?.layout?.bannerCustomColor}
                />
              </span>
              {' '}
              <Form.Control.Feedback type="invalid">
                {errors?.bannerCustomColor}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

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
