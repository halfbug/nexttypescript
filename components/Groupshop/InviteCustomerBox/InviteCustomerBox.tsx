/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from 'react';
import styles from 'styles/Marketing.module.scss';
import { RootProps } from 'types/store';
import {
  Col, Modal, Row, Form, Spinner,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import { InfoCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import { StoreContext } from 'store/store.context';
// @ts-ignore: Unreachable code error
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLazyQuery } from '@apollo/client';
import { FIND_PENDING_GROUPSHOP } from 'store/store.graphql';
import useAlert from 'hooks/useAlert';
import CalenderIcon from 'assets/images/calender-icon.svg';
import { FiCalendar } from 'react-icons/fi';

interface InviteCustomerBoxProps extends RootProps {
  show: boolean;
  setShowInvitePopup:any;
  startDate:Date | string;
  setStartDate:any;
  endDate:Date | string;
  setEndDate:any;
  minOrderValue:string;
  setMinOrderValue:any;
  handleClose(e: any): any;
  setCreateGroupshopPopup: any;
  setListCustomers:any;
  // addToCart(e: any): any;
}

const InviteCustomerBox = ({
  show = false, handleClose, setCreateGroupshopPopup, setListCustomers,
  setShowInvitePopup, startDate, endDate, setEndDate, minOrderValue,
  setMinOrderValue, setStartDate,
}: InviteCustomerBoxProps) => {
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };
  const [groupshopLength, setgroupshopLength] = useState(0);
  const { store, dispatch } = React.useContext(StoreContext);
  const { AlertComponent, showError, showSuccess } = useAlert();

  const changeDate = (value:any, field:any) => {
    // setLoading(true);
    if (field === 'start') {
      if (value === null) {
        setStartDate('');
      } else {
        setStartDate(value);
      }
    } else if (field === 'end') {
      if (value === null) {
        setEndDate('');
      } else {
        setEndDate(value);
      }
    }
  };

  const createGroupshopPopup = () => {
    setShowInvitePopup(false);
    setCreateGroupshopPopup(true);
  };

  const [getGroupshop, { data, loading }] = useLazyQuery(FIND_PENDING_GROUPSHOP, {
    fetchPolicy: 'no-cache',
    onError() {
      console.log('Record not found!');
    },
  });

  useEffect(() => {
    if (data) {
      // setLoading(false);
      setgroupshopLength(data?.findpendinggroupshop.length);
      setListCustomers(data?.findpendinggroupshop);
    }
  }, [data]);

  React.useEffect(() => {
    if (startDate !== '' && endDate !== '') {
      if (endDate >= startDate) {
        getGroupshop({
          variables: {
            shop: store.shop, startDate, endDate, minOrderValue,
          },
        });
      } else {
        showError('You can not select end date greater then start date.');
      }
    }
  }, [startDate, endDate, minOrderValue]);

  const clearDateRange = () => {
    setStartDate('');
    setEndDate('');
  };

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        size="lg"
        centered
        dialogClassName={styles.marketing_inviteCustomerBox_modal}
        contentClassName={styles.marketing_inviteCustomerBox_modal__content}
      >
        <Modal.Header className={styles.marketing_inviteCustomerBox_modal__closebtnlg}>
          <Row onClick={handleClose} className="visually-hidden">
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className={styles.marketing_inviteCustomerBox_modal__body}>
          <Row>
            <Col lg={12}>
              <div className={styles.marketing_inviteCustomerBox_modal__top}>
                <h4>
                  Add Past Customers
                </h4>
                <p>
                  To avoid duplicate pages, customers who have previously received
                  a Groupshop will not show below.
                </p>
                <p>
                  After you add customers, they will receive an automatic email containing
                  a link to their
                  Groupshop and instructions on how to use it.
                </p>
              </div>
              <hr />
            </Col>
          </Row>
          <Row className={styles.marketing_inviteCustomerBox_modal__bottom}>
            <Col lg={6}>
              <h4>
                Filter by date range:
              </h4>
              <Row>
                <Col lg={6}>
                  <span className={styles.marketing_inviteCustomerBox_modal__label}>
                    Start Date
                  </span>
                  <ToolTip
                    className={styles.marketing__tooltip_1}
                    popoverClassName={styles.marketing__tooltip_1__popover}
                    icon={<InfoCircle size={13} />}
                    popContent="You can’t select orders older than one year old."
                  />
                  <div>
                    <CalenderIcon className={styles.marketing_DatepickerIcon} />
                    <DatePicker
                      className="form-control"
                      placeholderText="dd/mm/yyyy"
                      dateFormat="dd/MM/yyyy"
                      name="startDate"
                      maxDate={new Date()}
                      selected={startDate as Date}
                      onChange={(sdate:any) => changeDate(sdate, 'start')}
                      calendarClassName="calendarArrow"
                    />
                  </div>
                </Col>
                <Col lg={6} className="">
                  <span className={styles.marketing_inviteCustomerBox_modal__label}>
                    End Date
                  </span>
                  <ToolTip
                    className={styles.marketing__tooltip_1}
                    popoverClassName={styles.marketing__tooltip_1__popover}
                    icon={<InfoCircle size={13} />}
                    popContent="The latest date you can select is the date your first Groupshop campaign became active."
                  />
                  <div>
                    <CalenderIcon className={styles.marketing_DatepickerIcon2} />
                    <DatePicker
                      className="form-control"
                      placeholderText="dd/mm/yyyy"
                      dateFormat="dd/MM/yyyy"
                      minDate={startDate as Date}
                      maxDate={new Date()}
                      name="endtDate"
                      selected={endDate as Date}
                      onChange={(edate:any) => changeDate(edate, 'end')}
                      calendarClassName="calendarArrow"
                    />
                  </div>
                </Col>
              </Row>
              <WhiteButton
                className={styles.marketing_inviteCustomerBox_modal__btn_btnClear}
                onClick={clearDateRange}
              >
                Clear dates
              </WhiteButton>
            </Col>
            <Col lg={6} className="ps-5">
              <h4>Filter by order value:</h4>
              <div>
                <span className={styles.marketing_inviteCustomerBox_modal__label}>
                  Minimum Order Value
                </span>
              </div>
              <Form.Control
                name="orderValue"
                id="orderValue"
                className={styles.marketing_inviteCustomerBox_modal__input}
                type="text"
                onChange={(e:any) => {
                  setMinOrderValue(e.currentTarget.value);
                }}
                value={minOrderValue !== '' ? minOrderValue : ''}
              />
            </Col>
            {/* <Row className="mt-5" />
            <Col lg={6}>
              <h4>Filter by products purchased:</h4>
              <p className={styles.marketing_inviteCustomerBox_modal__hint}>
                Only orders containing at least one of the products selected below will qualify.
              </p>
              <WhiteButton
                className={styles.marketing_inviteCustomerBox_modal__btn}
              >
                Add products
              </WhiteButton>
            </Col>
            <Col lg={6}>
              <h4>Filter by number of purchases</h4>
              <span className={styles.marketing_inviteCustomerBox_modal__label}>
                Minimum number of orders placed
              </span>
              <Form.Control
                className={styles.marketing_inviteCustomerBox_modal__input}
                type="text"
              />
            </Col> */}
            <Col lg={12}>
              <div className={styles.marketing_inviteCustomerBox_modal__btnSection}>
                <WhiteButton
                  className={[styles.marketing_inviteCustomerBox_modal__btn, '']
                    .join(' ')}
                  onClick={handleClose}
                >
                  Close
                </WhiteButton>
                {startDate === '' || endDate === '' ? (
                  <WhiteButton
                    className={styles.marketing_inviteCustomerBox_modal__purpleBtn}
                  >
                    Please select date range
                  </WhiteButton>
                ) : (
                  <>
                    {!loading && (
                    <WhiteButton
                      onClick={createGroupshopPopup}
                      className={styles.marketing_inviteCustomerBox_modal__purpleBtn}
                    >
                      Review Selection (
                      {groupshopLength}
                      {' '}
                      customers found)
                    </WhiteButton>
                    )}
                    {loading && (
                      <>
                        <WhiteButton
                          className={styles.marketing_inviteCustomerBox_modal__purpleBtn}
                        >
                          <Spinner animation="border" size="sm" className="align-middle" />
                        </WhiteButton>
                      </>
                    )}
                  </>
                )}

              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <AlertComponent />
    </>
  );
};
InviteCustomerBox.defaultProps = {
};

export default InviteCustomerBox;
