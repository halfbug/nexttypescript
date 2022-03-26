/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import styles from 'styles/Marketing.module.scss';
import {
  Row, Col,
} from 'react-bootstrap';
import Inte from 'assets/images/Integrations.svg';

export default function Integrations(
) {
  return (
    <>
      <h3 className="my-3 mx-0 ps-0 ">Integrations</h3>
      <section className={styles.marketing__box_1}>
        <h4 className="mt-0">
          Connect your pixels
        </h4>
        <p>Track customer data and behavior on your online store</p>
      </section>
      <section className={styles.marketing__box_1}>
        <Row>
          <Col lg={1} className="me-0 mt-2">
            <Inte />
          </Col>
          <Col lg={10} className="ms-2 px-0">
            <h4 className="mt-0">
              Integrations
            </h4>
            <p>Enhance your Groupshop experience with email and SMS marketing solutions.</p>
          </Col>
        </Row>
      </section>
    </>
  );
}
