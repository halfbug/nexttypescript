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
import { Images, Send } from 'react-bootstrap-icons';
import useCart from 'hooks/useCart';
import ShowMoreText from 'react-show-more-text';
import useDeal from 'hooks/useDeal';
import useAlert from 'hooks/useAlert';
import Scrollable from 'components/Widgets/Scrollable/Scrollable';
import SocialButton from 'components/Buttons/SocialButton/SocialButton';
import GradiantButton from 'components/Buttons/Button/Button';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import Members from '../Members/Members';

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
  const [addedbyname, setaddedbyname] = useState<string | undefined>('');
  const [cashBack, setCashBack] = useState<number>(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  const {
    currencySymbol, dPrice, getBuyers, isExpired, discount, addedByName,
    totalCashBack, productShareUrl, displayAddedByFunc,
  } = useDeal();

  const [getProduct, { loading, error, data }] = useLazyQuery(GET_PRODUCT_DETAIL, {

    variables: { id: product?.id },
  });

  const productCustomers = getBuyers(product?.id || '0');

  useEffect(() => {
    if (show) { getProduct(); setIndex(0); }
  }, [show]);

  // add to cart
  useEffect(() => {
    if (product) {
      setaddedbyname(addedByName(product?.id));
      setCashBack(totalCashBack(product));
      console.log(totalCashBack(product));
      console.log('///////////////');

      // let obj = {};
      setselOptions(product?.options?.reduce((obj, { name, values }) => (
        { ...obj, [name]: values[0] }), {}));
    }
  }, [product]);

  const [selOptions, setselOptions] = useState<any| undefined>();

  const getVariant = () => {
    const { productById: dproduct } = data;
    const optionNames = Object.keys(selOptions);
    return dproduct.variants.filter(
      (vr: { selectedOptions: any[]; }) => optionNames.reduce(
        // if all selected options match
        (isMatch: any, oname: string | number) => isMatch && Boolean(vr.selectedOptions.find(
          (ele) => ele.name === oname && ele.value === selOptions[oname],
        )), true,
      ),
    )?.[0];
  };

  // handle variant change disable add to cart for out of stock variant
  const [outofStock, setoutofStock] = useState<boolean>(false);
  useEffect(() => {
    if (data) {
      const selectedVariant = getVariant();
      if (selectedVariant?.inventoryQuantity < 1) {
        setoutofStock(true);
      } else setoutofStock(false);
    }
  }, [selOptions]);

  const addToCart = () => {
    const { productById: dproduct } = data;

    const selectedVariant = getVariant();

    if (selectedVariant?.inventoryQuantity > 0) {
      addCartProduct({
        ...product, ...dproduct, selectedVariant: { ...selectedVariant, selectedQuantity: 1 },
      });
      showSuccess('product has been added');
    } else {
      showError('product is out of stock');
    }
    closeModal({});
  };

  const displayImage = () => {
    const { productById: { images } } = data;
    const { image } = getVariant() ?? { image: null };
    if (image) {
      const vrImage:number = images.findIndex(
        (item: { src: any; }) => item.src === image?.src,
      );

      if (vrImage > -1) {
        setIndex(vrImage + 1);
      } else {
        setIndex(images.length);
      }
    } else {
      setIndex(images.length);
    }
  };

  useEffect(() => {
    if (data) { displayImage(); }
  }, [selOptions]);

  useEffect(() => { // if user select image it will select its options.
    if (data) {
      const { productById: dproduct } = data;
      // 1. get the select image
      const svImage = dproduct?.images[index - 1]?.src;

      // 2. get its variant
      const svrnt = dproduct.variants.filter(
        (vrt: { image: { src: any; }; }) => vrt?.image?.src === svImage,
      );

      // 3. set selected option state to variant options
      if (svrnt?.length) {
        setselOptions(svrnt?.[0]?.selectedOptions.reduce((obj: any, { name, value }: any) => (
          { ...obj, [name]: value }), {}));
      }
    }
  }, [index]);

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
              <span className={styles.groupshop__pcard_tag_addedbyname}>
                {
                    displayAddedByFunc(product?.id) && addedbyname && (
                    <div className={styles.groupshop_added_by_text}>
                      Added By
                      {' '}
                      { addedbyname }
                    </div>
                    )
}
              </span>
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
                    alt={`Feature-${Math.random()}`}
                  />
                </Carousel.Item>
                {
                 data?.productById?.images?.map((img:any, i:number) => (
                   <Carousel.Item>
                     <img
                       src={img.src}
                       alt={`image_${i}`}
                       // eslint-disable-next-line react/no-array-index-key
                       key={`image_${i}`}
                       className={styles.groupshop_modal_detail_featureImage}
                     />
                   </Carousel.Item>

                 ))
               }
              </Carousel>
              {data?.productById?.images.length > 1
                && (
                <Scrollable width="100%">
                  <div className="d-flex">
                    {data?.productById?.images?.map((img:any, i:number) => (
                      <>

                        <button
                          type="button"
                          onClick={(e) => handleSelect((i + 1), e)}
                          className={i === index
                            ? styles.groupshop_modal_detail_button_selected
                            : styles.groupshop_modal_detail_button}
                          key={img.id}
                        >

                          <img
                            src={img.src}
                            alt={`image_${i}`}
                            className={styles.groupshop_modal_detail_thumbnail}
                          />
                        </button>
                      </>
                    ))}
                  </div>
                </Scrollable>
                )}
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
                {cashBack && (
                <span className={styles.groupshop_added_by_text}>
                  Plus up to
                  {' '}
                  $
                  { cashBack }
                  {' '}
                  cashback
                </span>
                )}

              </h3>
              <div className={styles.groupshop_modal_detail_height}>
                <ShowMoreText
                /* Default options */
                  lines={3}
                  more="Show more"
                  less="Show less"
                  className={isExpired ? 'text-muted' : 'fw-normal'}
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
                    <h4 className={isExpired ? 'text-muted' : 'me-1'}>{name}</h4>
                    <Form.Select
                      aria-label="option"
                      className="w-50"
                      onChange={({ target: { value } }) => {
                        setselOptions({ ...selOptions, [name]: value });
                      }}
                      value={selOptions?.[name]}
                      disabled={isExpired}
                    >
                      {values.map((val: string, idx) => (
                        <>
                          {/* {idx === 0 && (
                          <option key={Math.random()}>
                            --
                            {name}
                            --
                          </option>
                          )} */}
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
                disabled={isExpired || outofStock}
              >
                {outofStock ? 'Out of Stock' : 'Add to Cart'}

              </Button>
              <ShareButton disabled={isExpired} placement="right-start" shareurl={productShareUrl(product?.id ?? '')} label="" className="m-1 mt-4 px-2 rounded-pill" />

            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} />
            <Col xs={12} md={6}>
              { productCustomers.length > 1
              && (
              <>
                <p className="p-1">
                  🎉 Over
                  {' '}
                  {productCustomers.length}
                  {' '}
                  people have earned cashback and discounts on this item!
                </p>
                <Members names={productCustomers.map((mem: any) => `${mem.orderDetail.customer.firstName} ${mem.orderDetail?.customer?.lastName?.charAt(0) || ''}`)} cashback={['$23', '$20']} />
                <ShareButton
                  disabled={isExpired}
                  placement="auto-end"
                  shareurl={productShareUrl(product?.id ?? '')}
                  label=""
                  className="m-1 px-2 rounded-pill"
                />
              </>
              )}

            </Col>
          </Row>
          {isExpired && (
          <Row className="border-top mt-4">
            <Col className="d-flex justify-content-center mt-4">
              <div className={styles.groupshop_modal_detail_expire}>
                <h3 className="fw-bolder">
                  {' '}
                  This Groupshop has expired
                </h3>
                <section>
                  <Row className={[styles.groupshop_footer_counter, 'justify-content-center w-100'].join(' ')}>
                    <Col xs={3}>{' '}</Col>
                    <Col xs={1} className="d-flex justify-content-center">
                      <div className="text-center me-2">
                        <span>
                          {' '}
                          0
                        </span>
                        <p className="mt-1">DAYS</p>
                      </div>
                      <div className="py-3">
                        {' '}
                        :
                      </div>
                    </Col>
                    <Col xs={2} className="d-flex">
                      <div className="text-center mx-2">
                        <span>
                          0
                        </span>
                        <p className="mt-1">HOURS</p>
                      </div>
                      <div className="py-3">
                        {' '}
                        :
                      </div>
                    </Col>
                    <Col xs={1} className="d-flex">
                      <div className="text-center ms-3 ms-lg-2">
                        <span>
                          0
                        </span>
                        <p className="mt-1">MINUTES</p>
                      </div>
                    </Col>
                    <Col xs={4}>{' '}</Col>
                  </Row>
                </section>
                <p>
                  Groupshop is all about rewarding you and your friends with real
                  cashback and discounts every time you shop together!

                </p>
                {/* <p>
                  <strong>Invite 1 friend</strong>
                  {' '}
                  to this Groupshop, and start shopping with
                  them to get
                  {' '}
                  <strong>20% off plus additional cashback</strong>
                  {' '}
                  on this and other products you love.

                </p> */}
                <div className="d-flex flex-column justify-content-center mb-2">
                  <GradiantButton type="button" className="align-self-center mb-2">INVITE NOW</GradiantButton>
                  OR SHARE
                </div>
                <section className="d-flex justify-content-center px-2">
                  <div className="mx-1">
                    {' '}
                    <SocialButton network="Instagram" url={'  '} />
                  </div>

                  <div className="mx-1">
                    {' '}
                    <SocialButton network="Youtube" url={' '} />
                    {' '}
                  </div>

                  <div className="mx-1">
                    {' '}
                    <SocialButton network="Tiktok" url={'  '} />
                    {' '}
                  </div>
                  <div className="mx-1">
                    {' '}
                    <SocialButton network="Twitter" url={'  '} />
                    {' '}
                  </div>
                </section>
              </div>
            </Col>
          </Row>
          )}
        </Modal.Body>

      </Modal>

    </>
  );
};

// ProductDetail.defaultProps = {
//   user: {},
// };

export default ProductDetail;
