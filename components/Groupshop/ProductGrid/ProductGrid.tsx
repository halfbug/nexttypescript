/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  Col, Container, Placeholder, Row,
} from 'react-bootstrap';
import ProductCard from 'components/Groupshop/ProductCard/ProductCard';
import useDimensions from 'hooks/useDimentions';
import { GroupshopContext } from 'store/groupshop.context';

type ProductGridProps = {
  products : IProduct[]| undefined,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
  maxrows?: number,
} & React.ComponentPropsWithoutRef<'div'> & RootProps

const ProductGrid = ({
  products, pending, children, ...rest
}: ProductGridProps) => {
  const [ref, dimensions] = useDimensions();
  const {
    groupshop: { discountCode: { percentage }, dealProducts },
  } = useContext(GroupshopContext);
  if (pending) {
    return (<Placeholder as="h1" bg="secondary" className="w-100" />);
  }
  return (
    <Container {...rest} ref={ref}>
      <Row className={styles.groupshop_row}>
        <Col xs={12} className={styles.groupshop_col}>
          {children}
        </Col>
      </Row>
      <Row>
        {products?.map(({
          title, featuredImage, lineItems, price, id,
        }) => (
          <Col xs={12} md={6} lg={4} xl={3} className="d-flex justify-content-center " key={id}>
            <ProductCard
              isrc={featuredImage}
              imgOverlay={(
                <>
                  <span className={styles.groupshop__pcard_tag_price}>
                    {`${percentage}% OFF`}
                  </span>
                  <span className={styles.groupshop__pcard_tag_buyer}>MS</span>
                  {dealProducts?.filter(({ productId }) => productId === id).map(({ addedBy }) => (
                    <span className={styles.groupshop__pcard_tag_addedby}>
                      {`Added by ${addedBy}`}
                    </span>
                  ))}
                </>
)}
            >
              <h5 className="text-center fw-bold text-truncate">{title}</h5>
              <p className="text-center mb-1 fs-5">
                {`🔥 ${lineItems?.length} friends shopped`}
              </p>
              <p className="text-center fw-bold fs-5 mb-0">
                $
                {' '}
                {price}
              </p>
              <Button variant="primary" className="rounded-pill w-75">Add to Cart</Button>
              <Button variant="outline-primary" className="m-1 rounded-pill">test</Button>
            </ProductCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

ProductGrid.defaultProps = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 4,
  xl: 3,
  xxl: 2,
  maxrows: 4,
};

export default ProductGrid;
