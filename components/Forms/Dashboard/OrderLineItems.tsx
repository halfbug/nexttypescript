import React, { useState, useEffect, useContext } from 'react';
import useUtilityFunction from 'hooks/useUtilityFunction';
import { Col } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import styles from 'styles/Analytics.module.scss';

interface CustomerDetailProp{
  customerLineItems: any;
  currencyCode: any;
  setShowCustomerDetail: any;
  setShowLineitemsBox: any;
}

export default function OrderLineItems({
  customerLineItems, currencyCode, setShowCustomerDetail, setShowLineitemsBox,
} : CustomerDetailProp) {
  const { formatNumber } = useUtilityFunction();
  const handleBackBtn = () => {
    setShowCustomerDetail(true);
    setShowLineitemsBox(false);
  };
  // eslint-disable-next-line no-return-assign, no-param-reassign, max-len
  const totalPrice = customerLineItems.reduce((a:any, b:any) => a += b.discountedPrice * b.quantity, 0);
  return (
    <div className={styles.customerData__cutomerDetail}>
      <div className={styles.customerData__cutomerDetail__name}>
        <button
          type="button"
          className="mb-2"
          onClick={() => {
            handleBackBtn();
          }}
          style={{ background: 'transparent', border: 'none' }}
        >
          <span>
            <BsArrowLeft className="mb-1 d-absolute d-inline-flex" />
            {' '}
            Back
            {' '}
          </span>
        </button>
      </div>
      <div className={[styles.customerData__cutomerDetail__name, 'mx-4 mt-2 mb-3 pb-1'].join(' ')}>
        Products Purchased
      </div>
      <div className="mx-4">
        {customerLineItems?.map((items: any, index: number) => (
          <div className={styles.customerData__cutomerDetail__lists}>
            <div className={styles.customerData__cutomerDetail__acc__row__product}>
              <img style={{ width: 100 }} src={(items.product[0]?.featuredImage) ? items.product[0]?.featuredImage : 'https://gsnodeimages.s3.amazonaws.com/dummy-image.png'} alt="Product" />
            </div>
            <div className={styles.customerData__cutomerDetail__acc__row__name}>
              {(items.product[0]?.title) ? items.product[0]?.title : 'No title'}
            </div>
            <div className={styles.customerData__cutomerDetail__acc__row__price}>
              {currencyCode}
              {formatNumber(items.discountedPrice)}
            </div>
          </div>
        ))}
        <div className={[styles.customerData__cutomerDetail__border, 'mt-4'].join(' ')} />
        <div className={styles.customerData__orderDetail__Ptotalprice}>
          <Col>
            Total:
            {' '}
          </Col>
          <Col className="d-flex justify-content-end ">
            {currencyCode}
            {formatNumber(totalPrice)}
          </Col>
        </div>
      </div>
    </div>
  );
}
