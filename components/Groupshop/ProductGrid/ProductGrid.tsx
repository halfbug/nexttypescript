/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  Col, Container, Placeholder, Row,
} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import ProductCard from 'components/Groupshop/ProductCard/ProductCard';
import useDimensions from 'hooks/useDimentions';
import { GroupshopContext } from 'store/groupshop.context';
import usePagination from 'hooks/usePagination';

type ProductGridProps = {
  products : IProduct[]| undefined,
  maxrows?: number,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
} & React.ComponentPropsWithoutRef<'div'> & RootProps

const ProductGrid = ({
  products, pending, children, maxrows = 0,
  xs = 12, sm = 12, md = 6, lg = 4, xl = 3, xxl = 3, ...props
}: ProductGridProps) => {
  const [ref, dimensions] = useDimensions();
  const {
    breakPoint, pageSize, totalPages, renderItems, currentPage, setCurrentPage,
  } = usePagination<IProduct>({
    dimensions,
    maxrows,
    screens: {
      xs, sm, md, lg, xl, xxl,
    },
    items: products || [],
  });
  console.log('🚀 ~ file: ProductGrid.tsx ~ line 41 ~ breakPoint', breakPoint);

  const fillerz = Math.abs(pageSize - renderItems.length) || (breakPoint === 'sm' ? 1 : 0);
  console.log('🚀 ~ file: ProductGrid.tsx ~ line 43 ~ fillerz', fillerz);
  const {
    gsctx: {
      discountCode: { percentage },
      dealProducts,
    } = { discountCode: { percentage: 0 }, dealProducts: [] },
  } = useContext(GroupshopContext);
  if (pending) {
    return (<Placeholder as="h1" bg="secondary" className="w-100" />);
  }
  return (
    <Container {...props} ref={ref} fluid>
      <Row className={styles.groupshop_row}>
        <Col xs={12} className={styles.groupshop_col}>
          {children}
        </Col>
      </Row>
      <Row>
        {renderItems?.map(({
          title, featuredImage, orders, price, id,
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
                  {dealProducts?.filter(
                    ({ productId }) => productId === id,
                  ).map((
                    { addedBy, productId },
                  ) => (
                    <span className={styles.groupshop__pcard_tag_addedby} key={productId}>
                      {`Added by ${addedBy}`}
                    </span>
                  ))}
                </>
)}
            >
              <h5 className="text-center fw-bold text-truncate">{title}</h5>
              { orders?.length > 0 && (
              <p className="text-center mb-1 fs-5">
                {`🔥 ${orders?.length} friends shopped`}
              </p>
              )}
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
        {[...new Array(fillerz)]?.map((n) => (
          <Col xs={12} md={6} lg={4} xl={3} className="d-flex justify-content-center " key={n}>
            <ProductCard
              isrc="/images/empty.png"
              imgOverlay={(
                <>
                  <span className={styles.groupshop__pcard_tag_price}>
                    {`${percentage}% OFF`}
                  </span>
                  <Button variant="outline-primary" className={styles.groupshop__pcard_tag_product}>ADD A PRODUCT</Button>
                </>
)}
            >
              <h5 className="text-center fw-bold text-truncate">Don’t see what you like?</h5>

              <p className="text-center mb-1 fs-5">
                Add your favorite product
              </p>

              <p className="text-center fw-bold fs-5 mb-0">
                <br />
                {' '}
              </p>
              <Button variant="primary" disabled className="rounded-pill w-75">Add to Cart</Button>
              <Button variant="outline-primary" className="m-1 rounded-pill">test</Button>
            </ProductCard>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          { totalPages > 1 && (
          <Pagination className="d-flex justify-content-center">
            <Pagination.Prev onClick={() => setCurrentPage(
              (currentPage > 1) ? currentPage - 1 : currentPage,
            )}
            />
            {[...new Array(totalPages)].map((n, index) => (
              <Pagination.Item
                active={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(
              (currentPage >= 1 && currentPage < totalPages) ? currentPage + 1 : currentPage,
            )}
            />
          </Pagination>
          )}
        </Col>
      </Row>
    </Container>
  );
};

ProductGrid.defaultProps = {
  maxrows: 1,
  xs: 12,
  sm: 12,
  md: 6,
  lg: 4,
  xl: 3,
  xxl: 2,
};

export default ProductGrid;
