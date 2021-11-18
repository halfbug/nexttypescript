/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';

interface ILayoutProps {
  children: React.ReactNode;
  handleSearch(e:any): any;
  campaign: any;
    // All other props
  [x:string]: any;
}

const Layout = ({ children, handleSearch, campaign }:ILayoutProps) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const { products, collections } = campaign;
  return (
    <Container>
      <Row className="border-bottom">
        <Col className="text-left" xs={12} md={6}><h3>Add products/collections</h3></Col>
        <Col className="text-left text-md-end" xs={12} md={6}>
          {products?.length || 0}
          {' '}
          product(s)/
          {collections?.length || 0}
          {' '}
          collection(s) selected
        </Col>
      </Row>
      <Row className="mt-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 " controlId="searchField">
            <Form.Control size="lg" className="bg-light pt-2" type="text" placeholder="Search products/collections" name="searchField" onChange={handleSearch} />
          </Form.Group>
        </Form>

      </Row>
      <Row>{children}</Row>
    </Container>
  );
};

export default Layout;
