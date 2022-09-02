import React, { useState, useEffect, useContext } from 'react';
import styles from 'styles/Marketing.module.scss';
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

interface CreateGroupshopBoxProps extends RootProps {
  show: boolean;
  handleInnerSubmit:any;
  setShowInvitePopup:any;
  startDate:string;
  endDate:string;
  minOrderValue:string;
  setCreateGroupshopPopup:any;
  handleClose(e: any): any;
  listCustomers: any;
}

const CreateGroupshopBox = ({
  show = false, handleInnerSubmit, handleClose, listCustomers, setShowInvitePopup,
  startDate, endDate, minOrderValue, setCreateGroupshopPopup,
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
      <Modal
        show={show}
        onHide={closeGroupshopModal}
        size="lg"
        centered
        dialogClassName={styles.marketing_inviteCustomerBox_modal}
        contentClassName={styles.marketing_inviteCustomerBox_modal__content}
      >
        <Modal.Header className={styles.marketing_inviteCustomerBox_modal__closebtnlg}>
          <Row onClick={handleClose}>
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
                  We’ll create Groupshop pages for all of the customers listed below.
                </p>
              </div>
              <hr />
            </Col>
          </Row>
          <Row className={styles.marketing_inviteCustomerBox_modal__bottom}>
            <Col lg={12}>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer Name</th>
                    <th>Order Value</th>
                    <th>Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {listCustomers?.map((part: any, index: number) => (
                    <tr>
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
                      <td>{moment(new Date(part.shopifyCreateAt)).format('YYYY-MM-DD')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
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
          </Row>
        </Modal.Body>
      </Modal>
      <AlertComponent />
    </>
  );
};
CreateGroupshopBox.defaultProps = {
};

export default CreateGroupshopBox;
