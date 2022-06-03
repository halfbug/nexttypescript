/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
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
import useUtilityFunction from 'hooks/useUtilityFunction';
import useGtm from 'hooks/useGtm';
// import Link from 'next/link';
// import Router, { useRouter } from 'next/router';

type ProductGridProps = {
  products: IProduct[] | undefined,
  maxrows?: number,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
  showHoverButton?: boolean,
  addProducts(e: boolean): any;
  handleDetail(prd: any): void;
  id?: string;
} & React.ComponentPropsWithoutRef<'div'> & RootProps

const ProductGrid = ({
  products, pending, children, maxrows = 0, addProducts, handleDetail,
  xs = 12, sm = 12, md = 6, lg = 4, xl = 3, xxl = 3, showHoverButton = false, id, ...props
}: ProductGridProps) => {
  const [ref, dimensions] = useDimensions();
  // const router = useRouter();
  const {
    screens, breakPoint, pageSize,
    totalPages, renderItems, currentPage, setCurrentPage, getPageNumbers,
  } = usePagination<IProduct>({
    dimensions,
    maxrows,
    screens: {
      xs, sm, md, lg, xl, xxl,
    },
    items: products || [],
    siblingCount: 4,
  });

  const fillerz = pageSize === (renderItems?.length) ? 0 : 1;

  const {
    gsctx: {
      discountCode: { percentage },
      dealProducts,
    } = { discountCode: { percentage: 0 }, dealProducts: [] },
  } = useContext(GroupshopContext);

  const {
    currencySymbol, dPrice, getBuyers, formatName, topFive,
    isExpired, productShareUrl, displayAddedByFunc, productPriceDiscount,
  } = useDeal();
  const { formatNumber } = useUtilityFunction();

  if (pending) {
    return (<Placeholder as="h1" bg="secondary" className="w-100" {...props} ref={ref} id={id} />);
  }

  if (products === undefined || products?.length < 1) {
    // return (<Placeholder as="h1" bg="secondary" className="w-100" />);
    return (<div {...props} ref={ref} id={id}>&nbsp;</div>);
  }
  // console.log({ renderItems });
  const { googleButtonCode } = useGtm();
  const handleCard = (e: any) => {
    e.stopPropagation();
    googleButtonCode('product-share');
  };

  return (
    <Container {...props} ref={ref} id={id}>
      <Row className={styles.groupshop_row}>
        <Col xs={12} className={styles.groupshop_col}>
          {children}
        </Col>
      </Row>
      <Row className="justify-content-center">
        {renderItems?.map((prod) => (
          <Col xs={xs} md={md} lg={lg} xl={xl} key={prod.id}>
            <ProductCard
              isrc={prod.featuredImage}
              onClick={() => handleDetail(prod)}
              imgOverlay={(
                <button onClick={() => handleDetail(prod)} type="button" className={styles.groupshop_btnBgClr}>
                  <span className={styles.groupshop__pcard_tag_price}>
                    {currencySymbol}
                    {(+(productPriceDiscount(+(prod.price), +percentage))).toFixed(2).toString().replace('.00', '')}
                    {' '}
                    OFF
                  </span>
                  {showHoverButton && (
                    <Row className={styles.groupshop__pcard_tag_addToCart}>
                      <Col lg={10} className="p-0">
                        <Button
                          variant="primary"
                          className={styles.groupshop__pcard_tag_addToCart_btn}
                          onClick={() => handleDetail(prod)}
                          // () => { setsProduct(prod); setshowDetail(true); }}
                          disabled={isExpired}
                        >
                          Add to Cart

                        </Button>
                      </Col>
                      <Col lg={2} className="ps-1">
                        <ShareButton disabled={isExpired} placement="auto" shareurl={productShareUrl(prod?.id ?? '')} className={['px-2 rounded-pill bg-white', styles.groupshop__onHoverCart].join(' ')} onClick={(e) => handleCard(e)} />
                      </Col>
                    </Row>
                  )}
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
              <div className={styles.groupshop_product_info}>
                <h5 className="text-center fw-bold text-truncate">{prod.title}</h5>
                {prod.orders?.length > 0 && (
                <p className="text-center mb-1 fs-5">
                  {`🔥 ${prod.orders?.length} friends shopped`}
                </p>
                )}

                <h5 className="pt-2 text-center fw-bold">
                  <span className="text-decoration-line-through fw-light me-1">
                    {currencySymbol}
                    {/* {prod.price} */}
                    {(+(prod.price)).toFixed(2).toString().replace('.00', '')}
                  </span>
                  {' '}
                  <span>
                    {currencySymbol}
                    {dPrice(+(prod.price)).toFixed(2).toString().replace('.00', '')}
                  </span>
                </h5>
                {!showHoverButton && (
                <div className={styles.groupshop_addtoCart_wrapper}>
                  <Button
                    variant="primary"
                    className={styles.groupshop_addtoCart}
                    onClick={() => handleDetail(prod)}
                    // () => { setsProduct(prod); setshowDetail(true); }}
                    disabled={isExpired}
                  >
                    Add to Cart

                  </Button>
                  <ShareButton disabled={isExpired} placement="auto" shareurl={productShareUrl(prod?.id ?? '')} className={['mx-1 rounded-pill', styles.groupshop__earn].join(' ')} onClick={() => googleButtonCode('product-share')} />
                </div>
                )}
              </div>
            </ProductCard>
          </Col>
        ))}
        {[...new Array(fillerz)]?.map((n) => (
          <Col xs={xs} md={6} lg={4} xl={3} key={n}>
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
              <div className={styles.groupshop_addtoCart_wrapper}>
                <Button variant="primary" disabled className={styles.groupshop_addtoCart}>Add to Cart</Button>
                <Button variant="outline-primary" className={styles.groupshop_disableShareCircle} disabled>
                  <Send size={16} />
                </Button>
              </div>
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
                onClick={() => {
                  setCurrentPage(
                    (currentPage > 1) ? currentPage - 1 : currentPage,
                  );
                  { (id === 'allproducts') && (paginationScroll()); }
                }}
              />

              {getPageNumbers().map((n, index) => (
                <Pagination.Item
                  active={currentPage === n}
                  onClick={() => {
                    setCurrentPage(n);
                    { (id === 'allproducts') && (paginationScroll()); }
                  }}
                  className={currentPage === n
                    ? styles.gropushop_activePage : styles.groupshop_page}
                >
                  {n}
                </Pagination.Item>
              ))}

              <Pagination.Next
                className={styles.groupshop_pagination_next}
                onClick={() => {
                  setCurrentPage(
                    (currentPage >= 1 && currentPage < totalPages) ? currentPage + 1 : currentPage,
                  );
                  { (id === 'allproducts') && (paginationScroll()); }
                }}
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
let app = 0;
function paginationScroll() {
  if (app === 0) {
    app = (document.getElementById('allproducts')?.offsetHeight) ?? 0;
  }
  window.scroll({
    top: (app ?? 0) + 400,
    behavior: 'smooth',
  });
}

ProductGrid.defaultProps = {
  maxrows: 1,
  xs: 12,
  sm: 12,
  md: 6,
  lg: 4,
  xl: 3,
  xxl: 3,
  showHoverButton: false,
  id: 'popularproducts',
};

export default ProductGrid;
