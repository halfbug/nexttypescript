import React, { useState, useEffect, useContext } from 'react';
import styles from 'styles/Overview.module.scss';
import {
  Row, Col,
} from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import InfoIcon from 'assets/images/info-icon.svg';
import UploadButton from 'components/Buttons/UploadBtn';
import { StoreContext } from 'store/store.context';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import { GET_OVERVIEW_DATA } from 'store/store.graphql';

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
  const { brandName } = store;

  const {
    loading, error, data, refetch,
  } = useQuery(GET_OVERVIEW_DATA, {
    variables: { storeId: store.id },
  });

  useEffect(() => {
    if (data) {
      setActiveCampaign(data?.overviews);
    }
  }, [data]);
  return (
    <div className={styles.overiew}>
      <div className={styles.overiew__header}>
        <h3>Campaign Overview</h3>
      </div>

      { (activeCampaign?.length && activeCampaign?.length > 0)
        ? (

          <div className={styles.overiew__campaignBox_area}>
            <div>
              <div className={styles.overiew__campaignBox}>
                <Row className="justify-content-center">
                  <Col lg={4} className="">
                    <div className={['d-flex align-items-center',
                      styles.overiew__campaignBox__name].join(' ')}
                    >
                      <img
                        className="img-fluid"
                        src={brandLogo}
                        alt={brandName}
                        style={{ maxWidth: '80px' }}
                      />
                    </div>
                  </Col>
                  <Col lg={8}>
                    <div className={styles.overiew__campaignBox__year}>
                      {activeCampaign[0]?.name}
                    </div>
                    <div>
                      <WhiteButton>
                        <Link href={`/${shopName}/analytics`}>
                          View Analytics
                        </Link>

                      </WhiteButton>
                      <WhiteButton>
                        <Link href={`/${shopName}/campaign/${activeCampaign[0]?.id}`}>
                          Edit Campaign
                        </Link>

                      </WhiteButton>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div>
              <div className={`${styles.overiew__performanceBox} h-100`}>
                <div className={styles.overiew__performanceBox__tag}>
                  Performance
                </div>
                <div className={styles.overiew__performanceBox__multiplier}>
                  {rogs}
                  X
                </div>
                <div className={styles.overiew__performanceBox__rogs}>
                  ROGS
                  <ToolTip
                    className={styles.dashboard_campaign__pop}
                    icon={<InfoIcon />}
                    popContent="ROGS is calculated by dividing your revenue by the amount of cashback and discounts given to customers. It’s a similar calculation to ROAS, only with cashback and discounts replacing advertising spend."
                  />
                </div>
              </div>
            </div>
          </div>
        )
        : (
          <Row className="mt-3">
            <Col lg={12}>
              <div className={styles.overiew__campaignBox1}>
                <div className={styles.overiew__campaignBox1__name}>
                  <img
                    className="img-fluid"
                    src={brandLogo}
                    alt={brandName}
                    style={{ maxWidth: '80px' }}
                  />
                </div>
                <div className="ms-3">
                  <div className={styles.overiew__campaignBox1__activateHead}>
                    Re-Activate Groupshop
                  </div>
                  <div className={styles.overiew__campaignBox1__activatedesc}>
                    👀 Looks like you de-activated your Groupshop.
                  </div>
                  <div className={styles.overiew__campaignBox1__activatedesc}>
                    Re-enable it to keep earning.
                  </div>
                  <div className="mt-2">
                    <WhiteButton>Turn on</WhiteButton>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}

    </div>

  );
}
