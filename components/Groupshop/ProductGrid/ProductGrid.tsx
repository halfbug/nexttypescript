/* eslint-disable no-unused-expressions */
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import styles from 'styles/Groupshop.module.scss';
import dStyles from 'styles/Drops.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Col, Container, Row, Placeholder, Button,
} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import ProductCard from 'components/Groupshop/ProductCard/ProductCard';
import useDimensions from 'hooks/useDimentions';
import usePagination from 'hooks/usePagination';
import useDeal from 'hooks/useDeal';
import { Member } from 'types/groupshop';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import useUtilityFunction from 'hooks/useUtilityFunction';
import useGtm from 'hooks/useGtm';
import { useMediaQuery } from 'react-responsive';
import ShareUnlockButton from 'components/Buttons/ShareUnlockButton/ShareUnlockButton';
import useAppContext from 'hooks/useAppContext';
import useDrops from 'hooks/useDrops';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import {
  DROPS_PRODUCT_VENDOR_SPOTLIGHT,
  DROPS_PRODUCT_VENDOR_VAULT, DROPS_REGULAR, DROPS_SPOTLIGHT, DROPS_VAULT,
} from 'configs/constant';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai';
import useLoadMoreOnScroll from 'hooks/useLoadMoreOnScroll';
import useLoadMoreOnVisible from 'hooks/useLoadMoreOnVisible';
import { PRODUCT_PAGE } from 'store/store.graphql';
import { useLazyQuery, useQuery } from '@apollo/client';
import useLoadMoreOnViewAllScroll from 'hooks/useLoadMoreOnViewAllScroll';
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
  handleViewAll?(prd: any): void;
  id?: string;
  isViewAll?: boolean;
  isModalForMobile?: boolean;
  isDiscoveryTool?: boolean;
  isDrops?: boolean;
  title?: string;
  type?: string;
  isSpotLight?: boolean;
  urlForActivation?: string | undefined;
  skuCount?: number | null;
  isSuggestion?: boolean;
  membersForDiscover?: any[];
  brandurl?: string;
  discoveryDiscount?: string;
  currency?: string | undefined;
  showPagination?: boolean;
  loading?: boolean;
  sectionID?: string | undefined;
  loadmore?: boolean;
} & React.ComponentPropsWithoutRef<'div'> & RootProps

function ProductGrid(props: any) {
  const {
    products, pending, children, maxrows = 0, addProducts, handleDetail, isModalForMobile,
    sectionID, xs = 12, sm = 12, md = 6, lg = 4, xl = 3, xxl = 3, showHoverButton = false,
    id, skuCount = null, isSuggestion, membersForDiscover, isDiscoveryTool, isDrops,
    isSpotLight, brandurl, title, discoveryDiscount, urlForActivation, currency, showPagination,
    type, loadmore, isViewAll, handleViewAll,
  } = props;
  const memoizedComponent = useMemo(
    () => <ProductGridInitial {...props} />, [
      products, pending, children, maxrows, addProducts, handleDetail, isModalForMobile, sectionID,
      xs, sm, md, lg, xl, xxl, showHoverButton, id, skuCount, isSuggestion, membersForDiscover,
      isDiscoveryTool, isDrops, isSpotLight, brandurl, title, discoveryDiscount, urlForActivation,
      currency, showPagination, type, loadmore, isViewAll, handleViewAll,
    ],
  );

  return (
    <div>
      {memoizedComponent}
    </div>
  );
}

