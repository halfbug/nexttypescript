import * as React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import styles from 'styles/Groupshop.module.scss';
import { RootProps } from 'types/store';
import ProductCard from '../ProductCard/ProductCard';

type AddProductProps = {
    xs?: number,
    md?: number,
    lg?: number,
    xl?: number,
      isExpired: boolean,
    addProducts(e: boolean): any;
    percentage: string | number;
    key: string;
  } & React.ComponentPropsWithoutRef<'div'> & RootProps

const AddProduct = ({
  percentage, addProducts, xs, isExpired, key, md, lg, xl,
}:AddProductProps) => {
  console.log('d');

  return (
  // <Row className="d-inline justify-content-center m-0 p-0">
  //    <Col xs={xs} md={md} lg={lg} xl={xl} key={key} className="m-0 p-0">
  //     <span>
    <ProductCard
      isrc="/images/empty.png"
      imgOverlay={(
        <>
          <span className={styles.groupshop__pcard_tag_price}>
            {`${percentage}% OFF`}
          </span>
          <Button
            variant="outline-primary"
            className={styles.groupshop__pcard_tag_product}
            onClick={() => addProducts(true)}
            disabled={isExpired}
          >
            ADD A PRODUCT

          </Button>
        </>
  )}
    >
      <h5 className="text-center fw-bold text-truncate">Curate your Groupshop</h5>

      <p className="text-center  fs-5">
        <i>
          Add your favorite products for you
          {' '}
          &
          {' '}
          your friends to shop

        </i>
      </p>
      <br />
    </ProductCard>

  //   </span>
  // </Col>
  // </Row>
  );
};
AddProduct.defaultProps = {
  xs: 12,
  md: 12,
  lg: 12,
  xl: 12,
};
export default AddProduct;
