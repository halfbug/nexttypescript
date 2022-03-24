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

export default function PaymentHistory() {
  const { totalGS, totalRevenue, currencySymbol } = useBilling();
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
            <tr key={`${item.totalCashBack}-${Math.random()}`}>
              <td>
                {convertNumToMonth(item._id.month)}
                {' '}
                {item._id.year}
              </td>
              <td>{item.revenue}</td>
              <td>{item.count}</td>
              <td>{(item.totalCashBack).toFixed(2)}</td>
              <td>{item.amount}</td>
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
              <RevenueIcon />
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
              <ShoppingIcon />
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

const RevenueIcon = () => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <path d="M0 16.578H16V0.578008H0V16.578Z" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_1_1648" transform="scale(0.015625)" />
      </pattern>
      <image id="image0_1_1648" width="64" height="64" xlinkHref="item:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAKRWlDQ1BJQ0MgcHJvZmlsZQAAeNqdU2dUU+kWPffe9EJLiICUS29SFQggUkKLgBSRJiohCRBKiCGh2RVRwRFFRQQbyKCIA46OgIwVUSwMigrYB+Qhoo6Do4iKyvvhe6Nr1rz35s3+tdc+56zznbPPB8AIDJZIM1E1gAypQh4R4IPHxMbh5C5AgQokcAAQCLNkIXP9IwEA+H48PCsiwAe+AAF40wsIAMBNm8AwHIf/D+pCmVwBgIQBwHSROEsIgBQAQHqOQqYAQEYBgJ2YJlMAoAQAYMtjYuMAUC0AYCd/5tMAgJ34mXsBAFuUIRUBoJEAIBNliEQAaDsArM9WikUAWDAAFGZLxDkA2C0AMElXZkgAsLcAwM4QC7IACAwAMFGIhSkABHsAYMgjI3gAhJkAFEbyVzzxK64Q5yoAAHiZsjy5JDlFgVsILXEHV1cuHijOSRcrFDZhAmGaQC7CeZkZMoE0D+DzzAAAoJEVEeCD8/14zg6uzs42jrYOXy3qvwb/ImJi4/7lz6twQAAA4XR+0f4sL7MagDsGgG3+oiXuBGheC6B194tmsg9AtQCg6dpX83D4fjw8RaGQudnZ5eTk2ErEQlthyld9/mfCX8BX/Wz5fjz89/XgvuIkgTJdgUcE+ODCzPRMpRzPkgmEYtzmj0f8twv//B3TIsRJYrlYKhTjURJxjkSajPMypSKJQpIpxSXS/2Ti3yz7Az7fNQCwaj4Be5EtqF1jA/ZLJxBYdMDi9wAA8rtvwdQoCAOAaIPhz3f/7z/9R6AlAIBmSZJxAABeRCQuVMqzP8cIAABEoIEqsEEb9MEYLMAGHMEF3MEL/GA2hEIkxMJCEEIKZIAccmAprIJCKIbNsB0qYC/UQB00wFFohpNwDi7CVbgOPXAP+mEInsEovIEJBEHICBNhIdqIAWKKWCOOCBeZhfghwUgEEoskIMmIFFEiS5E1SDFSilQgVUgd8j1yAjmHXEa6kTvIADKC/Ia8RzGUgbJRPdQMtUO5qDcahEaiC9BkdDGajxagm9BytBo9jDah59CraA/ajz5DxzDA6BgHM8RsMC7Gw0KxOCwJk2PLsSKsDKvGGrBWrAO7ifVjz7F3BBKBRcAJNgR3QiBhHkFIWExYTthIqCAcJDQR2gk3CQOEUcInIpOoS7QmuhH5xBhiMjGHWEgsI9YSjxMvEHuIQ8Q3JBKJQzInuZACSbGkVNIS0kbSblIj6SypmzRIGiOTydpka7IHOZQsICvIheSd5MPkM+Qb5CHyWwqdYkBxpPhT4ihSympKGeUQ5TTlBmWYMkFVo5pS3aihVBE1j1pCraG2Uq9Rh6gTNHWaOc2DFklLpa2ildMaaBdo92mv6HS6Ed2VHk6X0FfSy+lH6JfoA/R3DA2GFYPHiGcoGZsYBxhnGXcYr5hMphnTixnHVDA3MeuY55kPmW9VWCq2KnwVkcoKlUqVJpUbKi9Uqaqmqt6qC1XzVctUj6leU32uRlUzU+OpCdSWq1WqnVDrUxtTZ6k7qIeqZ6hvVD+kfln9iQZZw0zDT0OkUaCxX+O8xiALYxmzeCwhaw2rhnWBNcQmsc3ZfHYqu5j9HbuLPaqpoTlDM0ozV7NS85RmPwfjmHH4nHROCecop5fzforeFO8p4ikbpjRMuTFlXGuqlpeWWKtIq1GrR+u9Nq7tp52mvUW7WfuBDkHHSidcJ0dnj84FnedT2VPdpwqnFk09OvWuLqprpRuhu0R3v26n7pievl6Ankxvp955vef6HH0v/VT9bfqn9UcMWAazDCQG2wzOGDzFNXFvPB0vx9vxUUNdw0BDpWGVYZfhhJG50Tyj1UaNRg+MacZc4yTjbcZtxqMmBiYhJktN6k3umlJNuaYppjtMO0zHzczNos3WmTWbPTHXMueb55vXm9+3YFp4Wiy2qLa4ZUmy5FqmWe62vG6FWjlZpVhVWl2zRq2drSXWu627pxGnuU6TTque1mfDsPG2ybaptxmw5dgG2662bbZ9YWdiF2e3xa7D7pO9k326fY39PQcNh9kOqx1aHX5ztHIUOlY63prOnO4/fcX0lukvZ1jPEM/YM+O2E8spxGmdU5vTR2cXZ7lzg/OIi4lLgssulz4umxvG3ci95Ep09XFd4XrS9Z2bs5vC7ajbr+427mnuh9yfzDSfKZ5ZM3PQw8hD4FHl0T8Ln5Uwa9+sfk9DT4FntecjL2MvkVet17C3pXeq92HvFz72PnKf4z7jPDfeMt5ZX8w3wLfIt8tPw2+eX4XfQ38j/2T/ev/RAKeAJQFnA4mBQYFbAvv4enwhv44/Ottl9rLZ7UGMoLlBFUGPgq2C5cGtIWjI7JCtIffnmM6RzmkOhVB+6NbQB2HmYYvDfgwnhYeFV4Y/jnCIWBrRMZc1d9HcQ3PfRPpElkTem2cxTzmvLUo1Kj6qLmo82je6NLo/xi5mWczVWJ1YSWxLHDkuKq42bmy+3/zt84fineIL43sXmC/IXXB5oc7C9IWnFqkuEiw6lkBMiE44lPBBECqoFowl8hN3JY4KecIdwmciL9E20YjYQ1wqHk7ySCpNepLskbw1eSTFM6Us5bmEJ6mQvEwNTN2bOp4WmnYgbTI9Or0xg5KRkHFCqiFNk7Zn6mfmZnbLrGWFsv7Fbou3Lx6VB8lrs5CsBVktCrZCpuhUWijXKgeyZ2VXZr/Nico5lqueK83tzLPK25A3nO+f/+0SwhLhkralhktXLR1Y5r2sajmyPHF52wrjFQUrhlYGrDy4irYqbdVPq+1Xl65+vSZ6TWuBXsHKgsG1AWvrC1UK5YV969zX7V1PWC9Z37Vh+oadGz4ViYquFNsXlxV/2CjceOUbh2/Kv5nclLSpq8S5ZM9m0mbp5t4tnlsOlqqX5pcObg3Z2rQN31a07fX2Rdsvl80o27uDtkO5o788uLxlp8nOzTs/VKRU9FT6VDbu0t21Ydf4btHuG3u89jTs1dtbvPf9Psm+21UBVU3VZtVl+0n7s/c/romq6fiW+21drU5tce3HA9ID/QcjDrbXudTVHdI9VFKP1ivrRw7HH77+ne93LQ02DVWNnMbiI3BEeeTp9wnf9x4NOtp2jHus4QfTH3YdZx0vakKa8ppGm1Oa+1tiW7pPzD7R1ureevxH2x8PnDQ8WXlK81TJadrpgtOTZ/LPjJ2VnX1+LvncYNuitnvnY87fag9v77oQdOHSRf+L5zu8O85c8rh08rLb5RNXuFearzpfbep06jz+k9NPx7ucu5quuVxrue56vbV7ZvfpG543zt30vXnxFv/W1Z45Pd2983pv98X39d8W3X5yJ/3Oy7vZdyfurbxPvF/0QO1B2UPdh9U/W/7c2O/cf2rAd6Dz0dxH9waFg8/+kfWPD0MFj5mPy4YNhuueOD45OeI/cv3p/KdDz2TPJp4X/qL+y64XFi9++NXr187RmNGhl/KXk79tfKX96sDrGa/bxsLGHr7JeDMxXvRW++3Bd9x3He+j3w9P5Hwgfyj/aPmx9VPQp/uTGZOT/wQDmPP87zWUggAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAN6aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzMiA3OS4xNTkyODQsIDIwMTYvMDQvMTktMTM6MTM6NDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Nzg2MjYwMDUtM2M2Zi00Y2NkLTkyZmYtYTRiZTNkYTg2Nzk2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJBNzExNjQ1OUFEQzExRTY5Rjg4RkZEMDRGNEUzMjlEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJBNzExNjQ0OUFEQzExRTY5Rjg4RkZEMDRGNEUzMjlEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1LjUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpiZGVmZTM2OS0xOTZiLTQxMzEtYTk4NC03NjM0MGRiNzZkZTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Nzg2MjYwMDUtM2M2Zi00Y2NkLTkyZmYtYTRiZTNkYTg2Nzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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" />
    </defs>
  </svg>

);

const ShoppingIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <path d="M0.203125 16.578H16.2031V0.578008H0.203125V16.578Z" fill="url(#pattern1)" />
    <defs>
      <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_1_1655" transform="scale(0.015625)" />
      </pattern>
      <image id="image0_1_1655" width="64" height="64" xlinkHref="item:image/png;base64,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" />
    </defs>
  </svg>

);
