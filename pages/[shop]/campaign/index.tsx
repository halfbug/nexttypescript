import React, { useState, useEffect, useContext } from 'react';
import ToggleButton from 'components/Buttons/ToggleButton/ToggleButton';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import Page from 'components/Layout/Page/Page';
import Router from 'next/router';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import styles from 'styles/CampaignListing.module.scss';
import { StoreContext } from 'store/store.context';
import { ICampaign } from 'types/store';
import Link from 'next/link';

const CampaignListing = () => {
  const { store, dispatch } = useContext(StoreContext);
  const shopName: string[] | undefined = store?.shop?.split('.', 1);

  const [campaignList, setCampaignList] = useState<ICampaign[]>([]);
  const heading = ['Campaign Name', 'Revenue Generated', 'Number of Groupshops', 'Total Cashback', 'Active', 'Actions', ' '];

  useEffect(() => {
    if (store.campaigns) {
      setCampaignList(store?.campaigns);
    }
  }, [store.campaigns]);

  const handleClick = (campaignid: string) => {
    dispatch({ type: 'SINGLE_CAMPAIGN', payload: { singleEditCampaignId: campaignid } });
    if (shopName) Router.push(`/${shopName}/campaign/${campaignid}`);
  };
  console.log('🚀 ~ file: index.tsx ~ line 36 ~ CampaignListing ~ store', store);
  const handleClickNew = (campaignid: string) => {
    if (shopName) Router.push(`/${shopName}/campaign/new`);
  };

  return (
    <Page headingText="Campaign" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
      <Container fluid className={styles.container}>
        <h1 className="mt-5">All Campaigns</h1>
        <p className="mt-3">
          ✨
          From here you can edit your active campaign, create a new campaign,
          or explore analytics for each campaign.
          <br />
          Creating different campaigns is a great
          way to learn how the products and discounts
          you offer impact your performance.
          <strong> Only one campaign can be active at a time.</strong>
        </p>
        <Row className="">
          <Col className="text-muted fs-6 mr-3">Campaign Name</Col>
          <Col className="text-muted fs-6 mr-3">Revenue Generated</Col>
          <Col className="text-muted fs-6 mr-3">Number of Groupshops</Col>
          <Col className="text-muted fs-6 mr-3">Total Cashback</Col>
          <Col className="text-muted fs-6 mr-3">Active</Col>
          <Col className="text-muted fs-6 mr-3"> </Col>
        </Row>

        {campaignList.map((camp:any, index:number) => (
          <>
            <Row className={styles.rows} key={camp.id}>
              <Col className="mt-4">{camp.name}</Col>
              <Col className="mt-4">
                $
                {' '}
                1430
              </Col>
              <Col className="mt-4">10</Col>
              <Col className="mt-4">
                $1430
              </Col>
              <Col className="mt-4">
                <ToggleButton />
              </Col>
              <Col className="mt-4"><WhiteButton text="View Analytics" /></Col>
              <Col className="mt-4"><WhiteButton text="Edit" onClick={() => handleClick(camp.id)} /></Col>
            </Row>
          </>
        ))}
        <Row>
          <Col className={styles.bottom_row}>
            <Button
              className={styles.container_btnNew}
              onClick={() => handleClickNew}
            >
              + Create New Campaign
            </Button>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
export default CampaignListing;
