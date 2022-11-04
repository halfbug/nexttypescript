import React from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import {
  Row, Col,
} from 'react-bootstrap';

const Discovery: NextPage = () => (
  <Page headingText="Discovery" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
    <Row>
      <Col>
        Coming Soon...
      </Col>
    </Row>
  </Page>
);

export default Discovery;
