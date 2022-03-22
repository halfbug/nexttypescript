import * as React from 'react';
import styles from 'styles/Overview.module.scss';
import {
  Row, Col,
} from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';

export default function CampaignOverview() {
  return (
    <div className={styles.overiew}>
      <div className={styles.overiew__header}>
        <h3>Campaign Overview</h3>
      </div>
      <Row>
        <Col lg={8}>
          <div className={styles.overiew__campaignBox}>
            <Row className="justify-content-center">
              <Col lg={4} className="">
                <div className={['h-100', styles.overiew__campaignBox__name].join(' ')}>
                  LE SABLÉ
                </div>
              </Col>
              <Col lg={8}>
                <div className={styles.overiew__campaignBox__year}>
                  Fall 2021 Campaign
                </div>
                <div className="mt-3">
                  <Row>
                    <Col lg={6}>
                      <WhiteButton>View Analytics</WhiteButton>
                    </Col>
                    <Col lg={6}>
                      <WhiteButton>Edit Campaign</WhiteButton>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`${styles.overiew__performanceBox} h-100`}>
            <div>
              Performance
            </div>
            <div>
              3.5x
              ROGS i
            </div>
          </div>
        </Col>
      </Row>
    </div>

  );
}
