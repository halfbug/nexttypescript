/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, Form, Button,
} from 'react-bootstrap';

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
    <section className={styles.layout}>
      <Col lg={7}>
        <section className={styles.layout__box_1}>
          <h4 className="mt-0">
            Banner Design
          </h4>
          <div className="d-inline-flex mt-2">
            <h5 className="text-muted mt-2">
              Select style:

            </h5>
            <Button variant="outline-primary" className="mx-2 me-2 styles.enable_btn btn-sm rounded-3">
              Modern

            </Button>
            {' '}
            <Button variant="outline-primary" className="styles.disable_btn btn-sm">
              Classic

            </Button>
            {' '}
          </div>
          <Row>
            <Col lg={12} className="mt-2">
              <Form.Check
                className="p-2"
                onChange={(e) => handleChange(e)}
                type="radio"
              >
                <Form.Check.Input type="radio" name="bnr" />
                <Form.Check.Label>
                  <div className="d-inline mx-2">
                    <BannerComponent />
                  </div>
                </Form.Check.Label>
              </Form.Check>
              <Form.Check
                className="p-2"
                onChange={(e) => handleChange(e)}
                type="radio"
              >
                <Form.Check.Input type="radio" name="bnr" />
                <Form.Check.Label>
                  <div className="d-inline mx-2">
                    <BannerComponent />
                  </div>
                </Form.Check.Label>
              </Form.Check>
              <Form.Check
                className="p-2"
                onChange={(e) => handleChange(e)}
                type="radio"
              >
                <Form.Check.Input type="radio" name="bnr" />
                <Form.Check.Label>
                  <div className="d-inline mx-2">
                    <BannerComponent />
                  </div>
                </Form.Check.Label>
              </Form.Check>
              <Form.Check
                className="p-2"
                onChange={(e) => handleChange(e)}
                type="radio"
              >
                <Form.Check.Input type="radio" name="bnr" />
                <Form.Check.Label>
                  <div className="d-inline mx-2">
                    <BannerComponent />
                  </div>
                </Form.Check.Label>
              </Form.Check>
            </Col>
          </Row>
          <hr className="mt-2 " style={{ color: '$black' }} />
          <h4 className="mt-0">
            Select the call-to-action that customer will see
          </h4>
          <Row>
            <Col lg={12} className="mt-2">
              <Form.Check
                className="p-2"
                onChange={(e) => handleChange(e)}
                type="radio"
              >
                <Form.Check.Input type="radio" name="cashback" />
                <Form.Check.Label className="mx-2">
                  Shop with friends, get $50 cashback.
                  <span className={styles.badge}>Recommended</span>
                </Form.Check.Label>
              </Form.Check>
              <Form.Check
                className="p-2"
                onChange={(e) => handleChange(e)}
                type="radio"
              >
                <Form.Check.Input type="radio" name="cashback" />
                <Form.Check.Label className="mx-2">
                  Shop with friends, get up to 90% back.
                </Form.Check.Label>
              </Form.Check>
            </Col>
          </Row>
        </section>
      </Col>
    </section>
  );
}
