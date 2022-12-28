import React, { useState, useEffect, useContext } from 'react';
import styles from 'styles/Overview.module.scss';
import {
  Row, Col, Button,
} from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import InfoIcon from 'assets/images/info-icon.svg';
import UploadButton from 'components/Buttons/UploadBtn';
import { StoreContext } from 'store/store.context';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import { GET_OVERVIEW_DATA, GET_ACTIVE_PARTNERS } from 'store/store.graphql';
import { BsCircleFill } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';

export interface IActiveCampaign {
  brandLogo: string;
  rogs: string | number;
}

export default function CampaignOverview({
  brandLogo, rogs,
}: IActiveCampaign) {
  const { store, dispatch } = useContext(StoreContext);
  const shopName: string[] | undefined = store?.shop?.split('.', 1);
  const [activeCampaign, setActiveCampaign] = useState<any | undefined>([]);
  const [activePartners, setActivePartners] = useState<any | undefined>([]);
  const { brandName } = store;

  const {
    loading, error, data, refetch,
  } = useQuery(GET_OVERVIEW_DATA, {
    variables: { storeId: store.id },
  });

  useEffect(() => {
    if (data) {
      setActiveCampaign(data?.overviews);
      refetch();
    }
  }, [data]);

  const {
    data: pdata, refetch: prefetch,
  } = useQuery(GET_ACTIVE_PARTNERS, {
    variables: { storeId: store.id },
  });

  useEffect(() => {
    if (pdata) {
      setActivePartners(pdata.activePartners);
      prefetch();
    }
  }, [pdata]);

  return (
    <div className={styles.overiew}>
      {/* <div className={styles.overiew__header}>
        <h3>Campaign Overview</h3>
      </div> */}
      {/* Groupshop tool start */}
      <div className={styles.overiew__header}>
        <h3>Groupshop Tools</h3>
      </div>
      <div className={styles.overiew_tag}>
        Post-Purchase
      </div>
      {/* Active Campaigns */}
      <div className={[styles.overiew__mainCampaignBox, 'd-flex'].join(' ')}>
        { (activeCampaign?.length && activeCampaign?.length > 0)
          ? (
            <>
              <Col className="border-end">
                <span>
                  {' '}
                  <BsCircleFill className="me-2 mb-2" fill="#A7C737" />
                  {' '}
                </span>
                <span className={styles.overiew__mainCampaignBox__name}>
                  {activeCampaign[0]?.name}
                </span>
                <div className="ms-4 mt-3 mb-2">
                  <div className="d-flex mx-2">
                    <WhiteButton>
                      <Link href={`/${shopName}/analytics`}>
                        <span className="text-decoration-none ">View Analytics</span>
                      </Link>

                    </WhiteButton>
                    <WhiteButton className="mx-3 bg-transparent border-1 border-dark rounded-3 ">
                      <Link href={`/${shopName}/campaign/${activeCampaign[0]?.id}`}>
                        <span className="text-decoration-none">Edit Campaign</span>
                      </Link>

                    </WhiteButton>
                  </div>
                </div>
              </Col>
              <Col className="mx-2">
                <div className={styles.overiew__mainCampaignBox_ReturnOn}>
                  Return On Group Spend
                  <ToolTip
                    className={[styles.dashboard_campaign__pop, 'ms-2'].join('')}
                    icon={<InfoIcon />}
                    popContent="ROGS is calculated by dividing your revenue
              by the amount of cashback and discounts given to customers.
              It’s a similar calculation to ROAS, only with cashback and
               discounts replacing advertising spend."
                  />
                </div>
                <div className={styles.overiew__performanceBox__multiplier}>
                  {rogs}
                </div>

              </Col>
            </>
          )
          : (
            <>
              <Col className="border-end">
                <span>
                  {' '}
                  <BsCircleFill className="me-2 mb-2" fill="#FF0000" />
                  {' '}
                </span>
                <span className={styles.overiew__mainCampaignBox__name}>
                  No Active Campaigns
                </span>
                <div className="ms-4 mt-3 mb-2">
                  <WhiteButton><Link href={`/${shopName}/campaign`}>Activate Campaign</Link></WhiteButton>
                </div>
              </Col>
              <Col className="mx-2">
                <p className="px-2 text-start">
                  👀 Activate a post-purchase campaign to make the
                  most out of your brand’s organic word-of-mouth!
                </p>
              </Col>
            </>
          )}

      </div>
      <div className={[styles.overiew__mainCampaignBox, 'd-flex'].join(' ')}>
        <div className="d-flex align-items-center justify-around">
          { (activePartners?.length && activePartners?.length > 0)
            ? (
              <>

                <Col lg={9} className="d-flex justify-content-start align-items-center">
                  {' '}
                  <div className={styles.overiew_tag}>
                    Partner Tools
                  </div>
                  <span className={styles.overiew__mainCampaignBox__AddPartnerText}>
                    You have
                    {' '}
                    <span className={styles.overiew__mainCampaignBox_ActivePartnerText}>
                      {activePartners?.length}
                      {' '}
                      active
                    </span>
                    {' '}
                    partners
                  </span>
                </Col>
                <Col lg={3}>

                  <Button variant="">
                    <Link href={`/${shopName}/partnertools`}><strong>Manage Partners</strong></Link>
                    {' '}
                    <IoIosArrowForward className="ms-1" />
                  </Button>
                </Col>
              </>
            )
            : (
              <>
                <Col lg={9} className="d-flex justify-content-start align-items-center">
                  {' '}
                  <div className={styles.overiew_tag}>
                    Partner Tools
                  </div>
                  <span className={styles.overiew__mainCampaignBox__AddPartnerText}>
                    You haven’t added partners yet!
                  </span>
                </Col>
                <Col lg={3}>

                  <Button variant="">
                    <Link href={`/${shopName}/partnertools`}><strong>Add Partners</strong></Link>
                    {' '}
                    <IoIosArrowForward className="ms-1" />
                  </Button>
                </Col>
              </>
            )}
        </div>
      </div>
      <div className={[styles.overiew__mainCampaignBox, 'd-flex'].join(' ')}>
        <div className="d-flex align-items-center">
          <Col lg={10} className="d-flex justify-content-start align-items-center">
            {' '}
            <div className={styles.overiew_tag}>
              Re-Activation
            </div>
            <span className={styles.overiew__mainCampaignBox__AddPartnerText}>
              Invite past customers to shop & earn rewards

            </span>
          </Col>
          <Col lg={2} className="d-flex justify-content-end">

            <Button variant="" className="align-items-center d-flex">
              {' '}
              <IoIosArrowForward className="ms-1" />
            </Button>
          </Col>
        </div>
      </div>
    </div>

  );
}
