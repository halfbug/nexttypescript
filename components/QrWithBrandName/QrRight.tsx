import React, { useState, useEffect, useContext } from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import styles from 'styles/QrStoreDetails.module.scss';

export default function QrRight() {
  return (
    <div className={styles.QRContainer__content__container}>
      <div className={styles.QRContainer}>
        <Container fluid>
          <Row className="mt-5 pt-5 d-flex justify-content-center align-self-center">
            <Row className="d-flex justify-content-center mt-5 pt-5">
              <div className={[styles.QRContainer_WhiteBox, ''].join(' ')}>
                <p>What’s inside?</p>
              </div>
              <div className={styles.QRContainer_DottedBox}>
                <p>😍 a unique store to curate your favorite products</p>
              </div>
              <div className={styles.QRContainer_DottedBox}>
                <p>🎁 discounts for you + friends to shop</p>
              </div>
              <div className={styles.QRContainer_DottedBox}>
                <p>🤑 cash when others shop from your store</p>
              </div>
            </Row>
          </Row>
        </Container>
      </div>
    </div>
  );
}
