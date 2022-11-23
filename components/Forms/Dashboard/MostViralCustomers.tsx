/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react';
import {
  Accordion, Container, Col, Row, Spinner,
} from 'react-bootstrap';
import useUtilityFunction from 'hooks/useUtilityFunction';
import useDimensions from 'hooks/useDimentions';
import usePagination from 'hooks/usePagination';
import Pagination from 'react-bootstrap/Pagination';
import InfoIcon from 'assets/images/info-icon-medium.svg';
import ArrowRightLogo from 'assets/images/arrow-right.svg';
import styles from 'styles/Analytics.module.scss';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';

interface ViralCustomersProp{
  xs?: any,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
  currencyCode: any;
  setActiveCustomersData: any;
  setShowCustomerDetail:any;
  setShowLineitemsBox: any;
  viralCustomersList: any[];
}

const MostViralCustomers = ({
  viralCustomersList, xs = 12, sm = 12, md = 12, lg = 12, xl = 12, xxl = 12,
  currencyCode, setShowCustomerDetail, setActiveCustomersData, setShowLineitemsBox,
}: ViralCustomersProp) => {
  const { formatNumber } = useUtilityFunction();
  const [ref, dimensions] = useDimensions();
  const {
    screens, breakPoint, pageSize,
    totalPages, renderItems, currentPage, setCurrentPage, getPageNumbers,
  } = usePagination({
    dimensions,
    maxrows: 5,
    screens: {
      xs, sm, md, lg, xl, xxl,
    },
    items: viralCustomersList || [],
    siblingCount: 4,
    id: 'MostViral',
  });
  const handleCustomer = async (id: string) => {
    setShowLineitemsBox(false);
    setShowCustomerDetail(true);
    const activeCustomer: any = viralCustomersList?.filter(
      (item: any) => item._id === id,
    );
    setActiveCustomersData(activeCustomer);
  };
  return (
    <>
      <section ref={ref} className={styles.customerData__viralCustomer}>
        <div className={styles.customerData__viralCustomer__heading}>
          Most Viral Customers
          <ToolTip
            className={['pt-1 d-flex align-item-center', styles.customerData_tooltipIcon].join(' ')}
            icon={<InfoIcon />}
            popContent="Viral customers earn you the most revenue, sales, and referrals.
            Check the leaderboard
            to find potential influencers and affiliates among your existing customers."
          />
        </div>
        <div className={styles.customerData__viralCustomer__description}>
          These metrics help you identify your most promising brand influencers and affiliates.
        </div>

        <div className={styles.customerData__viralCustomer__heading1} />
        <Row className={styles.customerData__table_heading}>
          <div className={styles.customerData__mostViral__table_heading}>
            <div>
              Order #
            </div>
            <div>
              Customer Name
            </div>
            <div className="text-nowrap mx-2">
              Revenue Generated
            </div>
            <div>
              Unique Clicks
            </div>
          </div>
        </Row>
        <Row className={styles.customerData__mostViral}>
          {renderItems?.map((part: any, index: number) => (
            <div className={styles.customerData__mostViral__listing}>
              <div>
                <div className={styles.customerData__acc__row__count}>
                  {part.members[0].name}
                </div>
              </div>
              <div>
                <div className={styles.customerData__acc__row__name}>
                  {part.members[0].customer.firstName}
                  {' '}
                  {part.members[0].customer.lastName}
                </div>
              </div>
              <div>
                <div className={styles.customerData__acc__row__genereated}>
                  {currencyCode}
                  {formatNumber(part.revenue)}
                  {' '}
                  generated
                </div>
              </div>
              <div>
                <div className={styles.customerData__acc__row__clicks}>
                  👆
                  {' '}
                  {part.uniqueClicks}
                  {' '}
                  unique clicks
                </div>
              </div>
              <div
                className={styles.customer_handPointer}
              >
                <ArrowRightLogo
                  className={styles.customerData_Cursor}
                  onClick={() => {
                    handleCustomer(part._id);
                  }}
                />
              </div>
            </div>
          ))}
          {viralCustomersList.length === 0 && (
            <div className={styles.customerData__mostViral__noRecord}>No customer found!</div>
          )}
        </Row>
        <Row>
          <Col>
            {totalPages > 1 && viralCustomersList.length > 5 && (
              <Pagination className={styles.groupshop_pagination}>
                <Pagination.Prev
                  className={[(currentPage === 1) ? 'd-none' : '', styles.groupshop_pagination_prev].join(' ')}
                  onClick={() => {
                    setCurrentPage(
                      (currentPage > 1) ? currentPage - 1 : currentPage,
                    );
                  }}
                />

                {getPageNumbers().map((n, index) => (
                  <Pagination.Item
                    active={currentPage === n}
                    onClick={() => {
                      setCurrentPage(n);
                    }}
                    className={currentPage === n
                      ? styles.groupshop_pagination_activeItem
                      : styles.groupshop_pagination_item}
                  >
                    {n}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  className={[(currentPage === totalPages) ? 'd-none' : '', styles.groupshop_pagination_next].join(' ')}
                  onClick={() => {
                    setCurrentPage(
                      (currentPage >= 1 && currentPage < totalPages)
                        ? currentPage + 1
                        : currentPage,
                    );
                  }}
                />

              </Pagination>

            )}
          </Col>
        </Row>
      </section>
    </>
  );
};

MostViralCustomers.defaultProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

export default MostViralCustomers;
