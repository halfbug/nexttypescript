import React from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import GsExperience from 'components/Widgets/GsExperience';
import GsGuide from 'components/Widgets/GsGuide';
import { Col, Row } from 'react-bootstrap';
import GsFeartured from 'components/Widgets/GsFeartured';
import FAQs from 'components/Widgets/FAQs';
import ConnectSocialMedia from 'components/Widgets/ConnectSocialMedia';
import styles from 'styles/Knowledgebase.module.scss';

const KnowledgeBase: NextPage = () => (
  <Page headingText="Knowledge base" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
    <Row className="mt-5 p-0 ">
      <Col lg={7} className="p-0">
        <GsExperience />
        <GsGuide />
        <GsFeartured />
      </Col>
      <Col lg={5} className={['pe-0 me-0', styles.Kb_paddingFAQ].join(' ')}>
        <FAQs />
      </Col>
    </Row>
  </Page>
);
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // console.log('🚀 ~ file: [ins].tsx ~ line 51 ~ getServerSideProps ~ context', context?.req);
  const { cookies: { token } } = context.req;
  // console.log(' ~ token', token);
  if (token) {
    return {
      props: { token }, // Will be passed to the page component as props
    };
  }
  return { props: {} };
}
export default KnowledgeBase;
