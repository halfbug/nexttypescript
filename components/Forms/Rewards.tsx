import * as React from 'react';
import {
  Form, Row, Col,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';

export default function Rewards() {
  const [, setParams] = useQueryString();
  return (
    <Col className="text-sm-start" md={8}>

      <Form>
        <Row className="mt-3"><h4>Adjust your target sales volume</h4></Row>
        <Row className="text-muted"><h6>Choose one of our recommended options. You can adjust them later on in the Settings page.</h6></Row>
        <Row className="mt-2">
          <Col>
            line bars
          </Col>
          <Col>
            1
          </Col>
          <Col>
            1
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
