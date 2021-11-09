import * as React from 'react';
import {
  Form, Row, Col,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import Exclaim from 'assets/images/exclaimation.svg';
import RBButton from 'components/Buttons/RoundedButton/RBButton';
import useQueryString from 'hooks/useQueryString';

export default function OBCampaign() {
  const [, setParams] = useQueryString();
  return (
    <Col className="text-sm-start" md={8}>

      <Form>
        <Row className="mt-3"><h4>Name your Groupshop campaign</h4></Row>
        <Row>
          <Col xs={9}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Text className="text-muted">
              0/20
            </Form.Text>
          </Col>
        </Row>
        <Row className="mt-3">
          <h4>
            Select
            {' '}
            &
            {' '}
            add products from your store
          </h4>
        </Row>
        <Row className="text-muted"><h6>Customers can get discounts on the products selected below</h6></Row>
        <Row className="mt-2">
          <Col>
            <Form.Check
              inline
              label="Best sellers"
              type="radio"
              name="inline-radio-1"
            />
            <Form.Check
              inline
              label="Newest products"
              type="radio"
              name="inline-radio-1"
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Form.Check
              inline
              label="Specific products/collections (up to 80 products)"
              type="radio"
              name="inline-radio-1"
            />
          </Col>
        </Row>
        <Row className="mt-3 justify-content-center">
          <Col><button type="button">Edit products/collections</button></Col>
        </Row>
        <Row className="m-2 justify-content-center">
          <Col className="text-muted">25 product(s)/2 collection(s) selected</Col>
        </Row>
        <Row className="mt-3">
          <Col xs={8}><h4>Allow customers to join existing Groupshop pages</h4></Col>
          <Col className="text-left"><Exclaim /></Col>
        </Row>
        <Row className="text-muted"><h6>When enabled, customers can access discounts from existing Groupshop pages</h6></Row>
        <Row className="mt-2">
          {/* <Col xs={3} md={4}> </Col> */}
          <Col xs={2} className="text-right">
            <RBButton>Enable</RBButton>
          </Col>
          <Col xs={9} className="text-left">
            <RBButton>Disable</RBButton>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={4}>
            <Button onClick={() => setParams({ ins: 1 })}>Previous</Button>
          </Col>
          <Col xs={4} className="text-center">
            <span className="text-muted">2/4</span>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button onClick={() => setParams({ ins: 3 })}> Next </Button>
          </Col>
          {/* <Col xs={3} md={4}>&nbsp; </Col> */}
        </Row>

      </Form>
    </Col>
  );
}
