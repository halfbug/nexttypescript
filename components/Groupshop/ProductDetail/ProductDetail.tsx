/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import React, {
  useState, useEffect, useContext, useCallback, useRef,
} from 'react';
import styles from 'styles/Groupshop.module.scss';
import dStyles from 'styles/Drops.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  Carousel,
  Col, Form, Modal, Overlay, Popover, Row, Spinner,
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
import {
  Send, EmojiHeartEyesFill, Star, StarFill,
} from 'react-bootstrap-icons';
import { InvariantError } from '@apollo/client/utilities/globals';
import { useRouter } from 'next/router';
import useAppContext from 'hooks/useAppContext';
import styles1 from 'styles/Campaign.module.scss';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import NativeShareButton from 'components/Buttons/NativeShareButton/NativeShareButton';
import useCode from 'hooks/useCode';
import AddDealProduct from 'components/Forms/AddDealProduct';
import useDetail from 'hooks/useDetail';
import useDrops from 'hooks/useDrops';
import useUtilityFunction from 'hooks/useUtilityFunction';
import Members from '../Members/Members';

interface ProductDetailProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;
  // addToCart(e: any): any;
  product: IProduct | undefined;
  isChannel?: boolean;
  showSearch?: () => any;
  isDrops?: boolean;
}

