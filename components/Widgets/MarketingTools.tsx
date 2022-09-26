/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { useState } from 'react';
import styles from 'styles/Marketing.module.scss';
import {
  Row, Col, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import Recover from 'assets/images/recover.svg';
import Sms from 'assets/images/add-sms.svg';
import DisableButton from 'assets/images/disable-btn-icon.svg';
import { Check2Circle, InfoCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';

export interface MarketingToolsProps {
  values: any;
  handleForm: any;
}

export default function MarketingTools(
  {
    values, handleForm,
  }
    : MarketingToolsProps,
) {
  const [showInvitePopup, setShowInvitePopup] = useState<boolean>(false);
  return (
    <>
      <section className={styles.marketing__box_3}>
        {/* <Row className="position-relative">
          <Col lg={1} className="position-absolute mt-2">
            <Recover />
          </Col>
          <Col lg={10} className="ps-4 ms-4">
            <h4 className="mt-0">
              Recover abandoned carts
              <ToolTip
                className={styles.marketing__tooltip_1}
                popoverClassName={styles.marketing__tooltip_1__popover}
                icon={<InfoCircle size={13} />}
                popContent="No purchase yet? No problem.
              We'll add the abandoned products to a dedicated Groupshop page,
              so your customers can complete their order while still enjoying
              our cashback rewards and discounts."
              />
            </h4>
            <p>
              Offer special cashback rewards to undecided customers
              via email 24 hours after an abandoned cart.
            </p>
            <ToggleButtonGroup
              type="radio"
              name="recoverAbandoned"
              value={+values.settings?.marketing?.recoverAbandoned}
            >
              <ToggleButton
                variant={(+values.settings?.marketing?.recoverAbandoned) ?
                   'outline-success' : 'outline-primary'}
                className={(+values.settings?.marketing?.recoverAbandoned)
                  ? styles.enablebtn : styles.disablebtn}
                id="recoverAbandoned-e"
                value={1}
                onChange={(e) => {
                  handleForm('settings.marketing.recoverAbandoned', e.currentTarget.value);
                }}
              >
                <Check2Circle className="fs-5" />
                {' '}
                Enable
              </ToggleButton>

              <ToggleButton
                variant="outline-danger"
                className={styles.disablebtn}
                id="recoverAbandoned-d"
                value={0}
                onChange={(e) => {
                  handleForm('settings.marketing.recoverAbandoned', e.currentTarget.value);
                }}
              >
                <DisableButton className="fs-5" />
                {' '}
                Disable
              </ToggleButton>

            </ToggleButtonGroup>
          </Col>
        </Row> */}
        {/* <hr /> */}
        <Row>
          <Col lg={1} className="position-absolute mt-2">
            <Sms />
          </Col>
          <Col lg={10} className="ps-4 ms-4">
            <h4 className="mt-0">
              Add SMS and WhatsApp notifications
            </h4>
            <p>
              Spread the word about your offer with personalized mobile messages.
            </p>
            <ToggleButtonGroup
              type="radio"
              value={+values?.settings?.marketing?.WhatsAppnotifications}
              name="WhatsAppnotifications"
            >
              <ToggleButton
                variant={(+values?.settings?.marketing?.WhatsAppnotifications) ? 'outline-success' : 'outline-primary'}
                className={(+values?.settings?.marketing?.WhatsAppnotifications)
                  ? styles.enablebtn : styles.disablebtn}
                id="WhatsAppnotifications-e"
                onChange={(e) => {
                  handleForm('settings.marketing.WhatsAppnotifications', e.currentTarget.value);
                }}
                value={1}
              >
                <Check2Circle className="fs-5" />
                {' '}
                Enable
              </ToggleButton>

              <ToggleButton
                variant="outline-danger"
                className={styles.disablebtn}
                id="WhatsAppnotifications-d"
                onChange={(e) => {
                  handleForm('settings.marketing.WhatsAppnotifications', e.currentTarget.value);
                }}
                value={0}
              >
                <DisableButton className="fs-5" />
                {' '}
                Disable
              </ToggleButton>

            </ToggleButtonGroup>
          </Col>
        </Row>
      </section>
    </>
  );
}
