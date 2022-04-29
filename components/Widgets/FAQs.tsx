import React from 'react';
import styles from 'styles/Knowledgebase.module.scss';
import Quick from 'assets/images/quick.svg';
import ConnectSocialMedia from 'components/Widgets/ConnectSocialMedia';

import {
  Row, Accordion,
} from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';

export default function FAQs(
) {
  return (
    <section className={styles.Kb}>
      <h3 className="ms-2 px-0 mb-4 ">FAQs</h3>
      <Row className={styles.Kb_greenbox}>
        <div className={styles.Kb_FAQs_headingText}>
          <Quick className="me-2" />
          Get quick answers to your most-asked questions.
        </div>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0" className="border-0 border-bottom">
            <Accordion.Header className={styles.Kb_FAQs_ques}>
              What is a Groupshop page?
            </Accordion.Header>
            <Accordion.Body>
              It’s a personalized shopping page we create after
              your customers shop from your store.
              They can share it with friends and send
              them special discounts, or they can shop from
              it for cashback.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="border-0 border-bottom">
            <Accordion.Header className={styles.Kb_FAQs_ques}>
              What is ROGS (Return on Group
              Spend)?
            </Accordion.Header>
            <Accordion.Body>
              ROGS is calculated by dividing your revenue by the amount of cashback
              and discounts given to customers.
              It’s a similar calculation to ROAS, only with cashback and discounts
              replacing advertising spend.
              For example, a ROGS of 3x signifies that for every dollar spent,
              you made $3 back.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="border-0 border-bottom">
            <Accordion.Header className={styles.Kb_FAQs_ques}>
              How do I set cashback and discounts?
            </Accordion.Header>
            <Accordion.Body>
              No need to crunch numbers! Use the ROGS meter on your
              Campaign page to automatically set discounts and
              cashback percentages that always match or exceed your ROAS.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className="border-0 border-bottom">
            <Accordion.Header className={styles.Kb_FAQs_ques}>
              How do customers get cashback
              and discounts?
            </Accordion.Header>
            <Accordion.Body>
              Customers are incentivized to share their Groupshop page with friends
              and automatically receive a cashback refund every time a friend shops.
              Friends get discounts on their orders, too..
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4" className="border-0 border-bottom">
            <Accordion.Header className={styles.Kb_FAQs_ques}>
              Do I have to process the refunds?
            </Accordion.Header>
            <Accordion.Body>
              No. We automatically refund customers through Shopify
              every time someone shops with them on Groupshop.
              Cashback gets reimbursed directly to the payment method
              used on their last purchase.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5" className="border-0 ">
            <Accordion.Header className={styles.Kb_FAQs_ques}>
              What products are eligible for
              cashback and discounts?
            </Accordion.Header>
            <Accordion.Body>
              You choose which products your customers will
              earn cashback on from your Campaign page.
              You can also allow customers to add more products
              of their choice from your store.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="mt-2 d-flex justify-content-end">
          <WhiteButton
            type="submit"
            className={['px-4 py-1 ', styles.Kb_btn].join(' ')}

          >
            View all FAQs
          </WhiteButton>
        </div>
      </Row>
      <ConnectSocialMedia />
    </section>

  );
}
