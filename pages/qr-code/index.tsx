import React, { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import HeadLogo from 'assets/images/Logo.svg';

import styles from 'styles/QrStoreDetails.module.scss';
import {
  Form, Container, Row, Col, Button,
} from 'react-bootstrap';
import QrStep1 from 'components/QrStoreDetails/QrStep1';
import QrStep2 from 'components/QrStoreDetails/QrStep2';
import QrStep3 from 'components/QrStoreDetails/QrStep3';

const QrCode: NextPage = () => {
  const [showStep1, setShowStep1] = useState(true);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [dealLink, setdealLink] = useState('');

  return (
    <>
      <Container>
        <Row>
          <HeadLogo />
        </Row>
        {showStep1 && (
        <QrStep1
          setShowStep1={setShowStep1}
          setShowStep2={setShowStep2}
          setShowStep3={setShowStep3}
          setdealLink={setdealLink}
        />
        )}
        {showStep2 && (<QrStep2 />)}
        {showStep3 && (<QrStep3 dealLink={dealLink} />)}

        <Row>
          <hr />
        </Row>
        <Row>
          <p>Have Questions? Peep our FAQ</p>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            Social icon
          </Col>
          <Col xs={12} md={6}>
            <p>Go to groupshop.com</p>
          </Col>
        </Row>

      </Container>

    </>
  );
};

export default QrCode;
