/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  Carousel,
  Col, Form, Modal, Row, Spinner,
} from 'react-bootstrap';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_DETAIL } from 'store/store.graphql';
import useCart from 'hooks/useCart';
import ShowMoreText from 'react-show-more-text';
import useDeal from 'hooks/useDeal';
import useAlert from 'hooks/useAlert';
import Scrollable from 'components/Widgets/Scrollable/Scrollable';
import SocialButton from 'components/Buttons/SocialButton/SocialButton';
import GradiantButton from 'components/Buttons/Button/Button';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import LeftArrowIcon from 'assets/images/left-arrow.svg';
import Icon from 'assets/images/cart-cone.svg';
import useGtm from 'hooks/useGtm';
import { useMediaQuery } from 'react-responsive';
import { GroupshopContext } from 'store/groupshop.context';
import { Send } from 'react-bootstrap-icons';
import { InvariantError } from '@apollo/client/utilities/globals';
import { useRouter } from 'next/router';
import useAppContext from 'hooks/useAppContext';
import styles1 from 'styles/Campaign.module.scss';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import { Member } from 'types/groupshop';
import Members from '../Members/Members';

interface ProductDetailProps extends RootProps {
  show : boolean;
  handleClose(e:any): any;
  // addToCart(e: any): any;
  product : IProduct | undefined;
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
  const { gsctx: { discountCode: { percentage } }, gsctx, isGroupshop } = useAppContext();
  const [variantPrice, setvariantPrice] = useState<undefined | string | number>(undefined);

  const { AlertComponent, showError, showSuccess } = useAlert();

  // control carousel
  const [index, setIndex] = useState(0);
  const [loaderInvite, setloaderInvite] = useState(false);
  const [addedbyname, setaddedbyname] = useState<string | undefined>('');
  const [activeURL, setActiveURL] = useState<string | undefined>('');
  const [cashBack, setCashBack] = useState<number>(0);
  const router = useRouter();

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  const {
    currencySymbol, dPrice, getBuyers, isExpired, discount, addedByName,
    totalCashBack, productShareUrl, displayAddedByFunc, productPriceDiscount,
    getDateDifference, activateURL, formatName, topFive, isInfluencerGS, getBuyers2,
  } = useDeal();
  const { days, hrs, mins } = getDateDifference();

  const [getProduct, { loading, error, data }] = useLazyQuery(GET_PRODUCT_DETAIL, {

    variables: { id: product?.id },
  });

  const productCustomers = getBuyers(product?.id || '0');
  const { googleProductCode, googleEventCode } = useGtm();

  const inviteForExpiredGS = () => {
    setloaderInvite(true);
    setTimeout(() => {
      setloaderInvite(false);
      setActiveURL(activateURL);
    }, 1000);
  };
  useEffect(() => {
    if (show) { getProduct(); setIndex(0); }
  }, [show]);

  const [selOptions, setselOptions] = useState<any| undefined>();
  // add to cart
  useEffect(() => {
    if (product) {
      setvariantPrice(product.price);
      setaddedbyname(addedByName(product?.id));

      googleProductCode({
        productName: product.title,
        productId: product.id.split('/')[4],
        originalPrice: (+product.price) as number,
        finalPrice: (+dPrice(+(product.price)).toFixed(2)) as number,

      });
      googleEventCode('product-detail-modal');
      // let obj = {};
      setselOptions(product?.options?.reduce((obj, { name, values }) => (
        { ...obj, [name]: values[0] }), {}));
      setCashBack(totalCashBack(product.price));
      // console.log('.................');
      // console.log(product.price, variantPrice);
    }
  }, [product]);

