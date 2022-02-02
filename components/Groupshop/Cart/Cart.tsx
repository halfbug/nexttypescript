/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  ButtonGroup,
  Col, FormControl, Offcanvas, Row,
} from 'react-bootstrap';
import { GroupshopContext } from 'store/groupshop.context';
import useCart from 'hooks/useCart';
import Members from '../Members/Members';

interface CartProps extends RootProps {
  show : boolean;
  handleClose(): any;
  product : IProduct | undefined
}

const Cart = ({
  show, pending = false, handleClose, product, ...props
}: CartProps) => {
  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);

  const {
    cartProducts, removeProduct, plusQuantity, minusQuantity,
  } = useCart();

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end" {...props}>
        <Offcanvas.Header closeButton className={styles.groupshop_modal_cart_close}>
          <Offcanvas.Title>{' '}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.groupshop_modal_cart_body}>
          <div className="p-2">
            <h3>Cart</h3>
            <p>💸 Spend $40 to unlock 30% off this order and $X cashback for </p>
            <Members names={gsctx?.members.map((mem: any) => `${mem.orderDetail.customer.firstName} ${mem.orderDetail?.customer?.LastName?.charAt(0) || ''}`)} cashback={['$23', '$20']} />

            <div className={styles.groupshop_modal_cart_progress} />
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
              <Col>
                <img
                  src={prd.featuredImage}
                  alt={prd.title}
                  className={styles.groupshop_modal_cart_thumbnail}
                />
              </Col>
              <Col className="text-start">
                <h5>
                  {prd.title.substr(0, 15)}
                  ...
                </h5>
                <p>
                  {prd.selectedVariant.selectedOptions.reduce(
                    (vstr : string, opt:any) => `${vstr}, ${opt.value}`, '',
                  ).substr(1)}
                </p>
                <p>Quantity</p>
                <ButtonGroup
                  aria-label="product quantity"
                  className={styles.groupshop_modal_cart_quantity}
                >
                  <Button
                    variant="outline-primary"
                    onClick={() => plusQuantity(prd.id)}
                    disabled={prd.selectedQuantity > prd.selectedVariant.inventoryQuantity}
                  >
                    +
                  </Button>
                  <FormControl
                    type="text"
                    value={prd.selectedQuantity}

                  />
                  <Button
                    variant="outline-primary"
                    onClick={() => minusQuantity(prd.id)}
                    disabled={prd.selectedQuantity < 2}
                  >
                    -
                  </Button>
                </ButtonGroup>
                <Button variant="link" className="ps-0 d-block" onClick={() => removeProduct(prd.id)}>Remove</Button>
              </Col>
            </Row>

          )) }
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
};

// Cart.defaultProps = {
//   user: {},
// };

export default Cart;
