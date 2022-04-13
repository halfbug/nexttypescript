/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Billing.module.scss';
import { Row, Col, Table } from 'react-bootstrap';
import DownloadIcon from 'assets/images/download-icon.svg';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import useBilling from 'hooks/useBilling';
import { GET_MONTHLY_GS } from 'store/store.graphql';
import { StoreContext } from 'store/store.context';
import { useQuery } from '@apollo/client';
import { BillingType } from 'types/billing';
import useUtilityFunction from 'hooks/useUtilityFunction';
import R1 from 'assets/images/Revenue.svg';
import C1 from 'assets/images/CartBag.svg';

export default function PaymentHistory() {
  const {
    totalGS, totalRevenue, currencySymbol, getMonthlyGSCount,
  } = useBilling();
  const { convertNumToMonth } = useUtilityFunction();
  const { store } = React.useContext(StoreContext);
  const [monthlyGS, setmonthlyGS] = React.useState([]);

  const {
    loading, data, refetch,
  } = useQuery(GET_MONTHLY_GS, {
    variables: { storeId: store.id },
  });
  console.log('🚀 ~ file: PaymentHistory.tsx ~ line 22 ~ PaymentHistory ~ data', data);
  React.useEffect(() => {
    if (data?.getMonthlyGSBilling.length) { setmonthlyGS(data.getMonthlyGSBilling); }
  }, [data]);
  React.useEffect(() => {
    refetch();
  }, []);

  const getBillingTableHTML = () => (
    <div>
      <Table borderless hover>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={`${column.displayTitle}`}>
                {column.displayTitle}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthlyGS.map((item:BillingType) => (
            <tr key={`${item.cashBack}-${Math.random()}`}>
              <td>
                {convertNumToMonth(item._id.month - 1)}
                {' '}
                {item._id.year}
              </td>
              <td>{item.revenue}</td>
              <td>{getMonthlyGSCount(item._id.month)}</td>
              <td>{(item.cashBack).toFixed(2)}</td>
              <td>{item.feeCharges}</td>
              <td><DownloadIcon /></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col className="text-end"><WhiteButton>Load more</WhiteButton></Col>
      </Row>
    </div>
  );
  return (
    <Row className={styles.billing__paymenthistory}>
      <Col lg={12}>
        <div className={styles.billing__paymenthistory__header}>
          <h3>Payment History</h3>
        </div>
        <Row className={styles.billing__paymenthistory__summaryBox}>
          <Col lg={3} className={styles.billing__paymenthistory__summaryBox__s_box}>
            <div className={styles.billing__paymenthistory__summaryBox__s_box__revenue_icon}>
              <R1 />
            </div>
            <div className={styles.billing__paymenthistory__summaryBox__s_box__label}>
              Total Groupshop Revenue
            </div>
            <div className={styles.billing__paymenthistory__summaryBox__s_box__value}>
              {currencySymbol}
              {totalRevenue}
            </div>
          </Col>

          <Col lg={3} className={styles.billing__paymenthistory__summaryBox__s_box}>
            <div className={styles.billing__paymenthistory__summaryBox__s_box__shop_icon}>
              <C1 />
            </div>
            <div className={styles.billing__paymenthistory__summaryBox__s_box__label}>
              Total # of Groupshops
            </div>
            <div className={styles.billing__paymenthistory__summaryBox__s_box__value}>
              {totalGS}
            </div>
          </Col>
          <Col lg={6} />
        </Row>
        <Row className={styles.billing__paymenthistory__tableContainer}>
          <Col lg={12}>
            {getBillingTableHTML()}
          </Col>
        </Row>
        <Row>
          <Col lg={9} className={styles.billing__paymenthistory__turnOff}>
            <div className={styles.billing__paymenthistory__turnOff__powerIcon}>
              <PowerIcon />
              <div className={styles.billing__paymenthistory__turnOff__powerIcon__text}>
                Turn app off
              </div>
            </div>
            <div className={`${styles.billing__paymenthistory__turnOff__note} mx-4`}>
              Temporarily turn the Groupshop app off. Come back any time to reactivate it.
            </div>
            <div className='mx-4'>
              <WhiteButton>Turn off</WhiteButton>
            </div>
          </Col>
          <Col lg={3} />
        </Row>
      </Col>
    </Row>

  );
}

const columns = [
  {
    id: 1,
    displayTitle: 'Payment Date',
  },
  {
    id: 2,
    displayTitle: 'Revenue Generated',
  },
  {
    id: 3,
    displayTitle: 'Number of Groupshops',
  },
  {
    id: 4,
    displayTitle: 'Total Cashback',
  },
  {
    id: 5,
    displayTitle: 'Payment Amount',
  },
];

const mockData = [
  {
    paymentDate: 'October 2021',
    revenue: '$3560',
    count: '230',
    totalCashback: '$1103',
    amount: '$181',
  },
  {
    paymentDate: 'September 2021',
    revenue: '$2330',
    count: '194',
    totalCashback: '$892',
    amount: '$128',
  },
  {
    paymentDate: 'August 2021',
    revenue: '$1680',
    count: '132',
    totalCashback: '$524',
    amount: '$106',
  },
  {
    paymentDate: 'July 2021',
    revenue: '$1680',
    count: '132',
    totalCashback: '$655',
    amount: '$106',
  },
  {
    paymentDate: 'June 2021',
    revenue: '$3560',
    count: '230',
    totalCashback: '$1103',
    amount: '$655',
  },
];

const PowerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.0029 3.06201C11.8154 3.83665 12.3686 4.82354 12.5927 5.8979C12.8168 6.97226 12.7017 8.08584 12.2619 9.09784C11.8221 10.1098 11.0774 10.9748 10.122 11.5833C9.16651 12.1919 8.04322 12.5167 6.89413 12.5167C5.74504 12.5167 4.62175 12.1919 3.6663 11.5833C2.71085 10.9748 1.96615 10.1098 1.52636 9.09784C1.08657 8.08584 0.97145 6.97226 1.19555 5.8979C1.41964 4.82354 1.9729 3.83665 2.78535 3.06201" stroke="#F56363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.89746 1.37891V7.5323" stroke="#F56363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
