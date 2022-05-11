/* eslint-disable quotes */
import React from 'react';
import styles from 'styles/Marketing.module.scss';
import {
  Row, Col,
} from 'react-bootstrap';
import MarketingTools from 'components/Widgets/MarketingTools';
import CustomerActivation from 'components/Widgets/CustomerActivation';
import Integrations from 'components/Widgets/Integrations';

export default function MarketingSettings() {
  return (
    <Row className={styles.marketing}>
      <Col lg={8}>
        <h3 className="pb-2">Marketing Tools</h3>
        <MarketingTools />
        <CustomerActivation />
        <Integrations />
      </Col>
    </Row>
  );
}
