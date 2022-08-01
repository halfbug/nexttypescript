import React from 'react';
import {
  Col, Row, Accordion,
} from 'react-bootstrap';
import styles from 'styles/Retentiontools.module.scss';

export default function RetentionImport() {
  const getCustomerImportTableHTML = () => (
    <Row>
      <Col xs={9}>
        <div className={styles.rt__table_head}>
          <div className={styles.rt__table_head__txt}>Date</div>
          <div className={styles.rt__table_head__txt}># of Groupshops Created</div>
          <div />
        </div>
        <Accordion className={styles.rt__acc1}>
          <Accordion.Item eventKey="0" className="border-0 mb-2">
            <Accordion.Header className={styles.rt__acc1__row}>
              <div className={styles.rt__acc1__row__date}>
                02/22/22
              </div>
              <div className={styles.rt__acc1__row__count}>
                7
              </div>
            </Accordion.Header>
            <Accordion.Body />
          </Accordion.Item>
          <Accordion.Item eventKey="0" className="border-0 mb-2">
            <Accordion.Header className={styles.rt__acc1__row}>
              <div className={styles.rt__acc1__row__date}>
                02/22/22
              </div>
              <div className={styles.rt__acc1__row__count}>
                7
              </div>
            </Accordion.Header>
            <Accordion.Body className={styles.rt__acc1_body} />
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );

  return (
    <Row>
      <Col xxl={8} xl={8} lg={8} md={8} xs={12}>
        <div className={styles.rt__importCustomer_box}>
          <h3>
            Past Customer Imports
          </h3>
          <span>
            Below is a log of every batch of past customers you have created Groupshops for.
          </span>
          {getCustomerImportTableHTML()}
        </div>
      </Col>
      <Col xxl={4} xl={4} lg={4} md={4} xs={12}>
        <div className={styles.rt__importDate_box}>
          <div className={styles.rt__importDate_box_header}>
            <h3>
              Import Date
            </h3>
            <span>
              07/22/2022
            </span>
          </div>
          <hr />
          <div className={styles.rt__importDate_box_row}>
            <h4>
              # of Groupshops created
            </h4>
            <span>
              324
            </span>
          </div>
          <div className={styles.rt__importDate_box_row}>
            <h4>
              Date Range
            </h4>
            <span>
              07/14/21
              -
              08/12/21
            </span>
          </div>
          <div className={styles.rt__importDate_box_row}>
            <h4>
              Minimum order value
            </h4>
            <span>
              $50
            </span>
          </div>
          <div className={styles.rt__importDate_box_row}>
            <h4>
              Minimum # of purchases
            </h4>
            <span>
              2
            </span>
          </div>
          <div>
            <h4>
              Products ordered
            </h4>
            <span>
              The product title 1, the product title 2
            </span>
          </div>
        </div>
      </Col>
    </Row>
  );
}
