import React from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import { Col, Container, Row } from 'react-bootstrap';
import CoreMetrics from 'components/Forms/Dashboard/CoreMetrics';
import ViralityMetrics from 'components/Forms/Dashboard/ViralityMetrics';
import CustomerData from 'components/Forms/Dashboard/CutomerData';

const Analytics: NextPage = () => (
  <Page headingText="Analytics" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
    <Container>
      <Row className="mt-5">
        <Col lg={7} className="p-0">
          <CoreMetrics />
        </Col>
        <Col lg={{ span: 4, offset: 1 }} className="p-0">
          <ViralityMetrics />
        </Col>
      </Row>
      <CustomerData />
    </Container>
  </Page>
);

export default Analytics;
