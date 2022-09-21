import React from 'react';
import Styles from 'styles/Screen1.module.scss';
import {
  Card, Form, Row, Col,
} from 'react-bootstrap';
// import Prod from 'assets/products/Rectangle10.png';

export interface IProductCardProps {
    ProdImage: string;
    title: string;
    price: string;
    id: string;
    isChecked(id:string):boolean;
    handleChecked(e:any):any;

  }
const ProductCard = ({
  ProdImage, title, price, id, isChecked, handleChecked,
}:IProductCardProps) => (
  <Card className={['rounded-3 my-2', Styles.screen1_card].join(' ')}>
    <Card.Img variant="top" src={ProdImage} />
    <Card.Body>
      <Card.Title title={title} className="text-truncate">{title}</Card.Title>
      <Card.Text>

        <Form.Group className="d-flex flex-col justify-content-between" controlId={id}>
          <Form.Label>{price}</Form.Label>
          <Form.Check
            type="checkbox"
            className="fs-4"
            name="products"
            id={id}
            checked={isChecked(id)}
            onChange={handleChecked}
            onClick={(event) => event.stopPropagation()}
          />
        </Form.Group>

      </Card.Text>
    </Card.Body>
  </Card>
);

export default ProductCard;
