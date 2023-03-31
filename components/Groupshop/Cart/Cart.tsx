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
import useGtm from 'hooks/useGtm';
import useUtilityFunction from 'hooks/useUtilityFunction';
import Image from 'react-bootstrap/Image';
// import useSaveCart from 'hooks/useSaveCart';
import useAppContext from 'hooks/useAppContext';
import useDrops from 'hooks/useDrops';
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
    currencySymbol, dPrice, disPrice, discount, getOwnerName, isInfluencerGS, brandName,
  } = useDeal();
  const {
    spotlightProducts,
    cartValueProgress,
    VSPrice,
  } = useDrops();

  const [currencyName, setCurrencyName] = useState<any>('USD');

  const {
    cartProducts, removeProduct, plusQuantity, minusQuantity, getTotal,
    isCartEmpty, getShopifyUrl, getSuggestedProducts, addCartProduct,
    getCartSaveMoney, getTotalActualCartTotal,
  } = useCart();

  const {
    googleEventCode, checkoutCartView, checkoutButtonClick, checkoutUpsellClick,
  } = useGtm();
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
        finalPrice: prd.compareAtPrice
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
        price: item.compareAtPrice
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
  const { campaign } = gsctx;
  useEffect(() => {
    const rew = { ...campaign?.salesTarget?.rewards };
    const perc = isInfluencerGS ? gsctx?.partnerRewards?.baseline.toString() : rew[2]?.discount;
    setupToPercent(perc);
  }, [gsctx.campaign]);

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
      finalPrice: prd.compareAtPrice
        ? (+prd.selectedVariant.price ?? +prd.price).toFixed(2)
        : dPrice(+(prd.selectedVariant.price)).toFixed(2),
      quantity: prd.selectedVariant.selectedQuantity,
    })), getTotal() ?? 0);
    push(getShopifyUrl());
  };
  const { formatNumber } = useUtilityFunction();
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
          <strong>{getOwnerName()}</strong>
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
            {isDrops && (
              <Row className="d-flex justify-content-center">
                <Col sm={10} className={[' text-center', dStyles.drops_cart_spend].join(' ')}>
                  {getTotal()! < 50 ? <MoneyFly className=" mx-1 " /> : ''}
                  {
                    getTotal()! >= 50 ? "You've "
                      : `Spend $${cartValueProgress(getTotal()).remainedValue}
                more to `
                  }
                  <strong>
                    {`${getTotal()! >= 50 ? 'unlocked free shipping' : 'unlock free shipping.'} `}
                  </strong>
                  {`${getTotal()! >= 50 ? 'on your order!' : ''}`}
                </Col>
                <Col className="mt-3" sm={12}>
                  <GradientProgressBar
                    progress={cartValueProgress(getTotal()).percantage}
                    className={dStyles.drops_cart_progressBar}
                  />
                </Col>
              </Row>
            )}
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
                    <h5 className={styles.groupshop_cartProductPrice}>
                      <span className="text-decoration-line-through fw-light">
                        {currencySymbol}
                        {prd.compareAtPrice ? VSPrice(prd.selectedVariant.compareAtPrice ?? prd.compareAtPrice) : ((+(prd.selectedVariant.price ?? prd.price))).toFixed(2).toString().replace('.00', '')}
                      </span>
                      {' '}
                      <span>
                        {currencySymbol}
                        {prd.compareAtPrice
                          ? VSPrice(prd.selectedVariant.price ?? prd.price)
                          : (dPrice(+(prd.selectedVariant.price ?? prd.price))).toFixed(2).toString().replace('.00', '')}
                      </span>
                    </h5>
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
                        onClick={() => minusQuantity(prd.selectedVariant.id)}
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
                                Number.isInteger((+(item.price) - +(dPrice(+(item?.price || 0)))))
                                  ? +(item.price) - +(dPrice(+(item?.price || 0)))
                                  : (+(item.price) - +(dPrice(+(item?.price || 0)))).toFixed(2)
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
                                      originalPrice: +item.price,
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
                                  {formatNumber(item?.price)}
                                </span>
                                {' '}
                                <span className="fw-bold ms-1">
                                  {currencySymbol}
                                  {formatNumber(dPrice(+(item?.price || 0)))}
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
                      >
                        Checkout
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
