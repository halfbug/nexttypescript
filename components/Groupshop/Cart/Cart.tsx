/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext } from 'react';
import styles from 'styles/Groupshop.module.scss';
import dStyles from 'styles/Drops.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  ButtonGroup,
  Col, Container, FormControl, Offcanvas, Row, Badge, Spinner,
} from 'react-bootstrap';
import { GroupshopContext } from 'store/groupshop.context';
import useCart from 'hooks/useCart';
import useDeal from 'hooks/useDeal';
import { useRouter } from 'next/router';
import useSuggested from 'hooks/useSuggested';
import useDetail from 'hooks/useDetail';
import Icon from 'assets/images/small-cone.svg';
import MoneyFly from 'assets/images/money-fly.svg';
import InfoIcon from 'assets/images/info.svg';
import useGtm from 'hooks/useGtm';
import useUtilityFunction from 'hooks/useUtilityFunction';
import Image from 'react-bootstrap/Image';
// import useSaveCart from 'hooks/useSaveCart';
import useAppContext from 'hooks/useAppContext';
import useDrops from 'hooks/useDrops';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_PLATFORM_FEE_DETAIL, GET_UNIQUE_LOCATIONS_BY_VARIANTS } from 'store/store.graphql';
import PopoverButton from 'components/Buttons/PopoverButton/PopoverButton';
import { DROPS_PRODUCT_VENDOR_SPOTLIGHT, DROPS_PRODUCT_VENDOR_VAULT } from 'configs/constant';
import Members from '../Members/Members';
import ProductCard from '../ProductCard/ProductCard';
import GradientProgressBar from '../GradientProgressBar/GradientProgressBar';
// import GradientProgressBar from '../GradientProgressBar/GradientProgressBar';
interface CartProps extends RootProps {
  show: boolean;
  handleClose(): any;
  handleDetail(item: any): void;
  product: IProduct | undefined;
  setShow: any;
  isDrops?: boolean;
}

interface ILocationData {
  getLocations: {
    locations: string[];
  }
}

interface IProductTotal {
  product: IProduct,
  total: number,
  locationID: string,
}

