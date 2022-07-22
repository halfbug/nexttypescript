/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { GET_PARTNER_GROUPSHOP } from 'store/store.graphql';
import Header from 'components/Layout/HeaderGS/HeaderGS';
import Counter from 'components/Layout/Counter/Counter';
import styles from 'styles/Groupshop.module.scss';
// import { StoreContext } from 'store/store.context';
import {
  Col, Container, Dropdown, Row,
} from 'react-bootstrap';
import Brand from 'components/Groupshop/Brand/Brand';
import Members from 'components/Groupshop/Members/Members';
import IconButton from 'components/Buttons/IconButton';
import Icon from 'assets/images/small cone.svg';
import ArrowSort from 'assets/images/ArrowSort.svg';
import DownArrow from 'assets/images/DownArrowSmall.svg';
import {
  Handbag, Plus, Search,
} from 'react-bootstrap-icons';
import Hero from 'components/Groupshop/Hero/Hero';
import ProductGrid from 'components/Groupshop/ProductGrid/ProductGrid';
import { IGroupshop, Member } from 'types/groupshop';
import { IProduct } from 'types/store';
import ProductsSearch from 'components/Groupshop/ProductsSearch/ProductsSearch';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import Cart from 'components/Groupshop/Cart/Cart';
import useCode from 'hooks/useCode';
import useAlert from 'hooks/useAlert';
import Button from 'components/Buttons/Button/Button';
import Footer from 'components/Layout/FooterGS/FooterGS';
import InfoBox from 'components/Groupshop/InfoBox/InfoBox';
import useDetail from 'hooks/useDetail';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import useUtilityFunction from 'hooks/useUtilityFunction';
import Head from 'next/head';
import BigBannerBox from 'components/Groupshop/BigBannerBox/BigBannerBox';
import SmallBannerBox from 'components/Groupshop/SmallBannerBox/SmallBannerBox';
import SmallBannerBox2 from 'components/Groupshop/SmallBannerBox2/SmallBannerBox2';
import TickCircle from 'assets/images/tick-circle.svg';
import { useMediaQuery } from 'react-responsive';
import Router, { useRouter } from 'next/router';
import useGtm from 'hooks/useGtm';
import useTopBanner from 'hooks/useTopBanner';
import useTopPicks from 'hooks/useTopPicks';
import useProducts from 'hooks/useProducts';
import ShoppingBoxMobile from 'components/Groupshop/ShoppingBoxMobile/ShoppingBoxMobile';
import RewardBox2 from 'components/Groupshop/RewardBox/RewardBox2';
import { PartnerGroupshopContext, gspInit } from 'store/partner-groupshop.context';
import useDeal from 'hooks/useDeal';
import ProductDetail from 'components/Groupshop/ProductDetail/ProductDetail';

