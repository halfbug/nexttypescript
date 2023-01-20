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

export default function AnalyticCutomerDetail({
  customersData, currencyCode, setShowCustomerDetail, setShowLineitemsBox, setCustomerLineItems,
} : CustomerDetailProp) {
  const { formatNumber } = useUtilityFunction();
  const [showGenerated, setShowGenerated] = useState(0);
  const [getLineItems, { data: lineItems }] = useLazyQuery(GET_ORDER_LINEITEMS, {
    onError() { console.log('Error in finding Groupshops!'); },
  });

  useEffect(() => {
    if (customersData) {
      const { revenue } = customersData[0];
      // eslint-disable-next-line no-return-assign, no-param-reassign, max-len
      const firstOrder = +customersData[0].members[0].price;
      setShowGenerated(revenue / firstOrder);
    }
  }, [customersData]);

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
      <div className={[styles.customerData__orderDetail__orderRow, 'pb-2'].join(' ')}>
        <div className={styles.customerData__orderDetail__orderRow__number}>
          Order
          {' '}
          {(customersData[0].owner[0].name).replace('#', '')}
        </div>
        <div className={styles.customerData__orderDetail__orderRow__date}>
          { moment(new Date(customersData[0].owner[0].createdAt ?? customersData[0].owner[0].shopifyCreatedAt)).format('MM/DD/YY') }
        </div>
      </div>
      {/* <div className={styles.customerData__orderDetail__totalprice}>
        {currencyCode}
        { formatNumber(customersData[0].owner[0].price) }
      </div> */}
      <div className={styles.customerData__orderDetail__border} />
      <div className={styles.customerData__orderDetail__customerRow}>
        <div className={styles.customerData__orderDetail__customerRow__name}>
          {customersData[0].owner[0].customer.firstName}
          {' '}
          {customersData[0].owner[0].customer.lastName}
        </div>
      </div>
      <Button
        variant=""
        onClick={() => {
          handleLineitems(customersData[0].owner[0].id);
        }}
        className={[styles.customerData__orderDetail__viewProducts, 'text-decoration-underline px-0'].join(' ')}
      >
        View Products Purchased
        <ArrowRightLogo />
      </Button>
      <div className={styles.customerData__orderDetail__border} />
      <div className={styles.customerData__orderDetail__tagrow}>
        <div className={styles.customerData__orderDetail__tagrow__genereated}>
          {currencyCode}
          {formatNumber(customersData[0].revenue)}
          {' '}
          generated
        </div>
        <div className={styles.customerData__orderDetail__tagrow__clicks}>
          👆
          {' '}
          {customersData[0].uniqueClicks}
          {' '}
          unique clicks
        </div>
        <div className={styles.customerData__orderDetail__tagrow__purchases}>
          🛒
          {' '}
          {customersData[0].lineItemsCount}
          {' '}
          purchases
        </div>
        <div className={styles.customerData__orderDetail__tagrow__customer}>
          ✨
          {' '}
          {customersData[0].numMembers}
          {' '}
          new customers
        </div>
        <div className={styles.customerData__orderDetail__tagrow__cashback}>
          💸
          {' '}
          {currencyCode}
          {formatNumber(customersData[0].refund)}
          {' '}
          cashback
        </div>
        <a
          href={customersData[0].shortUrl ?? customersData[0].url}
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
      {customersData[0].members?.map((mem: any, index: number) => (
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
      <div className={styles.customerData__orderDetail__border} />
      {showGenerated > 1.5 && (
      <div className={styles.customerData__orderDetail__footer}>
        🎉 You’ve generated 3x the original order value by using Groupshop
      </div>
      )}
    </div>
  );
}
