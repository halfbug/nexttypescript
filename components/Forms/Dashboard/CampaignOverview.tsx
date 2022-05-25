import * as React from 'react';
import styles from 'styles/Overview.module.scss';
import {
  Row, Col,
} from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import InfoIcon from 'assets/images/info-icon.svg';
import UploadButton from 'components/Buttons/UploadBtn';

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
                <div className={['d-flex align-items-center', styles.overiew__campaignBox__name].join(' ')}>
                  LE SABLÉ
                </div>
              </Col>
              <Col lg={8}>
                <div className={styles.overiew__campaignBox__year}>
                  Fall 2021 Campaign
                </div>
                <div>
                  <WhiteButton>View Analytics</WhiteButton>
                  <WhiteButton>Edit Campaign</WhiteButton>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`${styles.overiew__performanceBox} h-100`}>
            <div className={styles.overiew__performanceBox__tag}>
              Performance
            </div>
            <div className={styles.overiew__performanceBox__multiplier}>
              3.5x
            </div>
            <div className={styles.overiew__performanceBox__rogs}>
              ROGS
              <InfoIcon />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col lg={8}>
          <div className={styles.overiew__campaignBox}>
            <Row className="justify-content-center">
              <Col lg={4} className="">
                <UploadButton
                  icon={(
                    <WhiteButton>
                      Add Logo
                    </WhiteButton>
                  )}
                  setFieldValue={() => {}}
                  field="logoImage"
                  handleForm={() => {}}
                  className={styles.overiew__campaignBox__logo}
                  url=""
                />
              </Col>
              <Col lg={8}>
                <div className={styles.overiew__campaignBox__year}>
                  Fall 2021 Campaign
                </div>
                <div>
                  <WhiteButton>View Analytics</WhiteButton>
                  <WhiteButton>Edit Campaign</WhiteButton>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`${styles.overiew__performanceBox} h-100`}>
            <div className={styles.overiew__performanceBox__tag}>
              Performance
            </div>
            <div className={styles.overiew__performanceBox__multiplier}>
              3.5x
            </div>
            <div className={styles.overiew__performanceBox__rogs}>
              ROGS
              <InfoIcon />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col lg={12}>
          <div className={styles.overiew__campaignBox1}>
            <div className={styles.overiew__campaignBox1__name}>
              LE SABLÉ
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
    </div>

  );
}
