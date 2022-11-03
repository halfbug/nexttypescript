import React, { useState, useEffect, useContext } from 'react';
import { Accordion } from 'react-bootstrap';
import useUtilityFunction from 'hooks/useUtilityFunction';
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
  // eslint-disable-next-line no-return-assign, no-param-reassign
  const totalPrice = customerLineItems.reduce((a:any, b:any) => a += b.discountedPrice, 0);
  return (
    <div className={styles.customerData__cutomerDetail}>
      <div className={styles.customerData__cutomerDetail__name}>
        <button
          type="button"
          onClick={() => {
            handleBackBtn();
          }}
          style={{ background: 'transparent', border: 'none' }}
        >
          <span> Back </span>
        </button>
      </div>
      <div className={styles.customerData__cutomerDetail__name}>
        Products Purchased
      </div>
      {customerLineItems?.map((items: any, index: number) => (
        <div className={styles.customerData__cutomerDetail__lists}>
          <div className={styles.customerData__cutomerDetail__acc__row__name}>
            <img style={{ width: 100 }} src={items.product[0].featuredImage} alt="Product" />
          </div>
          <div className={styles.customerData__cutomerDetail__acc__row__name}>
            {items.product[0].title}
          </div>
          <div className={styles.customerData__cutomerDetail__acc__row__name}>
            {currencyCode}
            {formatNumber(items.discountedPrice)}
          </div>
        </div>
      ))}
      <div className={styles.customerData__cutomerDetail__border} />
      <div className={styles.customerData__order_totalprice}>
        Total:
        {' '}
        {currencyCode}
        {formatNumber(totalPrice)}
      </div>
    </div>
  );
}
