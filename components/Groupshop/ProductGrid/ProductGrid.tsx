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
import { Send } from 'react-bootstrap-icons';
import { GroupshopContext } from 'store/groupshop.context';
import usePagination from 'hooks/usePagination';
import useDeal from 'hooks/useDeal';
import { Member } from 'types/groupshop';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';

type ProductGridProps = {
  products: IProduct[] | undefined,
  maxrows?: number,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
  addProducts(e: boolean): any;
  handleDetail(prd: any): void;
} & React.ComponentPropsWithoutRef<'div'> & RootProps

const ProductGrid = ({
  products, pending, children, maxrows = 0, addProducts, handleDetail,
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

  const fillerz = Math.abs(pageSize - (renderItems?.length || 0)) || (breakPoint === 'sm' ? 1 : 0);

  const {
    gsctx: {
      discountCode: { percentage },
      dealProducts,
    } = { discountCode: { percentage: 0 }, dealProducts: [] },
  } = useContext(GroupshopContext);

  const {
    currencySymbol, dPrice, getBuyers, formatName, topFive,
    isExpired, productShareUrl, displayAddedByFunc,
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
                <button onClick={() => handleDetail(prod)} type="button" className="border-0">
                  <span className={styles.groupshop__pcard_tag_price}>
                    {`${percentage}% OFF`}
                  </span>
                  <div className={styles.groupshop__pcard_tag_boughtby}>
                    {topFive(getBuyers(prod.id)?.map(
                      (member: Member) => (
                        <span className={styles.groupshop__pcard_tag_buyer}>
                          {formatName(member.orderDetail.customer)}
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
                  ) => {
                    const show = displayAddedByFunc(productId);
                    const htmldata = show ? (
                      <span
                        className={styles.groupshop__pcard_tag_addedby}
                        key={`${productId}_${Math.random()}`}
                      >
                        {`Added by ${addedBy}`}
                      </span>
                    ) : '';
                    return htmldata;
                  })}
                </button>
              )}
            >
              <h5 className="text-center fw-bold text-truncate">{prod.title}</h5>
              {prod.orders?.length > 0 && (
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
                  {dPrice(+(prod.price)).toFixed(2)}
                </span>
              </h5>
              <Button
                variant="primary"
                className={styles.groupshop_addtoCart}
                onClick={() => handleDetail(prod)}
                // () => { setsProduct(prod); setshowDetail(true); }}
                disabled={isExpired}
              >
                Add to Cart

              </Button>
              <ShareButton disabled={isExpired} placement="auto" shareurl={productShareUrl(prod?.id ?? '')} className="m-1 px-2 rounded-pill" />
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
              <h5 className="text-center fw-bold text-truncate">Don’t see what you like?</h5>

              <p className="text-center  fs-5">
                Add your favorite product
              </p>
              <br />
              <br />
              <Button variant="primary" disabled className={styles.groupshop_addtoCart}>Add to Cart</Button>
              <Button variant="outline-primary" className={styles.groupshop_disableShareCircle} disabled>
                <Send size={16} />
              </Button>
            </ProductCard>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          {totalPages > 1 && (
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
                  className={currentPage === n
                    ? styles.gropushop_activePage : styles.groupshop_page}
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
      {/* <ProductDetail
        show={showDetail}
        handleClose={(e) => setshowDetail(false)}
        product={sProduct}
      /> */}
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
