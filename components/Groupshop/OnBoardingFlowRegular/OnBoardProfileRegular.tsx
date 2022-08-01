/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from 'components/Buttons/Button/Button';
import React, { useContext, useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Modal,
} from 'react-bootstrap';
import styles from 'styles/OnBoardingFlowRegular.module.scss';
import InstagramIcon from 'assets/images/instagram-black.svg';
import InstagramIconGrey from 'assets/images/instagram-grey.svg';
import PIcon from 'assets/images/p-icon-black.svg';
import PIconGrey from 'assets/images/pinterest-grey.svg';
import TikTokIcon from 'assets/images/tiktok-icon-grey.svg';
import TikTokIconBlack from 'assets/images/tiktok-black.svg';
import TwitterIcon from 'assets/images/twitter-icon-grey.svg';
import TwitterIconBlack from 'assets/images/twitter-black.svg';
import TickIconGrey from 'assets/images/tik-icon-grey.svg';
import TickIconGreen from 'assets/images/tik-icon-green.svg';
// import ThemeBlack from 'assets/images/themeBlack.svg';
import TickIcon from 'assets/images/tick-icon.svg';
import CrossIcon from 'assets/images/cross.svg';
import LeftArrowIcon from 'assets/images/left-arrow.svg';
import LeEsableIcon from 'assets/images/lesable.svg';
import SearchIcon from 'assets/images/search-icon-small.svg';
import CartIcon from 'assets/images/cart-icon-small.svg';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import useCode from 'hooks/useCode';
import { GroupshopContext } from 'store/groupshop.context';

import Image1 from 'assets/images/Ellipse1.png';
import Image2 from 'assets/images/Ellipse2.png';
import Image3 from 'assets/images/Ellipse3.png';
import Image4 from 'assets/images/Ellipse4.png';
import Image5 from 'assets/images/Ellipse5.png';
import { DealProduct, IProduct } from 'types/store';
import useDeal from 'hooks/useDeal';
import { useMutation } from '@apollo/client';
import { IGroupshop } from 'types/groupshop';
import { ADD_DEAL_PRODUCT } from 'store/store.graphql';
import _ from 'lodash';
import ProductsSearch from '../ProductsSearch/ProductsSearch';
import Hero from '../Hero/Hero';
import ProductCard from '../ProductCard/ProductCard';

interface Props {
  open: Boolean
}

interface SocialMediaLinks {
  instagram: String;
  pinterest: String;
  tiktok: String;
  twitter: String;
}

interface TypeFormValues {
  ShopTitle: string;
  SocialLinks: SocialMediaLinks;
}

interface ThemeBanner {
  key: number;
  banner: any;
}

