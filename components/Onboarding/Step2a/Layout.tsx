import React from 'react';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';

const Layout = ({ children }:any) => (
  <Container>
    <Row className="border-bottom">
      <Col className="text-left"><h3>Add products/collections</h3></Col>
      <Col className="text-end">0 product(s)/1 collection(s) selected</Col>
    </Row>
    <Row className="mt-3">
      <Form>
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Control size="lg" className="bg-light pt-2" type="text" placeholder="Search products/collections" />
        </Form.Group>
      </Form>

    </Row>
    <Row>{children}</Row>
  </Container>
);

export default Layout;
