import React from 'react';
import RBButton from 'components/Buttons/RoundedButton/RBButton';
import Dialogue from 'components/Layout/Dialogue/dialogue';
// import { Row } from 'react-bootstrap';
import {
  Col, Form, ListGroup, Row,
} from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import Layout from './Layout';

interface IScreen1Props {
  show: boolean,
}

const Screen1 = ({ show }: IScreen1Props) => (
  <Dialogue show={show} size="lg">
    <Layout>
      <Row className=" mb-3 mt-3">
        <ListGroup as="ol">
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto p-2">
              <div className="fw-bold">
                <Form.Check type="checkbox" inline />
                {' '}
                All Products (725)

              </div>
            </div>
            <ChevronRight />
          </ListGroup.Item>
        </ListGroup>
      </Row>
      <Row><h3>Collections</h3></Row>
      <Row>
        <ListGroup as="ol" className="">
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start mt-4"
          >
            <div className=" p-2 ms-2 me-auto">
              <div className="fw-bold">
                <Form.Check type="checkbox" inline />
                {' '}
                Summer Sale (21)
              </div>
            </div>
            <ChevronRight />
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className=" p-2 ms-2 me-auto">
              <div className="fw-bold">
                <Form.Check type="checkbox" inline />
                {' '}
                Christmas (42)
              </div>
            </div>
            <ChevronRight />
          </ListGroup.Item>
        </ListGroup>

      </Row>
      <Row className="mt-4">
        <Col xs={6} className="text-end">
          <RBButton>Go Back</RBButton>
        </Col>
        <Col xs={6} className="text-start">
          <RBButton>Save</RBButton>
        </Col>
      </Row>

    </Layout>
  </Dialogue>
);

export default Screen1;
