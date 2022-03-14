import * as React from 'react';
import {
  Form, Button, Row, Col, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';

interface IStep3Props {
  dealLink: string;
 }

export default function QrStep3({ dealLink } : IStep3Props) {
  console.log(dealLink);
  return (
    <Row>
      <Col xs={12} md={6}>
        <h2>🎉 Congrats, your Groupshop store is live!</h2>
        <p>
          Access exclusive discounts and share the link to your store with friends and followers
          to get up to 100% cashback on your recent order whenever they shop on your Groupshop.
        </p>
        <div className="go-tostore goto-store"><a target="_blank" href={dealLink} rel="noreferrer">GO TO MY STORE &gt;</a></div>
      </Col>
      <Col xs={12} md={6}>
        Image
      </Col>
    </Row>
  );
}
