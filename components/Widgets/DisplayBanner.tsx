/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useContext } from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, Form,
} from 'react-bootstrap';
import LeftBanner from 'assets/images/Left-thankyou.png';
import RightBanner from 'assets/images/Right-thankyou.png';
import BothBanner from 'assets/images/Both-thankyou.png';
import NoneBanner from 'assets/images/None-thankyou.png';

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
  const [bannerName, setBannerName] = useState('');

  useEffect(() => {
    if (values) {
      if (values?.settings?.layout?.bannerSummaryPage === 'Right') {
        setBannerName(RightBanner.src);
      } else if (values?.settings?.layout?.bannerSummaryPage === 'Left') {
        setBannerName(LeftBanner.src);
      } else if (values?.settings?.layout?.bannerSummaryPage === 'None') {
        setBannerName(NoneBanner.src);
      } else {
        setBannerName(BothBanner.src);
      }
    }
  }, [values]);
  return (
    <section className={styles.layout__box_orange}>
      <Row>
        <Col xxl={7} xl={6} lg={4}>
          <h4 className="mt-0">
            Display banners on your order summary page

          </h4>
          <h6 className="mt-2">
            Let your customers know they can share your brand and earn cashback with dedicated
            banners after checkout. We recommend keeping these turned on.
          </h6>
          <Row>
            <Col lg={12} className="mt-2 px-1">
              <Form.Check
                className="p-2"
                type="radio"
              >
                <Form.Check.Input
                  type="radio"
                  value="Both"
                  checked={values?.settings?.layout?.bannerSummaryPage === 'Both'}
                  onChange={(e) => {
                    handleForm('settings.layout.bannerSummaryPage', e.currentTarget.value);
                  }}
                  name="bannerSummaryPage"
                  className={styles.layout__checkbox__input}
                />
                <Form.Check.Label className={styles.layout__checkbox__input__label}>
                  Show both
                  <span className={styles.badge}>Recommended</span>
                </Form.Check.Label>
              </Form.Check>
              <Form.Check
                className="p-2"
                type="radio"
              >
                <Form.Check.Input
                  type="radio"
                  value="Left"
                  checked={values?.settings?.layout?.bannerSummaryPage === 'Left'}
                  onChange={(e) => {
                    handleForm('settings.layout.bannerSummaryPage', e.currentTarget.value);
                  }}
                  name="bannerSummaryPage"
                  className={styles.layout__checkbox__input}
                />
                <Form.Check.Label className={styles.layout__checkbox__input__label}>
                  Show left one only
                </Form.Check.Label>
              </Form.Check>
              <Form.Check
                className="p-2"
                type="radio"
              >
                <Form.Check.Input
                  type="radio"
                  value="Right"
                  checked={values?.settings?.layout?.bannerSummaryPage === 'Right'}
                  onChange={(e) => {
                    handleForm('settings.layout.bannerSummaryPage', e.currentTarget.value);
                  }}
                  name="bannerSummaryPage"
                  className={styles.layout__checkbox__input}
                />
                <Form.Check.Label className={styles.layout__checkbox__input__label}>
                  Show right one only
                </Form.Check.Label>
              </Form.Check>
              <Form.Check
                className="p-2"
                type="radio"
              >
                <Form.Check.Input
                  type="radio"
                  value="None"
                  checked={values?.settings?.layout?.bannerSummaryPage === 'None'}
                  onChange={(e) => {
                    handleForm('settings.layout.bannerSummaryPage', e.currentTarget.value);
                  }}
                  name="bannerSummaryPage"
                  className={styles.layout__checkbox__input}
                />
                <Form.Check.Label className={styles.layout__checkbox__input__label}>
                  Don’t show
                </Form.Check.Label>
              </Form.Check>
            </Col>
          </Row>
        </Col>
        <Col xxl={5} xl={6} lg={8} className="d-flex justify-content-end">
          <img src={`${bannerName}`} alt="Banner" className="img-fluid" />
        </Col>
      </Row>
    </section>
  );
}
