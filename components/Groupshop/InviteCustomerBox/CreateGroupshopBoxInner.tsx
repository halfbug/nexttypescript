import React, { useState, useEffect, useContext } from 'react';
import styles from 'styles/Marketing.module.scss';
import style1 from 'styles/Retentiontools.module.scss';
import { RootProps, PastCustomerGroupshop } from 'types/store';
import {
  Col, Modal, Row, Table, Spinner,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import { InfoCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import { useMutation } from '@apollo/client';
import { StoreContext } from 'store/store.context';
import { CREATE_PAST_GROUPSHOP_LOG } from 'store/store.graphql';
import useUtilityFunction from 'hooks/useUtilityFunction';
import moment from 'moment';
import useAlert from 'hooks/useAlert';
import useDimensions from 'hooks/useDimentions';
import usePagination from 'hooks/usePagination';
import Pagination from 'react-bootstrap/Pagination';

interface CreateGroupshopBoxProps extends RootProps {
  show: boolean;
  showCreateBtn:boolean
  handleInnerSubmit:any;
  setShowInvitePopup:any;
  startDate:string;
  endDate:string;
  minOrderValue:string;
  setCreateGroupshopPopup:any;
  handleClose(e: any): any;
  listCustomers: any;
  xs?: any,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,

}

const CreateGroupshopBoxInner = ({
  show = false, showCreateBtn, handleInnerSubmit, handleClose, listCustomers, setShowInvitePopup,
  startDate, endDate, minOrderValue, setCreateGroupshopPopup,
  xs = 12, sm = 12, md = 12, lg = 12, xl = 12, xxl = 12,
}: CreateGroupshopBoxProps) => {
  const closeGroupshopModal = (e: any) => {
    setCreateGroupshopPopup(false);
    setShowInvitePopup(true);
  };

  const [loader, setLoader] = useState(false);
  const { store, dispatch } = React.useContext(StoreContext);
  const { AlertComponent, showError, showSuccess } = useAlert();
  const createGroupShops = async () => {
    if (listCustomers.length > 0) {
      setLoader(true);
      const retentionTool = await createRetentionTool({
        variables: {
          createRetentiontoolInput: {
            shop: store.shop,
            storeId: store.id,
            groupshopsCreated: listCustomers.length,
            startDate,
            endDate,
            minOrderValue,
          },
        },

      });
    } else {
      showError('Did not find any pending groupshop');
    }
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
    items: listCustomers || [],
    siblingCount: 4,
  });

  const { formatNumber, storeCurrencySymbol } = useUtilityFunction();
  const [
    createRetentionTool,
    { loading, error },
  ] = useMutation<PastCustomerGroupshop>(CREATE_PAST_GROUPSHOP_LOG, {
    onError() {
      showError('Something went wrong, Please try after sometime!');
    },
    onCompleted() {
      setLoader(false);
      setCreateGroupshopPopup(false);
      setShowInvitePopup(false);
      showSuccess('Groupshop created successfully!');
      handleInnerSubmit();
    },
  });
  return (
    <>
      <Modal.Body className={styles.marketing_inviteCustomerBox_modal__body}>
        <Row>
          <Col lg={12}>
            <div className={styles.marketing_inviteCustomerBox_modal__top}>
              <h4>
                Add Past Customers
              </h4>
              <p>
                We’ll create Groupshop pages for all of the customers listed below.
              </p>
            </div>
            <hr />
          </Col>
        </Row>
        <Row className={styles.marketing_inviteCustomerBox_modal__bottom}>
          <Col lg={12}>
            <Table borderless responsive>
              <thead className={style1.rt__table_head__txt}>
                <tr>
                  <th className="w-25">Order #</th>
                  <th>Customer Name</th>
                  <th>Order Value</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody ref={ref} className="border-0 ">
                {renderItems?.map((part: any, index: number) => (
                  <tr className={[style1.rt_table_row__data_row, 'd-table-row border-0 mb-2 mt-2'].join(' ')}>
                    <td>{part.name}</td>
                    <td>
                      {part.customer.firstName}
                      {' '}
                      {part.customer.lastName}
                      {' '}
                    </td>
                    <td>
                      {storeCurrencySymbol(store?.currencyCode ?? 'USD')}
                      {formatNumber(part.price)}
                    </td>
                    <td>{moment(new Date(part.shopifyCreateAt)).format('DD/MM/YYYY')}</td>
                  </tr>
                ))}
                <tr>
                  <td>
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
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          {showCreateBtn && (
          <Col lg={12}>
            <div className={styles.marketing_inviteCustomerBox_modal__btnSection}>
              <WhiteButton
                className={styles.marketing_inviteCustomerBox_modal__btn}
                onClick={closeGroupshopModal}
              >
                Go Back
              </WhiteButton>

              {loader ? <Spinner animation="border" /> : (
                <WhiteButton
                  className={styles.marketing_inviteCustomerBox_modal__purpleBtn}
                  onClick={createGroupShops}
                >
                  Create Groupshops
                </WhiteButton>
              )}

            </div>
          </Col>
          )}
        </Row>
      </Modal.Body>
      <AlertComponent />
    </>
  );
};
CreateGroupshopBoxInner.defaultProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

export default CreateGroupshopBoxInner;
