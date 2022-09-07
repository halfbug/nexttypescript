import React, { useState, useEffect, useContext } from 'react';
import {
  Col, Row, Table,
} from 'react-bootstrap';
import ArrowRightLogo from 'assets/images/arrow-right.svg';
import styles from 'styles/Retentiontools.module.scss';
import moment from 'moment';
import useUtilityFunction from 'hooks/useUtilityFunction';
import useDimensions from 'hooks/useDimentions';
import { PastCustomerGroupshop } from 'types/store';
import usePagination from 'hooks/usePagination';
import Pagination from 'react-bootstrap/Pagination';

interface RetentionImportProps {
  currencyCode:string;
  retentionList: [];
  xs?: any,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
}

const RetentionImport = ({
  retentionList, currencyCode, xs = 12, sm = 12, md = 12, lg = 12, xl = 12, xxl = 12,
} : RetentionImportProps) => {
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [groupshopsCreated, setGroupshopsCreated] = useState('');
  const [orderValue, setorderValue] = useState('-');
  const [importDate, setimportDate] = useState('');
  const { formatNumber, storeCurrencySymbol } = useUtilityFunction();

  const handleRetention = async (id: string) => {
    const currentPartner: any = retentionList?.filter(
      (item: any) => item.id === id,
    );
    setstartDate(moment(new Date(currentPartner[0].startDate)).format('MM/DD/YY'));
    setendDate(moment(new Date(currentPartner[0].endDate)).format('MM/DD/YY'));
    setGroupshopsCreated(currentPartner[0].groupshopsCreated);
    if (currentPartner[0].minOrderValue !== '') {
      setorderValue(`${storeCurrencySymbol(currencyCode)}${currentPartner[0].minOrderValue}`);
    } else {
      setorderValue('-');
    }
    setimportDate(moment(new Date(currentPartner[0].createdAt)).format('MM/DD/YYYY'));
  };
  const [ref, dimensions] = useDimensions();
  const {
    screens, breakPoint, pageSize,
    totalPages, renderItems, currentPage, setCurrentPage, getPageNumbers,
  } = usePagination<PastCustomerGroupshop>({
    dimensions,
    maxrows: 10,
    screens: {
      xs, sm, md, lg, xl, xxl,
    },
    items: retentionList || [],
    siblingCount: 4,
  });

  const getCustomerImportTableHTML = () => (
    <>
      <Row ref={ref}>
        <Col xs={12} lg={12}>
          <Table striped hover>
            <thead>
              <tr>
                <th>Date</th>
                <th> # Groupshops Created</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {renderItems?.map((part: any, index: number) => (
                <tr>
                  <td>{moment(new Date(part.createdAt)).format('MM/DD/YY')}</td>
                  <td>{part.groupshopsCreated}</td>
                  <td>
                    <ArrowRightLogo
                      onClick={() => {
                        handleRetention(part.id);
                      }}
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );

  return (
    <Row>
      <Col xxl={8} xl={8} lg={8} md={8} xs={12}>
        <div className={styles.rt__importCustomer_box}>
          <h3>
            Past Customer Imports
          </h3>
          <span>
            Below is a log of every batch of past customers you have created Groupshops for.
          </span>
          {getCustomerImportTableHTML()}
          <Row>
            <Col>
              {totalPages > 1 && (
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
        </div>
      </Col>
      <Col xxl={4} xl={4} lg={4} md={4} xs={12}>
        <div className={styles.rt__importDate_box}>
          <div className={styles.rt__importDate_box_header}>
            <h3>
              Import Date
            </h3>
            <span>
              {importDate}
            </span>
          </div>
          <hr />
          <div className={styles.rt__importDate_box_row}>
            <h4>
              # Groupshops created
            </h4>
            <span>
              {groupshopsCreated}
            </span>
          </div>
          <div className={styles.rt__importDate_box_row}>
            <h4>
              Date Range
            </h4>
            <span>
              {startDate}
              -
              {endDate}
            </span>
          </div>
          <div className={styles.rt__importDate_box_row}>
            <h4>
              Minimum order value
            </h4>
            <span>
              {orderValue}
            </span>
          </div>
          <div />
        </div>
      </Col>
    </Row>
  );
};

RetentionImport.defaultProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};
export default RetentionImport;
