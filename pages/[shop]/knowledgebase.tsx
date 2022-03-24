import React from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import GsExperience from 'components/Widgets/GsExperience';
import GsGuide from 'components/Widgets/GsGuide';
import { Col, Row } from 'react-bootstrap';
import GsFeartured from 'components/Widgets/GsFeartured';
import FAQs from 'components/Widgets/FAQs';
import ConnectSocialMedia from 'components/Widgets/ConnectSocialMedia';

const KnowledgeBase: NextPage = () => (
  <Page headingText="Knowledge base" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
    <Row className="mt-5">
      <Col lg={7} className="p-0">
        <GsExperience />
        <GsGuide />
        <GsFeartured />
      </Col>
      <Col lg={5}>
        <FAQs />
        <ConnectSocialMedia />
      </Col>
    </Row>
  </Page>
);

export default KnowledgeBase;
