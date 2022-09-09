import React, { useState, useEffect } from 'react';
import {
  Col, Row, Spinner,
} from 'react-bootstrap';
import styles from 'styles/Retentiontools.module.scss';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import InviteCustomerBox from 'components/Groupshop/InviteCustomerBox/InviteCustomerBox';
import CreateGroupshopBox from 'components/Groupshop/InviteCustomerBox/CreateGroupshopBox';
import { useLazyQuery, useQuery } from '@apollo/client';
import { SYNC_STORE_CUSTOMERS, GET_STORE_DETAILS } from 'store/store.graphql';
import useAlert from 'hooks/useAlert';
import moment from 'moment';

interface RetentionInviteProps {
  handleAfterSubmit: any;
  setshowRetentionImport: any;
  activeCampaign: string;
  storeId: any;
}

export default function RetentionInvite({
  activeCampaign,
  storeId,
  setshowRetentionImport,
  handleAfterSubmit,
} : RetentionInviteProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minOrderValue, setMinOrderValue] = useState('');
  const [syncStatus, setsyncStatus] = useState('');
  const [updatedAt, setupdatedAt] = useState('');
  const [syncLoading, setsyncLoading] = useState(false);
  const [showInvitePopup, setShowInvitePopup] = useState<boolean>(false);
  const [showCreateGroupshopPopup, setCreateGroupshopPopup] = useState<boolean>(false);
  const [listCustomers, setListCustomers] = useState<any>([]);
  const { AlertComponent, showError, showSuccess } = useAlert();
  const syncCustomers = () => {
    setsyncLoading(true);
    syncStoreCustomers({ variables: { storeId } });
  };

  const {
    data: storeData, refetch: storeRefresh,
  } = useQuery(GET_STORE_DETAILS, {
    variables: { id: storeId },
  });

  useEffect(() => {
    if (storeData) {
      if (storeData.store.retentiontool?.status) {
        setsyncStatus(storeData.store.retentiontool?.status);
        setupdatedAt(storeData.store.retentiontool?.updatedAt);
      }
    }
  }, [storeData]);

  const createCampaignList = () => {
    setshowRetentionImport(false);
    if (activeCampaign === '') {
      showError('Please active/create the campaign first!');
    } else {
      setShowInvitePopup(true);
    }
  };

  const [syncStoreCustomers, { data }] = useLazyQuery(SYNC_STORE_CUSTOMERS, {
    fetchPolicy: 'no-cache',
    onError() {
      console.log('Record not found!');
    },
    onCompleted() {
      setTimeout(() => {
        setsyncLoading(false);
        storeRefresh();
      }, 1500);
    },
  });

  const handleInnerSubmit = () => {
    handleAfterSubmit();
    setStartDate('');
    setEndDate('');
    setMinOrderValue('');
  };

  return (
    <Row>
      <Col xxl={8} xl={8} lg={8} md={8} xs={12}>
        <div className={styles.rt__invite_box}>
          <h3>
            Invite past customers to Groupshop
          </h3>
          <span>
            Use this tool to create Groupshop pages for customers who
            shopped before you started using Groupshop for your brand.
          </span>
          <h4>
            Step 1
          </h4>
          <span>
            We’ll sync the past year of customer data –
            we’re not creating any Groupshop pages yet at this step.
          </span>
          <div className={styles.rt__invite_box_btn}>
            {syncStatus !== 'Active' && syncLoading === false
              ? (
                <WhiteButton onClick={syncCustomers}>
                  Sync Customers
                </WhiteButton>

              )
              : (
                <WhiteButton>
                  Sync Customers
                </WhiteButton>

              )}
            {syncLoading && <Spinner animation="border" />}
            <div className={styles.syncted_at}>{ moment(new Date(updatedAt)).format('MM/DD/YYYY') }</div>
          </div>
          <h4>
            Step 2
          </h4>
          <span>
            Click below to sort through elligible customers and create Groupshops for them.
          </span>
          <div className={styles.rt__invite_box_btn}>
            {syncStatus !== 'Active'
              ? (
                <WhiteButton>
                  Sort & Create Groupshops
                </WhiteButton>
              )
              : (
                <WhiteButton onClick={createCampaignList}>
                  Sort & Create Groupshops
                </WhiteButton>

              )}
          </div>
        </div>
      </Col>
      <Col xxl={4} xl={4} lg={4} md={4} xs={12}>
        <div className={styles.rt__rewards_box}>
          <h3>
            Rewards
          </h3>
          <span>
            The Groupshops you create will have the same rewards tiers
            applied as your current active campaign.
          </span>
        </div>
      </Col>
      <InviteCustomerBox
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        minOrderValue={minOrderValue}
        setMinOrderValue={setMinOrderValue}
        show={showInvitePopup}
        setListCustomers={setListCustomers}
        setShowInvitePopup={setShowInvitePopup}
        setCreateGroupshopPopup={setCreateGroupshopPopup}
        handleClose={() => setShowInvitePopup(false)}
      />

      <CreateGroupshopBox
        startDate={startDate}
        handleInnerSubmit={handleInnerSubmit}
        endDate={endDate}
        minOrderValue={minOrderValue}
        show={showCreateGroupshopPopup}
        showCreateBtn
        listCustomers={listCustomers}
        setShowInvitePopup={setShowInvitePopup}
        setCreateGroupshopPopup={setCreateGroupshopPopup}
        handleClose={() => setCreateGroupshopPopup(false)}
      />

      <AlertComponent />
    </Row>

  );
}
