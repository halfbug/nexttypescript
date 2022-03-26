/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import styles from 'styles/Marketing.module.scss';
import {
  Row, Col, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import Recover from 'assets/images/recover.svg';
import Sms from 'assets/images/add-sms.svg';
import { Check2Circle, InfoCircle, XCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';

export default function MarketingTools(
) {
  return (
    <section className={styles.marketing__box_3}>
      <Row className="">
        <Col lg={1} className="me-0 mt-2">
          <Recover />
        </Col>
        <Col lg={10} className="ms-2 px-0">
          <h4 className="mt-0">
            Recover abandoned carts
            <ToolTip
              className="mx-2"
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
              <Check2Circle className="fs-4" />
              {' '}
              Enable
            </ToggleButton>

            <ToggleButton
              variant="outline-danger"
              className={styles.disablebtn}
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
      <br />
      <hr />
      <Row>
        <Col lg={1} className="me-0 mt-2">
          <Sms />
        </Col>
        <Col lg={10} className="ms-2 px-0">
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
              <Check2Circle className="fs-4" />
              {' '}
              Enable
            </ToggleButton>

            <ToggleButton
              variant="outline-danger"
              className={styles.disablebtn}
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
    </section>
  );
}
