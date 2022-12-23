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
import { EmojiHeartEyesFill, Send } from 'react-bootstrap-icons';
import { GroupshopContext } from 'store/groupshop.context';
import usePagination from 'hooks/usePagination';
import useDeal from 'hooks/useDeal';
import { Member } from 'types/groupshop';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import useUtilityFunction from 'hooks/useUtilityFunction';
import useGtm from 'hooks/useGtm';
import { useMediaQuery } from 'react-responsive';
import ShareUnlockButton from 'components/Buttons/ShareUnlockButton/ShareUnlockButton';
import useAppContext from 'hooks/useAppContext';
import AddProduct from '../AddProduct/AddProduct';
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
  isModalForMobile?: boolean;
  isDiscoveryTool?: boolean;
  urlForActivation?: string | undefined;
  skuCount?: number | null;
  isSuggestion?: boolean;
  membersForDiscover?: any[];
  brandurl?: string;
} & React.ComponentPropsWithoutRef<'div'> & RootProps

const ProductGrid = ({
  products, pending, children, maxrows = 0, addProducts, handleDetail, isModalForMobile,
  xs = 12, sm = 12, md = 6, lg = 4, xl = 3, xxl = 3, showHoverButton = false, id, skuCount = null,
  isSuggestion, membersForDiscover, isDiscoveryTool, brandurl,
  urlForActivation, ...props
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
    id,
  });

  const fillerz = pageSize === renderItems?.length ? 0 : 1;

  const {
    gsctx: {
      discountCode: { percentage },
      dealProducts, addedProducts,
    } = { discountCode: { percentage: 0 }, dealProducts: [] }, isGroupshop, isChannel,
  } = useAppContext();
  // stage db and check with gs 4 bought prd
  const {
    currencySymbol, dPrice, getBuyers, formatName, topFive, getBuyers2, isInfluencerGS,
    isExpired, productShareUrl, displayAddedByFunc, productPriceDiscount, shortActivateURL,
    leftOverProducts, addedByInfluencer, addedByRefferal, nameOnProductGrid, getBuyersDiscover,
  } = useDeal();
  // console.log('🚀ProductGrid.tsx ~ line 93 ~ leftOverProducts', leftOverProducts()?.length);
  if (pending) {
    return (<Placeholder as="h1" bg="secondary" className="w-100" {...props} ref={ref} id={id} />);
  }
  console.log('🚀 ~ file: ProductGrid.tsx ~ line 73 ===~ isModalForMobile', isModalForMobile);
  // console.log('🚀 ~ file: ProductGrid.tsx ~ line 73 ===~ renderItems', renderItems);
  // console.log('🚀 ~ file: ProductGrid.tsx ~ line 71 ===~ fillerz', fillerz);
  // console.log('🚀 ~ file: ProductGrid.tsx ~ line 71 ===~ skucount', skuCount);
  // console.log('🚀 ~ file: ProductGrid.tsx === leftOverProducts', leftOverProducts()?.length);

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
      <Row className={['justify-content-sm-start justify-content-md-start', !isDiscoveryTool ? 'justify-content-lg-center' : ([styles.groupshop__discover__products, 'justify-content-lg-between'].join(' '))].join(' ')} id="productGrid">
        {renderItems?.map((prod, index) => (
          <>
            {prod.title !== 'AddProductType' ? (
              <Col xs={xs} md={md} lg={lg} xl={xl} key={prod.id}>
                <ProductCard
                  isrc={prod.featuredImage}
                  vsrc={prod.featuredVideo}
                  // onClick={() => handleDetail(prod)}
                  onClick={() => {
                    if (isSuggestion) {
                      const Arr = prod.id.split('/');
                      const prodId = Arr[Arr.length - 1];
                      window.open(`${window.location.origin}${brandurl}/product&${prodId}`, '_blank');
                    }
                  }}
                  imgOverlay={(
                    <>

                      <button onClick={() => { !isSuggestion ? handleDetail(prod) : ''; }} type="button" className={styles.groupshop_btnBgClr}>
                        <span className={styles.groupshop__pcard_tag_price}>
                          {currencySymbol}
                          {(+(productPriceDiscount(+(prod.price), +percentage))).toFixed(2).toString().replace('.00', '')}
                          {' '}
                          OFF
                        </span>

                        <div className={styles.groupshop__pcard_tag_boughtby}>
                          {topFive(getBuyers(prod.id)?.map(
                            (member: Member) => (
                              <span className={styles.groupshop__pcard_tag_buyer}>
                                {nameOnProductGrid(member.orderDetail.customer)}
                              </span>
                            ),
                          ))}
                          {isSuggestion && topFive(getBuyersDiscover(prod.id, membersForDiscover)
                            ?.map(
                              (member: Member) => (
                                <span className={styles.groupshop__pcard_tag_buyer}>
                                  {nameOnProductGrid(member.orderDetail.customer)}
                                </span>
                              ),
                            ))}
                          {(isInfluencerGS && !isChannel) && topFive(getBuyers2(prod.id)?.map(
                            (member: Member) => (
                              <span className={styles.groupshop__pcard_tag_buyer}>
                                {formatName(member.customerInfo)}
                              </span>
                            ),
                          ))}

                          {getBuyers(prod.id).length > 0 && (
                            <span className={styles.groupshop__pcard_tag_buyer}>Bought By </span>)}
                          {(isInfluencerGS) && getBuyers2(prod.id).length > 0 && (
                            <span className={styles.groupshop__pcard_tag_buyer}>Bought By </span>)}
                          {getBuyersDiscover(prod.id, membersForDiscover).length > 0 && (
                            <span className={styles.groupshop__pcard_tag_buyer}>Bought By </span>)}
                        </div>
                        {[...addedProducts ?? [],
                          ...addedByInfluencer ?? [],
                          ...addedByRefferal ?? []]?.filter(
                          ({ productId }) => productId === prod.id,
                        ).map((
                          { addedBy, productId },
                        ) => {
                          const show = displayAddedByFunc(productId);
                          let htmldata = true ? (
                            <span
                              className={styles.groupshop__pcard_tag_addedby}
                              key={`${productId}_${Math.random()}`}
                            >
                              🤩
                              {/* <EmojiHeartEyesFill color="yellow" size={16} /> */}
                              {' '}
                              {`${addedBy.length > 7 ? addedBy.slice(0, 7) : addedBy}'s favs`}
                            </span>
                          ) : '';
                          htmldata = isGroupshop && isModalForMobile && getBuyers(prod.id).length > 0 ? '' : htmldata;
                          htmldata = (isInfluencerGS || isChannel) && isModalForMobile && getBuyers2(prod.id).length > 0 ? '' : htmldata;
                          return htmldata;
                        })}
                      </button>
                      {!isSuggestion && showHoverButton && (
                        <Row className={styles.groupshop__pcard_tag_addToCart}>
                          <Col lg={10} className="p-0">
                            {isExpired ? (
                              <ShareUnlockButton
                                label="share to unlock"
                                shareurl={urlForActivation ?? productShareUrl(prod?.id ?? '')}
                                className={styles.groupshop_unlockToShare}
                                onClick={(e) => handleCard(e)}
                              />

                            ) : (
                              <Button
                                variant="primary"
                                className={styles.groupshop__pcard_tag_addToCart_btn}
                                onClick={() => handleDetail(prod)}
                                disabled={isExpired || prod.outofstock}
                              >
                                {!prod.outofstock ? 'Add to Cart' : 'Out of stock'}

                              </Button>

                            )}

                          </Col>
                          {!isExpired ? (
                            <Col lg={2} className="ps-1">
                              <ShareButton
                                disabled={isExpired}
                                placement="auto"
                                shareurl={productShareUrl(prod?.id ?? '')}
                                fullshareurl={productShareUrl(prod?.id ?? '')}
                                className={['px-2 rounded-pill bg-white', styles.groupshop__onHoverCart].join(' ')}
                                popoverClassName={styles.groupshop__earn__popover}
                                onClick={(e) => handleCard(e)}
                              />
                            </Col>
                          ) : ''}
                        </Row>
                      )}
                    </>
                  )}
                >
                  <div className={styles.groupshop_product_info}>
                    <div className={styles.groupshop_product_desc}>
                      <h5 className="text-center fw-bold text-truncate">{prod.title}</h5>
                      {prod.purchaseCount ? (
                        <p className="text-center mb-1 fs-5 fw-bold">
                          { prod.purchaseCount >= 1 && prod.purchaseCount <= 30 ? <>🔥</> : ''}
                          { prod.purchaseCount > 30 && prod.purchaseCount <= 100 ? <>⚡️</> : ''}
                          { prod.purchaseCount > 100 ? <>🎉</> : ''}
                          <i>
                            {`${prod.purchaseCount} people shopped`}

                          </i>
                        </p>
                      ) : ''}

                      <h5 className="pt-2 text-center fw-bold">
                        <span>
                          {currencySymbol}
                          {dPrice(+(prod.price)).toFixed(2).toString().replace('.00', '')}
                        </span>
                        {' '}
                        <span className="text-decoration-line-through fw-light me-1">
                          {currencySymbol}
                          {/* {prod.price} */}
                          {(+(prod.price)).toFixed(2).toString().replace('.00', '')}
                        </span>
                      </h5>
                    </div>
                    {!showHoverButton && (
                      <div className={styles.groupshop_addtoCart_wrapper}>
                        {isExpired ? (
                          <ShareUnlockButton
                            label="share to unlock"
                            shareurl={shortActivateURL ?? urlForActivation ?? productShareUrl(prod?.id ?? '')}
                            className={styles.groupshop_unlockToShare}
                            onClick={(e) => handleCard(e)}
                          // () => { setsProduct(prod); setshowDetail(true); }}
                          />

                        ) : (
                          <>
                            <Button
                              variant="primary"
                              className={styles.groupshop_addtoCart}
                              onClick={() => handleDetail(prod)}
                              // () => { setsProduct(prod); setshowDetail(true); }}
                              disabled={isExpired || prod.outofstock}
                            >
                              {!prod.outofstock ? 'Add to Cart' : 'Out of stock'}

                            </Button>
                            <ShareButton
                              disabled={isExpired}
                              placement="auto"
                              shareurl={productShareUrl(prod?.id ?? '')}
                              fullshareurl={productShareUrl(prod?.id ?? '')}
                              className={['mx-1 rounded-pill', styles.groupshop__earn].join(' ')}
                              popoverClassName={styles.groupshop__earn__popover}
                              onClick={() => googleButtonCode('product-share')}
                            />

                          </>
                        )}
                      </div>
                    )}
                  </div>
                </ProductCard>
              </Col>
            ) : (
              <Col xs={xs} md={md} lg={lg} xl={xl} key={prod.id}>
                <AddProduct xs={xs} md={md} lg={lg} xl={xl} key={`addP${prod.id}`} percentage={percentage} isExpired={isExpired} addProducts={() => addProducts(true)} />
              </Col>
            )}
          </>
        ))}

        {(!isSuggestion && skuCount! > 1 && leftOverProducts()?.length > 0)
          ? [...new Array(fillerz)]?.map((n) => (
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
                {/* <div className={styles.groupshop_addtoCart_wrapper}>
                <Button variant="primary" disabled className={styles.groupshop_addtoCart}>
                Add to Cart
                </Button>
                <Button variant="outline-primary" className={styles.groupshop_disableShareCircle}
                disabled>
                  <Send size={16} />
                </Button>
              </div> */}
              </ProductCard>
            </Col>
          )) : <></>}
      </Row>
      <Row>
        <Col>
          {totalPages > 1 && (
            <Pagination className={styles.groupshop_pagination}>
              <Pagination.Prev
                className={[(currentPage === 1) ? 'd-none' : '', styles.groupshop_pagination_prev].join(' ')}
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
                    ? styles.groupshop_pagination_activeItem : styles.groupshop_pagination_item}
                >
                  {n}
                </Pagination.Item>
              ))}

              <Pagination.Next
                className={[(currentPage === totalPages) ? 'd-none' : '', styles.groupshop_pagination_next].join(' ')}
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
  isModalForMobile: false,
  isDiscoveryTool: false,
  urlForActivation: '',
  skuCount: 0,
  isSuggestion: false,
  membersForDiscover: [],
  brandurl: '',
};

export default ProductGrid;
