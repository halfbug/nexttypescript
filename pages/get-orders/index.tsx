import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button,
} from 'react-bootstrap';
import type { NextPage } from 'next';
import styles from 'styles/QrStoreDetails.module.scss';
import HeadLogo from 'assets/images/QRLogo.svg';
import QRMobile from 'assets/images/qr-screen-mobile-1.png';
import Image from 'next/image';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import useAlert from 'hooks/useAlert';
import { useLazyQuery } from '@apollo/client';
import { GET_ORDERS_BY_GS } from 'store/store.graphql';
import Link from 'next/link';

export interface IGetOrder {
  groupshopUrl: string;
}

const GetGsOrders: NextPage = () => {
  const [orderList, setorderList] = useState<[]>([]);
  const { AlertComponent, showError } = useAlert();
  const validationSchema = yup.object({
    groupshopUrl: yup.string().required('Please enter the Groupshop Url'),
  });

  const [getGsOrders, { data }] = useLazyQuery(GET_ORDERS_BY_GS, {
    onError() {
      setorderList([]);
      showError('Record not found!');
    },
    onCompleted() {
      setorderList(data.getGsOrders);
    },
  });

  const {
    handleSubmit,
    handleChange,
    errors,
    setFieldValue,
  }: FormikProps<IGetOrder> = useFormik<IGetOrder>({
    initialValues: {
      groupshopUrl: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IGetOrder>) => {
      if (validateForm) validateForm(valz);
      const { groupshopUrl } = valz;
      getGsOrders({ variables: { groupshopUrl } });
    },
  });

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
            <Col md={6}>
              <div className={styles.QRContainer__form__wrapper}>

                <div className={styles.QRContainer__content__main}>
                  <div className={styles.QRContainer__content}>
                    <h2>
                      Access your personalized store with
                      {' '}
                      <strong>
                        exclusive discounts and cashback for you and your friends.
                      </strong>
                    </h2>
                  </div>
                  <div className={styles.QRContainer__form__container}>
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <div className={styles.QRContainer__text__how}>
                          <Form.Label>Groupshop Url</Form.Label>
                        </div>
                        <Form.Control
                          type="text"
                          placeholder="Enter Groupshop Url"
                          name="groupshopUrl"
                          isInvalid={!!errors.groupshopUrl}
                          onChange={(e) => setFieldValue('groupshopUrl', e.currentTarget.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.groupshopUrl}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <div className={styles.QRContainer__btnGroupShop}>
                        <Button type="submit"> Get Orders </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.QRContainer__form__wrapper}>
                <div className={styles.QRContainer__content__main}>
                  {orderList.map((order: any, index: number) => (
                    <div>
                      <Link href={`/get-orders/${order.orderId.split('/')[4]}`}>
                        <a target="_blank">
                          {order.orderId}
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <AlertComponent />
      </div>
    </>
  );
};

export default GetGsOrders;
