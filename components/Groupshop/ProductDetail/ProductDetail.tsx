import React, { useState, useContext } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Carousel,
  Col, Modal, Row,
} from 'react-bootstrap';
import { GroupshopContext } from 'store/groupshop.context';

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
  console.log('🚀 ~ file: ProductDetail.tsx ~ line 24 ~ gsctx', gsctx);

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
            <Col xs={12} md={5}>
              <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={product?.featuredImage}
                    alt="First slide"
                  />

                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Second slide&bg=282c34"
                    alt="Second slide"
                  />

                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Third slide&bg=20232a"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>

            </Col>
            <Col xs={12} md={7}>
              <h2>
                {product?.title}
              </h2>
              <h3>{product?.price}</h3>
              <p>{product?.description}</p>
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
