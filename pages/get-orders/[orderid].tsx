import React, {
  useEffect, useState, Dispatch, SetStateAction,
} from 'react';
import {
  Container, Row, Col, Form, Button,
} from 'react-bootstrap';
import type { NextPage } from 'next';
import styles from 'styles/QrStoreDetails.module.scss';
import Router, { useRouter } from 'next/router';
import HeadLogo from 'assets/images/QRLogo.svg';
import QRMobile from 'assets/images/qr-screen-mobile-1.png';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { GET_ORDER_DETAILS_BY_ID } from 'store/store.graphql';
import axios from 'axios';

export default function OrderDetails() {
  const { query: { orderid } } = useRouter();
  const [orderData, setOrderData] = useState<[]>();
  const [run, setRun] = useState<boolean>(true);

  const apiFunc = async () => {
    if (orderid) {
      const results = await axios.get(`${process.env.API_URL}/orderinput?id=${orderid}`);
      setOrderData(results.data.order);
      console.log(results.data.order);
    }
  };
  React.useEffect(() => {
    apiFunc();
  }, [orderid]);
  return (
    <>
      <div className={styles.QRContainer}>
        <Container fluid>
          <Row className={styles.QRContainer__form__wrapper}>
            <Col md={12}>
              <div className={styles.QRContainer__Logo}>
                <HeadLogo />
              </div>
              <div className={styles.QRContainer__mobileImage}>
                <Image src={QRMobile} alt="QR Right Screen" layout="responsive" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className={styles.QRContainer__form__wrapper}>

                <div className={styles.QRContainer__content__main}>
                  <div className={styles.QRContainer__content}>
                    Result
                    {JSON.stringify(orderData)}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
