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
import QRClickIcon from 'assets/images/qr-click.svg';
import IconButton from 'components/Buttons/IconButton';
import Icon from 'assets/images/small cone.svg';
import ArrowSort from 'assets/images/ArrowSort.svg';
import DownArrow from 'assets/images/DownArrowSmall.svg';
import {
  Handbag, Plus, Search,
} from 'react-bootstrap-icons';
import Hero from 'components/Groupshop/Hero/Hero';
import ProductGrid from 'components/Groupshop/ProductGrid/ProductGrid';
import { IGroupshop, Member, PartnerMember } from 'types/groupshop';
import { IProduct } from 'types/store';
import ProductsSearch from 'components/Groupshop/ProductsSearch/ProductsSearch';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import Cart from 'components/Groupshop/Cart/Cart';
import useCode from 'hooks/useCode';
import useAlert from 'hooks/useAlert';
import Button from 'components/Buttons/Button/Button';
import Footer from 'components/Layout/FooterGS/FooterGS';
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
import useSKU from 'hooks/useSKU';
import ProductDetail from 'components/Groupshop/ProductDetail/ProductDetail';
import usePopularInfluencer from 'hooks/usePopularProductInfluencer';
import InfoBox from 'components/Influencer/InfoBox/InfoBox';
import ExpireModal from 'components/Influencer/ExpireModal/ExpireModal';
import Link from 'next/link';
import LinkShareMobileView from 'components/LinkShare/LinkShareMobileView';
import OBWelcomeInfluencer from 'components/Influencer/OnBoardWelcomeInfluencer';
import useBanner from 'hooks/useBanner';
import useLogo from 'hooks/useLogo';
import QRBox from 'components/Groupshop/QRBox/QRBox';

