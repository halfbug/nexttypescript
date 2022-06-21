import {
  Form, Button, Col, Row,
} from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from 'store/store.context';
import styles from 'styles/Partner.module.scss';
import UniqueClicksLogo from 'assets/images/unique-clicks.svg';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { UPDATE_PARTNER_GROUPSHOP } from 'store/store.graphql';
import NewPurchaseLogo from 'assets/images/new-purchase.svg';
import NewCustomerLogo from 'assets/images/new-customer.svg';
import CashBackLogo from 'assets/images/cashback.svg';
import ArrowRightLogo from 'assets/images/arrow-right.svg';
import OrderFromLogo from 'assets/images/order-from.svg';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { IPartnerTools } from 'types/store';

interface AffiliateProps {
  handleAfterSubmit: any;
  partnerId: string;
  partnerCommission: string;
  partnerDetails: any;
}

export default function AffiliateDetail({
  handleAfterSubmit, partnerId, partnerCommission, partnerDetails,
}
   : AffiliateProps) {
  const { store, dispatch } = useContext(StoreContext);
  const [show, setShow] = React.useState(false);
  const [
    editPartnerGroupshopStatus,
  ] = useMutation<IPartnerTools | null>(UPDATE_PARTNER_GROUPSHOP);

  const partnerGroupshopInitial = {
    email: '',
    minDiscount: '',
    maxDiscount: '',
    partnerCommission: partnerCommission || 20,
  };

  const validationSchema = yup.object({
    partnerCommission: yup
      .number().typeError('you must specify a number')
      .min(5, 'Min value 5.')
      .max(50, 'Max value 50.')
      .required('partner Commisson is required.'),
  });

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
  }: FormikProps<IPartnerTools> = useFormik<IPartnerTools>({
    initialValues: partnerGroupshopInitial,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IPartnerTools>) => {
      if (validateForm) validateForm(valz);
      setShow(false);
      const partnerGroupshopObj: null | any = await editPartnerGroupshopStatus({
        variables: {
          updatePartnersInput: {
            storeId: store.id,
            id: partnerId,
            partnerCommission: `${valz.partnerCommission}%`,
          },
        },
      });
      console.log({ partnerGroupshopObj });
      handleAfterSubmit();
    },
  });

  return (
    <section className={styles.partner__box_last}>
      <div className="pb-3 pe-3">
        <div className="d-flex align-items-center">
          <span className={styles.partner__box_last__name}>
            {partnerDetails.fname !== null ? `${partnerDetails.fname} ${partnerDetails.lname}` : partnerDetails.email}
          </span>
          {' '}
          <span className={styles.partner__wom_score}>9</span>
          {' '}
          <span className={styles.partner__box_last__text}>WOM Score</span>
        </div>
        <div className="d-flex align-items-center mt-2">
          {!show && (
          <>
            <span className={styles.partner__box_last__commission}>
              Commission
            </span>
            {' '}
            <span className={styles.partner__box_last__commission__score}>
              {values.partnerCommission}
            </span>
            {' '}
            <Button className="fw-bolder" variant="link" onClick={() => setShow(!show)}>Edit</Button>
          </>
          )}
          <div className={show ? 'd-block' : 'd-none'}>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                name="partnerCommission"
                onChange={handleChange}
                className={styles.dbrewards_input}
                isInvalid={!!errors.partnerCommission}
                placeholder="Enter %"
              />
              <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                {errors.partnerCommission}
              </Form.Control.Feedback>
              <Button
                type="submit"
                className="fw-bolder"
                variant="link"
                value={1}
              >
                Save
              </Button>
            </Form>
          </div>
        </div>
        <hr className={styles.partner__sperator} />
        <div className={styles.partner__womScoreContainer}>
          <div className={styles.partner__overlay}>
            <div className={styles.partner__overlayText}>Coming Soon</div>
          </div>
          <Row className="mt-4">
            <Col lg={6} md={6} xs={6}>
              <span className={styles.partner__detail_tag__tag1}>$428 generated</span>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <span className={['pe-2 ps-1', styles.partner__detail_tag__tag2].join(' ')}>
                {/* <UniqueClicksLogo /> */}
                👆 148 unique clicks
              </span>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col lg={6} md={6} xs={6}>
              <span className={styles.partner__detail_tag__tag3}>
                {/* <NewPurchaseLogo /> */}
                🛒  3 purchases
              </span>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <span className={['pe-2 ps-1', styles.partner__detail_tag__tag4].join(' ')}>
                {/* <NewCustomerLogo /> */}
                ✨ 2 new customers
              </span>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col lg={6} md={6} xs={6}>
              <span className={styles.partner__detail_tag__tag5}>
                {/* <CashBackLogo /> */}
                💸 $112 cashback
              </span>
            </Col>
            <Col lg={6} md={6} xs={6} className="d-flex justify-content-start align-items-center">
              <div className={styles.partner__btn}>
                <span>View Groupshop</span>
                {' '}
                <ArrowRightLogo />
              </div>
            </Col>
          </Row>

          <hr className={styles.partner__sperator} />

          <Row className={styles.partner_order}>
            {/* <OrderFromLogo /> */}
            🔗 Orders from this Groupshop
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt}>W83HFSD</Col>
            <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt__aligned}>03/10/21</Col>
            <Col lg={4} md={4} xs={4} className="d-flex justify-content-end align-items-center px-4"><ArrowRightLogo /></Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt}>W83HFSD</Col>
            <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt__aligned}>03/10/21</Col>
            <Col lg={4} md={4} xs={4} className="d-flex justify-content-end align-items-center px-4"><ArrowRightLogo /></Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt}>W83HFSD</Col>
            <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt__aligned}>03/10/21</Col>
            <Col lg={4} md={4} xs={4} className="d-flex justify-content-end align-items-center px-4"><ArrowRightLogo /></Col>
          </Row>
        </div>
      </div>
    </section>
  );
}
