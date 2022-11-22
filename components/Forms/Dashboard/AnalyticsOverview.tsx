/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Retail.module.scss';
import {
  Row, Col,
} from 'react-bootstrap';
import SummaryBox from 'components/Shared/SummaryBox/SummaryBox';
import ExportCustomerData from './ExportCustomerData';

const AnalyticsOverview = () => {
  const SummaryBoxes = () => (
    <>
      <Row>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Unique  Customers" value={138} iconType="KeyIcon" arrowIcon={false} />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Number of Purchases" value={432} iconType="PurchaseIcon" arrowIcon={false} />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Revenue" value="$41" iconType="CashBackIcon" arrowIcon={false} />
        </Col>
      </Row>
    </>
  );
  const Signups = () => (
    <>
      <Row>
        <Col lg={12}>
          <h3 className={styles.retail__signups__heading}>Recent Signups</h3>
          <Row className={styles.retail__signups__listHeader}>
            <Col className="text-muted fs-6 ">Channel</Col>
            <Col className="text-muted fs-6 ">Name</Col>
            <Col className="text-muted fs-6 ">Phone Number</Col>
          </Row>
          <Row className={styles.retail__signups__listRow}>
            <Col className={styles.retail__signups__channel}>
              Retail
            </Col>
            <Col className={styles.retail__signups__name}>
              Jane Doe
            </Col>
            <Col className={styles.retail__signups__number}>
              ✅
            </Col>
          </Row>
          <Row className={styles.retail__signups__listRow}>
            <Col className={styles.retail__signups__channel}>
              Retail
            </Col>
            <Col className={styles.retail__signups__name}>
              Jane Doe
            </Col>
            <Col className={styles.retail__signups__number}>
              ✅
            </Col>
          </Row>
          <Row className={styles.retail__signups__listRow}>
            <Col className={styles.retail__signups__channel}>
              Retail
            </Col>
            <Col className={styles.retail__signups__name}>
              Jane Doe
            </Col>
            <Col className={styles.retail__signups__number}>
              ✅
            </Col>
          </Row>
          <Row className={styles.retail__signups__listRow}>
            <Col className={styles.retail__signups__channel}>
              Retail
            </Col>
            <Col className={styles.retail__signups__name}>
              Jane Doe
            </Col>
            <Col className={styles.retail__signups__number}>
              ✅
            </Col>
          </Row>
          <div className={styles.retail__signups__more}>
            +
            338
            {' '}
            more to export
          </div>
        </Col>
      </Row>
    </>
  );
  return (
    <>
      <div className={styles.retail}>
        <Row>
          <Col lg={12}>
            <h2>Analytics Overview</h2>
          </Col>
          <Col lg={8} className="my-4">
            <SummaryBoxes />
          </Col>
          <Col lg={8}>
            <Signups />
          </Col>
          <Col lg={8}>
            <ExportCustomerData />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AnalyticsOverview;
