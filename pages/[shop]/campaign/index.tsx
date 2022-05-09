/* eslint-disable quotes */
import React, { useState, useEffect, useContext } from 'react';
import ToggleButton from 'components/Buttons/ToggleButton/ToggleButton';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import Page from 'components/Layout/Page/Page';
import Router from 'next/router';
import {
  Container, Row, Col, Button, Form,
} from 'react-bootstrap';
import styles from 'styles/CampaignListing.module.scss';
import { StoreContext } from 'store/store.context';
import { ICampaign } from 'types/store';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_CAMPAIGNS, UPDATE_CAMPAIGN } from 'store/store.graphql';
import useCampaign from 'hooks/useCampaign';
import Model from 'components/Widgets/Model/Model';

const CampaignListing = () => {
  const [show, setShow] = useState(false);
  const [campId, setCampId] = useState('');
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const { store, dispatch } = useContext(StoreContext);
  const shopName: string[] | undefined = store?.shop?.split('.', 1);

  const [campaignList, setCampaignList] = useState<[]>([]);
  const heading = ['Campaign Name', 'Revenue Generated', 'Number of Groupshops', 'Total Cashback', 'Active', 'Actions', ' '];

  const [
    editCampaignStatus,
  ] = useMutation<any, ICampaign | null>(UPDATE_CAMPAIGN);

  const {
    loading, error, data, refetch,
  } = useQuery(GET_ALL_CAMPAIGNS, {
    variables: { storeId: store.id },
  });

  useEffect(() => {
    if (data) {
      // console.log(data);
      setCampaignList(data.campaigns);
      dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: data.campaigns } });
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    refetch();
  }, [store]);

  const { clearNewCampaign } = useCampaign();
  const handleClick = (campaignid: string) => {
    clearNewCampaign();
    dispatch({ type: 'SINGLE_CAMPAIGN', payload: { singleEditCampaignId: campaignid } });
    if (shopName) Router.push(`/${shopName}/campaign/${campaignid}`);
  };

  const handleToggle = async (id: string) => {
    const currentCamp: any = store?.campaigns?.filter(
      (item) => item.id === id,
    );
    const active = currentCamp[0]?.isActive;
    const isActive = !active;

    const campObj: null | any = await editCampaignStatus({
      variables: {
        updateCampaignInput: {
          storeId: store.id,
          id,
          isActive,
        },
      },
    });
    // console.log({ campObj });
    const { data: { updateCampaign } } = campObj;
    // refetch();
    // now update store context with new campaign isActive changes
    const updatedCampaigns = store?.campaigns?.map((item: any) => {
      if (item.id === updateCampaign.id) {
        return updateCampaign;
      }
      return item;
    });
    dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: updatedCampaigns } });
    handleClose();
  };

  return (
    <Page headingText="Campaign" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
      <Container fluid className={styles.container}>
        <Model
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          handleToggle={() => handleToggle(campId)}
          id={campId ?? ''}
        />
        {' '}
        <h3>All Campaigns</h3>
        <p className="mt-3 mb-4">
          ✨
          From here you can edit your active campaign, create a new campaign,
          or explore analytics for each campaign.
          <br />
          Creating different campaigns is a great
          way to learn how the products and discounts
          you offer impact your performance.
          <br />
          Only one campaign can be active at a time,
          click on a toggle to switch to a new campaign, or create a new one.
        </p>
        <Row className={['text-nowrap d-flex flex-row ', styles.container_listHeader].join(' ')}>
          <Col className="text-muted fs-6 pe-5">Campaign Name</Col>
          <Col className="text-muted fs-6 ">Revenue Generated</Col>
          <Col className="text-muted fs-6 ">Number of Groupshops</Col>
          <Col className="text-muted fs-6 ps-2">Total Cashback</Col>
          <Col className="text-muted fs-6 ms-2">Active</Col>
          <Col className="text-muted fs-6 "> </Col>
          <Col className="text-muted fs-6 "> </Col>
        </Row>

        {campaignList.map((camp: any, index: number) => (
          <Row className={styles.gradient} key={camp.id}>
            <Col title={camp.name} className={['pe-5 ', styles.gradient_text].join(' ')}>
              {(camp.name.length > 10) ? `${camp.name.slice(0, 10)}...` : camp.name}
            </Col>
            <Col className={styles.gradient_text}>

              {camp?.details.totalRevenue ? `$${camp?.details.totalRevenue}` : '-'}
            </Col>
            <Col className={styles.gradient_text}>{camp?.details.totalGroupshops}</Col>
            <Col className={['ps-3 ', styles.gradient_text].join(' ')}>
              {camp?.details.totalCashback ? `$ ${camp?.details.totalCashback}` : '-'}
            </Col>
            <Col className={[styles.gradient_text, 'ps-3'].join(' ')}>
              {/* <ToggleButton
              handleToggle={() => handleToggle(camp.id)} isActive={camp.isActive} /> */}
              <Form.Check
                checked={camp.isActive}
                type="switch"
                label=""
                id="active_switch"
                className={['ms-0', styles.container_switch].join(' ')}
                onChange={() => {
                  if (camp.isActive) {
                    setShow(true);
                    setCampId(camp.id);
                  } else {
                    handleToggle(camp.id);
                  }
                }}
              // value={camp.isActive}
              />
            </Col>
            <Col className="pe-1 "><WhiteButton className={styles.container_Analytics}>View Analytics</WhiteButton></Col>
            <Col className="px-0 mx-0 "><WhiteButton className={styles.container_edit} onClick={() => handleClick(camp.id)}>Edit</WhiteButton></Col>
          </Row>
        ))}
        <Row>
          <Col className={styles.bottom_row}>
            <Link href={`/${shopName}/campaign/new`}>+ Create New Campaign</Link>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
export default CampaignListing;
