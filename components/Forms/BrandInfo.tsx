import * as React from 'react';
import {
  Form, Row, Col, InputGroup,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';

export default function BrandInfo() {
  return (
    <Form>
      <Row><h4>Enter your brand name</h4></Row>
      <Row>
        <h6>
          This identifies your business on your customers’ Groupshop page
        </h6>

      </Row>
      <Row>
        <Col xs={9}>
          <Form.Group className="" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Col>
        <Col xs={3}>
          <Form.Text className="text-muted align-baseline">
            0/20
          </Form.Text>
        </Col>
      </Row>
      <Row className="mt-3"><h4>Upload your logo</h4></Row>
      <Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Large file input example</Form.Label>
            <Form.Control type="file" size="lg" />
          </Form.Group>
          <Form.Text className="text-muted">
            Under 5 MB (Formats: PNG, JPG, JPEG)
          </Form.Text>
        </Form.Group>
      </Row>
      <Row><h4>Select your industury</h4></Row>
      <Row>
        {' '}
        <InputGroup>
          <select className="form-select" aria-label="Default select example">
            <option selected>Click to select</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </InputGroup>
      </Row>
      <Row />
      <Row className="m-5 justify-content-center">
        {/* <Col xs={3} md={4}> </Col> */}
        <Col xs={6} md={4} className="mx-2 d-flex justify-content-center ">
          <Button>GET STARTED</Button>
        </Col>
        {/* <Col xs={3} md={4}>&nbsp; </Col> */}
      </Row>

    </Form>
  );
}
