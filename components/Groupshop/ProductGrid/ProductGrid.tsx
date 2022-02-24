/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  Col, Container, Placeholder, Row,
} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import ProductCard from 'components/Groupshop/ProductCard/ProductCard';
import useDimensions from 'hooks/useDimentions';
import { Send } from 'react-bootstrap-icons';
import { GroupshopContext } from 'store/groupshop.context';
import usePagination from 'hooks/usePagination';
import useDeal from 'hooks/useDeal';
import { Member } from 'types/groupshop';
import ProductDetail from '../ProductDetail/ProductDetail';

type ProductGridProps = {
  products : IProduct[]| undefined,
  maxrows?: number,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
  addProducts(e: boolean): any;
} & React.ComponentPropsWithoutRef<'div'> & RootProps

const ProductGrid = ({
  products, pending, children, maxrows = 0, addProducts,
  xs = 12, sm = 12, md = 6, lg = 4, xl = 3, xxl = 3, ...props
}: ProductGridProps) => {
  const [ref, dimensions] = useDimensions();

  const {
    breakPoint, pageSize, totalPages, renderItems, currentPage, setCurrentPage, getPageNumbers,
  } = usePagination<IProduct>({
    dimensions,
    maxrows,
    screens: {
      xs, sm, md, lg, xl, xxl,
    },
    items: products || [],
    siblingCount: 4,
  });
  // console.log('🚀 ~ file: ProductGrid.tsx ~ line 41 ~ breakPoint', breakPoint);
  const [showDetail, setshowDetail] = useState<boolean>(false);
  const [sProduct, setsProduct] = useState<IProduct | undefined>(undefined);
  const fillerz = Math.abs(pageSize - (renderItems?.length || 0)) || (breakPoint === 'sm' ? 1 : 0);
  // console.log('🚀 ~ file: ProductGrid.tsx ~ line 43 ~ fillerz', fillerz);
  const {
    gsctx: {
      discountCode: { percentage },
      dealProducts,
    } = { discountCode: { percentage: 0 }, dealProducts: [] },
  } = useContext(GroupshopContext);

  const {
    currencySymbol, dPrice, getBuyers, formatName, topFive,
  } = useDeal();

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
        {renderItems?.map((prod) => (
          <Col xs={12} md={6} lg={4} xl={3} className="d-flex justify-content-center " key={prod.id}>
            <ProductCard
              isrc={prod.featuredImage}
              imgOverlay={(
                <>
                  <span className={styles.groupshop__pcard_tag_price}>
                    {`${percentage}% OFF`}
                  </span>
                  <div className={styles.groupshop__pcard_tag_boughtby}>
                    {topFive(getBuyers(prod.id)?.map(
                      (member : Member) => (
                        <span className={styles.groupshop__pcard_tag_buyer}>
                          { formatName(member.orderDetail.customer)}
                        </span>
                      ),
                    ))}

                    {getBuyers(prod.id).length > 0 && (
                    <span className={styles.groupshop__pcard_tag_buyer}>Bought By </span>)}
                  </div>
                  {dealProducts?.filter(
                    ({ productId }) => productId === prod.id,
                  ).map((
                    { addedBy, productId },
                  ) => (
                    <span
                      className={styles.groupshop__pcard_tag_addedby}
                      key={`${productId}_${Math.random()}`}
                    >
                      {`Added by ${addedBy}`}
                    </span>
                  ))}
                </>
)}
            >
              <h5 className="text-center fw-bold text-truncate">{prod.title}</h5>
              { prod.orders?.length > 0 && (
              <p className="text-center mb-1 fs-5">
                {`🔥 ${prod.orders?.length} friends shopped`}
              </p>
              )}

              <h5 className="pt-2 text-center fw-bold">
                <span className="text-decoration-line-through">
                  {currencySymbol}
                  {prod.price}
                </span>
                {' '}
                <span>
                  {currencySymbol}
                  {dPrice(+(prod.price)).toFixed(1)}
                </span>
              </h5>
              <Button
                variant="primary"
                className="rounded-pill w-75"
                onClick={() => { setsProduct(prod); setshowDetail(true); }}
              >
                Add to Cart

              </Button>
              <Button variant="outline-primary" className="m-1 rounded-pill"><Send size={18} /></Button>
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
                  <Button variant="outline-primary" className={styles.groupshop__pcard_tag_product} onClick={() => addProducts(true)}>ADD A PRODUCT</Button>
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
              <Button variant="outline-primary" className="m-1 rounded-pill">
                <Send size={18} />
              </Button>
            </ProductCard>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          { totalPages > 1 && (
          <Pagination className={styles.groupshop_pagination}>
            <Pagination.Prev
              className={styles.groupshop_pagination_prev}
              onClick={() => setCurrentPage(
                (currentPage > 1) ? currentPage - 1 : currentPage,
              )}
            />

            {getPageNumbers().map((n, index) => (
              <Pagination.Item
                active={currentPage === n}
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </Pagination.Item>
            ))}

            <Pagination.Next
              className={styles.groupshop_pagination_next}
              onClick={() => setCurrentPage(
                (currentPage >= 1 && currentPage < totalPages) ? currentPage + 1 : currentPage,
              )}
            />
          </Pagination>
          )}
        </Col>
      </Row>
      <ProductDetail
        show={showDetail}
        handleClose={(e) => setshowDetail(false)}
        product={sProduct}
      />
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
  xxl: 3,
};

export default ProductGrid;
