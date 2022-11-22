import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import {
  Row, Col,
} from 'react-bootstrap';
import HintBox from 'components/Groupshop/HintBox/HintBox';
import CustomChannels from 'components/Forms/Dashboard/CustomChannels';
import RetailProducts from 'components/Forms/Dashboard/RetailProducts';
import AnalyticsOverview from 'components/Forms/Dashboard/AnalyticsOverview';

const Retail: NextPage = () => {
  const [showHint, setShowHint] = useState<boolean>(false);
  useEffect(() => {
    setShowHint(true);
  }, []);
  return (
    <Page headingText="Retail Tools" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
      <Row className="mt-4">
        <Col lg={12}>
          <CustomChannels />
        </Col>
        <Col lg={12}>
          <AnalyticsOverview />
        </Col>
        <Col lg={8}>
          <RetailProducts />
        </Col>
      </Row>
      <HintBox
        show={showHint}
        handleClose={() => { setShowHint(false); }}
        title="Use Retail Tools to..."
        hints={[
          'Discover who your customers are on channels outside of Shopify.',
          'Retail creates a Groupshop for customers simply by scanning a QR code - they get access to commissions and discounts and you get access to names, emails, and phone numbers when they join.',
          'Acquire customer data for channels such as retail, 3rd party e-commerce such as Amazon, or any in-person activations and events.',
          'Add QR codes to your packaging, inserts, in-store banners or displays and more.',
        ]}
      />
    </Page>
  );
};

export default Retail;
