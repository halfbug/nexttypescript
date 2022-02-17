/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useContext, useEffect } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  Carousel,
  Col, Form, Modal, Row,
} from 'react-bootstrap';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_DETAIL } from 'store/store.graphql';
import { Send } from 'react-bootstrap-icons';
import useCart from 'hooks/useCart';
import ShowMoreText from 'react-show-more-text';
import useDeal from 'hooks/useDeal';
import useAlert from 'hooks/useAlert';

interface ProductDetailProps extends RootProps {
  show : boolean;
  handleClose(e:any): any;
  // addToCart(e: any): any;
  product : IProduct | undefined
}

const ProductDetail = ({
  show, pending = false, handleClose, product,
}: ProductDetailProps) => {
  const { addCartProduct } = useCart();

  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };

  const { AlertComponent, showError, showSuccess } = useAlert();

  // control carousel
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  const { currencySymbol, dPrice, getBuyers } = useDeal();

  const [getProduct, { loading, error, data }] = useLazyQuery(GET_PRODUCT_DETAIL, {

    variables: { id: product?.id },
  });

  const productCustomers = getBuyers(product?.id || '0');

  console.log('🚀 ~ file: ProductDetail.tsx ~ line 40 ~ data', data);
  useEffect(() => {
    if (show) { getProduct(); setIndex(0); }
  }, [show]);

  // add to cart
  useEffect(() => {
    if (product) {
      // let obj = {};
      setselOptions(product?.options?.reduce((obj, { name, values }) => (
        { ...obj, [name]: values[0] }), {}));
    }
  }, [product]);

  const [selOptions, setselOptions] = useState<any| undefined>();
  console.log('🚀 ~ file: ProductDetail.tsx ~ line 55 ~ selOptions', selOptions);
  const addToCart = () => {
    const { productById: dproduct } = data;
    const optionNames = Object.keys(selOptions);
    console.log(optionNames);
    const selectedVariant = dproduct.variants.filter(
      (vr: { selectedOptions: any[]; }) => optionNames.reduce(
        // if all selected options match
        (isMatch, oname) => isMatch && Boolean(vr.selectedOptions.find(
          (ele) => ele.name === oname && ele.value === selOptions[oname],
        )), true,
      ),
    )?.[0];
    if (selectedVariant.inventoryQuantity > 0) {
      addCartProduct({
        ...product, ...dproduct, selectedVariant, selectedQuantity: 1,
      });
      showSuccess('product has been added');
    } else {
      showError('product is out of stock');
    }
    closeModal({});
  };

  return (
    <>
      <AlertComponent />
      <Modal
        show={show}
        onHide={closeModal}
        centered
        size="lg"
        dialogClassName={styles.groupshop_modal_detail}
        backdrop="static"
        fullscreen="lg-down"
      >
        <Modal.Header closeButton className="pb-0" />
        <Modal.Body className="px-5">
          <Row>
            <Col xs={12} md={6}>
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
                indicators={false}
              >
                <Carousel.Item className={styles.groupshop_modal_detail_featureImage}>
                  <img
                    className="d-block w-100"
                    src={product?.featuredImage}
                    alt={`Feature Image ${Math.random()}`}
                  />
                </Carousel.Item>
                {
                 data?.productById?.images?.map((img:any, i:number) => (
                   <Carousel.Item key={`${img.id}_${Math.random()}`}>
                     <img
                       src={img.src}
                       alt={`image_${i}`}
                       className={styles.groupshop_modal_detail_featureImage}
                     />
                   </Carousel.Item>

                 ))
               }
              </Carousel>

            </Col>
            <Col xs={12} md={6}>
              <h2>
                {product?.title}
              </h2>
              <h3>
                <span className="text-decoration-line-through">
                  {currencySymbol}
                  {product?.price}
                </span>
                {' '}
                <span>
                  {currencySymbol}
                  {dPrice(+(product?.price || 0)).toFixed(1)}
                </span>

              </h3>
              <div className={styles.groupshop_modal_detail_height}>
                <ShowMoreText
                /* Default options */
                  lines={3}
                  more="Show more"
                  less="Show less"
                  className="content-css"
                  anchorClass="my-anchor-css-class"
                  // onClick={this.executeOnClick}
                  expanded={false}
                  width={0}
                  truncatedEndingComponent="... "
                >
                  {product?.description}

                </ShowMoreText>

                {product?.options?.filter(({ name, values }) => name !== 'Title' && values[0] !== 'Default Title')?.map(({ name, values, id }) => (
                  <div key={id} className="mt-2">
                    <h4>{name}</h4>
                    <Form.Select
                      aria-label="option"
                      className="w-50"
                      onChange={({ target: { value } }) => {
                        setselOptions({ ...selOptions, [name]: value });
                      }}
                      value={selOptions?.[name]}
                    >
                      {values.map((val: string, idx) => (
                        <>
                          {idx === 0 && (
                          <option key={Math.random()}>
                            --
                            {name}
                            --
                          </option>
                          )}
                          <option
                            value={val}
                            className="text-upercase"
                            key={Math.random()}
                          >
                            {val}

                          </option>
                        </>
                      ))}
                    </Form.Select>

                  </div>
                ))}
              </div>
              <Button
                variant="primary"
                className="rounded-2 w-75 pt-2 mt-3 me-2"
                onClick={() => addToCart()}
              >
                Add to Cart

              </Button>
              <Button variant="outline-primary" className="m-1 mt-3 rounded-pill"><Send size={18} /></Button>

            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <div className="d-flex">
                { data?.productById?.images.length > 1
                && data?.productById?.images?.map((img:any, i:number) => (
                  <button type="button" onClick={(e) => handleSelect((i + 1), e)} className={i === index ? styles.groupshop_modal_detail_button_selected : styles.groupshop_modal_detail_button}>
                    <img
                      src={img.src}
                      alt={`image_${i}`}
                      className={styles.groupshop_modal_detail_thumbnail}
                    />
                  </button>
                ))}
              </div>
            </Col>
            <Col xs={12} md={6}>
              { productCustomers.length > 1
              && (
              <p className="p-1">
                🎉 Over
                {' '}
                {productCustomers.length}
                {' '}
                people have earned cashback and discounts on this item!
              </p>
              )}
            </Col>
          </Row>
        </Modal.Body>

      </Modal>

    </>
  );
};

// ProductDetail.defaultProps = {
//   user: {},
// };

export default ProductDetail;