const ProductDetail = ({
  show, pending = false, handleClose, product, isChannel, showSearch, isDrops,
}: ProductDetailProps) => {
  const { addCartProduct } = useCart();
  const { shop, discountCode, ownerCode } = useCode();
  const ref = useRef(null);
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    setDealProduct('');
    setShowOverlay(false);
    handleClose(e);
  };
  // console.log(product);
  const {
    gsctx: { discountCode: { percentage }, totalProducts, store }, gsctx,
    isGroupshop,
  } = useAppContext();
  const {
    formatNumber,
  } = useUtilityFunction();
  const [variantPrice, setvariantPrice] = useState<undefined | string | number>(undefined);

  const { AlertComponent, showError, showSuccess } = useAlert();

  // control carousel
  const [index, setIndex] = useState(0);
  const [loaderInvite, setloaderInvite] = useState(false);
  const [addedbyname, setaddedbyname] = useState<string | undefined>('');
  const [activeURL, setActiveURL] = useState<string | undefined>('');
  const [cashBack, setCashBack] = useState<number>(0);
  const [PDBtnText, setPDBtnText] = useState<string>('');
  const [dealProduct, setDealProduct] = useState('');
  const [target, setTarget] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [disable, setDisable] = useState(false);
  const [filterDeal, setFilterDeal] = useState<string[]>([]);
  const [varientData, setVarientData] = useState(0);
  const router = useRouter();

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  const {
    currencySymbol, dPrice, disPrice, getBuyers, isExpired, discount, addedByName,
    totalCashBack, productShareUrl, displayAddedByFunc, productPriceDiscount,
    getDateDifference, activateURL, formatName, topFive, isInfluencerGS, getBuyers2,
    maxPercent, brandName, socialText, nativeShareText, banner, shortActivateURL,
    clientDealProducts,
  } = useDeal();
  const {
    spotlightProducts,
  } = useDrops();
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
    checkCartForDrops();
    if (show) { getProduct(); setIndex(0); }
  }, [show]);

  useEffect(() => {
    let arr;
    if (isChannel) {
      arr = gsctx.dealProducts?.filter((item) => item.type === 'deal' || item.type === 'owner')
        .map((ele) => ele.productId);
    } else {
      arr = gsctx.dealProducts?.filter((item) => item.type === 'deal')
        .map((ele) => ele.productId);
    }
    if (arr) {
      setFilterDeal(arr);
    }
  }, [gsctx]);

  useEffect(() => {
    if (data?.productById?.id) {
      const temp: any = filterDeal
        .find((ele) => ele === data?.productById?.id);
      setDealProduct(temp);
    }
  }, [data, filterDeal]);

  const [selOptions, setselOptions] = useState<any | undefined>();
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
      if (!isDrops) {
        setCashBack(totalCashBack(product.price));
      }
      // console.log('.................');
      // console.log(product.price, variantPrice);
    }
  }, [product]);
  // console.log('🚀 ~ file: ProductDetail.tsx ~ line 121 ~ product', product);

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
  // console.log('🚀 ~ file: ProductDetail.tsx:138 ~ useEffect ~ data', data);
  const [outofStock, setoutofStock] = useState<boolean>(false);
  useEffect(() => {
    if (data) {
      const selectedVariant = getVariant();
      setVarientData(selectedVariant?.inventoryQuantity);
      const { productById } = data;
      // console.log('🚀 ~ file: ProductDetail.tsx:140 ~ useEffect ~ productById', productById);
      // console.log('🚀ProductDetail 115 ~ selectedVariant', selectedVariant);
      if (productById?.outofstock) {
        setoutofStock(true);
      } else if (selectedVariant?.inventoryPolicy === 'continue') {
        setoutofStock(false);
      } else if (selectedVariant?.inventoryManagement === null) {
        setoutofStock(false);
      } else if (selectedVariant?.inventoryQuantity < 1) {
        setoutofStock(true);
      } else setoutofStock(false);
      setvariantPrice(selectedVariant?.price ?? product?.price);
      if (!isDrops) {
        setCashBack(totalCashBack(selectedVariant?.price ?? product?.price));
      }
    } else {
      setoutofStock(true);
    }
    // console.log('🚀 ~ file: ProductDetail.tsx ~ line 114 ~ useEffect ~ data', data);
  }, [selOptions, data]);

  const addToCart = () => {
    const { productById: dproduct } = data;

    const selectedVariant = getVariant();

    if (selectedVariant?.inventoryQuantity > 0
      || (selectedVariant?.inventoryPolicy === 'continue') || (selectedVariant?.inventoryManagement === null)) {
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
  const backToSearch = (e: any) => {
    setShowOverlay(false);
    if (gsctx?.totalProducts < 101) {
      const cprod = clientDealProducts()?.length || 0;
      if (cprod >= 5) {
        showError(
          'Only 5 products can be added to this Group Shop per person.',
        );
      } else if (showSearch) {
        showSearch();
      }
    } else showError('Groupshop is full you can not add more products to it');
    closeModal(e);
  };

  useEffect(() => {
    if (data) { displayImage(); }
  }, [selOptions]);

  useEffect(() => {
    if (isExpired) setPDBtnText('Share to unlock');
    else if (outofStock) setPDBtnText('Out of Stock');
    else setPDBtnText('Add to Cart');
  }, [outofStock, isExpired]);

  useEffect(() => { // if user select image it will select its options.
    if (data) {
      const { productById: dproduct } = data;
      // 1. get the select image
      const svImage = dproduct?.images[index - 1]?.src ?? '';

      // 2. get image variant
      const svrnt = dproduct.variants.filter(
        (vrt: { image: { src: any; }; }) => vrt?.image?.src === svImage,
      );
      if (svrnt?.[0]?.inventoryQuantity > 0
        || svrnt?.[0]?.inventoryPolicy === 'continue' || svrnt?.[0]?.inventoryManagement === null) {
        // 4. check if first variant is out of stock
        // if (selectedV.inventoryQuantity === 0) {
        //   // get instock variants
        //   selectedV = dproduct.variants.find((vrt: any) => vrt.inventoryQuantity > 0);
        // }

        // 3. set selected options to in stock variant
        setselOptions(svrnt?.[0]?.selectedOptions.reduce((obj: any, { name, value }: any) => (
          { ...obj, [name]: value }), {}));
      }
    }
  }, [index]);

  useEffect(() => { // select instock variant as featured variant
    // console.log('inside variant effect');
    if (data) {
      const { productById: dproduct } = data;
      // console.log('inside variat data check');
      const instockV = dproduct.variants.find((vrt: any) => vrt.inventoryQuantity > 0
        || vrt?.inventoryPolicy === 'continue' || vrt?.inventoryManagement === null);
      setselOptions(instockV?.selectedOptions.reduce((obj: any, { name, value }: any) => (
        { ...obj, [name]: value }), {}));
    }
  }, [data]);

  const isForMobile = useMediaQuery({
    query: '(min-width: 476px)',
  });
  // console.log(data?.productById?.images, '===images');
  // console.log('🚀 ~ file: ProductDetail.tsx ~ line 231 ~ isForMobile', isForMobile);

  const addToFav = useCallback((e) => {
    setTarget(e.target);
    setDealProduct(data?.productById?.id);
    setShowOverlay(true);
  }, [data]);

  // const cleanDescription = useCallback((description) => {
  //   if (description) {
  //     const re = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
  //     const unescaped: any = {
  //       '&amp;': '&',
  //       '&#38;': '&',
  //       '&lt;': '<',
  //       '&#60;': '<',
  //       '&gt;': '>',
  //       '&#62;': '>',
  //       '&apos;': "'",
  //       '&#39;': "'",
  //       '&quot;': '"',
  //       '&#34;': '"',
  //     };
  //     const replaceTags = description.replace(re, (m: any) => unescaped[m]);
  //     const filteredStyle = replaceTags.replace(/<style.*?<\/style>/g, '');
  //     const filteredImages = filteredStyle.replace(/<img[^>]*>/g, '');
  //     const filteredScript = filteredImages.replace(/<script[^>]*>(?:(?!<\/script>)[^])*<\/script>/g, '');
  //     const filteredButton = filteredScript.replace(/<button[^>]*>(?:(?!<\/button>)[^])*<\/button>/g, '');
  //     const filteredLinks = filteredButton.replace(/<a[^>]*>(?:(?!<\/a>)[^])*<\/a>/g, '');
  //     return filteredLinks;
  //   }
  //   return '';
  // }, []);

  const checkCartForDrops = () => {
    const { cart } = gsctx;
    const cartProduct = cart?.find((ele) => ele.id === product?.id);
    if (cartProduct && cartProduct?.selectedVariant?.selectedQuantity >= 3) {
      setDisable(true);
    } else {
      setDisable(false);
    }
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
        // backdrop="static"
        fullscreen="lg-down"
        contentClassName={styles.groupshop_modal_content}
      >
        <Modal.Header closeButton className={['bg-white border-0 ', styles.groupshop__pcard__headerCross].join(' ')}>
          <LeftArrowIcon />
          <button
            onClick={backToSearch}
            className={styles.groupshop__pcard__headerMobile__txt}
            type="button"
          >
            Back To Search

          </button>
        </Modal.Header>
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
                <span className={isDrops ? dStyles.drops__pcard_tag_priceMobile : styles.groupshop__pcard_tag_priceMobile}>
                  {currencySymbol}
                  {formatNumber(productPriceDiscount(+(product?.price ?? ''), spotlightProducts.includes(product?.id!) ? +store?.drops?.spotlightDiscount?.percentage! : +percentage))}
                  {' '}
                  Off
                </span>
                <Col className="d-flex justify-content-end ms-1">
                  {displayAddedByFunc(product?.id) && addedbyname && (
                    <span className={styles.groupshop__pcard_tag_addedbyname}>
                      🤩
                      {addedbyname}
                      's favs
                    </span>
                  )}
                </Col>
                {/* <div className={styles.groupshop_left_content_wrapper_boughtby}>
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
                </div> */}
                <Carousel
                  activeIndex={index}
                  onSelect={handleSelect}
                  // interval={0}
                  indicators={false}
                >
                  {/* {loading && ( */}
                  {product?.featuredImage?.length ? (
                    <Carousel.Item
                      className={styles.groupshop_modal_detail_featureImage}
                    >
                      {/* <img
                      className="img-fluid"
                      src={product?.featuredImage}
                      alt={`Feature-${Math.random()}`}
                    /> */}
                      <div className={styles.groupshop_modal_detail_featureImage} style={{ backgroundImage: `url(${product?.featuredImage})` }} />

                    </Carousel.Item>
                  ) : ''}
                  {/* // )} */}
                  {data?.productById?.images?.map((img:any, i:number) => (
                    <Carousel.Item>
                      {/* <img
                        src={img.src}
                        alt={`image_${i}`}
                       // eslint-disable-next-line react/no-array-index-key
                        key={`image_${i}`}
                        className={styles.groupshop_modal_detail_featureImage}
                      /> */}
                      <div className={styles.groupshop_modal_detail_featureImage} style={{ backgroundImage: `url(${img.src})` }} />

                    </Carousel.Item>

                  ))}
                  {data?.productById?.videos?.map((img:any) => (
                    <Carousel.Item>
                      <video
                        src={img.src}
                        key={`video_${Math.random()}`}
                        className={styles.groupshop_modal_detail_featureImage}
                        muted
                        autoPlay
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
                {product?.status !== 'DELETED' && data?.productById?.images.length > 1
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
                          {
                            data.productById?.videos.map((ele: any, i: number) => (
                              <>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    handleSelect((data?.productById?.images.length + i + 1), e);
                                  }}
                                  className={i === index
                                    ? styles.groupshop_modal_detail_button_selected
                                    : styles.groupshop_modal_detail_button}
                                  key={ele.id}
                                >

                                  <video
                                    src={ele.src}
                                    onClick={(e) => handleSelect((i + 1), e)}
                                    className={styles.groupshop_modal_detail_thumbnail}
                                    autoPlay
                                    muted
                                    loop
                                  />
                                </button>
                              </>
                            ))
                          }
                        </div>
                      </Scrollable>
                    </Row>
                  )}
              </div>

            </Col>
            <Col xs={12} md={6}>
              <div ref={ref} className={styles.groupshop_right_content_wrapper}>
                <div className={styles.groupshop_right_content}>
                  <div className="d-flex">
                    <p className={styles.groupshop_right_content_title}>
                      {product?.title}
                    </p>
                    {!isDrops && (!dealProduct ? (
                      <Button
                        variant="outline-primary"
                        className={styles.groupshop_right_content_favbtn}
                        onClick={(e) => addToFav(e)}
                      >
                        <Star />
                        <span>ADD TO FAVS</span>
                      </Button>
                    )
                      : (
                        <Button
                          variant="outline-primary"
                          className={styles.groupshop_right_content_favbtn}
                          onClick={() => {
                            if (!filterDeal.includes(dealProduct)) {
                              setShowOverlay(false);
                              setDealProduct('');
                            }
                          }}
                          disabled={!!filterDeal.find((ele) => ele === dealProduct)}
                        >
                          <StarFill style={{ color: '#FFD700' }} />
                          <span>Selected</span>
                        </Button>
                      ))}

                    <Overlay
                      show={showOverlay}
                      target={target}
                      placement="bottom"
                      container={ref}
                      containerPadding={20}
                    >
                      <Popover
                        id="popover-contained"
                        className={styles.groupshop_search_popover}
                        style={{ maxWidth: '325px' }}
                      >
                        <Popover.Body>
                          <>
                            <p className={styles.groupshop_search_popover_txt}>
                              Enter your name to personalize your store
                            </p>
                            <AddDealProduct
                              selectedProducts={[dealProduct]}
                              handleClose={(e) => {
                                closeModal(e);
                                if (true) {
                                  if ((totalProducts + 1) < 101) {
                                    showSuccess('Product(s) has been added successfully.');
                                  } else {
                                    showError(`Groupshop is full you can not add more products to it, There is still place for ${(100 - totalProducts)} products, select only ${(100 - totalProducts)} products`);
                                  }
                                } else {
                                  showSuccess('No product(s) has been selected.');
                                }
                              }}
                              isCreateGS={false}
                            />
                          </>
                        </Popover.Body>
                      </Popover>
                    </Overlay>

                  </div>
                  <h3 className="d-flex align-items-center">
                    <span className={['text-decoration-line-through fw-light', styles.groupshop_right_content_price].join(' ')}>
                      {currencySymbol}
                      {product?.options ? (+(variantPrice || 0)).toFixed(2).toString().replace('.00', '') : (+(product?.price || 0)).toFixed(2).toString().replace('.00', '')}
                    </span>
                    {' '}
                    <span className={styles.groupshop_right_content_price}>
                      {currencySymbol}
                      {spotlightProducts.includes(product?.id!) && (product?.options ? (disPrice(+(variantPrice || 0), +(store?.drops?.spotlightDiscount?.percentage!))).toFixed(2).toString().replace('.00', '')
                        : (disPrice(+(product?.price || 0), +(store?.drops?.spotlightDiscount?.percentage!))).toFixed(2).toString().replace('.00', ''))}
                      {!spotlightProducts.includes(product?.id!) && (product?.options ? (dPrice(+(variantPrice || 0))).toFixed(2).toString().replace('.00', '')
                        : (dPrice(+(product?.price || 0))).toFixed(2).toString().replace('.00', ''))}
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
                              {cashBack}
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
                    ) : (<></>)}
                  </h3>
                  {!isDrops && ((product && product?.purchaseCount && product?.purchaseCount > 0) ? (
                    <div className="d-flex align-items-center my-3">
                      {(
                        <p className={styles.groupshop_shopped}>
                          {' '}
                          {/* <Icon /> */}
                          {product?.purchaseCount >= 1 && product?.purchaseCount <= 30 ? <>🔥</> : ''}
                          {product?.purchaseCount > 30 && product?.purchaseCount <= 100 ? <>⚡️</> : ''}
                          {product?.purchaseCount > 100 ? <>🎉</> : ''}
                          {' '}
                          {product?.purchaseCount}
                          {'+ '}
                          people have shopped this!
                        </p>
                      )}
                    </div>
                  ) : `${product?.title}`)}
                  {
                    isDrops && (product && product?.secondaryCount) && (
                    <p className={styles.groupshop_shopped}>
                      {' '}
                      {/* <Icon /> */}
                      {product?.secondaryCount >= 1 && product?.secondaryCount <= 30 ? <>🔥</> : ''}
                      {product?.secondaryCount > 30 && product?.secondaryCount <= 100 ? <>⚡️</> : ''}
                      {product?.secondaryCount > 100 ? <>🎉</> : ''}
                      {' '}
                      {product?.secondaryCount}
                      {'+ '}
                      people have shopped this!
                    </p>
                    )
                  }
                  <div className={styles.groupshop_modal_detail_height}>
                    {isForMobile && (
                      //     <ShowMoreText
                      // /* Default options */
                      //       lines={3}
                      //       more="Show more"
                      //       less="Show less"
                      //       className={isExpired
                      //         ? styles.groupshop_modal_detail_height_descriptionExpired
                      //         : styles.groupshop_modal_detail_height_descriptionNormal}
                      //       anchorClass="my-anchor-css-class"
                      //   // onClick={this.executeOnClick}
                      //       expanded={false}
                      //       width={406}
                      //       truncatedEndingComponent="... "
                      //     >
                      //       {product?.description ?
                      //        <p dangerouslySetInnerHTML=
                      // {{ __html: product?.description }} /> : ''}
                      //     </ShowMoreText>
                      <div
                        className={isExpired
                          ? styles.groupshop_modal_detail_height_descriptionExpired
                          : styles.groupshop_modal_detail_height_descriptionNormal}
                      >
                        {/* {product?.description ? <p dangerouslySetInnerHTML=
                          // {{ __html: cleanDescription(product?.description) }} /> : ''} */}
                        {product?.description ? <p dangerouslySetInnerHTML={{ __html: product?.description }} /> : ''}
                      </div>
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
                          onChange={({ target: { value } }: any) => {
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
                    // <ShowMoreText
                    //   /* Default options */
                    //   lines={2}
                    //   more="Show more"
                    //   less="Show less"
                    //   className={isExpired
                    //     ? styles.groupshop_modal_detail_height_descriptionExpired
                    //     : styles.groupshop_modal_detail_height_descriptionNormal}
                    //   anchorClass="my-anchor-css-class"
                    //   // onClick={this.executeOnClick}
                    //   expanded={false}
                    //   width={406}
                    //   truncatedEndingComponent="... "
                    // >
                    //   {product?.description ? <p dangerouslySetInnerHTML={{ __html: product?.description }} /> : ''}
                    // </ShowMoreText>
                    <div
                      className={isExpired
                        ? styles.groupshop_modal_detail_height_descriptionExpired
                        : styles.groupshop_modal_detail_height_descriptionNormal}
                    >
                      {/* {product?.description ? <p dangerouslySetInnerHTML=
                          // {{ __html: cleanDescription(product?.description) }} /> : ''} */}
                      {product?.description ? <p dangerouslySetInnerHTML={{ __html: product?.description }} /> : ''}
                    </div>
                    )}
                  </div>
                  <div className={[isDrops ? dStyles.drops_buttons_wrapper : styles.groupshop_buttons_wrapper, 'mt-3 bg-white justify-content-center'].join(' ')}>
                    {!isExpired ? (
                      <>
                        {isDrops && varientData < 51 && varientData > 0 ? (
                          <div className={dStyles.drops_buttons_wrapper_lessTxt}>
                            {`Less than ${varientData} left!`}
                          </div>
                        ) : ''}
                        <Button
                          variant="primary"
                          className={styles.groupshop_Pd_addtoCart}
                          onClick={() => {
                            addToCart();
                          }}
                          disabled={(outofStock || disable)}
                        >
                          {/* {outofStock && 'Out of Stock'}
                      {isExpired && 'Share to unlock'}
                      {!isExpired && 'Add to Cart'} */}
                          {/* {outofStock ? 'Out of Stock' : 'Add to Cart'} */}
                          {loading ? <Spinner animation="border" size="sm" /> : <>{PDBtnText}</>}

                        </Button>
                      </>
                    ) : (
                      <ShareButton
                        // label="share to unlock"
                        shareurl={isExpired ? shortActivateURL ?? activateURL : productShareUrl(product?.id ?? '')}
                        fullshareurl={isExpired ? activateURL : productShareUrl(product?.id ?? '')}
                        className={styles.groupshop_Pd_addtoCart}
                        // onClick={(e) => handleCard(e)}
                        disabled={outofStock}
                      >
                        {loading ? <Spinner animation="border" size="sm" /> : <>share to unlock</>}
                      </ShareButton>
                    )}

                    {isForMobile === false ? (
                      <Button
                        id="mobileBtn"
                        variant="outline-primary"
                        className={['m-1 rounded-pill', styles.groupshop__earn].join(' ')}
                        onClick={() => navigator?.share({
                          title: 'Groupshop',
                          text: `${nativeShareText} ${isExpired ? activateURL : productShareUrl(product?.id ?? '')}`,
                        })}
                      >
                        <Send size={18} />
                      </Button>
                    ) : (
                      <ShareButton
                        // disabled={isExpired}
                        placement="right-start"
                        shareurl={isExpired ? shortActivateURL ?? activateURL : productShareUrl(product?.id ?? '')}
                        fullshareurl={isExpired ? activateURL : productShareUrl(product?.id ?? '')}
                        label=""
                        className={['m-1 rounded-pill', styles.groupshop__earn].join(' ')}
                      // disabled={outofStock}
                      />

                    )}
                  </div>
                  {isExpired && (
                    <>
                      <div
                        className={[styles.groupshop_buttons_wrapper, 'd-md-none bg-white justify-content-center'].join(' ')}
                      >
                        {loaderInvite
                          ? (<Spinner animation="border" className="align-self-center mb-2" />)
                          : (
                            <>
                              <NativeShareButton
                                label="🔗 Invite Now"
                                className={['align-self-center mb-2 py-2 px-3 w-75 border-0', styles.groupshop_Pd_addtoCart].join(' ')}
                                shareurl={shortActivateURL ?? activateURL}
                                text={`Shop ${brandName} on my Groupshop & get up to ${maxPercent} off`}
                              />
                            </>

                          )}
                      </div>
                      {/* <Row className="d-sm-block">
                      {activeURL ? (<a href={activeURL}>{activeURL}</a>) : ''}
                      {' '}
                    </Row> */}

                    </>
                  )}
                  {isDrops
                    ? (
                      <div
                        className={['py-2 text-decoration-underline', styles1.dashboard_campaign__pop].join(' ')}
                      >
                        All sales are final

                      </div>
                    ) : (
                      <ToolTip
                        className={['py-2 text-decoration-underline', styles1.dashboard_campaign__pop].join(' ')}
                        label={isDrops ? 'All sales are final' : 'Terms & Conditions'}
                        trigger={undefined}
                        placement="auto"
                        disabled
                        popContent={(
                          <p>
                            If you purchased any of these
                            items at full price on
                            {' '}
                            {`${brandName}`}
                            , you cannot
                            return your original order to keep these discounted ones.
                          </p>
                    )}
                      />
                    )}

                  <div className={isDrops ? dStyles.drops_modal_content_bottom : styles.groupshop_modal_content_bottom}>
                    <Col xs={12} md={12}>
                      {productCustomers.length > 0
                        && (
                          <>

                            <div className="d-flex align-items-center justify-content-start flex-wrap">
                              <Members
                                names={topFive(productCustomers.map(
                                  (mem: any, mindex: any) => ({
                                    fname: `${mem.orderDetail.customer.firstName ?? ''} ${mem.orderDetail.customer.firstName ? mem.orderDetail?.customer?.lastName?.charAt(0) || '' : mem.orderDetail?.customer?.lastName
                                    }`,
                                    lineItems: mem.lineItems,
                                    email: mem.orderDetail.customer.email,
                                    orderId: mem.orderId,
                                  }),
                                ))}
                                cashback={['']}
                                discount={discount}
                                shareUrl={isExpired ? shortActivateURL ?? activateURL : productShareUrl(product?.id ?? '')}
                                fullshareurl={isExpired ? activateURL : productShareUrl(product?.id ?? '')}
                                rewards={gsctx?.campaign?.salesTarget?.rewards}
                                brandname={brandName}
                                currencySymbol={currencySymbol}
                                pending={pending}
                                page="product-details"
                              />
                              <ShareButton
                                // disabled={isExpired}
                                placement="auto-end"
                                shareurl={`${isExpired ? shortActivateURL ?? activateURL : productShareUrl(product?.id ?? '')}`}
                                fullshareurl={`${isExpired ? activateURL : productShareUrl(product?.id ?? '')}`}
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
                        <div className="text-center ms-4 ms-lg-2">
                          <span>
                            00
                          </span>
                          <p className="mt-1">SECONDS</p>
                        </div>
                      </Col>
                      <Col xs={4}>{' '}</Col>
                    </Row>
                  </section>
                  {
                    !isChannel && (
                      <>
                        <p className="d-lg-block d-none">
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
                      </>
                    )
                  }
                  <div className="d-none d-lg-block d-flex flex-column justify-content-center mb-2 d-block">
                    {loaderInvite
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
                          <Row>
                            {activeURL || shortActivateURL ? (<a href={shortActivateURL ?? activeURL}>{shortActivateURL ?? activeURL}</a>) : ''}
                          </Row>
                        </>
                      )}
                  </div>
                  <div className="d-none d-lg-block d-flex flex-column justify-content-center mb-2">OR SHARE </div>
                  <div className="d-none d-lg-block">
                    <section className="d-flex justify-content-center px-2 mb-3">
                      <div className="mx-1">
                        {' '}
                        <SocialButton text={socialText} network="Email" url={shortActivateURL ?? activateURL} />
                        {' '}
                      </div>
                      <div className="mx-1">
                        {' '}
                        <SocialButton text={socialText} network="Instagram" url={shortActivateURL ?? activateURL} />
                      </div>

                      <div className="mx-1">
                        {' '}
                        <SocialButton text={socialText} network="Pinterest" url={shortActivateURL ?? activateURL} media={banner} />
                        {' '}
                      </div>

                      {/* <div className="mx-1">
                      {' '}
                      <SocialButton
                        text={socialText}
                        network="Tiktok"
                        url={shortActivateURL ?? activateURL}
                      />
                      {' '}
                    </div> */}
                      <div className="mx-1">
                        {' '}
                        <SocialButton text={socialText} network="Twitter" url={shortActivateURL ?? activateURL} />
                        {' '}
                      </div>
                      <div className="mx-1">
                        {' '}
                        <SocialButton text={socialText} network="Facebook" url={shortActivateURL ?? activateURL} />
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

ProductDetail.defaultProps = {
  isChannel: false,
  showSearch: () => {},
  isDrops: false,
};

export default ProductDetail;
