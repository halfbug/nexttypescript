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
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import InfoIcon from 'assets/images/info-icon.svg';
import Link from 'next/link';

interface AffiliateProps {
  handleAfterSubmit: any;
  partnerId: string;
  partnerCommission: string;
  partnerDetails: any;
  groupshopLink: string;
  purchases: string;
  revenue:string;
  comissionAmount:string;
  discountDetails: any;
  storeCurrency: any;
  partnerRewards: any;
  showSidebar:boolean;
  setshowSidebar:any;
}

export default function AffiliateDetail({
  handleAfterSubmit, partnerId, partnerCommission, partnerDetails, discountDetails,
  partnerRewards, showSidebar, setshowSidebar, groupshopLink, purchases, revenue,
  comissionAmount, storeCurrency,
}
   : AffiliateProps) {
  const { store, dispatch } = useContext(StoreContext);
  const [show, setShow] = React.useState(false);
  const [editMin, setEditMin] = React.useState(false);
  const [editMax, setEditMax] = React.useState(false);
  const [
    editPartnerGroupshopStatus,
  ] = useMutation<IPartnerTools | null>(UPDATE_PARTNER_GROUPSHOP);

  const partnerGroupshopInitial = {
    email: '',
    minDiscount: partnerRewards.minDiscount,
    maxDiscount: partnerRewards.maxDiscount,
    partnerCommission: partnerCommission || 20,
  };

  useEffect(() => {
    if (showSidebar === false) {
      setShow(false);
      setEditMin(false);
      setEditMax(false);
    }
  });

  const validationSchema = yup.object({
    partnerCommission: yup
      .number().typeError('you must specify a number')
      .min(5, 'Min value 5.')
      .max(50, 'Max value 50.')
      .required('partner Commisson is required.'),
    minDiscount: yup
      .number().typeError('you must specify a number')
      .min(5, 'Min value 5.')
      .max(50, 'Max value 50.')
      .required('partner Commisson is required.'),
    maxDiscount: yup
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
      console.log(JSON.stringify(valz));
      if (validateForm) validateForm(valz);
      setShow(false);

      const minDiscountVal = `${valz.minDiscount}%`;
      const maxDiscountVal = `${valz.maxDiscount}%`;
      const newAverage = ((+valz.minDiscount! + +valz.maxDiscount!) / 2);
      const newAverageVal = `${newAverage}%`;

      const partnerGroupshopObj: null | any = await editPartnerGroupshopStatus({
        variables: {
          updatePartnersInput: {
            storeId: store.id,
            id: partnerId,
            partnerCommission: `${valz.partnerCommission}%`,
            // discountCode: {
            //   title: discountDetails.title,
            //   percentage: valz.minDiscount,
            //   priceRuleId: discountDetails.priceRuleId,
            // },
            partnerRewards: {
              baseline: minDiscountVal,
              average: newAverageVal,
              maximum: maxDiscountVal,
            },
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
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="align-items-center mb-2">
            <Col md={5}>
              <div className={styles.partner__box_last__name}>
                {partnerDetails.fname !== null ? `${partnerDetails.fname} ` : ''}
                {partnerDetails.lname !== null ? partnerDetails.lname : ''}
                {partnerDetails.fname === null && partnerDetails.lname === null ? partnerDetails.email : '' }
              </div>
            </Col>
            <Col md={7} className="d-flex justify-content-start align-items-center">
              <div className={styles.partner__btn}>
                <Link href={groupshopLink ?? ''}><a target="_blank">View Groupshop</a></Link>
                {' '}
                <ArrowRightLogo />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className={styles.partner__rewards_box__headrow}>
                <div className={styles.partner__rewards_box__heading}>
                  Commission
                </div>
                <div>
                  {!show && (
                  <>
                    <span className={styles.partner__box_last__commission__score}>
                      {values.partnerCommission}
                      %
                    </span>
                    {' '}
                    <Button className="fw-bolder" variant="link" onClick={() => { setShow(!show); setshowSidebar(true); }}>Edit</Button>
                  </>
                  )}
                  <div className={show ? 'd-flex justify-content-end' : 'd-none'}>
                    <Form.Control
                      type="text"
                      name="partnerCommission"
                      value={values.partnerCommission}
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
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className={styles.partner__rewards_box__headrow}>
                <div className={styles.partner__rewards_box__heading}>
                  Baseline Discount
                </div>
                <div>
                  {!editMin && (
                  <>
                    <span className={styles.partner__rewards_box__percentage}>
                      {values.minDiscount}
                      %
                    </span>
                    <Button className="fw-bolder" variant="link" onClick={() => { setEditMin(!editMin); setshowSidebar(true); }}>Edit</Button>
                    <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                      {errors.minDiscount}
                    </Form.Control.Feedback>
                  </>
                  )}
                  <div className={editMin ? 'd-flex justify-content-end' : 'd-none'}>
                    <Form.Control
                      type="text"
                      name="minDiscount"
                      value={values.minDiscount}
                      onChange={handleChange}
                      className={styles.dbrewards_input}
                      isInvalid={!!errors.minDiscount}
                      placeholder="Enter %"
                    />
                    <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                      {errors.minDiscount}
                    </Form.Control.Feedback>
                    <Button
                      type="submit"
                      className="fw-bolder"
                      variant="link"
                      onClick={() => {
                        if (!(errors.minDiscount)) {
                          setEditMin(false);
                        }
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>

              </div>
            </Col>
            <Col md={12}>
              <div className={styles.partner__rewards_box__headrow}>
                <div className={styles.partner__rewards_box__heading}>
                  Maximum Discount
                </div>
                <div>
                  <div>
                    {!editMax && (
                    <>
                      <span className={styles.partner__rewards_box__percentage}>
                        {values.maxDiscount}
                        %
                      </span>
                      <Button className="fw-bolder" variant="link" onClick={() => { setEditMax(!editMax); setshowSidebar(true); }}>Edit</Button>
                    </>
                    )}
                  </div>
                  <div className={editMax ? 'd-flex justify-content-end' : 'd-none'}>
                    <Form.Control
                      type="text"
                      name="maxDiscount"
                      value={values.maxDiscount}
                      onChange={handleChange}
                      className={styles.dbrewards_input}
                      isInvalid={!!errors.maxDiscount}
                      placeholder="Enter %"
                    />
                    <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                      {errors.maxDiscount}
                    </Form.Control.Feedback>

                    <Button
                      type="submit"
                      className="fw-bolder"
                      variant="link"
                      onClick={() => { setEditMax(!editMax); setshowSidebar(true); }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
            {/* <Col md={6}>
              <div className={styles.partner__rewards_box__heading}>
                Baseline
                <ToolTip
                  placement="bottom"
                  className={styles.dashboard_campaign__pop}
                  icon={<InfoIcon size={10} />}
                  popContent={(
                    <p>
                      This is the first discount tier offered to friends joining the Groupshop.
                    </p>
              )}
                />
              </div>
              <div>
                {!editMin && (
                <>
                  <span className={styles.partner__rewards_box__percentage}>
                    {values.minDiscount}
                    %
                  </span>
                  <Button className="fw-bolder"
                    variant="link"
                    onClick={() => { setEditMin(!editMin); setshowSidebar(true); }}>Edit</Button>
                  <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                    {errors.minDiscount}
                  </Form.Control.Feedback>
                </>
                )}
                <div className={editMin ? 'd-block' : 'd-none'}>
                  <Form.Control
                    type="text"
                    name="minDiscount"
                    value={values.minDiscount}
                    onChange={handleChange}
                    className={styles.dbrewards_input}
                    isInvalid={!!errors.minDiscount}
                    placeholder="Enter %"
                  />
                  <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                    {errors.minDiscount}
                  </Form.Control.Feedback>
                  <Button
                    type="submit"
                    className="fw-bolder"
                    variant="link"
                    onClick={() => {
                      if (!(errors.minDiscount)) {
                        setEditMin(false);
                      }
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Col> */}
            {/* <Col md={6}>
              <div className={styles.partner__rewards_box__heading}>
                Maximum
                <ToolTip
                  placement="bottom"
                  className={styles.dashboard_campaign__pop}
                  icon={<InfoIcon size={10} />}
                  popContent={(
                    <p>
                      This is the maximum rewards offered in discounts to friends joining
                      the Groupshop. This tier is only accessed for order values significantly
                      higher than your AOV (at least 2x).
                    </p>
              )}
                />
              </div>
              <div>
                {!editMax && (
                <>
                  <span className={styles.partner__rewards_box__percentage}>
                    {values.maxDiscount}
                    %
                  </span>
                  <Button className="fw-bolder"
                    variant="link"
                    onClick={() => { setEditMax(!editMax); setshowSidebar(true); }}>Edit</Button>
                </>
                )}
              </div>
              <div className={editMax ? 'd-block' : 'd-none'}>
                <Form.Control
                  type="text"
                  name="maxDiscount"
                  value={values.maxDiscount}
                  onChange={handleChange}
                  className={styles.dbrewards_input}
                  isInvalid={!!errors.maxDiscount}
                  placeholder="Enter %"
                />
                <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                  {errors.maxDiscount}
                </Form.Control.Feedback>

                <Button
                  type="submit"
                  className="fw-bolder"
                  variant="link"
                  onClick={() => { setEditMax(!editMax); setshowSidebar(true); }}
                >
                  Save
                </Button>

              </div>
            </Col> */}
          </Row>
          {/* <Row>
            <div className="d-flex align-items-center mt-2">
              {!show && (
              <>
                <span className={styles.partner__box_last__commission}>
                  Commission
                </span>
                {' '}
                <span className={styles.partner__box_last__commission__score}>
                  {values.partnerCommission}
                  %
                </span>
                {' '}
                <Button
                  className="fw-bolder" variant="link"
                  onClick={() => { setShow(!show); setshowSidebar(true); }}>Edit</Button>
              </>
              )}
              <div className={show ? 'd-block' : 'd-none'}>
                <Form.Control
                  type="text"
                  name="partnerCommission"
                  value={values.partnerCommission}
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

              </div>
            </div>
          </Row> */}
          <Row>
            <hr className={styles.partner__sperator} />
          </Row>

          <div className={styles.partner__womScoreContainer}>
            <div className={styles.partner__overlay}>
              <div className={styles.partner__overlayText}>Coming Soon</div>
            </div>
            <Row className="mt-4">
              <Col lg={6} md={6} xs={6}>
                <span className={styles.partner__detail_tag__tag1}>
                  {storeCurrency}
                  {comissionAmount}
                  {' '}
                  generated
                </span>
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
                  🛒
                  {' '}
                  {purchases}
                  {' '}
                  purchases
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
                  <Link href={groupshopLink ?? ''}><a target="_blank">View Groupshop</a></Link>
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
              <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt__aligned}>
                03/10/21
              </Col>
              <Col lg={4} md={4} xs={4} className="d-flex justify-content-end align-items-center px-4"><ArrowRightLogo /></Col>
            </Row>
            <Row className="mt-3">
              <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt}>W83HFSD</Col>
              <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt__aligned}>
                03/10/21
              </Col>
              <Col lg={4} md={4} xs={4} className="d-flex justify-content-end align-items-center px-4"><ArrowRightLogo /></Col>
            </Row>
            <Row className="mt-3">
              <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt}>W83HFSD</Col>
              <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt__aligned}>
                03/10/21
              </Col>
              <Col lg={4} md={4} xs={4} className="d-flex justify-content-end align-items-center px-4"><ArrowRightLogo /></Col>
            </Row>
          </div>
        </Form>
      </div>
    </section>
  );
}
