import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import styles from 'styles/Partner.module.scss';
import { InfoCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import UniqueClicksLogo from 'assets/images/unique-clicks.svg';
import ArrowRightLogo from 'assets/images/arrow-right.svg';

export default function ActiveAffiliate() {
  return (
    <section className={['ps-0 ms-0 pb-4', styles.partner__box_2].join(' ')}>
      <h4 className="mt-0">
        Active Affiliates
      </h4>
      <Row className={styles.partner__light_txt}>
        Track performance and manage your current affiliates.
      </Row>
      <Row className="">
        <Col className={['', styles.partner_table_heading].join(' ')}>
          Active
          {/* <ToolTip
          className="mx-2"
          icon={<InfoCircle size={13} />}
          popContent="Active"
        /> */}
        </Col>
        <Col className={['ps-2', styles.partner_table_heading].join(' ')}>

          Name
        </Col>
        <Col className={['ms-5', styles.partner_table_heading].join(' ')}>
          Commission

        </Col>
        <Col className={['ms-5', styles.partner_table_heading].join(' ')}>
          Revenue

        </Col>
        <Col className="styles.partner_table_heading" />

      </Row>

      <Row className={styles.partner__data_row__active}>
        <Col xl={2} lg={2} md={2}>
          <Form.Check
            type="switch"
            id="custom-switch-1"
            className={styles.partner__switch}
            checked
            onChange={(e) => {}}
          />
        </Col>
        <Col xl={3} lg={3} md={3}>
          <div>llian Davis</div>
        </Col>
        <Col xl={3} lg={3} md={3}>
          <div className={styles.partner__data_row__tag2}>15%</div>
        </Col>
        <Col xl={3} lg={3} md={3}>
          <div className={styles.partner__data_row__tag1}>$428 generated</div>
        </Col>
        {/* <Col xl={3} lg={3} md={3}>
          <div className={styles.partner__data_row__tag2}>
            <UniqueClicksLogo />
          </div>
        </Col> */}
        <Col xl={1} lg={1} md={1} className="d-flex justify-content-center">
          <ArrowRightLogo />
        </Col>
      </Row>

      <Row className={['d-flex justify-content-start', styles.partner__data_row].join(' ')}>

        <Col xl={2} lg={2} md={2}>
          <Form.Check
            type="switch"
            id="custom-switch-2"
            className={styles.partner__switch}
          />
        </Col>
        <Col xl={3} lg={3} md={3}>
          <div>Melissa Camps</div>
        </Col>
        <Col xl={3} lg={3} md={3}>
          <div className={styles.partner__data_row__tag2}>15%</div>
        </Col>
        <Col xl={3} lg={3} md={3}>
          <div className={styles.partner__data_row__tag1}>$428 generated</div>
        </Col>
        {/* <Col xl={3} lg={3} md={3}>
          <div className={styles.partner__data_row__tag2}>
            <UniqueClicksLogo />
          </div>
        </Col> */}
        <Col xl={1} lg={1} md={1} className="d-flex justify-content-center">
          <ArrowRightLogo />
        </Col>
      </Row>

      <Row className={['d-flex justify-content-start', styles.partner__data_row].join(' ')}>
        <Col xl={2} lg={2} md={2}>
          <Form.Check
            type="switch"
            id="custom-switch-3"
            className={styles.partner__switch}
          />
        </Col>
        <Col xl={3} lg={3} md={3}>
          <div>Jose Guiterrez</div>
        </Col>
        <Col xl={3} lg={3} md={3}>
          <div className={styles.partner__data_row__tag2}>15%</div>
        </Col>
        <Col xl={3} lg={3} md={3}>
          <div className={styles.partner__data_row__tag1}>$428 generated</div>
        </Col>
        {/* <Col xl={3} lg={3} md={3}>
          <div className={styles.partner__data_row__tag2}>
            <UniqueClicksLogo />
          </div>
        </Col> */}
        <Col xl={1} lg={1} md={1} className="d-flex justify-content-center">
          <ArrowRightLogo />
        </Col>
      </Row>

      <Row className={styles.partner__data_row}>
        <Col xl={2} lg={2} md={2}>
          <Form.Check
            type="switch"
            id="custom-switch-4"
            className={styles.partner__switch}
          />
        </Col>
        <Col xl={3} lg={3} md={3}>
          <div>Dean Abels</div>
        </Col>
        <Col xl={3} lg={3} md={3}>
          <div className={styles.partner__data_row__tag2}>15%</div>
        </Col>
        <Col xl={3} lg={3} md={3}>
          <div className={styles.partner__data_row__tag1}>$428 generated</div>
        </Col>
        {/* <Col xl={3} lg={3} md={3}>
          <div className={styles.partner__data_row__tag2}>
            <UniqueClicksLogo />
          </div>
        </Col> */}
        <Col xl={1} lg={1} md={1} className="d-flex justify-content-center">
          <ArrowRightLogo />
        </Col>
      </Row>

    </section>
  );
}
