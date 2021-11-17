import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { IProduct } from 'types/store';
import IconButton from 'components/Buttons/IconButton';
import Styles from 'styles/Screen1.module.scss';
import ProductCard from './ProductCard';

interface IProductsProps {
  data: IProduct[] | undefined | null;
  heading: string | null;
  handleBackClick(): any;
    // All other props
  [x:string]: any;
}

const Products = ({
  data, heading, handleBackClick, ...props
}:IProductsProps) => (
  <Container {...props}>
    <Row>
      <h3>
        <IconButton icon={<ArrowLeft />} onClick={handleBackClick} />

        &nbsp;
        {heading}
      </h3>
    </Row>
    <Row className={['bg-light', Styles.screen1_products].join(' ')}>
      {data?.map(({
        featuredImage, title, price, currencyCode,
      }) => (
        <Col xs={6} md={3}>
          <ProductCard ProdImage={featuredImage} title={title} price={`${price} ${currencyCode}`} />
        </Col>
      ))}
    </Row>

  </Container>
);

export default Products;
