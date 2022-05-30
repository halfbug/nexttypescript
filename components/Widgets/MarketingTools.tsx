/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import styles from 'styles/Marketing.module.scss';
import {
  Row, Col, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import Recover from 'assets/images/recover.svg';
import Sms from 'assets/images/add-sms.svg';
import InviteCustomer from 'assets/images/invite-customer.svg';
import DisableButton from 'assets/images/disable-btn-icon.svg';
import { Check2Circle, InfoCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';

export default function MarketingTools(
) {
  return (
    <>
      <section className={styles.marketing__box_3}>
        <Row className="position-relative">
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
              name="joinExisting"
            >
              <ToggleButton
                variant="outline-success"
                className={styles.enablebtn}
                id="joinExisting-e"
                value={1}
              >
                <Check2Circle className="fs-5" />
                {' '}
                Enable
              </ToggleButton>

              <ToggleButton
                variant="outline-danger"
                className={styles.disablebtn}
                id="joinExisting-d"
                value={0}
              >
                <DisableButton className="fs-5" />
                {' '}
                Disable
              </ToggleButton>

            </ToggleButtonGroup>
          </Col>
        </Row>
        <hr />
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
              name="joinExisting"
            >
              <ToggleButton
                variant="outline-success"
                className={styles.enablebtn}
                id="joinExisting-e"
                value={1}
              >
                <Check2Circle className="fs-5" />
                {' '}
                Enable
              </ToggleButton>

              <ToggleButton
                variant="outline-danger"
                className={styles.disablebtn}
                id="joinExisting-d"
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
      <section className={styles.marketing__box_3}>
        <Row className="">
          <Col lg={1} className="position-absolute mt-2">
            <InviteCustomer />
          </Col>
          <Col lg={10} className="ps-4 ms-4">
            <h4 className="mt-0">
              Invite past customers to Groupshop
            </h4>
            <p>
              Use this tool to create Groupshop pages for customers
              who shopped before you activated Groupshop for your brand.
            </p>
            <WhiteButton
              type="submit"
              // variant="outline-primary"
              className={['px-4 py-1 ', styles.marketing_DownloadBtn].join(' ')}

            >
              Invite Customers
            </WhiteButton>
          </Col>
        </Row>
      </section>
    </>
  );
}
