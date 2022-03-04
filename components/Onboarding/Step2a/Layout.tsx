/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';
import styles from 'styles/product.module.scss';
import { FaSistrix } from 'react-icons/fa';

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
    <Container className={styles.product}>
      <Row className="border-bottom">
        <Col className="text-left" xs={12} md={6}><h3>Add products/collections</h3></Col>
        <Col className={styles.product_selected} xs={12} md={6}>
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
            <Form.Control size="lg" className={styles.product_search_product} type="text" placeholder="Search products/collections" name="searchField" onChange={handleSearch} />
            {/* <FaSistrix /> */}
          </Form.Group>
        </Form>

      </Row>
      <Row>{children}</Row>
    </Container>
  );
};

export default Layout;
