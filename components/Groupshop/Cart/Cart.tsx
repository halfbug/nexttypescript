/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect, useState } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  ButtonGroup,
  Col, Container, FormControl, Offcanvas, Row,
} from 'react-bootstrap';
import { GroupshopContext } from 'store/groupshop.context';
import useCart from 'hooks/useCart';
import useDeal from 'hooks/useDeal';
import { useRouter } from 'next/router';
import useSuggested from 'hooks/useSuggested';
import useDetail from 'hooks/useDetail';
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

  const { currencySymbol, dPrice, discount } = useDeal();

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
              <h3>Cart</h3>
              <p className="px-3">
                💸 Spend $40 to
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
                and $20 cashback for everyone!
              </p>
              <Members names={gsctx?.members.map((mem: any) => `${mem.orderDetail.customer.firstName} ${mem.orderDetail?.customer?.lastName?.charAt(0) || ''}`)} cashback={['$23', '$20']} />

              {/* <div className={styles.groupshop_modal_cart_progress} /> */}
            </div>
            <hr />
            {cartProducts.length < 1 ? (
              <>
                <p className="p-2">
                  Your cart is empty!
                </p>
                <p className="p-2">
                  Don’t miss out on these limited time offers.
                </p>

                <div className="d-grid gap-2 m-3">
                  <Button variant="primary" size="lg" onClick={() => handleClose()}>
                    Get back to shopping
                  </Button>

                </div>

                <hr />

              </>
            ) : cartProducts.map((prd) => (
              <Row className="px-0 mx-1 py-2 border-bottom">
                <Col xs={4}>
                  <img
                    src={prd.selectedVariant?.image?.src ?? prd.featuredImage}
                    alt={prd.title}
                    className={styles.groupshop_modal_cart_thumbnail}
                  />
                </Col>
                <Col className="text-start" xs={8}>

                  <div className="d-flex justify-content-between">
                    <h5 className="w-50 mb-0">
                      {prd.title}
                    </h5>
                    <h5>
                      <span className="text-decoration-line-through fw-light">
                        {currencySymbol}
                        {(+(prd.selectedVariant.price ?? prd.price)).toFixed(1)}
                      </span>
                      {' '}
                      <span>
                        {currencySymbol}
                        {dPrice(+(prd.selectedVariant.price ?? prd.price)).toFixed(1)}
                      </span>
                    </h5>
                  </div>
                  <p>
                    {prd.selectedVariant?.selectedOptions?.map((op:any) => op.value).join(', ').replace('Default Title', '')}
                  </p>

                  <p className="pt-2">Quantity</p>
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
                  <Button variant="link" className="ps-0 d-block" onClick={() => removeProduct(prd.selectedVariant.id)}>Remove</Button>
                </Col>
              </Row>

            )) }
            <Container fluid>
              {suggestedProd && (
              <Row>
                {/* <ProductGrid products={suggestedProd} /> */}
                {suggestedProd.map((item) => (
                  <Col xs={6} className="m-0 p-1 border-1 d-flex justify-content-center">
                    <ProductCard
                      type="small"
                      isrc={item.featuredImage}
                      imgOverlay={
                        // eslint-disable-next-line react/jsx-wrap-multilines
                        (
                          <span
                            className={styles.groupshop__pcard_tag_addedbytop}
                          >
                            {currencySymbol}
                            {Math.round(+(item.price) - +(dPrice(+(item?.price || 0)).toFixed(1)))}
                            {' '}
                            OFF
                          </span>
                        )
                      }
                    >
                      <h5 className="text-center fw-bold text-truncate">{item.title}</h5>
                      <h5 className="pt-1 text-center fw-bold">
                        <span className="text-decoration-line-through">
                          {currencySymbol}
                          {item?.price}
                        </span>
                        {' '}
                        <span>
                          {currencySymbol}
                          {dPrice(+(item?.price || 0)).toFixed(1)}
                        </span>
                      </h5>

                      {/* <p className="text-center mb-1 fs-5">
                        {`🔥 ${item.orders?.length} friends shopped`}
                      </p> */}
                      <Button
                        variant="primary"
                        className="rounded-pill w-50"
                        onClick={() => handleDetail(item)}
                      >
                        Add
                      </Button>
                    </ProductCard>
                  </Col>
                ))}
              </Row>
              )}
            </Container>

          </div>
          {!isCartEmpty && (
          <Container fluid className="py-3 my-2">
            <Row>
              <Col className="text-start"><h3>TOTAL</h3></Col>
              <Col className="text-end">
                <h3>
                  {currencySymbol}
                  {getTotal()}
                </h3>

              </Col>
            </Row>
            <Row>
              <p>
                🎉You’ve saved $30 by shopping with GROUPSHOP
                And you can keep earning up to 40% cashback!
              </p>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="primary"
                  onClick={() => push(getShopifyUrl())}
                  size="lg"
                  className="w-75 my-2"
                >
                  Checkout
                </Button>

              </Col>
            </Row>
            <Row><p>Shipping and taxes calculated at checkout.</p></Row>
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
