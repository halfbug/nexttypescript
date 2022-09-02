import React, { useState, useEffect, useContext } from 'react';
import {
  Col, Row, Table,
} from 'react-bootstrap';
import ArrowRightLogo from 'assets/images/arrow-right.svg';
import styles from 'styles/Retentiontools.module.scss';
import moment from 'moment';
import useUtilityFunction from 'hooks/useUtilityFunction';

interface RetentionImportProps {
  currencyCode:string;
  retentionList: [];
}

export default function RetentionImport({ retentionList, currencyCode } : RetentionImportProps) {
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
    setstartDate(moment(new Date(currentPartner[0].startDate)).format('YYYY/MM/DD'));
    setendDate(moment(new Date(currentPartner[0].endDate)).format('YYYY/MM/DD'));
    setGroupshopsCreated(currentPartner[0].groupshopsCreated);
    if (currentPartner[0].minOrderValue !== '') {
      setorderValue(`${storeCurrencySymbol(currencyCode)}${currentPartner[0].minOrderValue}`);
    } else {
      setorderValue('-');
    }
    setimportDate(moment(new Date(currentPartner[0].createdAt)).format('YYYY/MM/DD'));
  };

  const getCustomerImportTableHTML = () => (
    <Row>
      <Col xs={12} lg={12}>
        <Table striped hover>
          <thead>
            <tr>
              <th>Date</th>
              <th> # of Groupshops Created</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {retentionList?.map((part: any, index: number) => (
              <tr>
                <td>{moment(new Date(part.createdAt)).format('YYYY/MM/DD')}</td>
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
              # of Groupshops created
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
}