const GroupShop: NextPage = () => {
  const { gsctx, dispatch } = useContext(PartnerGroupshopContext);
  const { AlertComponent, showError } = useAlert();
  const { shop, discountCode, status } = useCode();
  const isModalForMobile = useMediaQuery({
    query: '(max-width: 475px)',
  });
  const { query: { ins } } = useRouter();

  const {
    loading,
    error,
    data: { partnerGroupshop } = { partnerGroupshop: gspInit },
  } = useQuery<{ partnerGroupshop: IGroupshop }, { code: string | undefined}>(
    GET_PARTNER_GROUPSHOP,
    {
      variables: { code: discountCode },
      notifyOnNetworkStatusChange: true,
      skip: !discountCode,
    },
  );
  console.log('🚀 ~ file: [...code].tsx ~ line 68 ~ groupshop', partnerGroupshop);

  // load all products
  useProducts(`${shop}.myshopify.com`);

  console.log('partner deal');

  const [allProducts, setallProducts] = useState<IProduct[] | undefined>(
    undefined,
  );
  const [bestSeller, setbestSeller] = useState<IProduct[] | undefined>(
    undefined,
  );
  const [member, setmember] = useState<Member | undefined>(undefined);
  const [showps, setshowps] = useState<boolean>(false);
  const [showCart, setshowCart] = useState<boolean>(false);
  const [pending, setpending] = useState<boolean>(true);
  const [bannerDiscount, setbannerDiscount] = useState<(string | undefined)[] | undefined
    >(undefined);
  const [newPopularPrd, setNewPopularPrd] = useState<IProduct[]>();
  const [showRewards, setShowRewards] = useState<boolean>(false);
  const [storeLogo, setStoreLogo] = useState<string>('');
  const [bannerImage, setBannerImage] = useState<string>('');

  useEffect(() => {
    async function gets3headerBanner() {
      if (partnerGroupshop && partnerGroupshop.id && pending) {
        console.log('🚀 ~ file: [...code].tsx ~ useEffect ~ data.groupshop', partnerGroupshop);
        const pctx: IGroupshop = {
          ...partnerGroupshop,
          members: partnerGroupshop.members ?? [],
        };

        dispatch({ type: 'UPDATE_GROUPSHOP', payload: pctx });
        setpending(false);
        setallProducts(partnerGroupshop?.allProducts);
        setbestSeller(partnerGroupshop?.bestSeller);
        // setmember(partnerGroupshop?.members[0]);
        if (partnerGroupshop?.campaign?.settings?.imageUrl) {
          const key = getKeyFromS3URL(partnerGroupshop?.campaign?.settings?.imageUrl ?? '');
          const bannerImageS3 = await getSignedUrlS3(key);
          if (bannerImageS3) setBannerImage(bannerImageS3);
        } else {
          setBannerImage('/images/bg.jpg');
        }
      }
    }
    gets3headerBanner();
  }, [partnerGroupshop, pending]);

  const {
    gsURL,
    gsShortURL,
    clientDealProducts,
    discount,
    getDiscounts,
    isExpired,
    currencySymbol,
    isInfluencer,
    isGSnRef,
    isInfluencerGS,
    addedProductsByInfluencer,
    addedByRefferal,
  } = useDeal();

  const { googleEventCode, googleButtonCode } = useGtm();

  const {
    // members: [{
    //   products: [{
    //     id, price, title, featuredImage,
    //   }] = [{
    //     products: [{
    //       id: '', price: '', title: '', featuredImage: '',
    //     }],
    // memberDetails: [{
    //   orderId, customerInfo,
    //   comissionAmount, orderAmount,
    // }] = [{
    //   orderId: '',
    //   customerInfo: {
    //     firstName: '', lastName: '', email: '', ip: '', phone: '',
    //   },
    //   comissionAmount: 0,
    //   orderAmount: 0,
    // }],
    memberDetails = [],
    store: { brandName } = { brandName: '' },
    store: { logoImage } = { logoImage: '' },
    dealProducts = [],
    popularProducts = [],
    discountCode: { title },
  } = gsctx;
  const {
    findInArray, filterArray, getSignedUrlS3, getKeyFromS3URL,
  } = useUtilityFunction();
  useEffect(() => {
    setallProducts(
      [...(allProducts ?? [])]?.sort((a, b) => a.title.localeCompare(b.title)),
    );
    setbannerDiscount(getDiscounts());
    // fillAddedPrdInCTX();
  }, [gsctx, gsctx.addedProducts]);

  // useEffect(() => {
  //   if ((!dealProducts || dealProducts.length === 0) && gsctx.discountCode.title) {
  //     setshowps(true);
  //   } else if (dealProducts && dealProducts.length > 0) setshowps(false);
  // }, [dealProducts]);

  useEffect(() => {
    async function gets3logo() {
      const key = getKeyFromS3URL(logoImage ?? '');
      const logoS3 = await getSignedUrlS3(key);
      // console.log('🚀 [...code] logoS3', logoS3);
      if (logoS3) setStoreLogo(logoS3);
    }
    gets3logo();
  }, [logoImage]);
  useEffect(() => {
    // mixing popular produt with topPicks to complete the count of 4 if popular are less.
    if (popularProducts?.length) {
      if (popularProducts.length < 4) {
        // removing popular prd from topPicks so no duplication
        const uniqueBestSeller = filterArray(
          bestSeller as any[],
          popularProducts as any[],
          'id',
          'id',
        ).slice(0, 4 - popularProducts.length);
        // console.log('🚀[...code].tsx topPicks', topPicks);
        // console.log('🚀[...code].tsx popularProduct', popularProducts);
        // console.log('🚀[...code].tsx uniqueBestSeller', uniqueBestSeller);
        const newPopularArr = Array.from(
          new Set([...(popularProducts ?? []), ...(uniqueBestSeller ?? [])]),
        );
        setNewPopularPrd([...newPopularArr]);
      } else {
        setNewPopularPrd([...(popularProducts ?? [])]);
      }
    }
  }, [popularProducts, bestSeller]);

  useEffect(() => {
    if (gsctx.cart && gsctx?.cart?.length > 0) {
      setshowCart(true);
    }
  }, [gsctx.cart]);

  const { text, cashBackText } = useTopBanner();

  const {
    showDetail, setshowDetail, sProduct, setsProduct,
  } = useDetail(allProducts);

  const handleAddProduct = () => {
    googleButtonCode('addproduct-button');
    if (gsctx?.totalProducts < 101) {
      const cprod = clientDealProducts()?.length || 0;
      if (cprod >= 5 && !isInfluencer) {
        showError(
          'Only 5 products can be added to this Group Shop per person.',
        );
      } else {
        setshowps(true);
      }
    } else showError('Groupshop is full you can not add more products to it');
  };

  // if (error) {
  //   Router.push('/404');
  //   return <p>groupshop not found</p>;
  // }
  console.log('🚀 ~ file: [...code].tsx ~ line 65 ~ gsctx', gsctx);
  console.log('🚀 ~ file: [...code].tsx ~ line 65 ~ gsctx bestSeller', bestSeller);
  console.log('🚀 ~ file: [...code].tsx ~ line 65 ~ gsctx allProducts', allProducts);

  return (
    <>
      <Head>
        <title>Influencer Groupshop</title>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5GCXJRC');`,
          }}
        />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "bj0ox02vse");`,
          }}
        />
        <script src="https://www.googleoptimize.com/optimize.js?id=OPT-MCBM97Z" />
        <meta name="application-name" content="Groupshop" />

        <meta name="og:type" content="website" />
        <meta name="description" content={`Shop ${gsctx?.store?.brandName} on my Groupshop and get $10 off.`} />
        <meta name="og:title" content="Groupshop" />
        <meta name="description" content={`Shop ${gsctx?.store?.brandName} on my Groupshop and get $10 off.`} />
        <meta name="keywords" content="group, shop, discount, deal" />
        <meta name="og:url" content={gsShortURL ?? gsURL} />
        <link rel="preload" nonce="" href="https://gsnodeimages.s3.amazonaws.com/youngandrecklessdev_linkImage.png" as="image" />
        <meta name="og:image" content="https://gsnodeimages.s3.amazonaws.com/youngandrecklessdev_linkImage.png" />
      </Head>
      <div className={styles.groupshop}>
        <header>
          <Header
            LeftComp={
              <div> </div>
              // <Counter expireDate={gsctx?.expiredAt} pending={pending} />
            }
            RightComp={(
              <InfoBox
                mes="How does this work?"
                brandname={brandName}
                shareUrl={gsShortURL ?? gsURL}
              />
            )}
          />
          <Container fluid className="border-top border-bottom bg-white">
            <Row className={['gx-0', styles.groupshop__top].join(' ')}>
              <Col md={3} xs={3}>
                <div className={styles.groupshop_main_logo}>
                  {logoImage === '' || logoImage === undefined ? (
                    <Brand
                      name={
                        (brandName || '').split(' ').slice(0, 2).join(' ') || ''
                      }
                      pending={pending}
                    />
                  ) : (
                    <img
                      src={storeLogo}
                      alt={`${brandName}`}
                      // alt="d"
                      className="img-fluid"
                    />
                  )}
                </div>
              </Col>
              <Col md={6} className={styles.groupshop__top_members}>
                <h5 className="text-center">
                  Shop or invite your friends to shop to get started!
                </h5>
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <Members
                    names={memberDetails?.map(
                      (mem: any) => `${mem.customerInfo.firstName} ${
                        mem?.customerInfo?.lastName?.charAt(0) || ''
                      }`,
                    )}
                    cashback={[`${currencySymbol}23`, `${currencySymbol}20`]}
                    pending={pending}
                  />
                  <ShareButton
                    placement="bottom"
                    shareurl={gsShortURL ?? gsURL}
                    fullshareurl={gsURL}
                    label="Invite"
                    className={styles.groupshop__top_invite}
                    icon={<Plus size={18} className="me-0 pe-0" />}
                    onClick={() => googleEventCode('invite-share-modal')}
                  />
                </div>
              </Col>
              <Col xs={6} className={styles.groupshop__counter}>
                {/* <h6 className="text-center">Store expires in</h6>
                <div className={styles.groupshop__counter_middle}>
                  <p>
                    <span>
                      {days}
                      D
                    </span>
                    :
                    <span>
                      {hrs}
                      H
                    </span>
                    :
                    <span>
                      {mins}
                      M
                    </span>
                  </p>
                </div> */}
              </Col>
              <Col
                md={3}
                xs={3}
                className={[
                  'text-center text-lg-end m-md-0 p-md-0 m-xl-auto p-xl-auto d-flex justify-content-end align-items-baseline',
                  styles.groupshop__top__left_icons,
                ].join(' ')}
              >
                <ShareButton
                  placement="bottom"
                  shareurl={gsShortURL ?? gsURL}
                  fullshareurl={gsURL}
                  label="Share with friends"
                  onClick={() => googleEventCode('earn-cashback-modal')}
                  className={styles.groupshop__hero_share_btn}
                />
                <IconButton
                  icon={<Search size={24} />}
                  className={styles.groupshop__hero_iconSearchBtn}
                  onClick={handleAddProduct}
                  disabled={isExpired}
                />
                <IconButton
                  icon={<Handbag size={24} />}
                  className={styles.groupshop__hero_iconBtn}
                  onClick={() => setshowCart(true)}
                >
                  <span className={styles.groupshop__hero__cart_count}>
                    {gsctx?.cart && gsctx?.cart?.length > 0
                      ? `(${gsctx?.cart?.length})`
                      : ''}
                  </span>
                </IconButton>
                {/* <p
                  className={[
                    'd-flex align-items-center',
                    styles.groupshop__hero__cart_count,
                  ].join(' ')}
                >
                  (2)
                </p> */}
              </Col>
            </Row>
          </Container>
        </header>
        <Hero bannerImage={bannerImage}>
          <Container className={styles.groupshop__hero__content}>
            <Row className={styles.groupshop__hero_welcome}>
              <Col lg={12}>
                <h3>
                  Welcome to
                  {' '}
                  <span className="text-capitalize">
                    {' '}
                    {gsctx?.partnerDetails?.fname}
                    {' '}
                  </span>
                  ’s Groupshop
                </h3>
                <p>The more friends shop, the more discounts and cashback!</p>
              </Col>
            </Row>
            <Row className="d-flex justify-content-evenly">
              {/* <Col
                md={4}
                className={styles.groupshop__hero__small_banner_right}
              >
                {members.length > 2 && members.length < 6 ? (
                  <div className="d-flex flex-column justify-content-center align-items-center ">
                    <div className="mb-2">Unlocked</div>
                    <SmallBannerBox bannerDiscount={bannerDiscount} />
                    <TickCircle />
                  </div>
                ) : (
                  ''
                )}
              </Col> */}
              <Col md={8} className="text-center mb-5">
                <div className={styles.groupshop__hero_current_reward}>
                  Current Rewards
                </div>
                <div
                  role="button"
                  onClick={() => {
                    setShowRewards(true);
                  }}
                >
                  <BigBannerBox text={text} isInfluencerGS />
                </div>
              </Col>
              {/* <Col md={4} className={styles.groupshop__hero__small_banner_left}>
                {members.length < 5 ? (
                  <div className="d-flex flex-column justify-content-center align-items-center ">
                     <div className="mb-2">Next Rewards</div>
                    <SmallBannerBox2 bannerDiscount={bannerDiscount} />
                    <GradientCircle />
                  </div>
                ) : (
                  ''
                )}
              </Col> */}
            </Row>
            <Row>
              <p className="mb-2 text-center">
                {isInfluencerGS ? '' : <Icon />}
                {' '}
                {isInfluencerGS ? 'earns a reward everytime you shop.' : cashBackText}
              </p>
            </Row>
            <div className="flex-wrap mt-2 d-flex justify-content-center align-items-center">
              <Members
                names={memberDetails?.map(
                  (mem: any) => `${mem.customerInfo.firstName} ${
                    mem.customerInfo?.lastName?.charAt(0) || ''
                  }`,
                )}
                cashback={[`${currencySymbol}23`, `${currencySymbol}20`]}
                pending={pending}
              />
            </div>
            <Row className={['mt-4', styles.groupshop__hero_how_to].join(' ')}>
              <InfoBox mes="How it works" brandname={brandName} shareUrl={gsShortURL ?? gsURL} />
            </Row>
          </Container>
        </Hero>

        <ProductGrid
          xs={6}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          products={addedProductsByInfluencer}
          maxrows={1}
          addProducts={handleAddProduct}
          handleDetail={(prd) => setsProduct(prd)}
          id="curatedby"
        >
          <h2 className={styles.groupshop_col_shoppedby}>
            CURATED BY
            {' '}
            <span className={styles.groupshop_firstName}>
              {gsctx?.partnerDetails?.fname}
            </span>
            {/* !pending && gsctx?.members?.length > 1 */}
            {!pending && gsctx?.members?.length > 1 ? (
              <Dropdown className="d-inline mx-2" align={{ lg: 'start', sm: 'end' }}>
                <Dropdown.Toggle
                  id="dropdown-autoclose-true"
                  variant="outline-primary"
                  className={styles.groupshop_dropdown}
                >
                  +
                  {gsctx?.members?.length - 1}
                  {' '}
                  other
                  {gsctx?.members?.length - 1 > 1 && 's'}
                  <DownArrow />
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.groupshop_dropdownMenu}>
                  {memberDetails?.map((mem: any, index) => (
                    <div className={`${index === 0 ? styles.groupshop_dropdownItem_owner : styles.groupshop_dropdownItem}`}>
                      <Dropdown.Item onClick={() => setmember(mem)}>
                        {index === 0 && '👑 '}
                        {`${
                          mem.customerInfo.firstName
                        } ${
                          mem?.customerInfo?.lastName?.charAt(0) || ''
                        }`}

                      </Dropdown.Item>
                    </div>

                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              ''
            )}
          </h2>
          <p className={styles.groupshop_col_recommendations}>
            Shop from
            {' '}
            {gsctx?.partnerDetails?.fname || ''}
            {' '}
            ’s
            personal favorites and recommendations.
          </p>
        </ProductGrid>
        {addedByRefferal && addedByRefferal.length > 0 ? (
          <ProductGrid
            xs={6}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            products={newPopularPrd ?? []}
            maxrows={1}
            addProducts={handleAddProduct}
            handleDetail={(prd) => setsProduct(prd)}
            id="popularproducts"
          >
            <h2>Popular with the Group</h2>
          </ProductGrid>
        ) : (
          <ProductGrid
            xs={6}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            products={bestSeller ?? []}
            maxrows={1}
            addProducts={handleAddProduct}
            handleDetail={(prd) => setsProduct(prd)}
            id="toppicks"
          >
            <h2>Top Picks</h2>
          </ProductGrid>

        ) }

        <ProductGrid
          xs={6}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          products={allProducts}
          maxrows={3}
          addProducts={handleAddProduct}
          handleDetail={(prd) => setsProduct(prd)}
          showHoverButton
          id="allproducts"
        >
          <div className="position-relative">
            <h2>All Products</h2>
            <div
              className={[
                'position-absolute top-0 end-0',
                styles.groupshop_sort,
              ].join(' ')}
            >
              <Dropdown align="end" drop="down">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  <span
                    className={[
                      'd-none d-sm-inline text-capitalize',
                      styles.groupshop_sort_txt,
                    ].join(' ')}
                  >
                    Sort by
                  </span>
                  {/* <ChevronDown width={8} /> */}
                  <ArrowSort />
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.groupshop_sort_menu}>
                  <Dropdown.Item
                    className={styles.groupshop_sort_menu_item}
                    onClick={() => setallProducts(
                      [...(allProducts ?? [])]?.sort(
                        (a, b) => parseFloat(a.price) - parseFloat(b.price),
                      ),
                    )}
                  >
                    Price (Low to High)
                  </Dropdown.Item>
                  <div className={styles.groupshop_sort_menu_border} />
                  <Dropdown.Item
                    className={styles.groupshop_sort_menu_item}
                    onClick={() => setallProducts(
                      [...(allProducts ?? [])]?.sort(
                        (a, b) => parseFloat(b.price) - parseFloat(a.price),
                      ),
                    )}
                  >
                    Price ( High to Low)
                  </Dropdown.Item>
                  <div className={styles.groupshop_sort_menu_border} />
                  <Dropdown.Item
                    className={styles.groupshop_sort_menu_item}
                    onClick={() => setallProducts(
                      [...(allProducts ?? [])]?.sort((a, b) => a.title.localeCompare(b.title)),
                    )}
                  >
                    Name (a-z)
                  </Dropdown.Item>
                  <div className={styles.groupshop_sort_menu_border} />
                  <Dropdown.Item
                    className={styles.groupshop_sort_menu_item}
                    onClick={() => setallProducts(
                      [...(allProducts ?? [])]
                        ?.sort((a, b) => a.title.localeCompare(b.title))
                        .reverse(),
                    )}
                  >
                    Name (z-a)
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </ProductGrid>
        <Row className="w-100 align-items-center text-center justify-content-center my-4 mx-0">
          <Col className="d-flex justify-content-center flex-column">
            <p>Don’t see what you like?</p>
            <Button
              className={['align-self-center my-2 px-5 py-2'].join(' ')}
              onClick={handleAddProduct}
            >
              Add a Product
            </Button>
          </Col>
        </Row>
        {/* <Footer LeftComp={undefined} RightComp={undefined} /> */}
        <ProductsSearch
          show={(showps || dealProducts?.length < 1) && title !== ''}
          handleClose={() => setshowps(false)}
        />
        <ProductDetail
          show={showDetail}
          handleClose={() => setshowDetail(false)}
          product={sProduct}
        />
        <Cart
          show={showCart}
          setShow={setshowCart}
          handleClose={() => setshowCart(false)}
          product={undefined}
          handleDetail={(prd) => setsProduct(prd)}
        />
        <AlertComponent />
        {/* <RewardBox2
          show={showRewards}
          discount={discount}
          shareurl={gsShortURL ?? gsURL}
          fullshareurl={gsURL}
          handleClose={() => setShowRewards(false)}
        /> */}
        {/* {isModalForMobile && (
        <div>
          <ShoppingBoxMobile shareurl={gsShortURL ?? gsURL} />
        </div>
        )} */}
      </div>
    </>
  );
};

export default GroupShop;
