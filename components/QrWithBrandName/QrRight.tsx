import React, { useState, useEffect, useContext } from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import styles from 'styles/QrStoreDetails.module.scss';

export default function QrRight() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-center flex-column">
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
      </div>
    </div>
  );
}
