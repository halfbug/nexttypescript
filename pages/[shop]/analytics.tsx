import React from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import { Col, Container, Row } from 'react-bootstrap';
import CoreMetrics from 'components/Forms/Dashboard/CoreMetrics';

const Analytics: NextPage = () => (
  <Page headingText="Analytics" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
    <Container>
      <Row className="mt-5">
        <Col lg={7} className="p-0">
          <CoreMetrics />
        </Col>
        <Col lg={{ span: 4, offset: 1 }} className="p-0">
          Virality Metrics
        </Col>
      </Row>
    </Container>
  </Page>
);

export default Analytics;
