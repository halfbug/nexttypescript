import Page from 'components/Layout/Page/Page';
import type { NextPage } from 'next';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import RetentionInvite from 'components/Widgets/RetentionInvite';
import RetentionImport from 'components/Widgets/RetentionImport';

const RetentionTools: NextPage = () => (
  <Page headingText="Retention Tools" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
    <Row>
      <Col>
        <RetentionInvite />
      </Col>
    </Row>
    <Row>
      <Col>
        <RetentionImport />
      </Col>
    </Row>
  </Page>
);

export default RetentionTools;
