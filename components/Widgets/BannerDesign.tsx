/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
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
  setFieldValue?: any;
}

export default function BannerDesign(
  {
    values, errors, touched, handleChange, handleForm,
  }
    : BannerDesignProps,
) {
  return (
    <section className={styles.layout__box_1}>
      <h4 className="mt-0">
        Banner Design

      </h4>
      <div className={styles.layout__style_btns}>
        <div className={styles.layout__light_meduim_txt}>
          Select style:

        </div>
        <Button variant="outline-primary" className={styles.layout__modern_btn}>
          Modern

        </Button>
        {' '}
        <Button variant="outline-primary" className={styles.layout__classic_btn}>
          Classic

        </Button>
        {' '}
      </div>
      <Row>
        <Col lg={12} className="mt-2 px-1">
          <Form.Check
            className={styles.layout__checkbox}
            onChange={(e) => handleChange(e)}
            type="radio"
          >
            <Form.Check.Input type="radio" name="bnr" className={styles.layout__checkbox__input} />
            <Form.Check.Label>
              <div className="mx-2">
                <BannerComponent image={B1} />
              </div>
            </Form.Check.Label>
          </Form.Check>
          <Form.Check
            className="p-2 d-flex align-items-center"
            onChange={(e) => handleChange(e)}
            type="radio"
          >
            <Form.Check.Input type="radio" name="bnr" className={styles.layout__checkbox__input} />
            <Form.Check.Label>
              <div className="mx-2">
                <BannerComponent image={B2} />
              </div>
            </Form.Check.Label>
          </Form.Check>
          <Form.Check
            className="p-2 d-flex align-items-center"
            onChange={(e) => handleChange(e)}
            type="radio"
          >
            <Form.Check.Input type="radio" name="bnr" className={styles.layout__checkbox__input} />
            <Form.Check.Label>
              <div className="mx-2">
                <BannerComponent image={B3} />
              </div>
            </Form.Check.Label>
          </Form.Check>
          <Form.Check
            className="p-2 d-flex align-items-center"
            onChange={(e) => handleChange(e)}
            type="radio"
          >
            <Form.Check.Input type="radio" name="bnr" className={styles.layout__checkbox__input} />
            <Form.Check.Label>
              <div className=" mx-2">
                <BannerComponent image={B4} />
              </div>
            </Form.Check.Label>
          </Form.Check>
        </Col>
      </Row>
      <hr className={styles.layout__sperator} />
      <h4 className="mt-0">
        Select the call-to-action that customer will see
      </h4>
      <Row>
        <Col lg={12} className="mt-2 px-1">
          <Form.Check
            className="p-2"
            onChange={(e) => handleChange(e)}
            type="radio"
          >
            <Form.Check.Input type="radio" name="cashback" className={styles.layout__checkbox__input} />
            <Form.Check.Label className={styles.layout__checkbox__input__label}>
              <span className="pe-1">Shop with friends, get $50 cashback.</span>
              <span className={styles.badge}>Recommended</span>
            </Form.Check.Label>
          </Form.Check>
          <Form.Check
            className="px-2 py-1"
            onChange={(e) => handleChange(e)}
            type="radio"
          >
            <Form.Check.Input type="radio" name="cashback" className={styles.layout__checkbox__input} />
            <Form.Check.Label className={styles.layout__checkbox__input__label}>
              Shop with friends, get up to 90% back.
            </Form.Check.Label>
          </Form.Check>
        </Col>
      </Row>
    </section>
  );
}