const ProductGridInitial = ({
  products, pending, children, maxrows = 0, addProducts, handleDetail, isModalForMobile, sectionID,
  xs = 12, sm = 12, md = 6, lg = 4, xl = 3, xxl = 3, showHoverButton = false, id, skuCount = null,
  isSuggestion, membersForDiscover, isDiscoveryTool, isDrops, isSpotLight, brandurl, title,
  discoveryDiscount, urlForActivation, currency, showPagination, type,
  loading, loadmore = false, isViewAll = false, handleViewAll, ...props
}: ProductGridProps) => {
  const { formatNumber } = useUtilityFunction();
  const {
    gsctx,
    dispatch,
    isGroupshop, isChannel,
  } = useAppContext();
  const {
    discountCode: { percentage }, loading: load, sections,
    dealProducts, addedProducts, store, id: dropsId, forYouSections, selectedCategory,
  } = gsctx;
  const productRef = useRef<HTMLDivElement| null>(null);
  const [ref, dimensions] = useDimensions();
  const [isTimetoLoadS, setIsTimetoLoadS] = useLoadMoreOnScroll(productRef, 'vertical');
  // console.log('🚀 ~ file: ProductGrid.tsx:103 ~ isTimetoLoadS:', isTimetoLoadS);
  const [isTimetoLoadV, setIsTimetoLoadV] = useLoadMoreOnVisible(productRef, 'allproductsdrops_productGrid');
  const [isTimetoLoadA, setIsTimetoLoadA] = useLoadMoreOnViewAllScroll(productRef, 'viewAllproductsdrops_productGrid');

  const csection: any = (
    selectedCategory === 'forYou'
      ? [...forYouSections?.map((forYou: { sections: any }) => forYou.sections) ?? []]
      : sections
  )?.flat()?.find(({ shopifyId }: any) => shopifyId === sectionID)
    ?? { products: [] };
  const mergeIds: any = csection?.mergedIds?.length ? csection?.mergedIds : [];
  const activeSectionID = sectionID;
  const [getMoreProducts,
    { data: getPaginatedProducts, loading: moreProdLoading }] = useLazyQuery(PRODUCT_PAGE, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onError() { console.log('Error in getPaginatedProducts!'); },
    onCompleted: async (sectionPrd: { getPaginatedProducts : {
      result : IProduct[], pageInfo: any}}) => {
      // console.log(sectionPrd?.getPaginatedProducts);
      if (csection.type === 'regular') setIsTimetoLoadS(false); else setIsTimetoLoadS(false);
      setIsTimetoLoadV(false); setIsTimetoLoadA(false);
      const { getPaginatedProducts: { pageInfo } } = sectionPrd;
      if (gsctx.selectedCategory === 'forYou') {
        dispatch({
          type: 'UPDATE_PRODUCTS',
          payload: {
            ...gsctx,
            forYouSections: [...gsctx.forYouSections!.map((sec) => ({
              ...sec,
              sections: sec.sections.map((forYouSec) => {
                if (forYouSec.shopifyId === sectionID) {
                  return (
                    {
                      ...forYouSec,
                      products: [...forYouSec.products, ...sectionPrd!.getPaginatedProducts.result,
                      ],
                      pageInfo: sectionPrd!.getPaginatedProducts.pageInfo,
                    });
                }
                return forYouSec;
              }),
            }))],
          },
        });
      } else {
        dispatch({
          type: 'UPDATE_PRODUCTS',
          payload: {
            ...gsctx,
            sections: [...sections!.map((sec) => {
              console.log('🚀 ~ file: ProductGrid.tsx:170 ~ sections:[...sections!.map ~ sec:', sec);
              if (sec.shopifyId === sectionID) {
                const { mergedIds } = sec;
                const newMerge = [...mergedIds];
                const isTimeToSwitch = mergedIds.length > 0 && !pageInfo?.hasNextPage;
                if (isTimeToSwitch) { newMerge.shift(); }
                return (
                  {
                    ...sec,
                    mergedIds: newMerge,
                    products: [...sec.products, ...sectionPrd!.getPaginatedProducts.result,
                    ],
                    pageInfo: {
                      ...sectionPrd!.getPaginatedProducts.pageInfo,
                      totalRecords: isTimeToSwitch ? 0
                        : sectionPrd!.getPaginatedProducts.pageInfo.totalRecords,
                    },
                  });
              }
              return sec;
              // let change = false;
              // if (sec.mergedIds.length) {
              //   const { mergedIds } = sec;
              //   mergeIds = [...mergedIds]; // Create a shallow copy
              //   if (!sectionPrd!.getPaginatedProducts.pageInfo?.hasNextPage) {
              //     mergeIds.shift();
              //     change = true;
              //   }
              //   return (
              //     {
              //       ...sec,
              //       mergedIds: mergeIds,
              //       products: [...sec.products, ...sectionPrd!.getPaginatedProducts.result,
              //       ],
              //       pageInfo: {
              //         ...sec.pageInfo,
              //         totalRecords: (change) ? 0
              //           : sectionPrd!.getPaginatedProducts.pageInfo?.totalRecords,
              //       },
              //     });
              // }
              // return sec;
            })],
          },
        });
      }
    },
  });

  useEffect(() => {
    if (loadmore && (isTimetoLoadS || isTimetoLoadV || isTimetoLoadA)
    && (!csection.pageInfo
    || mergeIds?.length || csection?.pageInfo?.totalRecords > csection.products.length)) {
      let Skip = 0;

      Skip = mergeIds?.length && !mergeIds.includes(csection.shopifyId)
        ? csection?.pageInfo?.totalRecords - (csection?.pageInfo?.totalRecords % 10)
        : csection.products?.length;

      getMoreProducts({
        variables: {
          productArgs: {
            pagination: {
              skip: Skip ?? 0,
              take: 10,
            },
            collection_id: mergeIds?.length ? mergeIds[0] : activeSectionID,
          },
        },
      });
    }
  }, [isTimetoLoadS, isTimetoLoadV, isTimetoLoadA]);

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
    showPagination,
  });

  const fillerz = pageSize === renderItems?.length ? 0 : 1;

  // stage db and check with gs 4 bought prd
  const {
    currencySymbol, dPrice, getBuyers, formatName, topFive, getBuyers2, isInfluencerGS,
    isExpired, productShareUrl, displayAddedByFunc, productPriceDiscount, shortActivateURL,
    leftOverProducts, addedByInfluencer, addedByRefferal, nameOnProductGrid, getBuyersDiscover,
    disPrice, currencySymbolDiscovery, gsURL, productPrice,
  } = useDeal();
  const {
    spotlightProducts,
    favoriteProducts,
    updatePurhaseCount,
    addProductToFavorite,
    removeFavoriteProduct,
  } = useDrops();
  // console.log('🚀ProductGrid.tsx ~ line 93 ~ leftOverProducts', leftOverProducts()?.length);
  if (pending) {
    return (<Placeholder as="h1" bg="secondary" className="w-100" {...props} ref={ref} id={id} />);
  }
  // console.log('🚀 ~ file: ProductGrid.tsx ~ line 73 ===~ isModalForMobile', isModalForMobile);
  // console.log('🚀 ~ file: ProductGrid.tsx ~ line 73 ===~ renderItems', renderItems);
  // console.log('🚀 ~ file: ProductGrid.tsx ~ line 71 ===~ fillerz', fillerz);
  // console.log('🚀 ~ file: ProductGrid.tsx ~ line 71 ===~ skucount', skuCount);
  // console.log('🚀 ~ file: ProductGrid.tsx === leftOverProducts', leftOverProducts()?.length);

  if ((products === undefined || products?.length < 1) && !loading) {
    // return (<Placeholder as="h1" bg="secondary" className="w-100" />);
    return (<div ref={ref} id={id} />);
  }
  // console.log({ renderItems });
  const { googleButtonCode } = useGtm();
  const handleCard = (e: any) => {
    e.stopPropagation();
    googleButtonCode('product-share');
  };

  const priceUI = (prod: any) => (
    <h5 className={['pt-2 fw-bold', !isDrops ? 'text-center' : ''].join(' ')}>
      <span className="text-decoration-line-through fw-light me-1">
        {isSuggestion ? currencySymbolDiscovery(currency) : currencySymbol}
        {/* {prod.price} */}
        {!prod?.compareAtPrice && (+(prod.price)).toFixed(2).toString().replace('.00', '')}
        {prod?.compareAtPrice && formatNumber(prod?.compareAtPrice ?? prod.price)}
      </span>
      {' '}
      <span className={isDrops ? 'me-2' : ''}>
        {currencySymbol}
        {productPrice(prod)}
      </span>
    </h5>
  );

  let position = 0;
  const horizontalScroll = (params: any) => {
    const { direction, gridId } = params;
    const obj = document.getElementById(gridId);
    const screenWidth = obj?.offsetWidth ?? 400;
    const maxWidth = obj?.scrollWidth ?? screenWidth;
    // console.log('left : --->', obj?.scrollLeft);
    // console.log('position:', position);
    // console.log('maxWidth:', maxWidth);
    // console.log('screenWidth:', screenWidth);
    position = obj?.scrollLeft ?? 0;
    if (direction === 'right' && position < (maxWidth - screenWidth)) {
      position += (screenWidth);
      if ((maxWidth - screenWidth) < position) {
        document.getElementById(`rightArrow${id}`)!.setAttribute('opacity', '0.3');
        document.getElementById(`leftArrow${id}`)!.setAttribute('opacity', '1');
      } else if ((maxWidth - screenWidth) === position) {
        document.getElementById(`leftArrow${id}`)!.setAttribute('opacity', '1');
        document.getElementById(`rightArrow${id}`)!.setAttribute('opacity', '0.3');
      } else {
        document.getElementById(`leftArrow${id}`)!.setAttribute('opacity', '1');
        document.getElementById(`rightArrow${id}`)!.setAttribute('opacity', '1');
      }
    }
    if (direction === 'left' && position >= screenWidth) {
      position -= (screenWidth);
      if (position === 0) {
          document.getElementById(`leftArrow${id}`)!.setAttribute('opacity', '0.3');
          document.getElementById(`rightArrow${id}`)!.setAttribute('opacity', '1');
      } else {
        document.getElementById(`leftArrow${id}`)!.setAttribute('opacity', '1');
        document.getElementById(`rightArrow${id}`)!.setAttribute('opacity', '1');
      }
    } else if (direction === 'left' && !!position && position <= screenWidth) {
      position = 0;
    }

    obj?.scroll({
      left: (position ?? 0),
      behavior: 'smooth',
    });
  };

  const handleScroll = (e: any) => {
    const obj = document.getElementById(e.target.id);
    if (e.target.scrollLeft + (obj?.offsetWidth ?? 0) === obj?.scrollWidth) {
      document.getElementById(`leftArrow${id}`)!.setAttribute('opacity', '1');
      document.getElementById(`rightArrow${id}`)!.setAttribute('opacity', '0.3');
    } else if (e.target.scrollLeft === 0) {
      document.getElementById(`leftArrow${id}`)!.setAttribute('opacity', '0.3');
      document.getElementById(`rightArrow${id}`)!.setAttribute('opacity', '1');
    } else {
      document.getElementById(`leftArrow${id}`)!.setAttribute('opacity', '1');
      document.getElementById(`rightArrow${id}`)!.setAttribute('opacity', '1');
    }
    if (position !== e.target.scrollLeft) {
      position = e.target.scrollLeft;
    }
  };

  const paginationScroll = (elementId: any, page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      const app = document.getElementById(elementId)?.offsetTop ?? 0;
      const size = isDrops ? (app - 270) : (app - 100);
      window.scroll({
        top: size,
        behavior: 'smooth',
      });
    }, 500);
  };

  // const handleClose = () => setShow(false);
  const handleShow = () => {
    if (handleViewAll) {
      handleViewAll(sectionID);
    }
  };

  return (
    <SkeletonTheme
      baseColor="#e9ecef"
      highlightColor="#dee2e6"
      borderRadius="4px"
      duration={4}
    >
      <Container {...props} ref={ref} id={id} className={type !== DROPS_VAULT && type !== DROPS_SPOTLIGHT ? '' : dStyles.drops__vault__section}>
        {!isViewAll && (
        <Row className={isDrops ? dStyles.drops_row : styles.groupshop_row}>
          <Col xs={12} className={styles.groupshop_col}>
            {children}
          </Col>
        </Row>
        )}

        {!children && (
          <>
            <Row>

              {isSpotLight && (
                <Col xs={12} className={dStyles.drops__counter}>
                  <div className="d-flex align-items-center mt-3">
                    <div className="opacity-50 me-2">
                      Drop ends in
                    </div>
                    <div className={dStyles.drops__counter_middle}>
                      <p>
                        <span>
                          00
                          {' '}
                          hrs
                        </span>
                        :
                        <span>
                          01
                          {' '}
                          mins
                        </span>
                        :
                        <span>
                          01
                          {' '}
                          secs
                        </span>
                      </p>
                    </div>

                  </div>
                </Col>
              )}
            </Row>
            <Row>
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {type !== DROPS_VAULT && type !== DROPS_SPOTLIGHT ? (

                      <div className={dStyles.drops_col_dropheading}>
                        {loading ? <Skeleton width="186.5px" /> : title}
                        {type === 'favorite' && (
                        <>
                          {!loading
                            ? (
                              <Button variant="" className="mx-2 p-1 bg-white shadow-sm border-1 rounded-3 subtle">
                                <AiOutlineStar size={20} />
                              </Button>
                            )
                            : <></>}
                          {/* {!loading
                            ? (
                              <Button
                                variant=""
                                className={dStyles.drops_friendsBtn}
                                onClick={() => navigator?.share({
                                  title: `${isDrops ? 'Groupshop' : 'Microstore'}`,
                                  text: `Share With Friends ${gsURL}`,
                                })}
                              >
                                Share With Friends
                              </Button>
                            )
                            : <></>} */}
                        </>
                        )}
                      </div>

                    )
                      : (
                        <>
                          <div className="d-flex align-items-center">
                            <div className={dStyles.drops_col_dropheading}>
                              {loading ? <Skeleton width="186.5px" /> : title}
                            </div>
                            {/* <div className={dStyles.drops_col_dropheading_off}>
                        30% off
                      </div> */}
                          </div>
                        </>
                      )}
                  </div>
                  {type !== 'favorite' ? (
                    <div className="d-flex">
                      <Button
                        variant="primary"
                        onClick={handleShow}
                        className="text-nowrap bg-slate-50 border border-dark border-2 py-1 px-3 bg-white
                         rounded-pill bg-light text-dark me-2"
                      >
                        <span className={styles.drops__top__help_btn}>View All</span>
                      </Button>

                      {/* <Button
                        className="text-nowrap bg-slate-50 border border-dark border-2 py-1
                        px-3 bg-white
                      rounded-pill bg-light text-dark me-2"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasBottom"
                        aria-controls="offcanvasBottom"
                      >
                        <span className={styles.drops__top__help_btn}>View All</span>

                      </Button> */}

                      {/* <Button
                        variant="primary"
                        className="text-nowrap bg-slate-50 border border-dark border-2
                        py-1 px-3 bg-white  rounded-pill bg-light text-dark me-2"
                      >
                        <span className={styles.drops__top__help_btn}>View All</span>
                      </Button> */}
                      <BsArrowLeft opacity={0.3} id={`leftArrow${id}`} size={24} className="me-2" onClick={() => { horizontalScroll({ direction: 'left', gridId: [id, 'productGrid'].join('_') }); }} />
                      <BsArrowRight opacity={renderItems!?.length > 2 ? 1 : 0.3} id={`rightArrow${id}`} size={24} className="ms-2" onClick={() => { horizontalScroll({ direction: 'right', gridId: [id, 'productGrid'].join('_') }); }} />
                    </div>
                  ) : <></>}
                </div>
                {(type === DROPS_VAULT || type === DROPS_SPOTLIGHT) && (
                <div className={dStyles.drops_col_eligible}>
                  Not eligible for higher discounts or cashback.
                </div>
                )}
              </Col>
              {isSpotLight && (
              <Col xs={12} className={dStyles.drops__counter}>
                <div className="d-flex align-items-center mt-3">
                  <div className="opacity-50 me-2">
                    Drop ends in
                  </div>
                  <div className={dStyles.drops__counter_middle}>
                    <p>
                      <span>
                        00
                        {' '}
                        hrs
                      </span>
                      :
                      <span>
                        01
                        {' '}
                        mins
                      </span>
                      :
                      <span>
                        01
                        {' '}
                        secs
                      </span>
                    </p>
                  </div>

                </div>
              </Col>
              )}
            </Row>
          </>
        )}
        <Row
          className={isDrops ? ([dStyles.drops__discover__products, (id === 'allproductsdrops' || id === 'viewAllproductsdrops') ? 'flex-wrap' : ''].join(' '))
            : ['justify-content-sm-start justify-content-md-start', !isDiscoveryTool ? 'justify-content-lg-center' : ([styles.groupshop__discover__products, 'justify-content-lg-between'].join(' '))].join(' ')}
          id={[id, 'productGrid'].join('_')}
          onScroll={(e) => handleScroll(e)}
          ref={productRef}
        >
          {!loading ? renderItems?.map((prod, index) => (
            <>
              {prod.title !== 'AddProductType' ? (
                <Col xs={xs} md={md} lg={lg} xl={xl} key={prod.id}>
                  <ProductCard
                    isDrops={isDrops}
                    isVault={type === DROPS_VAULT || type === DROPS_SPOTLIGHT}
                    isSpotlight={isSpotLight}
                    isrc={prod.featuredImage}
                    vsrc={prod.featuredVideo}
                    loading={loading}
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
                        <div className="flex justify-between">
                          <button onClick={() => { !isSuggestion && handleDetail(prod); }} type="button" className={styles.groupshop_btnBgClr}>
                            <span className={
                                isDrops ? dStyles.drops__pcard_tag_price
                                  : styles.groupshop__pcard_tag_price
                              }
                            >
                              {isSuggestion ? currencySymbolDiscovery(currency) : currencySymbol}
                              {prod.compareAtPrice ? formatNumber((+prod.compareAtPrice - (spotlightProducts.includes(prod.id) ? +prod.price : dPrice(+prod.price)))) : (+(productPriceDiscount(+(prod.price), isSuggestion ? +discoveryDiscount! : +percentage))).toFixed(2).toString().replace('.00', '')}
                              {' '}
                              OFF
                            </span>

                            <div className={styles.groupshop__pcard_tag_boughtby}>
                              {!isSuggestion && topFive(getBuyers(prod.id)?.map(
                                (member: Member) => (
                                  <span className={styles.groupshop__pcard_tag_buyer}>
                                    {nameOnProductGrid(member.orderDetail.customer)}
                                  </span>
                                ),
                              ))}
                              {isSuggestion
                                  && topFive(getBuyersDiscover(prod.id, membersForDiscover)
                                    ?.map(
                                      (member: Member) => (
                                        <span className={styles.groupshop__pcard_tag_buyer}>
                                          {nameOnProductGrid(member.orderDetail.customer)}
                                        </span>
                                      ),
                                    ))}
                              {(!isSuggestion && isInfluencerGS && !isChannel)
                                  && topFive(getBuyers2(prod.id)
                                    ?.map((member: Member) => (
                                      <span className={styles.groupshop__pcard_tag_buyer}>
                                        {formatName(member.customerInfo)}
                                      </span>
                                    )))}

                              {!isSuggestion && getBuyers(prod.id).length > 0 && (
                                <span className={styles.groupshop__pcard_tag_buyer}>
                                  Bought By
                                  {' '}
                                </span>
                              )}
                              {(!isSuggestion && isInfluencerGS)
                                  && getBuyers2(prod.id).length > 0 && (
                                    <span className={styles.groupshop__pcard_tag_buyer}>
                                      Bought By
                                      {' '}
                                    </span>
                              )}
                              {isSuggestion
                                  && getBuyersDiscover(prod.id, membersForDiscover).length > 0
                                  && (
                                    <span className={styles.groupshop__pcard_tag_buyer}>
                                      Bought By
                                      {' '}
                                    </span>
                                  )}
                            </div>
                            {[...addedProducts ?? [],
                              ...addedByInfluencer ?? [],
                              ...addedByRefferal ?? []]?.filter(
                              ({ productId }) => productId === prod.id,
                            ).map((
                              { addedBy, productId },
                            ) => {
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
                          {isDrops && (
                            <Button
                              variant=""
                              className={['text-center p-1 bg-white shadow-sm border-1 rounded-3',
                                dStyles.drops_starBtn].join(' ')}
                              onClick={() => {
                                if (dropsId) {
                                  if (favoriteProducts.includes(prod.id)) {
                                    removeFavoriteProduct(dropsId, prod.id);
                                  } else {
                                    addProductToFavorite(dropsId, prod.id);
                                  }
                                }
                              }}
                            >
                              <AiTwotoneStar fill={favoriteProducts.includes(prod.id) ? '#FFE012' : 'lightgrey'} size={20} />
                            </Button>
                          )}
                        </div>
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
                      <div
                        role="button"
                        tabIndex={-1}
                        onKeyDown={() => { !isSuggestion ? handleDetail(prod) : ''; }}
                        onClick={() => { !isSuggestion ? handleDetail(prod) : ''; }}
                        className={styles.groupshop_product_desc}
                      >
                        {loading
                          ? <Skeleton width="186.5px" height="55px" />
                          : (
                            <h5
                              className={['fw-bold', !isDrops ? 'text-center' : '', styles.groupshop_product_desc_title].join(' ')}
                            >
                              {prod.title}
                            </h5>
                          )}
                        {isDrops && (loading
                          ? <Skeleton width="186.5px" />
                          : priceUI(prod))}
                        {prod.outofstock
                          ? <p className={dStyles.drops_product_desc_soldout}>{loading ? <Skeleton width="186.5px" /> : 'Sold out'}</p>
                          : ((prod.purchaseCount && !isDrops) && (
                            <p className={['mb-1 fs-5 fw-bold', !isDrops ? 'text-center' : ''].join(' ')}>
                              {prod.purchaseCount >= 1 && prod.purchaseCount <= 30 ? <>🔥</> : ''}
                              {prod.purchaseCount > 30 && prod.purchaseCount <= 100 ? <>⚡️</> : ''}
                              {prod.purchaseCount > 100 ? <>🎉</> : ''}
                              <i>
                                {`${prod.purchaseCount} people shopped`}
                              </i>
                            </p>
                          ))
                              || (prod.secondaryCount && isDrops && (
                                !loading ? (
                                  <p className={['mb-1 fs-5 fw-bold', !isDrops ? 'text-center' : ''].join(' ')}>
                                    {updatePurhaseCount(prod?.secondaryCount, prod?.purchaseCount) >= 1 && updatePurhaseCount(prod?.secondaryCount, prod?.purchaseCount) <= 30 ? <>🔥</> : ''}
                                    {updatePurhaseCount(prod?.secondaryCount, prod?.purchaseCount) > 30 && updatePurhaseCount(prod?.secondaryCount, prod?.purchaseCount) <= 100 ? <>⚡️</> : ''}
                                    {updatePurhaseCount(prod?.secondaryCount, prod?.purchaseCount) > 100 ? <>🎉</> : ''}
                                    <i>
                                      {`${updatePurhaseCount(prod?.secondaryCount, prod?.purchaseCount)} people shopped`}
                                    </i>
                                  </p>
                                ) : <Skeleton width="186.5px" />
                              ))}
                        {!isDrops && priceUI(prod)}
                      </div>
                      {!showHoverButton && (
                        <div className={styles.groupshop_addtoCart_wrapper}>
                          {isExpired ? (
                            <ShareUnlockButton
                              label="share to unlock"
                              shareurl={shortActivateURL ?? urlForActivation ?? productShareUrl(prod?.id ?? '')}
                              className={styles.groupshop_unlockToShare}
                              onClick={(e) => handleCard(e)}
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
          )) : new Array(3).fill(null).map(() => (
            <Col xs={xs} md={md} lg={lg} xl={xl}>
              <ProductCard
                isDrops={isDrops}
                loading
                isVault={type === DROPS_VAULT || type === DROPS_SPOTLIGHT}
              >
                {/* <div className={styles.groupshop_product_info}>
                  <div className={styles.groupshop_product_desc}> */}
                <Skeleton width="186.5px" />
                <Skeleton width="186.5px" />
                <p className={dStyles.drops_product_desc_soldout}>
                  <Skeleton width="186.5px" />
                </p>
                {/* </div>
                </div> */}
              </ProductCard>
            </Col>
          ))}

          {moreProdLoading ? new Array(4).fill(null).map(() => (
            <Col xs={xs} md={md} lg={lg} xl={xl}>
              <ProductCard
                isDrops={isDrops}
                loading
                isVault={type === DROPS_VAULT || type === DROPS_SPOTLIGHT}
              >
                {/* <div className={styles.groupshop_product_info}>
                  <div className={styles.groupshop_product_desc}> */}
                <Skeleton width="107.5px" />
                <Skeleton width="107.5px" />
                <p className={dStyles.drops_product_desc_soldout}>
                  <Skeleton width="90px" />
                </p>
                {/* </div>
                </div> */}
              </ProductCard>
            </Col>
          )) : ''}

          {(!isSuggestion && skuCount! > 1 && leftOverProducts()?.length > 0)
            ? [...new Array(fillerz)]?.map((n) => (
              <Col xs={xs} md={6} lg={4} xl={3} key={n}>
                <ProductCard
                  isrc="/images/empty.png"
                  imgOverlay={(
                    <>
                      <span
                        className={
                          isDrops ? dStyles.drops__pcard_tag_price
                            : styles.groupshop__pcard_tag_price
                        }
                      >
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
                  <h5 className="text-center fw-bold text-truncate">{isDrops ? 'Curate your Groupshop' : 'Curate your Microstore'}</h5>

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
        {showPagination
      && (
      <Row>
        <Col>
          {totalPages > 1 && (
          <Pagination className={styles.groupshop_pagination}>
            <Pagination.Prev
              className={[(currentPage === 1) ? 'd-none' : '', styles.groupshop_pagination_prev].join(' ')}
              onClick={() => {
                const val = (currentPage > 1) ? currentPage - 1 : currentPage;
                paginationScroll(id, val);
              }}
            />

            {getPageNumbers().map((n, index) => (
              <Pagination.Item
                active={currentPage === n}
                onClick={() => {
                  paginationScroll(id, n);
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
                const val = (currentPage >= 1
                && currentPage < totalPages) ? currentPage + 1 : currentPage;
                paginationScroll(id, val);
              }}
            />

          </Pagination>

          )}
        </Col>
      </Row>
      )}
        {/* <ProductDetail
        show={showDetail}
        handleClose={(e) => setshowDetail(false)}
        product={sProduct}
      /> */}
      </Container>
    </SkeletonTheme>
  );
};

ProductGridInitial.defaultProps = {
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
  isDrops: false,
  title: '',
  type: DROPS_REGULAR,
  isSpotLight: false,
  urlForActivation: '',
  skuCount: 0,
  isSuggestion: false,
  membersForDiscover: [],
  brandurl: '',
  discoveryDiscount: '',
  currency: '',
  showPagination: true,
  loading: false,
  sectionID: '',
  loadmore: false,
  isViewAll: false,
  handleViewAll: undefined,
};

export default ProductGrid;
