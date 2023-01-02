import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import useUtilityFunction from 'hooks/useUtilityFunction';
import moment from 'moment';
import { useLazyQuery } from '@apollo/client';
import { GET_ORDER_LINEITEMS } from 'store/store.graphql';
import InfoIcon from 'assets/images/info-icon-medium.svg';
import ArrowRightLogo from 'assets/images/arrow-right.svg';
import styles from 'styles/Analytics.module.scss';

interface CustomerDetailProp{
  customersData: any;
  currencyCode: any;
  setShowCustomerDetail: any;
  setShowLineitemsBox: any;
  setCustomerLineItems:any;
}

export default function AnalyticCustomerPartnerDetail({
  customersData, currencyCode, setShowCustomerDetail, setShowLineitemsBox, setCustomerLineItems,
} : CustomerDetailProp) {
  const { formatNumber } = useUtilityFunction();
  const [getLineItems, { data: lineItems }] = useLazyQuery(GET_ORDER_LINEITEMS, {
    onError() { console.log('Error in finding Groupshops!'); },
  });

  useEffect(() => {
    if (lineItems) {
      if (lineItems?.orderLineItems) {
        setCustomerLineItems(lineItems.orderLineItems);
        setShowCustomerDetail(false);
        setShowLineitemsBox(true);
      }
    }
  }, [lineItems]);

  const handleLineitems = async (id: string) => {
    getLineItems({ variables: { parentId: id } });
  };
  return (
    <div className={styles.customerData__orderDetail}>
      <div className={styles.customerData__orderDetail__orderRow}>
        <div className={styles.customerData__orderDetail__orderRow__number}>
          {customersData?.partnerDetails?.fname
          ?? customersData?.partnerDetails?.email.substring(0, 15)}
        </div>
        <div className={styles.customerData__orderDetail__orderRow__date}>
          { moment(new Date(customersData?.createdAt)).format('MM/DD/YY') }
        </div>
      </div>
      <div className={styles.customerData__orderDetail__border} />
      <div className={styles.customerData__orderDetail__tagrow}>
        <div className={styles.customerData__orderDetail__tagrow__genereated}>
          {currencyCode}
          {formatNumber(customersData?.revenue - customersData.refund) }
          {' '}
          generated
        </div>
        <div className={styles.customerData__orderDetail__tagrow__clicks}>
          👆
          {' '}
          {customersData.uniqueClicks}
          {' '}
          unique clicks
        </div>
        <div className={styles.customerData__orderDetail__tagrow__purchases}>
          🛒
          {' '}
          {customersData.lineItemsCount}
          {' '}
          purchases
        </div>
        <div className={styles.customerData__orderDetail__tagrow__customer}>
          ✨
          {' '}
          {customersData.numMembers}
          {' '}
          new customers
        </div>
        <div className={styles.customerData__orderDetail__tagrow__cashback}>
          💸
          {' '}
          {currencyCode}
          {formatNumber(customersData.refund)}
          {' '}
          discount
        </div>
        <a
          href={customersData.shortUrl ?? customersData.url}
          className={styles.customerData__orderDetail__tagrow__viewgroupshop}
          target="_blank"
          rel="noreferrer"
        >
          View Groupshop
          <ArrowRightLogo />
        </a>
      </div>
      <div className={styles.customerData__orderDetail__border} />
      <div className={styles.customerData__cutomerDetail__table_head}>
        <div className={styles.customerData__cutomerDetail__table_head__txt}>
          Order #
        </div>
        <div className={styles.customerData__cutomerDetail__table_head__txt}>Date</div>
        <div />
      </div>
      {customersData.orderName?.map((mem: any, index: number) => (
        <div className={styles.customerData__cutomerDetail__lists}>
          <div className={styles.customerData__cutomerDetail__acc__row__name}>{mem.name}</div>
          <div className={styles.customerData__cutomerDetail__acc__row__name}>
            { moment(new Date(mem.createdAt)).format('MM/DD/YY') }
          </div>
          <div className={styles.customerData__cutomerDetail__acc__row__orderNdate}>
            <ArrowRightLogo
              className={styles.customerData_Cursor}
              onClick={() => {
                handleLineitems(mem.id);
              }}
            />
          </div>
        </div>
      ))}

    </div>
  );
}
