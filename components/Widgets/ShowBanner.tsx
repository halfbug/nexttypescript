import * as React from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, ToggleButtonGroup, ToggleButton, Container, Button,
} from 'react-bootstrap';
import { Check2Circle, InfoCircle, XCircle } from 'react-bootstrap-icons';
import DisableButton from 'assets/images/disable-btn-icon.svg';

export interface ShowBannerProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleForm: any;
  handleSubmit: any;
  setFieldValue?: any;
}

export default function ShowBanner(
  {
    values, errors, touched, handleChange, handleForm, handleSubmit,
  }
    : ShowBannerProps,
) {
  return (
    <section className={styles.layout__box_3}>
      <h4 className="mt-0">
        Show Groupshop banner on product pages
        <span className={styles.badge}>Recommended</span>
      </h4>
      <Row className={styles.layout__light_txt}>
        Help customers learn about Groupshop’s rewards as they shop on your store.
      </Row>
      <Row className="mt-2 me-2 mb-2">
        <Col lg={12} md={6} className="text-right">
          <ToggleButtonGroup
            type="radio"
            name="bannerProductPage"
            value={+values.settings?.layout?.bannerProductPage}
          >
            <ToggleButton
              variant={(+values.settings?.layout?.bannerProductPage) ? 'outline-success' : 'outline-primary'}
              className={(+values.settings?.layout?.bannerProductPage)
                ? styles.layout__enable_btn : styles.layout__disable_btn}
              id="bannerProductPage-e"
              value={1}
              onChange={(e) => {
                handleForm('settings.layout.bannerProductPage', e.currentTarget.value);
              }}
            >
              <Check2Circle className="fs-4" />
              {' '}
              Enable
            </ToggleButton>

            <ToggleButton
              variant="outline-danger"
              className={styles.layout__disable_btn}
              id="bannerProductPage-d"
              value={0}
              onChange={(e) => {
                handleForm('settings.layout.bannerProductPage', e.currentTarget.value);
              }}
            >
              <DisableButton className="fs-5" />
              {' '}
              Disable
            </ToggleButton>

          </ToggleButtonGroup>
        </Col>
      </Row>
      <hr className={styles.layout__sperator} />
      <h4>
        Show Groupshop banner on cart page
        <span className={styles.badge}>Recommended</span>
      </h4>
      <Row className={styles.layout__light_txt}>
        Remind customers about Groupshop’s rewards right before their purchase.
      </Row>
      <Row className="mt-2 me-2 mb-2">
        <Col lg={12} md={6} className="text-right">
          <ToggleButtonGroup
            value={+values.settings?.layout?.bannerCartPage}
            type="radio"
            name="bannerCartPage"
          >
            <ToggleButton
              variant={(+values.settings?.layout?.bannerCartPage) ? 'outline-success' : 'outline-primary'}
              className={(+values.settings?.layout?.bannerCartPage)
                ? styles.layout__enable_btn : styles.layout__disable_btn}
              id="bannerCartPage-e"
              value={1}
              onChange={(e) => {
                handleForm('settings.layout.bannerCartPage', e.currentTarget.value);
              }}
            >
              <Check2Circle className="fs-4" />
              {' '}
              Enable
            </ToggleButton>

            <ToggleButton
              variant="outline-danger"
              className={styles.layout__disable_btn}
              id="bannerCartPage-d"
              value={0}
              onChange={(e) => {
                handleForm('settings.layout.bannerCartPage', e.currentTarget.value);
              }}
            >
              <DisableButton className="fs-5" />
              {' '}
              Disable
            </ToggleButton>

          </ToggleButtonGroup>
        </Col>
      </Row>
    </section>
  );
}