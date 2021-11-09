import React from 'react';
// import { Row } from 'react-bootstrap';
import {
  Card, Form, Row, Col,
} from 'react-bootstrap';
// import Prod from 'assets/products/Rectangle10.png';

interface IFile {
    ProdImage: string;
    title: string;
    price: string;
  }
const ProductCard = ({ ProdImage, title, price }:IFile) => (
  <Card className="rounded">
    <Card.Img variant="top" src={ProdImage} />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
        <Row>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Col className="text-left"><Form.Label>{price}</Form.Label></Col>
            <Col className="text-right"><Form.Check type="checkbox" inline /></Col>
          </Form.Group>
        </Row>
      </Card.Text>
    </Card.Body>
  </Card>
);

export default ProductCard;
