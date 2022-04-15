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
      <h3>Marketing Tools</h3>
      <Col lg={8}>
        <MarketingTools />
        <CustomerActivation />
        <Integrations />
      </Col>
    </Row>
  );
}