const Cart = ({
  show, pending = false, handleDetail, handleClose, product, setShow, ...props
}: CartProps) => {
  const {
    gsctx,
    dispatch,
    isDrops,
  } = useAppContext();

  const {
    store,
    members,
  } = gsctx;
  const {
    currencySymbol, dPrice, formattedCB, disPrice, discount, getOwnerName,
    isInfluencerGS, brandName,
  } = useDeal();

  const {
    rewardArr,
    spotlightProducts,
    cartValueProgress,
  } = useDrops();

  const [currencyName, setCurrencyName] = useState<any>('USD');
  const [platformFee, setPlatformFee] = useState<any>(0);
  const [platformProductQuantity, setplatformProductQuantity] = useState<number>(0);
  const [platformProductPrice, setplatformProductPrice] = useState<any>(0);
  const [locations, setlocations] = useState<string[]>([]);
  const [isChangeInQuantity, setisChangeInQuantity] = useState<boolean>(false);

  const {
    cartProducts, removeProduct, plusQuantity, minusQuantity, getTotal,
    isCartEmpty, getShopifyUrl, getSuggestedProducts, addCartProduct,
    getCartSaveMoney, getTotalActualCartTotal,
  } = useCart();

  const { formatNumber, groupBy } = useUtilityFunction();

  const {
    googleEventCode, checkoutCartView, checkoutButtonClick, checkoutUpsellClick,
  } = useGtm();

  const { data: { PlatformFeeById } = { } } = useQuery(GET_PLATFORM_FEE_DETAIL);

  const [getLocations, { data, loading: getLocationsLoading }] = useLazyQuery<ILocationData>(
    GET_UNIQUE_LOCATIONS_BY_VARIANTS, {
      fetchPolicy: 'network-only',
      onError() {
        console.error('Error in fetching locations');
      },
    },
  );

  useEffect(() => {
    if (isDrops && cartProducts.length) {
      if (locations.length && isChangeInQuantity) {
        updatePlatformFee(locations);
      } else {
        getLocations({
          variables: {
            getLocationsInput: {
              shop: store?.shop,
              variantIds: cartProducts.map((cp) => cp.selectedVariant.id),
            },
          },
        });
      }
    }
    setisChangeInQuantity(false);
  }, [cartProducts]);

  const updatePlatformFee = (l: string[]) => {
    const productTotal: IProductTotal[] = [];
    cartProducts?.forEach((cp, index) => {
      const effectivePrice = (cp.compareAtPrice && spotlightProducts.includes(cp.id)
        ? cp.selectedVariant.price ?? cp.price
        : dPrice(+(cp.selectedVariant.price ?? cp.price)));
      productTotal.push({
        total: +effectivePrice * cp.selectedVariant.selectedQuantity,
        product: cp,
        locationID: l[index],
      });
    });
    const result: IProductTotal[][] = groupBy(productTotal, 'locationID');
    let count = 0;
    Object.values(result).forEach((v: IProductTotal[]) => {
      // if (+(v.reduce((acc: any, current: IProductTotal) => acc + current.total, 0)) < 75) {
      count += 1;
      // }
    });
    setplatformProductQuantity(count);
    setPlatformFee(platformProductPrice * count);
  };

  useEffect(() => {
    if (data?.getLocations?.locations?.length) {
      const uniqueLocations = data?.getLocations?.locations
        .filter((value, index, array) => array.indexOf(value) === index);
      if (uniqueLocations.length) {
        setlocations(data?.getLocations?.locations);
        updatePlatformFee(data?.getLocations?.locations);
      }
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (PlatformFeeById?.variants[0]?.price) {
      setplatformProductPrice(+PlatformFeeById?.variants[0]?.price);
    }
  }, [PlatformFeeById]);

  useEffect(() => {
    if (show) {
      googleEventCode('cart-modal');

      checkoutCartView(cartProducts.map((prd) => ({
        productId: prd.id.split('/')[4],
        productName: prd.title,
        promotionTag: `milestone ${gsctx?.milestones.length} - ${gsctx?.discountCode?.percentage}`,
        currency: prd.currencyCode,
        productBrand: gsctx.store?.brandName,
        originalPrice: prd.compareAtPrice
          ? +prd?.selectedVariant?.compareAtPrice! ?? +prd.compareAtPrice
          : +prd.selectedVariant.price,
        finalPrice: prd.compareAtPrice && spotlightProducts.includes(prd.id)
          ? (+prd?.selectedVariant?.compareAtPrice! ?? +prd.price).toFixed(2)
          : dPrice(+(prd.selectedVariant.price)).toFixed(2),
        quantity: prd.selectedVariant.selectedQuantity,
      })), getTotal() ?? 0);
    }
  }, [show]);

  useEffect(() => {
    const cartDetails: any = [];
    cartProducts.forEach((item, index) => {
      const productId = item.id.replace('gid://shopify/Product/', '');
      setCurrencyName(item?.currencyCode);
      cartDetails.push({
        id: productId,
        title: item.title,
        price: item.compareAtPrice && spotlightProducts.includes(item.id)
          ? (+item.selectedVariant?.price! ?? +item.price).toFixed(2)
          : dPrice(+(item.selectedVariant.price)).toFixed(2),
        qty: item.selectedVariant.selectedQuantity,
        variants: item.selectedVariant.title,
      });
    });

    if (cartDetails[0] && show) {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      fbq('track', 'AddToCart', {
        contents: cartDetails,
        currency: currencyName,
        content_type: 'product',
        value: getTotal() ?? 0,
      });
    }
  }, [cartProducts, show]);

  const { suggestedProd } = useSuggested();
  // const { setsProduct } = useDetail(suggestedProd);
  const [upToPercent, setupToPercent] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [rewardTitle, setRewardTitle] = React.useState({
    sum: 0,
    rewardTitle: '',
  });
  const [rewardTotal, setRewardTotal] = useState(0);

  const { campaign } = gsctx;

  useEffect(() => {
    const rew = { ...campaign?.salesTarget?.rewards };
    const perc = isInfluencerGS ? gsctx?.partnerRewards?.baseline.toString() : rew[2]?.discount;
    setupToPercent(perc);
  }, [gsctx.campaign]);

  useEffect(() => {
    if (rewardArr && rewardArr.length && isDrops) {
      const total = +rewardArr[rewardArr.length - 1].rewardValue;
      setRewardTotal(total);
      setRewardTitle({
        rewardTitle: rewardArr[0].rewardTitle,
        sum: +rewardArr[0].rewardValue,
      });
    }
  }, [rewardArr]);

  useEffect(() => {
    if (rewardArr && rewardArr.length && isDrops) {
      const totalCart: any = getTotal();
      const obj = rewardArr?.find((ele: any) => +ele.rewardValue > totalCart);
      if (obj) {
        setRewardTitle({ rewardTitle: obj?.rewardTitle, sum: (+obj?.rewardValue - totalCart) });
      }
    }
  }, [getTotal()]);

  const { push } = useRouter();
  // const { emptyCart } = useSaveCart();
  const handleCheckout = () => {
    // emptyCart();
    setLoading(true);

    const cartDetails: any = [];
    cartProducts.forEach((item, index) => {
      const productId = item.id.replace('gid://shopify/Product/', '');
      setCurrencyName(item?.currencyCode);
      cartDetails.push({
        id: productId,
        title: item.title,
        price: item.compareAtPrice
          ? (+item.selectedVariant?.price ?? +item.price).toFixed(2)
          : dPrice(+(item.selectedVariant.price)).toFixed(2),
        qty: item.selectedVariant.selectedQuantity,
        variants: item.selectedVariant.title,
      });
    });

    // @ts-ignore
    // eslint-disable-next-line no-undef
    fbq('track', 'InitiateCheckout', {
      contents: cartDetails,
      currency: currencyName,
      eventref: gsctx?.id,
      value: getTotal() ?? 0,
    });

    checkoutButtonClick(cartProducts.map((prd) => ({
      productId: prd.id.split('/')[4],
      productName: prd.title,
      promotionTag: `milestone ${gsctx?.milestones.length} - ${gsctx?.discountCode?.percentage}`,
      currency: prd.currencyCode,
      productBrand: gsctx.store?.brandName,
      originalPrice: prd.compareAtPrice
        ? +prd.selectedVariant?.compareAtPrice! ?? +prd.compareAtPrice
        : +prd.selectedVariant.price,
      finalPrice: prd.compareAtPrice && spotlightProducts.includes(prd.id)
        ? (+prd.selectedVariant.price ?? +prd.price).toFixed(2)
        : dPrice(+(prd.selectedVariant.price)).toFixed(2),
      quantity: prd.selectedVariant.selectedQuantity,
    })), getTotal() ?? 0);
    push(getShopifyUrl(platformFee ? PlatformFeeById : '', platformFee ? platformProductQuantity : ''));
  };

  const dynamicLine = () => {
    if (isDrops && getTotal()! < 10 && members.length < 2) {
      const milestone1 = store?.drops?.rewards?.baseline;
      const milestone2 = store?.drops?.rewards?.average;
      const milestone3 = store?.drops?.rewards?.maximum;
      return (
        <Row className="mx-2 text-start d-flex">
          <div className="d-block">
            🤑 Spend
            {' '}
            <strong>
              {currencySymbol}
              {(10 - getTotal()!).toFixed(2).toString().replace('.00', '')}
            </strong>
            {' '}
            more to qualify for up to
            {' '}
            <strong>
              {members.length ? (+milestone3! - +milestone2!) : (+milestone3! - +milestone1!)}
              % cashback
              {' '}
            </strong>
            after check-out.
          </div>
        </Row>
      );
    }
    return (
      <>
        <Icon className="col-1" />
        <div className="col-11">
          You’re saving
          {' '}
          <strong>
            {currencySymbol}
            {/* {dPrice(getTotalActualCartTotal())} */}
            {(getCartSaveMoney(+discount)).toFixed(2).toString().replace('.00', '')}
          </strong>
          {' '}
          by shopping with
          {' '}
          <strong>Groupshop</strong>
          {/* {' '}
And you can keep earning up to
{' '}
{ upToPercent }
{' '}
{isInfluencerGS ? 'discount!' : 'cashback!'} */}
        </div>
      </>

    );
  };

  const rewardbarHeadline = () => (
    <>
      {getTotal()! < rewardTotal ? <MoneyFly className=" mx-1 " /> : ''}
      {
                    getTotal()! >= rewardTotal ? "You've "
                      : `Spend $${formatNumber(rewardTitle?.sum)}
                more to `
                  }
      <strong>
        {`${getTotal()! >= rewardTotal ? 'unlocked all rewards' : `unlock ${rewardTitle?.rewardTitle}.`} `}
      </strong>
      {`${getTotal()! >= rewardTotal ? 'on your order!' : ''}`}
    </>
  );
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end" {...props} className={['border-start-0', styles.groupshop_modal_cart].join(' ')}>
        <Offcanvas.Header className={isDrops ? dStyles.drops_modal_cart_header : ''} closeButton>
          <Offcanvas.Title>{' '}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.groupshop_modal_cart_body}>
          <div className={
            isCartEmpty ? styles.groupshop_modal_cart_body__nonescrollable
              : styles.groupshop_modal_cart_body__scrollable
          }
          >
            <div className={['m-0', styles.groupshop_modal_cart_heading].join(' ')}>Cart</div>
            {isDrops && store?.drops?.cartRewards?.length ? (
              <Row className="d-flex justify-content-center">
                <Col sm={10} className={[' text-center', dStyles.drops_cart_spend].join(' ')}>
                  {rewardbarHeadline()}
                </Col>
                <Col className="mt-3" sm={12}>
                  <GradientProgressBar
                    progress={cartValueProgress(getTotal()).percantage}
                    cartValue={getTotal() ?? 0}
                    className={dStyles.drops_cart_progressBar}
                  />
                </Col>
              </Row>
            ) : <></>}
            {/* <div className="align-items-center">
                // eslint-disable-next-line max-len
                <Members names={gsctx?.members.map((mem: any) => `
                ${mem.orderDetail.customer.firstName}
                ${mem.orderDetail?.customer?.lastName?.charAt(0) || ''}`)}
                cashback={[`${currencySymbol}23`, `${currencySymbol}20`]} />
              </div> */}
            {/* <div className={styles.groupshop_modal_cart_progress} /> */}
            {/* <div className="mt-3">
                <GradientProgressBar progress={60} />
              </div> */}
            <hr />
            {cartProducts.length < 1 ? (
              <>
                <Row className={['pt-4 my-5 .d-flex, .justify-content-center', styles.groupshop_emptyCardHeading].join(' ')}>
                  <div className="mb-1"> Your cart is empty!</div>
                  Don’t miss out on these limited
                  <br />
                  time offers.
                </Row>
                <div className=" gap-2 text-center my-4 ">
                  <Button variant="primary" size="lg" className={styles.groupshop_cart_goBackShoppingBtn} onClick={() => handleClose()}>
                    Get back to shopping
                  </Button>

                </div>
                <br />
                <hr />

              </>
            ) : cartProducts.map((prd) => (
              <Row id="scrollToTop" className={styles.groupshop_cartImgPointer}>
                <Col xs={4}>
                  <Image
                    src={prd.selectedVariant?.image?.src ?? prd.featuredImage}
                    alt={prd.title}
                    className={styles.groupshop_modal_cart_thumbnail}
                    onKeyPress={() => {
                      setShow(false);
                      handleDetail(prd);
                    }}
                    onClick={() => {
                      setShow(false);
                      handleDetail(prd);
                    }}
                  />
                </Col>
                <Col className="px-1 d-block align-items-baseline" xs={8}>

                  <div className="d-flex justify-content-between pb-0 mb-0">
                    <div
                      className={styles.groupshop_cartProductHeading}
                      // role={button}
                      onKeyPress={() => {
                        setShow(false);
                        handleDetail(prd);
                      }}
                      onClick={() => {
                        setShow(false);
                        handleDetail(prd);
                      }}
                    >
                      {prd.title}
                    </div>
                    <div>
                      <h5 className={styles.groupshop_cartProductPrice}>
                        <span className="text-decoration-line-through fw-light">
                          {currencySymbol}
                          {prd.compareAtPrice || prd.selectedVariant.compareAtPrice ? formatNumber(prd.selectedVariant.compareAtPrice ?? prd.compareAtPrice ?? '') : ((+(prd.selectedVariant.price ?? prd.price))).toFixed(2).toString().replace('.00', '')}
                        </span>
                        {' '}
                        <span>
                          {currencySymbol}
                          {(prd.compareAtPrice && spotlightProducts.includes(prd.id))
                        || prd.vendor === DROPS_PRODUCT_VENDOR_SPOTLIGHT
                        || prd.vendor === DROPS_PRODUCT_VENDOR_VAULT
                            ? formatNumber(prd.selectedVariant.price ?? prd.price)
                            : (dPrice(+(prd.selectedVariant.price ?? prd.price))).toFixed(2).toString().replace('.00', '')}
                        </span>
                      </h5>
                      { [DROPS_PRODUCT_VENDOR_VAULT, DROPS_PRODUCT_VENDOR_SPOTLIGHT]
                        .includes(prd?.vendor!) ? (
                          <span
                            className={['rounded-pill border-0', styles.groupshop_right_content_chip,
                              prd?.vendor === DROPS_PRODUCT_VENDOR_VAULT ? styles.groupshop_right_content_chip_vaultbtn : '',
                              prd?.vendor === DROPS_PRODUCT_VENDOR_SPOTLIGHT ? styles.groupshop_right_content_chip_spotlighttbtn : '',
                            ].filter((classes) => classes).join(' ')}
                          >
                            {prd?.vendor === DROPS_PRODUCT_VENDOR_SPOTLIGHT
                              ? (
                                <PopoverButton
                                  variant=""
                                  placement="bottom"
                                  className="btn btn-link p-0 mb-2"
                                  label="Spotlight"
                                  popContent="Not eligible for higher discounts or cashback"
                                  icon={<InfoIcon className="ms-2" />}
                                />
                              )
                              : ''}
                            {prd?.vendor === DROPS_PRODUCT_VENDOR_VAULT ? (
                              <PopoverButton
                                variant=""
                                placement="bottom"
                                className="btn btn-link p-0 mb-2"
                                label="Vault"
                                popContent="Not eligible for higher discounts or cashback"
                                icon={<InfoIcon className="ms-2" />}
                              />
                            ) : ''}
                          </span>
                        ) : <></>}
                    </div>
                  </div>
                  <div className="text-start mx-4">
                    <div className={['pt-0', styles.groupshop_cartProductText].join(' ')}>
                      {prd.selectedVariant?.selectedOptions?.map((op: any) => op.value).join(', ').replace('Default Title', '')}
                    </div>

                    <div className={['pt-2 pb-2', styles.groupshop_cartProductText].join(' ')}>Quantity</div>
                    <ButtonGroup
                      aria-label="product quantity"
                      className={styles.groupshop_modal_cart_quantity}
                    >
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          minusQuantity(prd.selectedVariant.id);
                          setisChangeInQuantity(true);
                        }}
                        disabled={prd.selectedVariant.selectedQuantity < 2}
                      >
                        -
                      </Button>
                      <FormControl
                        type="text"
                        value={prd.selectedVariant.selectedQuantity}
                      />

                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          setisChangeInQuantity(true);
                          plusQuantity(prd.selectedVariant.id);
                        }}
                        disabled={(isDrops && prd.selectedVariant?.selectedQuantity >= 3)
                        || (prd.selectedVariant?.selectedQuantity
                          >= prd.selectedVariant?.inventoryQuantity!
                        )}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </div>
                  <div className={isDrops ? 'd-flex justify-content-end' : 'text-start mx-4'}>
                    <Button variant="link" className={['ps-0 d-block ', styles.groupshop_cartProductText].join(' ')} onClick={() => removeProduct(prd.selectedVariant.id)}>Remove</Button>
                  </div>
                </Col>
              </Row>

            ))}
            <Container>
              {suggestedProd && (
                <>
                  <div className={['pt-3 text-start', styles.groupshop_cart_spend].join(' ')}>
                    In case you missed the best-sellers...
                  </div>
                  <Row className="p-3 pt-2">
                    {/* <ProductGrid products={suggestedProd} /> */}
                    {suggestedProd.map((item) => (
                      <Col xs={6} className=" py-1 mb-1 px-1 border-2">
                        <ProductCard
                          isDrops={isDrops}
                          onClick={() => {
                            handleDetail(item);
                          }}
                          type="small"
                          isrc={item.featuredImage}
                          imgOverlay={(
                            <Badge
                              bg="light"
                              text="dark"
                              className={['shadow-sm', styles.groupshop__pcard_tag_addedbytop].join(' ')}
                            >
                              {currencySymbol}
                              {
                                  item.compareAtPrice && (spotlightProducts.includes(item.id)
                                  || [DROPS_PRODUCT_VENDOR_VAULT, DROPS_PRODUCT_VENDOR_SPOTLIGHT]
                                    .includes(item.vendor!))
                                    ? (formattedCB(+(item.compareAtPrice)
                                    - +(item?.price)))
                                    : (+(item.compareAtPrice ?? item.price)
                                    - +(dPrice(+(item?.price || 0)))).toFixed(2)
                                  }
                              {' '}
                              OFF
                            </Badge>
                          )}
                        >
                          <div className={styles.groupshop__pcard_cardBody_PDetail}>
                            <div className={isDrops
                              ? dStyles.drops__pcard_cardBody_pName
                              : styles.groupshop__pcard_cardBody_pName}
                            >
                              {item.title}
                            </div>
                            {!isDrops && item.purchaseCount && (
                              <div className={styles.groupshop__pcard_cardBody_PDesc}>
                                {item.purchaseCount}
                                {' '}
                                people
                                {' '}
                                shopped
                              </div>
                            )}
                            <Row className="mt-1 d-flex align-items-center">
                              {!isDrops && (
                                <Button
                                  variant="primary"
                                  className={styles.groupshop__pcard_cardBody_addBtn}
                                  onClick={() => {
                                    handleDetail(item);
                                    checkoutUpsellClick([{
                                      productId: item.id.split('/')[4],
                                      productName: item.title,
                                      promotionTag: `milestone ${gsctx?.milestones.length} - ${gsctx?.discountCode?.percentage}`,
                                      currency: item.currencyCode,
                                      productBrand: gsctx.store?.brandName,
                                      originalPrice: +item.compareAtPrice! ?? +item.price,
                                      finalPrice: dPrice(+(item.price)).toFixed(2),
                                      quantity: 1,
                                    }], getTotal() ?? 0);
                                  }}
                                >
                                  Add
                                </Button>
                              )}
                              <div className={['fw-normal text-nowrap', isDrops ? 'text-start' : ''].join(' ')}>
                                <span className="text-decoration-line-through">
                                  {currencySymbol}
                                  {formatNumber(item?.compareAtPrice
                                    ? item.compareAtPrice : item?.price)}
                                </span>
                                {' '}
                                <span className="fw-bold ms-1">
                                  {currencySymbol}
                                  {
                                    (item.vendor !== DROPS_PRODUCT_VENDOR_VAULT)
                                    && (item.vendor !== DROPS_PRODUCT_VENDOR_SPOTLIGHT)
                                      ? formatNumber(dPrice(+(item?.price || 0)))
                                      : formatNumber(item.price)
                                  }
                                </span>
                              </div>
                              {isDrops && (
                                <div className="mt-2">
                                  <Button variant="primary" className={dStyles.drops__pcard_cardBody_addToCartBtn}>
                                    Add to Cart
                                  </Button>
                                </div>
                              )}
                            </Row>
                          </div>
                        </ProductCard>
                      </Col>
                    ))}
                  </Row>

                </>
              )}
            </Container>
          </div>
          {!isCartEmpty && (
            <div className={styles.groupshop__total_cartWrapper}>

              <Container fluid className="py-3 my-2 ">
                {platformFee !== 0 && (
                <Row className="mx-3">
                  <Col className="text-start mx-0 px-0">
                    <PopoverButton
                      variant=""
                      placement="top"
                      className="btn btn-link p-0 mb-2"
                      label="Platform Fee*"
                      popContent="This fee helps us operate and improve our platform, delivering a seamless app experience"
                    />
                  </Col>

                  <Col className="text-end mx-0 px-0">

                    <h5 className="mb-2">
                      {currencySymbol}
                      {platformFee}
                    </h5>

                  </Col>
                </Row>
                )}
                <Row className="mx-3">
                  <Col className="text-start mx-0 px-0"><h3>SUBTOTAL</h3></Col>

                  <Col className="text-end mx-0 px-0">

                    <h3 className={styles.groupshop__total_cartWrapper_price}>
                      {isDrops ? (
                        <span className="text-decoration-line-through fw-light me-2">
                          {currencySymbol}
                          {getTotalActualCartTotal() && getTotalActualCartTotal()?.toFixed(2).toString().replace('.00', '')}
                        </span>
                      ) : <></>}
                      {currencySymbol}
                      {getTotal() && getTotal()?.toFixed(2).toString().replace('.00', '')}
                    </h3>

                  </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                  {loading
                    ? (
                      <div
                        className={['text-center', styles.groupshop_cart_totalSave].join(' ')}
                      >
                        🔒
                        {' '}
                        <strong>Secure checkout</strong>
                        {' '}
                        powered by
                        {' '}
                        <strong>{brandName}</strong>
                      </div>
                    )
                    : (
                      <Col sm={10} className={['d-flex ', styles.groupshop_cart_totalSave].join(' ')}>
                        {dynamicLine()}
                      </Col>
                    )}
                </Row>
                <Row>
                  <Col className=" mt-2">
                    {loading ? (
                      <>
                        <Button
                          variant="primary"
                          onClick={handleCheckout}
                          size="lg"
                          className={[styles.groupshop_cart_checkout, ''].join(' ')}
                          disabled
                        >
                          We’re preparing your checkout...
                        </Button>
                        <Spinner animation="border" className="align-middle" />

                      </>

                    ) : (
                      <Button
                        variant="primary"
                        onClick={handleCheckout}
                        size="lg"
                        className={styles.groupshop_cart_checkout}
                        disabled={getLocationsLoading}
                      >
                        {getLocationsLoading ? 'Counting platform fee' : 'Checkout'}
                      </Button>

                    )}

                  </Col>
                </Row>
                {!loading && (
                  <Row>
                    <div
                      className={['text-center', styles.groupshop_cart_totalSave].join(' ')}
                    >
                      🔒
                      {' '}
                      <strong>Secure checkout</strong>
                      {' '}
                      powered by
                      {' '}
                      <strong>
                        {brandName}
                      </strong>
                    </div>
                  </Row>
                )}
                {/* <Row>
                <div
                  className={['text-center', styles.groupshop_cart_totalSave].join(' ')}
                >
                  Shipping and taxes calculated at checkout.
                </div>
              </Row> */}
                <Row className="d-flex justify-content-center">
                  {!isDrops ? (
                    <div
                      className={['', styles.groupshop_cart_byChecking].join(' ')}
                    >
                      You agree to receive email updates about your order and rewards.
                      We don’t sell or share your information. You can unsubscribe at any time.
                      <br />
                      <br />
                      If you purchased any of these items at full price on
                      {' '}
                      {brandName}
                      ,
                      you cannot return your original order to keep these discounted ones.
                    </div>
                  )
                    : (
                      <div
                        className={['', styles.groupshop_cart_byChecking].join(' ')}
                      >
                        You agree to receive email updates about your order and rewards.
                        We don’t sell or share your information. You can unsubscribe at any time.
                        <br />
                      </div>
                    )}
                </Row>
              </Container>
            </div>

          )}
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
};

Cart.defaultProps = {
  isDrops: false,
};

export default Cart;
