import * as React from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Form, Row, Col, ToggleButtonGroup, ToggleButton, Container, Button,
} from 'react-bootstrap';
import { Check2Circle, InfoCircle, XCircle } from 'react-bootstrap-icons';

export interface ShowBannerProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleForm: any;
  setFieldValue?: any;
}

export default function ShowBanner(
  {
    values, errors, touched, handleChange, handleForm,
  }
    : ShowBannerProps,
) {
  return (
    <section className={styles.layout__box_3}>
      <h4 className="mt-0">
        Show Groupshop banner on product pages
        <span className={styles.badge}>Recommended</span>
      </h4>
      <Row className="text-muted"><h6 className="mt-1">Help customers learn about Groupshop’s rewards as they shop on your store.</h6></Row>
      <Row className="mt-2 me-2 mb-2">
        <Col lg={12} md={6} className="text-right">
          <ToggleButtonGroup
            type="radio"
            name="joinExisting"
          >
            <ToggleButton
              variant="outline-success"
              className=""
              id="joinExisting-e"
              value={1}
              checked={values.joinExisting === true}
              onChange={(e) => handleChange(e)}
            >
              <Check2Circle className="fs-4" />
              {' '}
              Enabled
            </ToggleButton>

            <ToggleButton
              variant="outline-danger"
              className=""
              id="joinExisting-d"
              value={0}
              checked={values.joinExisting === false}
              onChange={(e) => handleChange(e)}
            >
              <XCircle className="fs-5" />
              {' '}
              Disabled
            </ToggleButton>

          </ToggleButtonGroup>
          {/* <Button variant="outline-success" className="me-2 styles.enable_btn ">
              {' '}
              <Check2Circle className="fs-4" />
              {' '}
              Enabled

            </Button>
            {' '}
            <Button variant="outline-danger" className="styles.disable_btn">
              {' '}
              <XCircle className="fs-5" />
              {' '}
              Disabled

            </Button>
            {' '} */}
        </Col>
      </Row>
      <hr className="mt-4 " style={{ color: '$black' }} />
      <h4>
        Show Groupshop banner on cart page
        <span className={styles.badge}>Recommended</span>
      </h4>
      <Row className="text-muted"><h6 className="mt-1">Remind customers about Groupshop’s rewards right before their purchase.</h6></Row>
      <Row className="mt-2 me-2 mb-2">
        <Col lg={12} md={6} className="text-right">
          <ToggleButtonGroup
            type="radio"
            name="joinExisting"
          >
            <ToggleButton
              variant="outline-success"
              className=""
              id="joinExisting-e"
              value={1}
              checked={values.joinExisting === true}
              onChange={(e) => handleChange(e)}
            >
              <Check2Circle className="fs-4" />
              {' '}
              Enabled
            </ToggleButton>

            <ToggleButton
              variant="outline-danger"
              className=""
              id="joinExisting-d"
              value={0}
              checked={values.joinExisting === false}
              onChange={(e) => handleChange(e)}
            >
              <XCircle className="fs-5" />
              {' '}
              Disabled
            </ToggleButton>

          </ToggleButtonGroup>
          {/* <Button variant="outline-success" className="me-2 styles.enable_btn ">
              {' '}
              <Check2Circle className="fs-4" />
              {' '}
              Enabled

            </Button>
            {' '}
            <Button variant="outline-danger" className="styles.disable_btn">
              {' '}
              <XCircle className="fs-5" />
              {' '}
              Disabled

            </Button>
            {' '} */}
        </Col>
      </Row>
    </section>
  );
}