const OnBoardProfileRegular = ({ open }: Props) => {
  const [show, setShow] = useState<Boolean>(false);
  const [showProduct, setShowProduct] = useState(false);
  const [editHeader, setEditHeader] = useState(false);
  const [storeData, setStoreData] = useState({});
  const [socialButtons, setSocialButtons] = useState<any>({
    instagram: { isChecked: true, link: '', hasValue: false },
    pinterest: { isChecked: false, link: '', hasValue: false },
    tiktok: { isChecked: false, link: '', hasValue: false },
    twitter: { isChecked: false, link: '', hasValue: false },
  });

  const [productArray, setProductArray] = useState<IProduct[]>([]);
  const { currencySymbol, dPrice } = useDeal();
  const {
    shop, discountCode, ownerCode,
  } = useCode();

  const bannerArray = [
    {
      key: 1,
      banner: Image1,
    },
    {
      key: 2,
      banner: Image2,
    },
    {
      key: 3,
      banner: Image3,
    },
    {
      key: 4,
      banner: Image4,
    },
    {
      key: 5,
      banner: Image5,
    },
  ];

  const [themeBanner, setThemeBanner] = useState<ThemeBanner[]>(bannerArray);
  const [selectedBanner, setSelectedBanner] = useState<ThemeBanner>();
  const [key, setKey] = useState('instagram');
  const [selectProducts, setSelectedProducts] = useState<any[]>([]);
  const [isURLValid, setIsURLValid] = useState<boolean | undefined>(false);
  const [Error, setError] = useState<any>({});

  const { gsctx, dispatch } = useContext(GroupshopContext);
  const [addDealProduct] = useMutation<IGroupshop>(ADD_DEAL_PRODUCT);

  const [bannerImage, setBannerImage] = useState<string>('https://s3.amazonaws.com/gsnodeimages/native-root-stage_logoImage2.jpeg?AWSAccessKeyId=AKIA6KH4T3ZCMIHFWAXN&Expires=1654709088&Signature=4jaVHOONPIQGyt%2Fi04AaLXbbZNk%3D');
  const Router = useRouter();

  const FormValues: TypeFormValues = {
    ShopTitle: '',
    SocialLinks: {
      instagram: '',
      pinterest: '',
      tiktok: '',
      twitter: '',
    },
  };

  const {
    handleChange, values, setFieldValue,
  } = useFormik({
    initialValues: FormValues,
    // validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => { },
  });

  const handleClose = () => {
    setShow(false);
    if (shop && ownerCode && discountCode) {
      Router.push(`/${shop}/deal/${discountCode}/owner&${ownerCode}`);
    }
  };

  const handleShow = () => { setShow(true); };
  const handlesetShowProduct = () => { setShow(false); };

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    URLValidator(socialButtons[key].link);
  }, [key]);

  useEffect(() => {
    if (socialButtons[key].link) { URLValidator(socialButtons[key].link); }
  }, [socialButtons]);

  useEffect(() => {
    if (gsctx?.obSettings && gsctx?.dealProducts) {
      setStoreData({
        store: gsctx?.obSettings,
        products: gsctx?.dealProducts,
      });
      setFieldValue('ShopTitle', gsctx?.obSettings.shopHeader);
      // setSelectedProducts(gsctx?.dealProducts.map((prd) => prd.productId));
      // setProductArray(gsctx?.dealProducts);

      let socialLinksObj = {};
      if (gsctx?.obSettings.instagramLink) {
        socialLinksObj = {
          ...socialLinksObj,
          instagram: {
            link: gsctx?.obSettings?.instagramLink,
            hasValue: true,
          },
        };
      }

      if (gsctx?.obSettings.pinteresrLink) {
        socialLinksObj = {
          ...socialLinksObj,
          pinterest: {
            link: gsctx?.obSettings?.pinteresrLink,
            hasValue: true,
          },
        };
      }

      if (gsctx?.obSettings.twitterLink) {
        socialLinksObj = {
          ...socialLinksObj,
          twitter: {
            link: gsctx?.obSettings.twitterLink,
            hasValue: true,
          },
        };
      }

      if (gsctx?.obSettings.tiktokLink) {
        socialLinksObj = {
          ...socialLinksObj,
          tiktok: {
            link: gsctx?.obSettings.tiktokLink,
            hasValue: true,
          },
        };
      }

      setSocialButtons({
        ...socialButtons,
        ...socialLinksObj,
      });
    }
  }, [gsctx?.obSettings]);

  const URLValidator = (URI: string) => {
    const URI_LIST = [
      {
        key: 'instagram',
        url: 'https://www.instagram.com/',
      },
      {
        key: 'pinterest',
        url: 'https://www.pinterest.com/',
      },
      {
        key: 'twitter',
        url: 'https://www.twitter.com/',
      },
      {
        key: 'tiktok',
        url: 'https://www.tiktok.com/',
      },
    ];
    setIsURLValid(URI.includes(URI_LIST.find((ele) => ele.key === key)?.url!));
    return URI.includes(URI_LIST.find((ele) => ele.key === key)?.url!);
  };

  useEffect(() => {
    if (values.ShopTitle && Error.ShopTitle) {
      setError({ ShopTitle: '' });
    }

    if (selectProducts.length > 0 && Error.Product) {
      setError({ Product: '' });
    }
  }, [values, selectProducts]);

  const validationChecker = () => {
    let hasError: boolean = false;
    if (!values.ShopTitle) {
      setError({ ...Error, ShopTitle: 'Welcome header is required' });
      hasError = true;
      return hasError;
    } if (!selectProducts.length) {
      setError({ ...Error, Product: 'Choose at least one product' });
      hasError = true;
      return hasError;
    }

    return hasError;
  };

  const moveForward = async () => {
    if (validationChecker()) {
      return;
    }

    const productObject:any = selectProducts.map((ele) => ({
      productId: ele,
      type: 'deal',
      addedBy: gsctx.members[0].orderDetail.customer.firstName,
      customerIP: gsctx.members[0].orderDetail.customer.ip,
    }));

    const data: any = {
      ...gsctx.obSettings,
      shopHeader: values.ShopTitle,
      instagramLink: socialButtons.instagram.hasValue ? socialButtons.instagram.link : '',
      pinteresrLink: socialButtons.pinterest.hasValue ? socialButtons.pinterest.link : '',
      tiktokLink: socialButtons.tiktok.hasValue ? socialButtons.tiktok.link : '',
      twitterLink: socialButtons.twitter.hasValue ? socialButtons.twitter.link : '',
      themeBanner: 'banner URL',
      step: gsctx?.obSettings?.step === 3 ? gsctx?.obSettings?.step : 2,
    };
    const uniqueDealProducts = _.uniq([...gsctx.dealProducts ?? [], ...productObject ?? []]);
    dispatch({ type: 'UPDATE_GROUPSHOP', payload: { ...gsctx, dealProducts: uniqueDealProducts, obSettings: { ...gsctx.obSettings, ...data } } });

    await addDealProduct({
      variables: {
        updateGroupshopInput: {
          id: gsctx.id,
          dealProducts: uniqueDealProducts,
          obSettings: {
            ...data,
          },
        },
      },
    });

    // if (shop && ownerCode && discountCode) {
    //   Router.push(`/${shop}/deal/${discountCode}/${ownerCode}/3`);
    // }
    if (gsctx?.obSettings?.step === 3) {
      handleClose();
    }
  };

  const getURL = (e: any) => {
    if (e.target.name === 'instagram' && socialButtons.instagram.isChecked) {
      setSocialButtons({
        ...socialButtons,
        instagram: {
          ...socialButtons.instagram,
          link: e.target.value,
          hasValue: URLValidator(e.target.value),
        },
      });
    }
    if (e.target.name === 'pinterest' && socialButtons.pinterest.isChecked) {
      setSocialButtons({
        ...socialButtons,
        pinterest: {
          ...socialButtons.pinterest,
          link: e.target.value,
          hasValue: URLValidator(e.target.value),
        },
      });
    }
    if (e.target.name === 'tiktok' && socialButtons.tiktok.isChecked) {
      setSocialButtons({
        ...socialButtons,
        tiktok: {
          ...socialButtons.tiktok,
          link: e.target.value,
          hasValue: URLValidator(e.target.value),
        },
      });
    }
    if (e.target.name === 'twitter' && socialButtons.twitter.isChecked) {
      setSocialButtons({
        ...socialButtons,
        twitter: {
          ...socialButtons.twitter,
          link: e.target.value,
          hasValue: URLValidator(e.target.value),
        },
      });
    }
  };

  const chooseSocial = (name: string) => {
    setKey(name);
    Object.keys(socialButtons).forEach((ele) => {
      if (ele === name) {
        socialButtons[name].isChecked = true;
      } else {
        socialButtons[ele].isChecked = false;
      }
    });
    setSocialButtons(socialButtons);
  };

  const selectProduct = (id: string) => {
    setSelectedProducts([...selectProducts, id]);
  };

  const removeProduct = (id: string) => {
    setSelectedProducts(selectProducts.filter((ele) => ele !== id));
    setProductArray(productArray.filter((ele) => ele.id !== id));
  };

  const getSelectedProduct = (data: IProduct[], ids: string[]) => {
    setProductArray(data);
    setSelectedProducts(ids);
  };

  return (
    <>
      <div onClick={() => handleShow()} onKeyDown={() => handleShow()} role="button" tabIndex={0}>{}</div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
        backdrop="static"
        dialogClassName={styles.profile__modal}
        contentClassName={styles.profile__modal__content}
      >
        <Modal.Header className={styles.profile__modal__closebtnlg} />
        <div className={styles.profile__modal__imgBox}>
          <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />
        </div>
        <Modal.Body className={styles.profile__modal__body}>
          <div className={styles.profile__modal__body__leftArea}>
            <div className={styles.profile__modal__body__label}>
              Edit your welcome header
            </div>
            <Form.Control type="text" name="ShopTitle" defaultValue={values.ShopTitle} maxLength={50} onKeyUp={(e) => { handleChange(e); }} placeholder="Welcome header" className={styles.profile__modal__body__input} />
            <div className={styles.profile__modal__body__inputCount}>
              {values.ShopTitle?.length ?? 0}
              /50
            </div>
            <span>{Error?.ShopTitle}</span>

            <div className={styles.profile__modal__body__leftArea__titleIcon_row}>
              <div className={styles.profile__modal__body__label}>
                Add social links
              </div>
              <div className={styles.profile__modal__body__leftArea__titleIcon_row__icon}>
                {
                  socialButtons.instagram.isChecked
                    || socialButtons.instagram.hasValue
                    ? <InstagramIcon onClick={() => chooseSocial('instagram')} />
                    : <InstagramIconGrey onClick={() => chooseSocial('instagram')} />
                }
                {
                  socialButtons.pinterest.isChecked
                    || socialButtons.pinterest.hasValue
                    ? <PIcon onClick={() => chooseSocial('pinterest')} />
                    : <PIconGrey onClick={() => chooseSocial('pinterest')} />
                }
                {
                  socialButtons.tiktok.isChecked
                    || socialButtons.tiktok.hasValue
                    ? <TikTokIconBlack onClick={() => chooseSocial('tiktok')} />
                    : <TikTokIcon onClick={() => chooseSocial('tiktok')} />
                }
                {
                  socialButtons.twitter.isChecked
                    || socialButtons.twitter.hasValue
                    ? <TwitterIconBlack onClick={() => chooseSocial('twitter')} />
                    : <TwitterIcon onClick={() => chooseSocial('twitter')} />
                }
                {/* <PIcon onClick={() => chooseSocial('pinterest')} /> */}
                {/* <TikTokIcon onClick={() => chooseSocial('tiktok')} /> */}
                {/* <TwitterIcon onClick={() => chooseSocial('twitter')} /> */}
              </div>
            </div>
            <InputGroup className={styles.profile__modal__body__input_group}>
              <FormControl
                name={key}
                value={socialButtons[key].link}
                placeholder="Select a channel"
                aria-label="Cash Out Method Email"
                aria-describedby="basic-addon2"
                className={styles.profile__modal__body__input}
                onChange={(e) => { getURL(e); }}
              />
              <InputGroup.Text className={styles.profile__modal__body__input}>
                {
                  isURLValid ? <TickIconGreen /> : <TickIconGrey />
                }
              </InputGroup.Text>
            </InputGroup>
            <div className={styles.profile__modal__body__label}>
              Pick a banner and theme
            </div>
            <div className={styles.profile__modal__body__themeIcons}>
              {/* <div className={styles.profile__modal__body__themeIcons__theme}>
                <Theme5Icon />
                <span className={styles.profile__modal__body__themeIcons__theme__tick}>
                  <TickIcon />
                </span>
              </div>
              <Theme5Icon />
              <Theme5Icon />
              <Theme5Icon />
              <Theme5Icon />
              <Theme5Icon />
              <Theme5Icon />
              <Theme5Icon />
              <Theme5Icon />
              <Theme5Icon />
              <Theme5Icon />
              <Theme5Icon /> */}

              {
                themeBanner.map((ele) => (
                  <>
                    <div className={styles.profile__modal__body__themeIcons__theme}>
                      <img
                        src={ele.banner.src}
                        onClick={() => setSelectedBanner(ele)}
                        alt="banner"
                      />
                      <span className={styles.profile__modal__body__themeIcons__theme__tick}>
                        {selectedBanner!?.key === ele.key && <TickIcon />}
                      </span>
                    </div>
                  </>
                ))
              }
            </div>
            <div className={styles.profile__modal__body__label}>
              Add up to two products to your Groupshop
            </div>
            <div className={styles.profile__modal__body__descrip}>
              <div>
                Click ‘Add a Product’ to select the products you love from
                &nbsp;
                {gsctx.store?.brandName}
                {' '}
                and add them to your Groupshop.
              </div>
              <div className={styles.profile__modal__body__descrip__icon}>👉</div>
            </div>

            <div className="d-flex justify-content-start align-items-center my-4">
              <Button
                className={styles.profile__modal__body__btn}
                onClick={moveForward}
              >
                Save Choices
              </Button>
              <div className={styles.profile__modal__body__btnskip} onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
                Skip for now
              </div>
            </div>
          </div>

          <div className={styles.profile__modal__body__rightArea}>
            <div className={styles.profile__modal__body__rightArea__rect}>
              {/* <div
              className={styles.profile__modal__body__rightArea__banner}
              style={{ backgroundImage: `url(${bannerImage})` }}> */}
              <div
                className={styles.profile__modal__body__rightArea__banner}
                style={{ backgroundImage: `url(${selectedBanner?.banner.src})` }}
              >
                <div className={styles.profile__modal__body__rightArea__banner__txt}>
                  {values.ShopTitle}
                </div>
              </div>
              <div className={styles.profile__modal__body__rightArea__productRow}>
                {/* <div className={styles.profile__modal__body__rightArea__productRow__product}>
                  <Button
                    className={styles.profile__modal__body__btn1}
                  >
                    Add A Product
                  </Button>
                </div> */}

                <ProductCard
                  isrc="/images/empty.png"
                  className={styles.profile__modal__body__pcard}
                  imgOverlay={(
                    <>
                      <Button
                        className={styles.profile__modal__body__pcard__btn}
                        onClick={() => setShowProduct(true)}
                        disabled={false}
                      >
                        ADD A PRODUCT
                      </Button>
                    </>
                  )}
                />

                {productArray?.map((ele: any) => (
                  <ProductCard
                    isrc={ele.featuredImage}
                    className={styles.profile__modal__body__pcard}
                    imgOverlay={(
                      <>
                        {selectProducts.includes(ele.id) ? (
                          <div className="m-1 d-flex justify-content-between">
                            <div className={styles.profile__modal__body__pcard__tagPrice}>
                              {/* {`${30}% OFF`} */}
                              {`${currencySymbol}${(+ele.price - dPrice(+(ele.price))).toFixed(2).replace('.00', '')} OFF`}
                            </div>
                            <div
                              className={styles.profile__modal__body__pcard__crossIcon}
                              // onClick={() => setShowProduct(false)}
                              onClick={() => removeProduct(ele.id)}
                              onKeyDown={handlesetShowProduct}
                              role="button"
                              tabIndex={-1}
                            >
                              <CrossIcon />
                            </div>
                          </div>
                        ) : (
                          <Button
                            className={styles.profile__modal__body__pcard__btn}
                            // onClick={() => setShowProduct(true)}
                            onClick={() => selectProduct(ele.id)}
                            disabled={false}
                          >
                            ADD A PRODUCT
                          </Button>
                        )}
                      </>
                    )}
                  >
                    <div className={styles.profile__modal__body__pcard__nameArea}>
                      <div className={styles.profile__modal__body__pcard__nameArea__name}>
                        {ele.title}
                      </div>
                      <div className="mt-1">
                        <span className={styles.profile__modal__body__pcard__nameArea__price}>
                          {currencySymbol}

                          {(+(ele.price)).toFixed(2).toString().replace('.00', '')}
                        </span>
                        <span className={styles.profile__modal__body__pcard__nameArea__priceBold}>
                          {currencySymbol}
                          {dPrice(+(ele.price)).toFixed(2).toString().replace('.00', '')}
                        </span>
                      </div>
                    </div>
                  </ProductCard>
                ))}
                {/* <ProductCard
                  isrc="/images/empty.png"
                  className={styles.profile__modal__body__pcard}
                  imgOverlay={(
                    <>
                      {showProduct === true ? (
                        <div className="m-1 d-flex justify-content-between">
                          <div className={styles.profile__modal__body__pcard__tagPrice}>
                            {`${30}% OFF`}
                          </div>
                          <div
                            className={styles.profile__modal__body__pcard__crossIcon}
                            onClick={() => setShowProduct(false)}
                            onKeyDown={handlesetShowProduct}
                            role="button"
                            tabIndex={-1}
                          >
                            <CrossIcon />
                          </div>
                        </div>
                      ) : (
                        <Button
                          className={styles.profile__modal__body__pcard__btn}
                          onClick={() => setShowProduct(true)}
                          disabled={false}
                        >
                          ADD A PRODUCT
                        </Button>
                      )}
                    </>
                  )}
                >
                  <div className={styles.profile__modal__body__pcard__nameArea}>
                    <div className={styles.profile__modal__body__pcard__nameArea__name}>
                      Pony Rider
                    </div>
                    <div className="mt-1">
                      <span className={styles.profile__modal__body__pcard__nameArea__price}>
                        $50
                      </span>
                      <span className={styles.profile__modal__body__pcard__nameArea__priceBold}>
                        $20
                      </span>
                    </div>
                  </div>
                </ProductCard>
                <ProductCard
                  isrc="/images/empty.png"
                  className={styles.profile__modal__body__pcard}
                  imgOverlay={(
                    <>
                      {showProduct === true ? (
                        <div className="m-1 d-flex justify-content-between">
                          <div className={styles.profile__modal__body__pcard__tagPrice}>
                            {`${30}% OFF`}
                          </div>
                          <div
                            className={styles.profile__modal__body__pcard__crossIcon}
                            onClick={() => setShowProduct(false)}
                            onKeyDown={handlesetShowProduct}
                            role="button"
                            tabIndex={-1}
                          >
                            <CrossIcon />
                          </div>
                        </div>
                      ) : (
                        <Button
                          className={styles.profile__modal__body__pcard__btn}
                          onClick={() => setShowProduct(true)}
                          disabled={false}
                        >
                          ADD A PRODUCT
                        </Button>
                      )}
                    </>
                  )}
                >
                  <div className={styles.profile__modal__body__pcard__nameArea}>
                    <div className={styles.profile__modal__body__pcard__nameArea__name}>
                      Pony Rider
                    </div>
                    <div className="mt-1">
                      <span className={styles.profile__modal__body__pcard__nameArea__price}>
                        $50
                      </span>
                      <span className={styles.profile__modal__body__pcard__nameArea__priceBold}>
                        $20
                      </span>
                    </div>
                  </div>
                </ProductCard>
                <ProductCard
                  isrc="/images/empty.png"
                  className={styles.profile__modal__body__pcard}
                  imgOverlay={(
                    <>
                      {showProduct === true ? (
                        <div className="m-1 d-flex justify-content-between">
                          <div className={styles.profile__modal__body__pcard__tagPrice}>
                            {`${30}% OFF`}
                          </div>
                          <div
                            className={styles.profile__modal__body__pcard__crossIcon}
                            onClick={() => setShowProduct(false)}
                            onKeyDown={handlesetShowProduct}
                            role="button"
                            tabIndex={-1}
                          >
                            <CrossIcon />
                          </div>
                        </div>
                      ) : (
                        <Button
                          className={styles.profile__modal__body__pcard__btn}
                          onClick={() => setShowProduct(true)}
                          disabled={false}
                        >
                          ADD A PRODUCT
                        </Button>
                      )}
                    </>
                  )}
                >
                  <div className={styles.profile__modal__body__pcard__nameArea}>
                    <div className={styles.profile__modal__body__pcard__nameArea__name}>
                      Pony Rider
                    </div>
                    <div className="mt-1">
                      <span className={styles.profile__modal__body__pcard__nameArea__price}>
                        $50
                      </span>
                      <span className={styles.profile__modal__body__pcard__nameArea__priceBold}>
                        $20
                      </span>
                    </div>
                  </div>
                </ProductCard> */}
              </div>
            </div>
            <span>{Error.Product}</span>
          </div>
        </Modal.Body>

        <div className={styles.profile__modal__mobile}>
          <div className={styles.profile__modal__mobile__navigation} onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
            <LeftArrowIcon />
            <span className={styles.profile__modal__mobile__navigation__txt}>Back</span>
          </div>
          <div className={styles.profile__modal__mobile__preview}>
            Preview your Groupshop page
          </div>
          <div className={styles.profile__modal__mobile__iconHeaderRow}>
            <div><LeEsableIcon /></div>
            <div className={styles.profile__modal__mobile__iconHeaderRow__search}>
              <SearchIcon />
              <CartIcon />
            </div>
          </div>
          <Hero bannerImage={bannerImage}>
            <div className={styles.profile__modal__mobile__bannerArea}>
              <div className={styles.profile__modal__mobile__bannerArea__banner1}>
                <div className={styles.profile__modal__mobile__bannerArea__banner1__Txt}>
                  Welcome to Elisa’s Groupshop
                </div>
                {editHeader === false ? (
                  <div
                    className={styles.profile__modal__mobile__bannerArea__banner1__editBtn}
                    onClick={() => setEditHeader(true)}
                    onKeyDown={() => setEditHeader(true)}
                    role="button"
                    tabIndex={0}
                  >
                    Edit header
                  </div>
                ) : (
                  <div
                    className={styles.profile__modal__mobile__bannerArea__banner1__editBtn}
                    onClick={() => setEditHeader(false)}
                    onKeyDown={() => setEditHeader(false)}
                    role="button"
                    tabIndex={0}
                  >
                    Done
                  </div>
                )}

              </div>
              <div className={styles.profile__modal__mobile__bannerArea__banner2}>
                <div className={styles.profile__modal__mobile__bannerArea__banner2__icons}>
                  <InstagramIcon />
                  <PIcon />
                  <TikTokIcon />
                  <TwitterIcon />
                </div>
                <div className={styles.profile__modal__mobile__bannerArea__banner2__editBtn}>
                  Connect your social
                </div>
              </div>
            </div>
          </Hero>
          <div className={styles.profile__modal__mobile__body}>
            <div className={styles.profile__modal__mobile__body__btnSwitch}>
              <Button
                className={styles.profile__modal__mobile__body__btnSwitch__btn}
                onClick={handleClose}
              >
                Products
              </Button>
              <Button
                className={styles.profile__modal__mobile__body__btnSwitch__btn1}
                onClick={handleClose}
              >
                Theme
              </Button>
            </div>
            <div className={styles.profile__modal__mobile__body__txt}>
              Add your favorite Le Sable products to your  Groupshop & customize your theme
            </div>

            {editHeader === false ? (
              <div className={styles.profile__modal__mobile__body__productRow}>

                <ProductCard
                  isrc="/images/empty.png"
                  className={styles.profile__moda__mobile__body__pcard}
                  imgOverlay={(
                    <>
                      {showProduct === true ? (
                        <div className="m-1 d-flex justify-content-between">
                          <div className={styles.profile__modal__mobile__body__pcard__tagPrice}>
                            {`${30}% OFF`}
                          </div>
                          <div
                            className={styles.profile__modal__mobile__body__pcard__crossIcon}
                            onClick={() => setShowProduct(false)}
                            onKeyDown={handlesetShowProduct}
                            role="button"
                            tabIndex={-1}
                          >
                            <CrossIcon />
                          </div>
                        </div>
                      ) : (
                        <Button
                          className={styles.profile__modal__mobile__body__pcard__btn}
                          onClick={() => setShowProduct(true)}
                          disabled={false}
                        >
                          ADD A PRODUCT
                        </Button>
                      )}
                    </>
                  )}
                >
                  <div className={styles.profile__modal__mobile__body__pcard__nameArea}>
                    <div className={styles.profile__modal__mobile__body__pcard__nameArea__name}>
                      Lin Summer Wrap
                    </div>
                    <div className="mt-1">
                      <span className={styles.profile__modal__mobile__body__pcard__nameArea__price}>
                        $50
                      </span>
                      <span
                        className={styles.profile__modal__mobile__body__pcard__nameArea__priceBold}
                      >
                        $20
                      </span>
                    </div>
                  </div>
                </ProductCard>
                <ProductCard
                  isrc="/images/empty.png"
                  className={styles.profile__moda__mobile__body__pcard}
                  imgOverlay={(
                    <>
                      {showProduct === true ? (
                        <div className="m-1 d-flex justify-content-between">
                          <div className={styles.profile__modal__mobile__body__pcard__tagPrice}>
                            {`${30}% OFF`}
                          </div>
                          <div
                            className={styles.profile__modal__mobile__body__pcard__crossIcon}
                            onClick={() => setShowProduct(false)}
                            onKeyDown={handlesetShowProduct}
                            role="button"
                            tabIndex={-1}
                          >
                            <CrossIcon />
                          </div>
                        </div>
                      ) : (
                        <Button
                          className={styles.profile__modal__mobile__body__pcard__btn}
                          onClick={() => setShowProduct(true)}
                          disabled={false}
                        >
                          ADD A PRODUCT
                        </Button>
                      )}
                    </>
                  )}
                >
                  <div className={styles.profile__modal__mobile__body__pcard__nameArea}>
                    <div className={styles.profile__modal__mobile__body__pcard__nameArea__name}>
                      La Petite Satin
                    </div>
                    <div className="mt-1">
                      <span className={styles.profile__modal__mobile__body__pcard__nameArea__price}>
                        $50
                      </span>
                      <span
                        className={styles.profile__modal__mobile__body__pcard__nameArea__priceBold}
                      >
                        $20
                      </span>
                    </div>
                  </div>
                </ProductCard>
                <ProductCard
                  isrc="/images/empty.png"
                  className={styles.profile__moda__mobile__body__pcard}
                  imgOverlay={(
                    <>
                      {showProduct === true ? (
                        <div className="m-1 d-flex justify-content-between">
                          <div className={styles.profile__modal__mobile__body__pcard__tagPrice}>
                            {`${30}% OFF`}
                          </div>
                          <div
                            className={styles.profile__modal__mobile__body__pcard__crossIcon}
                            onClick={() => setShowProduct(false)}
                            onKeyDown={handlesetShowProduct}
                            role="button"
                            tabIndex={-1}
                          >
                            <CrossIcon />
                          </div>
                        </div>
                      ) : (
                        <Button
                          className={styles.profile__modal__mobile__body__pcard__btn}
                          onClick={() => setShowProduct(true)}
                          disabled={false}
                        >
                          ADD A PRODUCT
                        </Button>
                      )}
                    </>
                  )}
                >
                  <div className={styles.profile__modal__mobile__body__pcard__nameArea}>
                    <div className={styles.profile__modal__mobile__body__pcard__nameArea__name}>
                      Pony Rider
                    </div>
                    <div className="mt-1">
                      <span className={styles.profile__modal__mobile__body__pcard__nameArea__price}>
                        $50
                      </span>
                      <span
                        className={styles.profile__modal__mobile__body__pcard__nameArea__priceBold}
                      >
                        $20
                      </span>
                    </div>
                  </div>
                </ProductCard>
                <ProductCard
                  isrc="/images/empty.png"
                  className={styles.profile__moda__mobile__body__pcard}
                  imgOverlay={(
                    <>
                      {showProduct === true ? (
                        <div className="m-1 d-flex justify-content-between">
                          <div className={styles.profile__modal__mobile__body__pcard__tagPrice}>
                            {`${30}% OFF`}
                          </div>
                          <div
                            className={styles.profile__modal__mobile__body__pcard__crossIcon}
                            onClick={() => setShowProduct(false)}
                            onKeyDown={handlesetShowProduct}
                            role="button"
                            tabIndex={-1}
                          >
                            <CrossIcon />
                          </div>
                        </div>
                      ) : (
                        <Button
                          className={styles.profile__modal__mobile__body__pcard__btn}
                          onClick={() => setShowProduct(true)}
                          disabled={false}
                        >
                          ADD A PRODUCT
                        </Button>
                      )}
                    </>
                  )}
                >
                  <div className={styles.profile__modal__mobile__body__pcard__nameArea}>
                    <div className={styles.profile__modal__mobile__body__pcard__nameArea__name}>
                      Pony Rider
                    </div>
                    <div className="mt-1">
                      <span className={styles.profile__modal__mobile__body__pcard__nameArea__price}>
                        $50
                      </span>
                      <span
                        className={styles.profile__modal__mobile__body__pcard__nameArea__priceBold}
                      >
                        $20
                      </span>
                    </div>
                  </div>
                </ProductCard>
              </div>
            ) : (
              <div className={styles.profile__modal__mobile__body__icons}>
                {/* <ThemeBlack />
                <ThemeBlack />
                <ThemeBlack />
                <ThemeBlack />
                <ThemeBlack />
                <ThemeBlack />
                <ThemeBlack />
                <ThemeBlack />
                <ThemeBlack /> */}
              </div>
            )}

            <div className={styles.profile__modal__mobile__body__btnArea}>
              <Button
                className={styles.profile__modal__mobile__body__btnArea__btn}
                onClick={moveForward}
              >
                Save Settings
              </Button>
              <div className={styles.profile__modal__mobile__body__btnArea__btnskip} onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
                Skip
              </div>
            </div>
          </div>
        </div>

      </Modal>
      <ProductsSearch
        show={showProduct}
        handleClose={() => { setShowProduct(false); }}
        pending={false}
        getData={getSelectedProduct}
        setData={{ productArray, selectProducts }}
        allowSelectAll
      />
    </>
  );
};

export default OnBoardProfileRegular;
