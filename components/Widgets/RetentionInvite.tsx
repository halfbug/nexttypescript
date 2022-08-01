import React, { useState } from 'react';
import {
  Col, Row,
} from 'react-bootstrap';
import styles from 'styles/Retentiontools.module.scss';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import InviteCustomerBox from 'components/Groupshop/InviteCustomerBox/InviteCustomerBox';

export default function RetentionInvite() {
  const [showInvitePopup, setShowInvitePopup] = useState<boolean>(false);
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
            <WhiteButton onClick={() => {
              setShowInvitePopup(true);
            }}
            >
              Sync Customers
            </WhiteButton>
          </div>
          <h4>
            Step 2
          </h4>
          <span>
            Click below to sort through elligible customers and create Groupshops for them.
          </span>
          <div className={styles.rt__invite_box_btn}>
            <WhiteButton>
              Sort & Create Groupshops
            </WhiteButton>
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
        show={showInvitePopup}
        handleClose={() => setShowInvitePopup(false)}
      />
    </Row>
  );
}
