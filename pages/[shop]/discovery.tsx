import React, { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';

import Page from 'components/Layout/Page/Page';
import {
  Row, Col, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import { Check2Circle, XCircle } from 'react-bootstrap-icons';
import styles from 'styles/Discovery.module.scss';
import HintBox from 'components/Groupshop/HintBox/HintBox';
import SummaryBox from 'components/Shared/SummaryBox/SummaryBox';
import { StoreContext } from 'store/store.context';
import { useMutation } from '@apollo/client';
import { DiscoveryTools } from 'types/store';
import { DISCOVERYTOOLS_UPDATE } from 'store/store.graphql';

const Discovery: NextPage = () => {
  const { store, dispatch } = useContext(StoreContext);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [discoveryToolBtn, setDiscoveryToolBtn] = useState<number>();

  const [discoveryToolsUpdate] = useMutation<DiscoveryTools>(DISCOVERYTOOLS_UPDATE);

  useEffect(() => {
    setShowHint(true);
  }, []);

  useEffect(() => {
    if (store?.discoveryTool?.status === 'Active') {
      setDiscoveryToolBtn(1);
    } else if (store?.discoveryTool?.status === 'InActive') {
      setDiscoveryToolBtn(0);
    }
  }, [store?.discoveryTool?.status]);

  const handleChange = (e:any) => {
    if (e === 1) {
      setDiscoveryToolBtn(1);
      changeDiscoveryTool('Active');
    } else {
      setDiscoveryToolBtn(0);
      changeDiscoveryTool('InActive');
    }
  };

  const changeDiscoveryTool = (discoveryStatus:any) => {
    discoveryToolsUpdate({
      variables: {
        updateDiscoveryTools: {
          id: store?.id,
          discoveryTool: {
            matchingBrandName: store?.discoveryTool?.matchingBrandName,
            status: discoveryStatus,
          },
        },
      },
    });
    dispatch({ type: 'UPDATE_DISCOVERYTOOLS', payload: { discoveryTool: { ...store?.discoveryTool, status: discoveryStatus } } });
  };

  return (
    <Page headingText="Discovery" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
      <div className={styles.Discovery}>
        <Row>
          <Col lg={7}>
            <div className={styles.Discovery_activateDiscoveryTool}>
              <h4>Activate Discovery Tools</h4>
              <p>
                When this is on, we’ll feature your products on the Groupshop
                pages of other
                <br />
                {' '}
                partner brands with
                similar audience demographics.
              </p>
              <Row className="mt-2">

                <Col xs={12} md={6} className="text-right">
                  <ToggleButtonGroup
                    type="radio"
                    name="joinExisting"
                    value={discoveryToolBtn}
                    onChange={(e) => handleChange(e)}
                  >
                    <ToggleButton
                      variant="outline-success"
                      className={styles.Discovery_enablebtn}
                      id="joinExisting-e"
                      value={1}
                    >
                      <Check2Circle className="fs-4" />
                      {' '}
                      Enable
                    </ToggleButton>
                    <ToggleButton
                      variant="outline-danger"
                      className={styles.Discovery_disablebtn}
                      id="joinExisting-d"
                      value={0}
                    >
                      <XCircle className="fs-5" />
                      {' '}
                      Disable
                    </ToggleButton>

                  </ToggleButtonGroup>
                </Col>
              </Row>
            </div>
            {/* <div className="mt-4">
              <h3>Discovery Metrics</h3>
              <Row>
                <Col lg={4} className={styles.metrics__box__summary_box}>
                  <SummaryBox label="New Audience" value="432" iconType="PurchaseIcon"
                  arrowIcon={false} />
                </Col>
                <Col lg={4} className={styles.metrics__box__summary_box}>
                  <SummaryBox label="Product Views " value="432" iconType="ViewsIcon"
                  arrowIcon={false} />
                </Col>
                <Col lg={4} className={styles.metrics__box__summary_box}>
                  <SummaryBox label="Average Order Value" value="432" iconType="TrafficIcon"
                  arrowIcon={false} />
                </Col>
              </Row>
            </div> */}
          </Col>
        </Row>
      </div>
      <HintBox
        show={showHint}
        handleClose={() => { setShowHint(false); }}
        title="Use Discovery Tools to..."
        hints={[
          'Get in front of new customers by cross-selling your products on the Groupshop pages of partner brands with similar audiences.',
          'Access new insights on where your customers shop and lower your CAC & CPA.',
        ]}
      />
    </Page>
  );
};

export default Discovery;
