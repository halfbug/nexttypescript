/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect, useState } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  ButtonGroup,
  Col, Container, FormControl, Offcanvas, Row, Badge,
} from 'react-bootstrap';
import { GroupshopContext } from 'store/groupshop.context';
import useCart from 'hooks/useCart';
import useDeal from 'hooks/useDeal';
import { useRouter } from 'next/router';
import useSuggested from 'hooks/useSuggested';
import useDetail from 'hooks/useDetail';
import Icon from 'assets/images/small-cone.svg';
import IconMoney from 'assets/images/money-fly.svg';
import useGtm from 'hooks/useGtm';
import Members from '../Members/Members';
import ProductCard from '../ProductCard/ProductCard';

interface CartProps extends RootProps {
  show : boolean;
  handleClose(): any;
  handleDetail(item:any):void;
  product : IProduct | undefined
}

const Cart = ({
  show, pending = false, handleDetail, handleClose, product, ...props
}: CartProps) => {
  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);

  const {
    currencySymbol, dPrice, discount,
  } = useDeal();
  const { googleEventCode } = useGtm();
  useEffect(() => {
    if (show) { googleEventCode('cart-modal'); }
  }, [show]);
  const {
    cartProducts, removeProduct, plusQuantity, minusQuantity, getTotal,
    isCartEmpty, getShopifyUrl, getSuggestedProducts, addCartProduct,
  } = useCart();
  const { suggestedProd } = useSuggested();
  const { setsProduct } = useDetail(suggestedProd);

  const { push } = useRouter();

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end" {...props} className={styles.groupshop_modal_cart}>
        <Offcanvas.Header closeButton className={styles.groupshop_modal_cart_close}>
          <Offcanvas.Title>{' '}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.groupshop_modal_cart_body}>
          <div className={
            isCartEmpty ? styles.groupshop_modal_cart_body__nonescrollable
              : styles.groupshop_modal_cart_body__scrollable
}
          >
            <div className="p-2">
              <h3 className={styles.groupshop_modal_cart_heading}>Cart</h3>
              <Row className="d-flex justify-content-center">
                <Col sm={10} className={[' text-center', styles.groupshop_cart_spend].join(' ')}>
                  <IconMoney className=" mx-1 " />
                  Spend $40 to
                  {' '}
                  <strong>
                    unlock
                    {' '}
                    {discount}
                    %
                    {' '}
                    off this order
                  </strong>
                  {' '}
                  and $20 cashback for
                </Col>
              </Row>
              <div className="align-items-center">
                <Members names={gsctx?.members.map((mem: any) => `${mem.orderDetail.customer.firstName} ${mem.orderDetail?.customer?.lastName?.charAt(0) || ''}`)} cashback={['$23', '$20']} />
              </div>
              {/* <div className={styles.groupshop_modal_cart_progress} /> */}
            </div>
            <hr />
            {cartProducts.length < 1 ? (
              <>
                <Row className={['pt-4 my-5 .d-flex, .justify-content-center', styles.groupshop_emptyCardHeading].join(' ')}>
                  <div className="mb-2"> Your cart is empty!</div>
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
              <Row className="px-0 m-1 py-2 border-bottom">
                <Col xs={4}>
                  <img
                    src={prd.selectedVariant?.image?.src ?? prd.featuredImage}
                    alt={prd.title}
                    className={styles.groupshop_modal_cart_thumbnail}
                  />
                </Col>
                <Col className="px-1 d-block align-items-baseline" xs={8}>

                  <div className="d-flex justify-content-between pb-0 mb-0">
                    <div className={styles.groupshop_cartProductHeading}>
                      {prd.title}
                    </div>
                    <h5>
                      <span className="text-decoration-line-through fw-light">
                        {currencySymbol}
                        {parseFloat((+(prd.selectedVariant.price ?? prd.price)).toFixed(2))}
                      </span>
                      {' '}
                      <span>
                        {currencySymbol}
                        {parseFloat(dPrice(+(prd.selectedVariant.price ?? prd.price)).toFixed(2))}
                      </span>
                    </h5>
                  </div>
                  <div className="text-start mx-4">
                    <div className={['pt-0', styles.groupshop_cartProductText].join(' ')}>
                      {prd.selectedVariant?.selectedOptions?.map((op:any) => op.value).join(', ').replace('Default Title', '')}
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
                        onClick={() => plusQuantity(prd.selectedVariant.id)}
                        disabled={
                        prd.selectedVariant?.selectedQuantity
                        >= prd.selectedVariant?.inventoryQuantity!
}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                    <Button variant="link" className={['ps-0 d-block ', styles.groupshop_cartProductText].join(' ')} onClick={() => removeProduct(prd.selectedVariant.id)}>Remove</Button>
                  </div>
                </Col>
              </Row>

            )) }
            <Container>
              {suggestedProd && (
              <>
                <div className={['text-start', styles.groupshop_cart_spend].join(' ')}>
                  In case you missed the best-sellers...
                </div>
                <Row className="p-4 pt-2">
                  {/* <ProductGrid products={suggestedProd} /> */}
                  {suggestedProd.map((item) => (
                    <Col xs={6} className=" py-1 px-0 mb-1 border-2 d-flex justify-content-center">
                      <ProductCard
                        type="small"
                        isrc={item.featuredImage}
                        imgOverlay={(
                          <Badge
                            bg="light"
                            text="dark"
                            className={['shadow-sm', styles.groupshop__pcard_tag_addedbytop].join(' ')}
                          >
                            {currencySymbol}
                            {Math.round(+(item.price) - +(dPrice(+(item?.price || 0)).toFixed(1)))}
                            {' '}
                            OFF
                          </Badge>
                          )}
                      >
                        <div className={styles.groupshop__pcard_cardBody_PDetail}>
                          <div className={styles.groupshop__pcard_cardBody_pName}>{item.title}</div>
                          <div className={styles.groupshop__pcard_cardBody_PDesc}>
                            5 friends shopped
                          </div>
                          <Row className="mt-1 d-flex align-items-center">
                            <Button
                              variant="primary"
                              className={styles.groupshop__pcard_cardBody_addBtn}
                              onClick={() => handleDetail(item)}
                            >
                              Add
                            </Button>
                            <div className=" col-7 fw-bold text-nowrap">
                              <span className="text-decoration-line-through  ">
                                {currencySymbol}
                                {item?.price}
                              </span>
                              {' '}
                              <span>
                                {currencySymbol}
                                {dPrice(+(item?.price || 0)).toFixed(1)}
                              </span>
                            </div>
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
          <Container fluid className="py-3 my-2 ">
            <Row className="mx-3">
              <Col className="text-start mx-2"><h3>TOTAL</h3></Col>
              <Col className="text-end mx-2">
                <h3>
                  {currencySymbol}
                  {getTotal()}
                </h3>

              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col sm={10} className={['d-flex ', styles.groupshop_cart_totalSave].join(' ')}>
                <Icon className="col-1" />
                <div className="col-11">
                  You’ve saved
                  {' '}
                  <strong>$30</strong>
                  {' '}
                  by shopping with
                  {' '}
                  <strong>GROUPSHOP</strong>
                  {' '}
                  And you can keep earning up to 40% cashback!
                </div>
              </Col>
            </Row>
            <Row>
              <Col className=" mt-2">
                <Button
                  variant="primary"
                  onClick={() => push(getShopifyUrl())}
                  size="lg"
                  className={styles.groupshop_cart_checkout}
                >
                  Checkout
                </Button>

              </Col>
            </Row>
            <Row>
              <div
                className={['text-center', styles.groupshop_cart_totalSave].join(' ')}
              >
                Shipping and taxes calculated at checkout.
              </div>
            </Row>
            <Row className="d-flex justify-content-center">
              <div
                className={['', styles.groupshop_cart_byChecking].join(' ')}
              >
                By checking out with Groupshop you agree to receive email updates
                about your order and rewards. We don’t sell or share your information.
                You can unsuscribe at any time.
              </div>
            </Row>
          </Container>
          )}
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
};

// Cart.defaultProps = {
//   user: {},
// };

export default Cart;
