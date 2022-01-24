/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useContext, useEffect } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  Carousel,
  Col, Form, Modal, Row,
} from 'react-bootstrap';
import { GroupshopContext } from 'store/groupshop.context';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_DETAIL } from 'store/store.graphql';
import { Send } from 'react-bootstrap-icons';

interface ProductDetailProps extends RootProps {
  show : boolean;
  handleClose(e:any): any;
  product : IProduct | undefined
}

const ProductDetail = ({
  show, pending = false, handleClose, product,
}: ProductDetailProps) => {
  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);

  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };

  // control carousel
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  const [getProduct, { loading, error, data }] = useLazyQuery(GET_PRODUCT_DETAIL, {

    variables: { id: product?.id },
  });

  console.log('🚀 ~ file: ProductDetail.tsx ~ line 40 ~ data', data);
  useEffect(() => {
    if (show) { getProduct(); setIndex(0); }
  }, [show]);

  return (
    <>
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
                   <Carousel.Item>
                     <img
                       src={img.src}
                       alt={`image_${i}`}
                       className={styles.groupshop_modal_detail_featureImage}
                     />
                   </Carousel.Item>

                 ))
               }
              </Carousel>
              <div className="d-flex">
                {
                 data?.productById?.images?.map((img:any, i:number) => (
                   <button type="button" onClick={(e) => handleSelect((i + 1), e)} className={i === index ? styles.groupshop_modal_detail_button_selected : styles.groupshop_modal_detail_button}>
                     <img
                       src={img.src}
                       alt={`image_${i}`}
                       className={styles.groupshop_modal_detail_thumbnail}
                     />
                   </button>
                 ))
               }
              </div>
            </Col>
            <Col xs={12} md={6}>
              <h2>
                {product?.title}
              </h2>
              <h3>{product?.price}</h3>
              <p>
                {product?.description}
                -test
              </p>
              {product?.options?.map(({ name, values, id }) => (
                <div key={id} className="mt-2">
                  <h4>{name}</h4>
                  <Form.Select aria-label="option" className="w-50">
                    {values.map((val: string) => (
                      <option
                        value={val}
                        className="text-upercase"
                        key={Math.random()}
                      >
                        {val}

                      </option>
                    ))}
                  </Form.Select>

                </div>
              ))}
              <Button
                variant="primary"
                className="rounded-2 w-75 pt-2 mt-3 me-2"
                onClick={() => { console.log('test'); }}
              >
                Add to Cart

              </Button>
              <Button variant="outline-primary" className="m-1 mt-3 rounded-pill"><Send size={18} /></Button>
              <p>🎉 Over 13 people have earned cashback and discounts on this item!</p>
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