  const getVariant = () => {
    const { productById: dproduct } = data;
    const optionNames = Object.keys(selOptions ?? {});
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
      // console.log('🚀ProductDetail 115 ~ selectedVariant', selectedVariant);
      if (selectedVariant?.inventoryQuantity < 1) {
        setoutofStock(true);
      } else setoutofStock(false);
      setvariantPrice(selectedVariant?.price ?? product?.price);
      setCashBack(totalCashBack(selectedVariant?.price ?? product?.price));
    }
    // console.log('🚀 ~ file: ProductDetail.tsx ~ line 114 ~ useEffect ~ data', data);
  }, [selOptions]);

  const addToCart = () => {
    const { productById: dproduct } = data;

    const selectedVariant = getVariant();

    if (selectedVariant?.inventoryQuantity > 0) {
      // get cart product variant with qty
      // cartProducts from usecart
      const isAdded = addCartProduct({
        ...product, ...dproduct, selectedVariant: { ...selectedVariant, selectedQuantity: 1 },
      });

      if (isAdded) {
        showSuccess('product has been added');
      } else {
        showError('product is out of stock');
      }
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
    }
    // else {
    //   setIndex(images.length);
    // }
  };

  const handleCloseClick = () => {
    closeModal({});
  };

  useEffect(() => {
    if (data) { displayImage(); }
  }, [selOptions]);

  useEffect(() => { // if user select image it will select its options.
    if (data) {
      const { productById: dproduct } = data;
      // 1. get the select image
      const svImage = dproduct?.images[index - 1]?.src ?? '';
      // console.log('🚀 ~ file: ProductDetail.tsx ~ line 180 ~ useEffect ~ svImage', svImage);

      // 2. get image variant
      const svrnt = dproduct.variants.filter(
        (vrt: { image: { src: any; }; }) => vrt?.image?.src === svImage,
      );
    }
  }, [index]);

  useEffect(() => { // select instock variant as featured variant
    // console.log('inside variant effect');
    if (data) {
      const { productById: dproduct } = data;
      // console.log('inside variat data check');
      const instockV = dproduct.variants.find((vrt: any) => vrt.inventoryQuantity > 0);

      setselOptions(instockV?.selectedOptions.reduce((obj: any, { name, value }: any) => (
        { ...obj, [name]: value }), {}));
    }
  }, [data]);

  const isForMobile = useMediaQuery({
    query: '(min-width: 476px)',
  });
  // console.log('🚀 ~ file: ProductDetail.tsx ~ line 231 ~ isForMobile', isForMobile);
  return (
    <>
      <AlertComponent />
      <Modal
        show={show}
        onHide={closeModal}
        centered
        size="lg"
        dialogClassName={styles.groupshop_modal_detail}
        // backdrop="static"
        fullscreen="lg-down"
        contentClassName={styles.groupshop_modal_content}
      >
        <Modal.Header closeButton className={['bg-white border-0 ', styles.groupshop__pcard__headerCross].join(' ')} />
        <Modal.Header className={['bg-white border-0 ', styles.groupshop__pcard__headerMobile].join(' ')}>
          <LeftArrowIcon />
          <button
            onClick={handleCloseClick}
            className={styles.groupshop__pcard__headerMobile__txt}
            type="button"
          >
            Back To All

          </button>
        </Modal.Header>
        <Modal.Body className={['bg-white', styles.groupshop__pcard__modalBody].join(' ')}>
          <Row>
            <Col xs={12} md={6}>
              <div className={styles.groupshop_left_content_wrapper}>
                <span className={styles.groupshop__pcard_tag_priceMobile}>
                  {currencySymbol}
                  {parseFloat(productPriceDiscount(+(product?.price ?? ''), +percentage))}
                  {' '}
                  Off
                </span>
                <Col className="d-flex justify-content-end ms-1">
                  {displayAddedByFunc(product?.id) && addedbyname && (
                    <span className={styles.groupshop__pcard_tag_addedbyname}>
                      Added By
                      {' '}
                      {addedbyname}
                    </span>
                  )}
                </Col>
                <div className={styles.groupshop_left_content_wrapper_boughtby}>
                  {isGroupshop && topFive(getBuyers(product?.id ?? '')?.map(
                    (member: Member) => (
                      <span className={styles.groupshop_left_content_wrapper_buyer}>
                        {formatName(member.orderDetail.customer)}

                      </span>
                    ),
                  ))}
                  {isGroupshop && getBuyers(product?.id ?? '').length > 0 && (
                    <span className={styles.groupshop_left_content_wrapper_buyer}>Bought By </span>
                  )}
                  {isInfluencerGS && topFive(getBuyers2(product?.id ?? '')?.map(
                    (member: Member) => (
                      <span className={styles.groupshop_left_content_wrapper_buyer}>
                        {formatName(member.customerInfo)}

                      </span>
                    ),
                  ))}
                  {isInfluencerGS && getBuyers2(product?.id ?? '').length > 0 && (
                    <span className={styles.groupshop__pcard_tag_buyer}>Bought By </span>
                  )}
                </div>
                <Carousel
                  activeIndex={index}
                  onSelect={handleSelect}
                  // interval={null}
                  // indicators={false}
                >
                  <Carousel.Item className={styles.groupshop_modal_detail_featureImage}>
                    <img
                      className="img-fluid"
                      src={product?.featuredImage}
                      alt={`Feature-${Math.random()}`}
                    />
                    {/* <div className={styles.groupshop__pcard_tag_boughtby}>
                      {topFive(getBuyers(prod.id)?.map(
                        (member: Member) => (
                          <span className={styles.groupshop__pcard_tag_buyer}>
                            {formatName(member.orderDetail.customer)}
                          </span>
                        ),
                      ))}

                      {getBuyers(prod.id).length > 0 && (
                      <span className={styles.groupshop__pcard_tag_buyer}>Bought By </span>)}
                    </div> */}
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
                  <Row className={[styles.groupshop__pcard_tag__photoSlider].join(' ')}>
                    <Scrollable width="100%">
                      <div className="d-flex">
                        {data?.productById?.images?.map((img: any, i: number) => (
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
                  </Row>
                )}
              </div>

            </Col>
            <Col xs={12} md={6}>
              <div className={styles.groupshop_right_content_wrapper}>
                <div className={styles.groupshop_right_content}>
                  <p className={styles.groupshop_right_content_title}>
                    {product?.title}
                  </p>
                  <h3 className="d-flex align-items-center">
                    <span className={['text-decoration-line-through fw-light', styles.groupshop_right_content_price].join(' ')}>
                      {currencySymbol}
                      {product?.options ? (+(variantPrice || 0)).toFixed(2).toString().replace('.00', '') : (+(product?.price || 0)).toFixed(2).toString().replace('.00', '')}
                    </span>
                    {' '}
                    <span className={styles.groupshop_right_content_price}>
                      {currencySymbol}
                      {product?.options ? (dPrice(+(variantPrice || 0))).toFixed(2).toString().replace('.00', '')
                        : (dPrice(+(product?.price || 0))).toFixed(2).toString().replace('.00', '') }
                    </span>
                    {' '}
                    {cashBack && isGroupshop ? (
                      <Row className={styles.groupshop_cashback}>
                        <Col className=" mx-0">
                          <div className={[' m-0 p-0 text-nowrap',
                            styles.groupshop_PlusUpto].join(' ')}
                          >
                            Plus up to
                            {' '}
                            <strong>
                              {' '}
                              {currencySymbol}
                              { cashBack }
                              {' '}
                              cashback
                              {' '}
                            </strong>
                            {/* <span className={styles.groupshop_PlusUpto__logo}>
                            with
                            {' '}
                            <GSlogo className=" ms-0 mx-0" />
                          </span> */}
                          </div>
                        </Col>
                      </Row>
                    ) : ''}
                  </h3>
                  {/* {(productCustomers && productCustomers.length) ? (
                    <div className="d-flex align-items-center ">
                      <p className="p-2 my-0 border border-danger rounded-3">
                        {' '}
                        <Icon />
                        {' '}
                        {productCustomers.length}
                        {' '}
                        people have shopped this!
                      </p>
                    </div>
                  ) : '' } */}
                  <div className={styles.groupshop_modal_detail_height}>
                    {isForMobile && (
                    <ShowMoreText
                /* Default options */
                      lines={3}
                      more="Show more"
                      less="Show less"
                      className={isExpired
                        ? styles.groupshop_modal_detail_height_descriptionExpired
                        : styles.groupshop_modal_detail_height_descriptionNormal}
                      anchorClass="my-anchor-css-class"
                  // onClick={this.executeOnClick}
                      expanded={false}
                      width={406}
                      truncatedEndingComponent="... "
                    >
                      {product?.description}

                    </ShowMoreText>
                    )}

                    {product?.options?.filter(({ name, values }) => name !== 'Title' && values[0] !== 'Default Title')?.map(({ name, values, id }) => (
                      <div key={id} className="my-3">
                        <p className={isExpired
                          ? styles.groupshop_modal_detail_height_headingExpired
                          : styles.groupshop_modal_detail_height_headingNormal}
                        >
                          {name}
                        </p>
                        <Form.Select
                          aria-label="option"
                          className="w-50 text-capitalize"
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
                                className="text-capitalize"
                                key={Math.random()}
                              >
                                {val}

                              </option>
                            </>
                          ))}
                        </Form.Select>

                      </div>
                    ))}
                    {!isForMobile && (
                    <ShowMoreText
                /* Default options */
                      lines={2}
                      more="Show more"
                      less="Show less"
                      className={isExpired
                        ? styles.groupshop_modal_detail_height_descriptionExpired
                        : styles.groupshop_modal_detail_height_descriptionNormal}
                      anchorClass="my-anchor-css-class"
                  // onClick={this.executeOnClick}
                      expanded={false}
                      width={406}
                      truncatedEndingComponent="... "
                    >
                      {product?.description}

                    </ShowMoreText>
                    )}
                  </div>
                  <div className={[styles.groupshop_buttons_wrapper, 'bg-white justify-content-center'].join(' ')}>
                    <Button
                      variant="primary"
                      className={styles.groupshop_Pd_addtoCart}
                      onClick={() => addToCart()}
                      disabled={isExpired || outofStock}
                    >
                      {/* {outofStock && 'Out of Stock'}
                      {isExpired && 'Share to unlock'}
                      {!isExpired && 'Add to Cart'} */}
                      {outofStock ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    {isForMobile === false ? (
                      <Button
                        id="mobileBtn"
                        variant="outline-primary"
                        className={['m-1 rounded-pill', styles.groupshop__earn].join(' ')}
                        onClick={() => navigator?.share({
                          title: 'Groupshop',
                          text: `Send special discounts to your friends by sharing this ${productShareUrl(product?.id ?? '')}`,
                        })}
                      >
                        <Send size={18} />
                      </Button>
                    ) : (
                      <ShareButton
                        // disabled={isExpired}
                        placement="right-start"
                        shareurl={isExpired ? activateURL : productShareUrl(product?.id ?? '')}
                        fullshareurl={isExpired ? activateURL : productShareUrl(product?.id ?? '')}
                        label=""
                        className={['m-1 rounded-pill', styles.groupshop__earn].join(' ')}
                        disabled={isExpired || outofStock}
                      />

                    )}
                  </div>

                  <ToolTip
                    className={['py-2 text-decoration-underline', styles1.dashboard_campaign__pop].join(' ')}
                    label="Terms & Conditions"
                    placement={isForMobile ? 'bottom' : 'top'}
                    popContent={(
                      <p>
                        If you purchased any of these
                        items at full price on
                        {' '}
                        {`${gsctx?.store?.brandName}`}
                        , you cannot
                        return your original order to keep these discounted ones.
                      </p>
)}
                  />

                  <div className={styles.groupshop_modal_content_bottom}>
                    <Col xs={12} md={12}>
                      {productCustomers.length > 0
                  && (
                    <>

                      <div className="d-flex align-items-center justify-content-start flex-wrap">
                        <Members names={productCustomers.map((mem: any) => `${mem.orderDetail.customer.firstName} ${mem.orderDetail?.customer?.lastName?.charAt(0) || ''}`)} cashback={[`${currencySymbol}23`, `${currencySymbol}20`]} />
                        <ShareButton
                          disabled={isExpired}
                          placement="auto-end"
                          shareurl={productShareUrl(product?.id ?? '')}
                          fullshareurl={productShareUrl(product?.id ?? '')}
                          label="Invite more friends"
                          className={styles.groupshop_InviteBtn}
                        />
                      </div>
                    </>
                  )}
                    </Col>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {isExpired && (
          <Row className="border-top mt-4">
            <Col className="d-flex justify-content-center mt-4">
              <div className={styles.groupshop_modal_detail_expire}>
                <h3 className="fw-bolder">
                  {' '}
                  This Groupshop has expired, but you can still get
                  {' '}
                  {percentage}
                  %
                  off.
                </h3>
                <section>
                  <Row className={[styles.groupshop_footer_expire, 'justify-content-center w-100'].join(' ')}>
                    <Col xs={3}>{' '}</Col>
                    <Col xs={1} className="d-flex justify-content-center px-3">
                      <div className="text-center me-2">
                        <span>
                          {' '}
                          00
                        </span>
                        <p className="mt-1">HOURS</p>
                      </div>
                      <div className={styles.groupshop_footer_expire_time}>
                        {' '}
                        :
                      </div>
                    </Col>
                    <Col xs={2} className="d-flex px-3">
                      <div className="text-center mx-2">
                        <span>
                          00
                        </span>
                        <p className="mt-1">MINUTES</p>
                      </div>
                      <div className={styles.groupshop_footer_expire_time}>
                        {' '}
                        :
                      </div>
                    </Col>
                    <Col xs={1} className="d-flex px-3">
                      <div className="text-center ms-2 ms-lg-2">
                        <span>
                          00
                        </span>
                        <p className="mt-1">SECONDS</p>
                      </div>
                    </Col>
                    <Col xs={4}>{' '}</Col>
                  </Row>
                </section>
                <p>
                  Groupshop is all about rewarding you and your friends with real
                  cashback and discounts every time you shop together!

                </p>
                <p>
                  <strong>Invite 1 friend</strong>
                  {' '}
                  to this Groupshop, and start shopping with
                  them to get
                  {' '}
                  <strong>
                    {percentage}
                    %
                    {' '}
                    off plus additional cashback
                  </strong>
                  {' '}
                  on this and other products you love.

                </p>
                <div className="d-flex flex-column justify-content-center mb-2 d-block">
                  { loaderInvite
                    ? (<Spinner animation="border" className="align-self-center mb-2" />)
                    : (
                      <>
                        <Button
                          type="button"
                          className={['align-self-center mb-2 p-2', styles.groupshop_expPdInviteNow].join(' ')}
                          onClick={() => inviteForExpiredGS()}
                        >
                          🔗 INVITE NOW

                        </Button>
                        { activeURL ? (<a href={activeURL}>{activeURL}</a>) : '' }
                      </>
                    )}
                </div>
                <div className="d-none d-lg-block d-flex flex-column justify-content-center mb-2">OR SHARE </div>
                <div className="d-none d-lg-block">
                  <section className="d-flex justify-content-center px-2 mb-3">
                    <div className="mx-1">
                      {' '}
                      <SocialButton network="Instagram" url={activateURL} />
                    </div>

                    <div className="mx-1">
                      {' '}
                      <SocialButton network="Pinterest" url={activateURL} />
                      {' '}
                    </div>

                    <div className="mx-1">
                      {' '}
                      <SocialButton network="Tiktok" url={activateURL} />
                      {' '}
                    </div>
                    <div className="mx-1">
                      {' '}
                      <SocialButton network="Twitter" url={activateURL} />
                      {' '}
                    </div>
                    <div className="mx-1">
                      {' '}
                      <SocialButton network="Facebook" url={activateURL} />
                      {' '}
                    </div>
                  </section>
                </div>
              </div>
            </Col>
          </Row>
          )}
        </Modal.Body>
        {isForMobile && !isExpired && isGroupshop && (
        <Modal.Footer className="bg-transparent d-block">
          <Row className={styles.groupshop_timerRow}>
            <Col xs={1} md={1} />
            <Col xs={10} md={10} className={styles.groupshop_timerRow_content}>
              <div className="mt-1">
                <b className={styles.groupshop_timerRow_text}>
                  Complete your order in time to benefit from these exclusive discounts!
                </b>
                <Row className={['mx-auto', styles.groupshop_footer_counter].join(' ')}>
                  <Col className={['d-flex col-3 p-0 ', styles.groupshop_timerRow_days].join(' ')}>
                    <div className={['text-center ', styles.groupshop_timerRow_days_timeArea].join(' ')}>
                      <span className={styles.groupshop_timerRow_days_time}>
                        {' '}
                        {days}
                      </span>
                      <p className="mt-1">DAYS</p>
                    </div>
                    <div className={['py-2 ', styles.groupshop_timerRow_days_time].join(' ')}>
                      {' '}
                      :
                    </div>
                  </Col>
                  <Col className="d-flex col-3 p-0 ">
                    <div className={['text-center mx-2 ', styles.groupshop_timerRow_days_timeArea1].join(' ')}>
                      <span className={styles.groupshop_timerRow_days_time}>
                        {hrs}
                      </span>
                      <p className="mt-1">HOURS</p>
                    </div>
                    <div className={['py-2 ', styles.groupshop_timerRow_days_time].join(' ')}>
                      {' '}
                      :
                    </div>
                  </Col>
                  <Col className="d-flex col-3 p-0 ">
                    <div className="text-center mx-3">
                      <span className={styles.groupshop_timerRow_days_time}>
                        {mins}
                      </span>
                      <p className="mt-1">MINUTES</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={1} md={1} />
          </Row>
        </Modal.Footer>
        )}

      </Modal>

    </>
  );
};

// ProductDetail.defaultProps = {
//   user: {},
// };

export default ProductDetail;