const GroupShop: NextPage<{ meta: any }> = ({ meta }: { meta: any }) => {
  // console.log({ meta });
  const { gsctx, dispatch } = useContext(PartnerGroupshopContext);
  const { AlertComponent, showError } = useAlert();
  const { shop, discountCode, status } = useCode();
  const isModalForMobile = useMediaQuery({
    query: '(max-width: 475px)',
  });
  const { query: { ins } } = useRouter();
  const {
    SKU, hideTopPicks, hidePopular, hideSection,
  } = useSKU();
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

  const [allProducts, setallProducts] = useState<IProduct[] | undefined>(
    undefined,
  );
  const [bestSeller, setbestSeller] = useState<IProduct[] | undefined>(
    undefined,
  );
  const [member, setmember] = useState<Member | undefined>(undefined);
  const [showps, setshowps] = useState<boolean>(false);
  const [showob1, setshowob1] = useState<boolean>(false);
  const [showCart, setshowCart] = useState<boolean>(false);
  const [pending, setpending] = useState<boolean>(true);
  const [bannerDiscount, setbannerDiscount] = useState<(string | undefined)[] | undefined
    >(undefined);
  const [newPopularPrd, setNewPopularPrd] = useState<IProduct[]>();
  console.log('🚀 ~ file: [...code].tsx ~ line 110 ~ newPopularPrd', newPopularPrd);
  const [showRewards, setShowRewards] = useState<boolean>(false);
  const [showExpiredModel, setShowExpiredModel] = useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [partnerMembers, setpartnerMembers] = useState<PartnerMember[]>([{
    customerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    orderId: '',
  }]);
  useEffect(() => {
    if (partnerGroupshop && partnerGroupshop.id && pending) {
      const pctx: IGroupshop = {
        ...partnerGroupshop,
        members: partnerGroupshop.members ?? [],
      };
      console.log('=== update gs partner ...code ');

      dispatch({ type: 'UPDATE_GROUPSHOP', payload: pctx });
      setpending(false);
      setallProducts(partnerGroupshop?.allProducts?.filter(
        (item) => item.outofstock === false,
      ));
      setbestSeller(partnerGroupshop?.bestSeller);
      const expireStatus = partnerGroupshop?.isActive !== true;
      setShowExpiredModel(expireStatus);
    }
  }, [partnerGroupshop, pending]);
  // banner image and logo load
  const bannerImage = useBanner();
  console.log('🚀 ~ file: [...code].tsx ~ line 143 ~ bannerImage', bannerImage);
  const storeLogo = useLogo();
  const {
    gsURL,
    gsShortURL,
    clientDealProducts,
    discount,
    getDiscounts,
    socialText,
    isExpired,
    currencySymbol,
    isInfluencer,
    isGSnRef,
    isInfluencerGS,
    addedProductsByInfluencer,
    addedByRefferal,
    checkCustomerDealProducts,
    formatNameCase,
    leftOverProducts,
  } = useDeal();

  const { googleEventCode, googleButtonCode } = useGtm();
  console.log(showRewards, 'showRewards');

  const {
    memberDetails = [],
    store: { brandName, shop: fullStoreName } = { brandName: '', shop: '' },
    store: { logoImage } = { logoImage: '' },
    dealProducts,
    popularProducts = [],
    discountCode: { title },
    refferalProducts, influencerProducts,
  } = gsctx;
  console.log('🚀 ~ file: [...code].tsx ~ line 183 ~ popularProducts', popularProducts);
  const { topPicks } = useTopPicks();
  const {
    findInArray, filterArray, getSignedUrlS3, getKeyFromS3URL, uniqueArray,
  } = useUtilityFunction();
  useEffect(() => {
    setallProducts(
      [...(allProducts ?? [])]?.sort((a, b) => a.title.localeCompare(b.title)),
    );
    setbannerDiscount(getDiscounts());
    // fillAddedPrdInCTX();
  }, [gsctx]);

  useEffect(() => {
    if (dealProducts && dealProducts.length < 1 && showps === false) {
      setshowob1(true);
    } else {
      setshowob1(false);
    }
  }, [dealProducts, showps]);

  useEffect(() => {
    // mixing popular produt with topPicks to complete the count of 4 if popular are less.
    if (popularProducts?.length) {
      if (popularProducts.length < 4) {
        // removing popular prd  and curated prd from topPicks so no duplication
        const finalTP1 = uniqueArray(filterArray(topPicks ?? [], popularProducts ?? [], 'id', 'id'));
        const finalTP2 = uniqueArray(filterArray(finalTP1 ?? [], gsctx?.influencerProducts ?? [], 'id', 'id'));
        const newPopularArr = Array.from(
          new Set([...(popularProducts ?? []),
            ...(finalTP2.slice(0, 4 - popularProducts.length) ?? [])]),
        );
        setNewPopularPrd(_.uniq([...newPopularArr]));
      } else {
        setNewPopularPrd(_.uniq([...(popularProducts ?? [])]));
      }
    }
  }, [popularProducts, topPicks]);

  const { popularShuffled } = usePopularInfluencer(newPopularPrd);

  useEffect(() => {
    if (gsctx.cart && gsctx?.cart?.length > 0) {
      setshowCart(true);
    }
  }, [gsctx.cart]);
  useEffect(() => {
    const arr = gsctx?.memberDetails ?? [];
    const ownerMember = [{
      customerInfo: {
        firstName: gsctx?.partnerDetails?.fname ?? '',
        lastName: gsctx?.partnerDetails?.lname ?? '',
        email: gsctx?.partnerDetails?.email ?? '',
        phone: '',
      },
      orderId: '',
    }];
    setpartnerMembers([...ownerMember, ...gsctx.memberDetails ?? []]);
  }, [gsctx?.partnerDetails, gsctx.memberDetails]);

  const { text, cashBackText } = useTopBanner();

  const {
    showDetail, setshowDetail, sProduct, setsProduct, showQrscan, setshowQrscan,
  } = useDetail(allProducts);
  console.log('🚀[...code].tsx popularProduct', popularProducts);
  console.log('🚀[...code].tsx popularShuffled', popularShuffled);
  console.log('🚀[...code].tsx newPopularPrd', newPopularPrd);
  // console.log('🚀[...code].tsx added', addedProductsByInfluencer);
  // console.log('🚀 ~ file: [...code].tsx ~ line 112 ~ partnerMembers', partnerMembers);

  const handleAddProduct = () => {
    googleButtonCode('addproduct-button');
    if (gsctx?.totalProducts < 101) {
      const cprod = clientDealProducts()?.length || 0;
      if (cprod >= 5) {
        showError(
          'Only 5 products can be added to this Group Shop per person.',
        );
      } else {
        setshowps(true);
      }
    } else showError('Groupshop is full you can not add more products to it');
  };

  if (error) {
    Router.push('/404');
    return <p>groupshop not found</p>;
  }
  console.log('🚀 ~ file: [...code].tsx ~ line 65 ~ gsctx', gsctx);
  // console.log('🚀 ~ file: [...code].tsx ~ line 65 ~ gsctx bestSeller', bestSeller);
  // console.log('🚀 ~ file: [...code].tsx ~ line 65 ~ gsctx allProducts', allProducts);

  const getLogoHTML = () => (
    <>
      <div className={styles.groupshop_main_logo}>
        {logoImage === '' || logoImage === undefined ? (
          <Link href={`https://${fullStoreName}`}>
            <Brand
              name={
                (brandName || '').split(' ').slice(0, 2).join(' ') || ''
              }
              pending={pending}
            />
          </Link>
        ) : (
          <Link href={`https://${fullStoreName}`}>
            <a target="_blank" style={{ cursor: 'pointer' }}>
              <img
                src={storeLogo}
                alt={`${brandName}`}
                // alt="d"
                className="img-fluid"
              />
            </a>
          </Link>
        )}
      </div>
    </>
  );

  const showSearchProds = () => {
    setshowps(true);
  };

  const showProduct = (e: Event, prd: any) => {
    setsProduct(prd);
  };

  return (
    <>
      <Head>
        <title>Influencer Microstore</title>
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
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3371804206430685');
            fbq('track', 'PageView');`,
          }}
        />
        <noscript
        // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=3371804206430685&ev=PageView&noscript=1"
            />`,
          }}
        />
        <script src="https://www.googleoptimize.com/optimize.js?id=OPT-MCBM97Z" />
        <link rel="shortcut icon" href="/favicon2.ico" />
        <meta name="application-name" content="Microstore" />
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="og:type" content="website" />
        <meta name="description" content={`Shop ${meta.brandName} on my Microstore and get ${meta.maxReward} off.`} />
        <meta name="og:title" content="Microstore" />
        <meta name="og:description" content={`Shop ${meta.brandName} on my Microstore and get ${meta.maxReward} off.`} />
        <meta name="description" content={`Shop ${meta.brandName} on my Microstore and get ${meta.maxReward} off.`} />
        <meta name="keywords" content="group, shop, discount, deal" />
        <meta name="og:url" content={gsShortURL ?? gsURL} />
        <link rel="preload" nonce="" href={meta.photo} as="image" />
        <meta property="og:image" content={meta.photo} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <div className={styles.groupshop}>
        <header>
          <Header
            LeftComp={
              isModalForMobile
                ? (
                  <QRClickIcon
                    onClick={() => { setShowQR(true); }}
                  />
                )
                : <div> </div>
              // <Counter expireDate={gsctx?.expiredAt} pending={pending} />
            }
            RightComp={(
              <InfoBox
                mes={isModalForMobile ? '' : 'How does this work?'}
                brandname={brandName}
                shareUrl={gsShortURL ?? gsURL}
                name={formatNameCase(`${gsctx?.partnerDetails?.fname ?? ''} ${gsctx?.partnerDetails?.lname ?? ''}`)}
              />
            )}
          />
          <Container fluid className="border-top border-bottom bg-white">
            <Row className={['gx-0', styles.groupshop__top].join(' ')}>

              <Col md={3} xs={3}>
                {!isModalForMobile ? (
                  <>
                    { getLogoHTML() }
                  </>
                ) : (
                  <>
                    {leftOverProducts()?.length > 0 ? (
                      <IconButton
                        icon={<Search size={24} />}
                        className={styles.groupshop__hero_iconSearchBtn}
                        onClick={handleAddProduct}
                        disabled={isExpired}
                      />
                    ) : <></> }
                  </>
                )}
              </Col>
              <Col md={6} className={styles.groupshop__top_members}>
                <h5 className="text-center">
                  SHOPPING WITH
                </h5>
                <div className="d-flex flex-row justify-content-start align-items-center">
                  <Members
                    names={partnerMembers?.map(
                      (mem: any, index: any) => ({
                        fname: `${mem.customerInfo.firstName ?? ''} ${
                          mem.customerInfo.firstName ? mem?.customerInfo?.lastName?.charAt(0) || '' : mem.customerInfo.lastName
                        }`,
                        lineItems: mem.lineItems,
                        email: mem.customerInfo.email,
                        orderId: mem.orderId,
                      }),
                    )}
                    cashback={['']}
                    discount={discount}
                    fullshareurl={gsShortURL}
                    shareUrl={gsURL}
                    rewards={gsctx?.partnerRewards}
                    brandname={brandName}
                    currencySymbol={currencySymbol}
                    pending={pending}
                    page="partner"
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
                {isModalForMobile && (
                  <>
                    {getLogoHTML()}
                  </>
                )}
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
                {SKU.length > 1 && !isModalForMobile && leftOverProducts()?.length > 0 && (
                  <IconButton
                    icon={<Search size={24} />}
                    className={styles.groupshop__hero_iconSearchBtn}
                    onClick={handleAddProduct}
                    disabled={isExpired}
                  />
                )}
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
                  <span className="text-capitalize text-decoration-none">
                    {' '}
                    {gsctx?.partnerDetails?.fname}
                    {' '}
                  </span>
                  <span className="text-lowercase text-decoration-none">’s</span>
                  {' '}
                  Microstore
                </h3>
                <p>
                  Shop with me & get exclusive discounts on my favorite products
                  {/* Explore my favorite
                  {' '}
                  {gsctx?.store?.brandName}
                  {' '}
                  products and access exclusive discounts when you shop with me! */}
                </p>
              </Col>
            </Row>
            <div className="d-flex justify-content-evenly">
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
              <div className="text-center mb-5">
                {/* <div className={styles.groupshop__hero_current_reward}>
                  Current Rewards
                </div> */}
                <div
                  role="button"
                  onClick={() => {
                    setShowRewards(true);
                  }}
                  className={styles.groupshop__big_banner_wrapper}
                >
                  <BigBannerBox text={text} isInfluencerGS />
                </div>
              </div>
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
            </div>
            <div className="flex-wrap mt-2 d-flex justify-content-center align-items-center">

              <Members
                names={partnerMembers?.slice(0, 1).map(
                  (mem: any) => ({
                    fname: `${mem.customerInfo.firstName ?? ''} ${
                      mem.customerInfo.firstName ? mem?.customerInfo?.lastName?.charAt(0) || '' : mem.customerInfo.lastName
                    }`,
                    lineItems: mem.lineItems,
                    email: mem.customerInfo.email,
                    orderId: mem.orderId,
                  }),
                )}
                cashback={['']}
                discount={discount}
                fullshareurl={gsShortURL}
                shareUrl={gsURL}
                rewards={gsctx?.partnerRewards}
                brandname={brandName}
                currencySymbol={currencySymbol}
                pending={pending}
                page="partner"
              />
            </div>
            <Row className="mt-1">
              <p className="mb-2 text-center">
                {isInfluencerGS ? '' : <Icon />}
                {' '}
                {isInfluencerGS ? 'earns a reward everytime you shop.' : cashBackText}
              </p>
            </Row>
            <Row className={['mt-4', styles.groupshop__hero_how_to].join(' ')}>
              <InfoBox
                mes="How it works"
                brandname={brandName}
                shareUrl={gsShortURL ?? gsURL}
                name={formatNameCase(`${gsctx?.partnerDetails?.fname} ${gsctx?.partnerDetails?.lname ?? ''}`)}
              />
            </Row>
          </Container>
        </Hero>

        <ProductGrid
          xs={6}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          products={uniqueArray(_.uniq(addedProductsByInfluencer))}
          maxrows={1}
          addProducts={handleAddProduct}
          handleDetail={(prd: any) => setsProduct(prd)}
          id="curatedby"
          isModalForMobile={isModalForMobile}
          skuCount={SKU.length}
        >
          <h2 className={styles.groupshop_col_shoppedby}>
            CURATED BY
            {' '}
            <span className={styles.groupshop_firstName}>
              {`${gsctx?.partnerDetails?.fname ?? gsctx?.partnerDetails?.lname}`}
            </span>
            {/* !pending && gsctx?.members?.length > 1 */}
            {!pending && gsctx?.members?.length > 1 ? (
              <Dropdown className="d-inline mx-2" align={{ lg: 'start', sm: 'end' }}>
                <Dropdown.Toggle
                  disabled={SKU.length < 2}
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
                  {memberDetails?.map((mem: any, index: number) => (
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
            {gsctx?.partnerDetails?.fname ? gsctx?.partnerDetails?.fname || '' : gsctx?.partnerDetails?.lname ?? ''}
            {' '}
            ’s
            personal favorites and recommendations.
          </p>
        </ProductGrid>
        {!hidePopular && SKU.length > 4 && ((addedByRefferal && addedByRefferal.length > 0)
        || (gsctx?.memberDetails && gsctx?.memberDetails?.length > 0) ? (
          <ProductGrid
            xs={6}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            isModalForMobile={isModalForMobile}
            products={
                addedProductsByInfluencer
                && (addedProductsByInfluencer.length > 3
                  ? uniqueArray(popularShuffled)
                  : uniqueArray(newPopularPrd))
            }
            maxrows={1}
            addProducts={handleAddProduct}
            handleDetail={(prd: any) => setsProduct(prd)}
            id="popularproducts"
            skuCount={SKU.length}
          >
            <h2>Popular with the Group</h2>
          </ProductGrid>
          ) : (
            <>

              {!hideTopPicks && (
              <ProductGrid
                xs={6}
                sm={6}
                md={6}
                lg={4}
                xl={3}
            // products={bestSeller ?? []}
                isModalForMobile={isModalForMobile}
                products={topPicks?.slice(0, 4)}
                maxrows={1}
                addProducts={handleAddProduct}
                handleDetail={(prd: any) => setsProduct(prd)}
                id="toppicks"
                skuCount={SKU.length}
              >
                <h2>Top Picks</h2>
              </ProductGrid>
              )}
            </>
          )) }

        {!hideSection && SKU.length > 4 && (
        <ProductGrid
          xs={6}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          isModalForMobile={isModalForMobile}
          products={uniqueArray(allProducts ?? [])}
          maxrows={3}
          addProducts={handleAddProduct}
          handleDetail={(prd: any) => setsProduct(prd)}
          showHoverButton
          id="allproducts"
          skuCount={SKU.length}
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
        )}
        {SKU.length > 1 && leftOverProducts()?.length > 0 ? (
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
        ) : <></>}
        <Footer LeftComp={undefined} RightComp={undefined} />
        <ProductsSearch
          show={showps}
          handleClose={() => setshowps(false)}
          isCreateGS={!!isInfluencer}
          showProduct={showProduct}
        />
        <OBWelcomeInfluencer
          show={showob1 && title !== '' && (partnerGroupshop?.isActive ?? true)}
          handleClose={() => setshowob1(false)}
          setshowob1={setshowob1}
          setshowps={setshowps}
        />

        <LinkShareMobileView
          show={showQrscan}
          handleClose={() => setshowQrscan(false)}
          shareurl={gsShortURL ?? gsURL}
        />

        <ProductDetail
          show={showDetail}
          isPartner
          handleClose={() => setshowDetail(false)}
          product={sProduct}
          showSearch={showSearchProds}
        />
        <Cart
          show={showCart}
          setShow={setshowCart}
          handleClose={() => setshowCart(false)}
          product={undefined}
          handleDetail={(prd) => setsProduct(prd)}
        />
        <AlertComponent />
        { showRewards && (
        <InfoBox
          mes=""
          brandname={brandName}
          shareUrl={gsShortURL ?? gsURL}
          showRewards={showRewards}
          setShowRewards={setShowRewards}
          name={formatNameCase(`${gsctx?.partnerDetails?.fname} ${gsctx?.partnerDetails?.lname ?? ''}`)}
        />
        ) }

        {partnerGroupshop?.isActive === false
          && (
          <ExpireModal
            storeId={gsctx?.storeId}
            storeLogo={storeLogo}
            showExpiredModel={showExpiredModel}
            setShowExpiredModel={setShowExpiredModel}
          />
          )}
        {
          isModalForMobile
          && (
            <QRBox
              show={showQR}
              discount={gsctx?.discountCode.percentage}
              text={socialText}
              shareurl={gsShortURL ?? gsURL}
              handleClose={() => setShowQR(false)}
              fullshareurl={gsURL}
            />
          )
        }
        {/* <RewardBox2
          show={showRewards}
          discount={discount}
          shareurl={gsShortURL ?? gsURL}
          fullshareurl={gsURL}
          handleClose={() => setShowRewards(false)}
          brandName={brandName}
          maxPercent={(gsctx?.partnerRewards?.baseline)?.toString() ?? ''}
        /> */}
        {isModalForMobile && (
          <div>
            <ShoppingBoxMobile
              shareurl={gsShortURL ?? gsURL}
              // onClick={() => setShowRewards(true)}
              val=""
              label="Share with friends"
              brandName={brandName}
              maxPercent={(gsctx?.partnerRewards?.baseline)?.toString() ?? ''}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default GroupShop;
export const getServerSideProps = async (context: any) => {
  // console.log(' [...code].tsx ~ line 725 ~ constgetServerSideProps  context', context.params);
  const code = typeof context.params.code === 'string' ? context.params.code : context.params.code[0];
  const url = `${process.env.API_URL}/mepartner?name=${code}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = await fetch(url, requestOptions);
  const resJson = await res.json();
  return {
    props: {
      meta: { ...resJson, photo: `${process.env.IMAGE_PATH}/${resJson.photo ?? '/bg.jpg'}` },
    },
  };
};
