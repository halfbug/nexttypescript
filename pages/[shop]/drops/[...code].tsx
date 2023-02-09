/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_DROP_GROUPSHOP, GET_MATCHING_GS } from 'store/store.graphql';
import Header from 'components/Layout/HeaderGS/HeaderGS';
import styles from 'styles/Drops.module.scss';
import {
  Col, Container, Row, Button as Button2,
} from 'react-bootstrap';
import Gmembers from 'components/Groupshop/Members/Gmembers';
import QRClickIcon from 'assets/images/qr-click.svg';
import IconButton from 'components/Buttons/IconButton';
import {
  Handbag, Plus, Search,
} from 'react-bootstrap-icons';
import Hero from 'components/Groupshop/Hero/Hero';
import ProductGrid from 'components/Groupshop/ProductGrid/ProductGrid';
import { IGroupshop, MatchingGS, Member } from 'types/groupshop';
import { IProduct } from 'types/store';
import ProductsSearch from 'components/Groupshop/ProductsSearch/ProductsSearch';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import Cart from 'components/Groupshop/Cart/Cart';
import useDeal from 'hooks/useDeal';
import useCode from 'hooks/useCode';
import useAlert from 'hooks/useAlert';
import Footer from 'components/Layout/FooterGS/FooterGS';
import InfoBox from 'components/Groupshop/InfoBox/InfoBox';
import useDetail from 'hooks/useDetail';
import ProductDetail from 'components/Groupshop/ProductDetail/ProductDetail';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import useUtilityFunction from 'hooks/useUtilityFunction';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import useGtm from 'hooks/useGtm';
import useTopBanner from 'hooks/useTopBanner';
import useProducts from 'hooks/useProducts';
import ShoppingBoxMobile from 'components/Groupshop/ShoppingBoxMobile/ShoppingBoxMobile';
import RewardBox2 from 'components/Groupshop/RewardBox/RewardBox2';
import useBanner from 'hooks/useBanner';
import useSaveCart from 'hooks/useSaveCart';
import useExpired from 'hooks/useExpired';
import LinkShareMobileView from 'components/LinkShare/LinkShareMobileView';
import QRBox from 'components/Groupshop/QRBox/QRBox';
import VideoWidget from 'components/Groupshop/VideoWidget/VideoWidget';
import useDiscoverSortingGS from 'hooks/useDiscoverSortingGS';
import { gsdInit } from 'store/drop-groupshop.context';
import useAppContext from 'hooks/useAppContext';
import HowShopDropBox from 'components/Groupshop/HowShopDropBox/HowShopDropBox';
import useDrops from 'hooks/useDrops';
import Members from 'components/Groupshop/Members/Members';
import HowShopDropVideoBox from 'components/Groupshop/HowShopDropBox/HowShopVideoDropBox';
import InfoButton from 'components/Buttons/InfoButton/InfoButton';
import ExpiredLinked from 'components/Groupshop/DropRewardBox/ExpiredLinked';
import DropsRewardBox from 'components/Groupshop/DropRewardBox/DropRewardBox';
import GetNotify from 'components/Groupshop/DropRewardBox/GetNotify';
import Scan from 'components/Groupshop/DropRewardBox/Scan';
import CountDownTimer from 'components/Groupshop/CountDownTimer/CountDownTimer';

const GroupShop: NextPage<{ meta: any }> = ({ meta }: { meta: any }) => {
  const { gsctx, dispatch } = useAppContext();
  const { AlertComponent, showError } = useAlert();
  const { shop, discountCode, status } = useCode();
  const isModalForMobile = useMediaQuery({
    query: '(max-width: 475px)',
  });
  const Router = useRouter();

  const {
    loading,
    error,
    data: { DropGroupshop } = { DropGroupshop: gsdInit },
  } = useQuery<{ DropGroupshop: IGroupshop }, { code: string | undefined, status: string}>(
    GET_DROP_GROUPSHOP,
    {
      variables: { code: discountCode, status: status ?? '' },
      notifyOnNetworkStatusChange: true,
      skip: !discountCode,
    },
  );

  // load all products
  useProducts(`${shop}.myshopify.com`);
  const [member, setmember] = useState<Member | undefined>(undefined);
  const [showps, setshowps] = useState<boolean>(false);
  const [showCart, setshowCart] = useState<boolean>(false);
  const [pending, setpending] = useState<boolean>(true);
  const [bannerDiscount, setbannerDiscount] = useState<(string | undefined)[] | undefined
    >(undefined);
  const [showRewards, setShowRewards] = useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [shoppedBy, setshoppedBy] = useState<IProduct[] | undefined>(undefined);
  const [matchingStoreIds, setMatchingStoreIds] = useState([]);
  const { urlForActivation, loaderInvite } = useExpired();
  const [matchingGroupshop, setMatchingGroupshop] = useState<any[]>([]);

  // NEW HOOKS
  const [allProductsList, setAllProductsList] = useState<IProduct[] | undefined>([]);
  const [bestSellerProductsList, setBestSellerProductsList] = useState<IProduct[] | undefined>([]);
  const [spotLightProductsList, setSpotLightProductsList] = useState<IProduct[] | undefined>([]);
  const [latestProductsList, setLatestProductsList] = useState<IProduct[] | undefined>([]);

  const [openLearnHow, setLearnHow] = useState<boolean>(false);
  const [dropReward, setDropReward] = useState<boolean>(false);
  const [showSignup, setSignup] = useState<boolean>(false);

  useEffect(() => {
    if (DropGroupshop.id && pending) {
      setpending(false);
      dispatch({ type: 'UPDATE_GROUPSHOP', payload: DropGroupshop });
    }
  }, [DropGroupshop, pending]);

  useEffect(() => {
    if (gsctx.id) {
      if (gsctx.allProducts) {
        setAllProductsList(gsctx.allProducts);
      }
      if (gsctx.bestSellerProducts) {
        setBestSellerProductsList(gsctx.bestSellerProducts);
      }
      if (gsctx.spotlightProducts) {
        setSpotLightProductsList(gsctx.spotlightProducts);
      }
      if (gsctx.latestProducts) {
        setLatestProductsList(gsctx.latestProducts);
      }
    }
  }, [gsctx]);

  // banner image and logo load
  const bannerImage = useBanner();
  useSaveCart();

  const {
    gsURL,
    gsShortURL,
    clientDealProducts,
    isExpired,
    discount,
    getDiscounts,
    milestones,
    getDateDifference,
    socialText,
    brandName,
    currencySymbol,
    activateURL,
    maxPercent,
    topFive,
    shortActivateURL,
    leftOverProducts,
    getOwnerName,
  } = useDeal();

  const {
    currentDropReward,
    nextDropReward,
    showObPopup,
    canBeUnlockedCB,
    updateOnboarding,
    getChackback,
  } = useDrops();

  // const {
  //   days, hrs, mins, secs,
  // } = getDateDifference();

  const { googleEventCode, googleButtonCode } = useGtm();

  const facebookPixels = gsctx?.store?.settings?.marketing?.facebookPixels ?? '';
  const googlePixels = gsctx?.store?.settings?.marketing?.googlePixels ?? '';
  const tiktokPixels = gsctx?.store?.settings?.marketing?.tiktokPixels ?? '';
  const snapchatPixels = gsctx?.store?.settings?.marketing?.snapchatPixels ?? '';

  const { uniqueArray } = useUtilityFunction();

  useEffect(() => {
    setbannerDiscount(getDiscounts());
  }, [gsctx]);

  const [getMatchingGS] = useLazyQuery<MatchingGS>(GET_MATCHING_GS, {
    fetchPolicy: 'network-only',
    onCompleted: async (matchingAllStore: any) => {
      if (matchingAllStore?.matchingGS?.length > 0 && matchingStoreIds?.length > 0) {
        const finalMathingGSData = useDiscoverSortingGS(
          matchingAllStore?.matchingGS, matchingStoreIds,
        );
        setMatchingGroupshop(finalMathingGSData);
      }
    },
  });

  useEffect(() => {
    // show ob products with owner products. dont show ob prds with other customer
    if (gsctx?.ownerDeals && gsctx?.ownerDeals.length) {
      // setshoppedBy(member?.orderId === gsctx?.members[0].orderId
      //   ? uniqueArray([...member?.products ?? [], ...gsctx?.ownerDeals ?? []])
      //   : uniqueArray([...member?.products ?? []]));
    } else {
      setshoppedBy(uniqueArray(member?.products));
    }
  }, [gsctx?.ownerDeals, gsctx.dealProducts, member]);

  useEffect(() => {
    if (gsctx.cart && gsctx?.cart?.length > 0) {
      setshowCart(true);
    }
  }, [gsctx.cart]);

  useEffect(() => {
    if (gsctx?.store?.discoveryTool && gsctx?.store?.discoveryTool?.status === 'Active' && gsctx?.store?.discoveryTool?.matchingBrandName) {
      const machingStoreId: any = gsctx?.store?.discoveryTool?.matchingBrandName?.map(
        (el: any) => el.id,
      );
      if (machingStoreId.length > 0) {
        setMatchingStoreIds(machingStoreId);
        getMatchingGS({
          variables: {
            storeId: machingStoreId,
          },
        });
      }
    }
  }, [gsctx?.store?.discoveryTool]);

  const { cashbackVal } = useTopBanner();
  const [value, setvalue] = useState<undefined | string>('...');
  useEffect(() => {
    if (cashbackVal && cashbackVal !== '...') {
      setvalue((parseInt(cashbackVal, 10)).toString());
    } else {
      setvalue('...');
    }
  }, [cashbackVal]);

  const {
    showDetail, setshowDetail, sProduct, setsProduct, showQrscan, setshowQrscan,
  } = useDetail(allProductsList);

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

  const showSearchProds = () => {
    setshowps(true);
  };

  const showProduct = (e: Event, prd: any) => {
    setsProduct(prd);
  };

  return (
    <>
      <Head>
        <title>Groupshop</title>
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
          })(window, document, "clarity", "script", "f8jx5rl3kw");`,
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

        {facebookPixels !== '' && (
          <>
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
            fbq('init', '${facebookPixels}');
            fbq('track', 'PageView');`,
              }}
            />
            <noscript
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `<img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id=${facebookPixels}&ev=PageView&noscript=1"
                />`,
              }}
            />
          </>
        )}

        {googlePixels !== '' && (
          <>

            <script async src={`https://www.googletagmanager.com/gtag/js?id=${googlePixels}`} />
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googlePixels}');`,
              }}
            />
          </>
        )}

        {tiktokPixels !== '' && (
          <>
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `!function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};              
                ttq.load('${tiktokPixels}');
                ttq.page();
              }(window, document, 'ttq');`,
              }}
            />
          </>
        )}

        {snapchatPixels !== '' && (
          <>
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `(function(e, t, n){  if(e.snaptr) return; var tr=e.snaptr=function(){
                  tr.handleRequest? tr.handleRequest.apply(tr, arguments):tr.queue.push(arguments);};  tr.queue = []; var s='script';  var new_script_section=t.createElement(s);  new_script_section.async=!0;  new_script_section.src=n;  var insert_pos=t.getElementsByTagName(s)[0];  insert_pos.parentNode.insertBefore(new_script_section, insert_pos); })(window, document, 'https://sc-static.net/scevent.min.js');

                snaptr('init', '${snapchatPixels}');
                snaptr('track', 'PAGE_VIEW');`,
              }}
            />
          </>

        )}

        <script src="https://www.googleoptimize.com/optimize.js?id=OPT-MCBM97Z" />

        <meta name="application-name" content="Groupshop" />
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="og:type" content="website" />
        <meta name="description" content={`Shop ${meta.brandName} on my Groupshop and get ${meta.maxReward} off.`} />
        <meta name="og:title" content="Groupshop" />
        <meta name="description" content={`Shop ${meta.brandName} on my Groupshop and get ${meta.maxReward} off.`} />
        <meta name="keywords" content="group, shop, discount, deal" />
        <meta name="og:url" content={gsShortURL ?? gsURL} />
        <link rel="preload" nonce="" href="https://s3.amazonaws.com/gsnodeimages/BannerDropsFinal.jpg" as="image" />
        <meta property="og:image" content="https://s3.amazonaws.com/gsnodeimages/BannerDropsFinal.jpg" />
        {/* <link rel="preload" nonce="" href={meta.photo} as="image" />
        <meta property="og:image" content={meta.photo} /> */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <div className={styles.drops}>
        <header>
          <Header
            LeftComp={
              isModalForMobile
                ? (
                  <div className="d-flex">
                    <QRClickIcon onClick={() => { setShowQR(true); }} />
                    <InfoButton handleClick={() => setLearnHow(true)} />
                  </div>
                )
                : <></>
                // <Counter expireDate={gsctx?.expiredAt} pending={pending} />
            }
            RightComp={(
              <Button2
                variant="primary"
                className="rounded-pill bg-black"
                onClick={() => {
                  setSignup(true);
                }}
              >
                Sign up
              </Button2>
            )}

          />
          {gsctx?.store?.drops?.isVideoEnabled ? <VideoWidget /> : ''}
          <Container fluid className="border-top border-bottom bg-white">
            <Row className={['gx-0', styles.drops__top].join(' ')}>
              <Col md={3} xs={2}>
                <IconButton
                  icon={<Search size={isModalForMobile ? 24 : 16} />}
                  className={styles.drops__hero_iconSearchBtn}
                  onClick={handleAddProduct}
                  disabled={isExpired}
                />
                {/* <div className={styles.drops_main_logo}>
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
                </div> */}
              </Col>
              <Col md={6} className={styles.drops__top_members}>
                <h5 className="text-center">
                  Shop or invite your friends to shop to get started!
                </h5>
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <Gmembers
                    names={topFive(gsctx?.members.map(
                      (mem: any) => ({
                        name: `${mem.orderDetail.customer.firstName ?? ''} ${mem.orderDetail.customer.firstName ? mem.orderDetail?.customer?.lastName?.charAt(0) || '' : mem.orderDetail.customer.lastName
                        }`,
                        availedDiscount: mem.availedDiscount,
                        role: mem.role,
                        lineItems: mem.lineItems,
                        price: mem.orderDetail.price,
                        refund: (mem.refund) ? mem.refund : [],
                      }),
                    ))}
                    memberLength={gsctx?.members.length}
                    brandname={brandName}
                    fullshareurl={gsURL}
                    shareUrl={gsShortURL ?? gsURL}
                    rewards={gsctx?.campaign?.salesTarget?.rewards}
                    discount={gsctx?.discountCode.percentage}
                    currencySymbol={currencySymbol}
                    pending={pending}
                  />
                  {gsctx?.members.length > 5 && (
                    <span className="pe-2">
                      {`+${gsctx?.members.length - 5} more`}
                    </span>
                  )}
                  <ShareButton
                    placement="bottom"
                    shareurl={isExpired ? shortActivateURL ?? activateURL ?? '' : gsShortURL ?? gsURL}
                    fullshareurl={isExpired ? activateURL : gsURL}
                    label="Invite"
                    className={styles.drops__top_invite}
                    icon={<Plus size={18} className="me-0 pe-0" />}
                    onClick={() => googleEventCode('invite-share-modal')}
                  />
                </div>
              </Col>
              <Col xs={8} md={6} className={[styles.drops__counter, 'py-2'].join(' ')}>
                <div className={styles.drops__counter_middle}>
                  {/* <p>
                    <span>
                      {hrs + (days * 24)}
                      {' '}
                      hrs
                    </span>
                    :
                    <span>
                      {mins}
                      {' '}
                      mins
                    </span>
                    :
                    <span>
                      {secs}
                      {' '}
                      secs
                    </span>
                  </p> */}
                  <CountDownTimer />
                </div>
              </Col>
              <Col
                md={3}
                xs={2}
                className={[
                  'text-center text-lg-end m-md-0 p-md-0 m-xl-auto p-xl-auto d-flex justify-content-end align-items-baseline',
                  styles.drops__top__left_icons,
                ].join(' ')}
              >
                <ShareButton
                  placement="bottom"
                  shareurl={isExpired ? shortActivateURL ?? activateURL ?? '' : gsShortURL ?? gsURL}
                  fullshareurl={isExpired ? activateURL ?? '' : gsURL ?? ''}
                  label={(gsctx.members.length > 5 && 'Invite a Friend') || (isExpired ? 'SHARE TO UNLOCK' : `Share & Earn ${currencySymbol}${value}`)}
                  onClick={() => googleEventCode('earn-cashback-modal')}
                  className={styles.drops__hero_share_btn}
                />
                <IconButton
                  icon={<Handbag size={isModalForMobile ? 14 : 24} />}
                  className={styles.drops__hero_iconBtn}
                  onClick={() => setshowCart(true)}
                >
                  <span className={styles.drops__hero__cart_count}>
                    {gsctx?.cart && gsctx?.cart?.length > 0
                      ? `(${gsctx?.cart?.length})`
                      : ''}
                  </span>
                </IconButton>
                {/* <p
                  className={[
                    'd-flex align-items-center',
                    styles.drops__hero__cart_count,
                  ].join(' ')}
                >
                  (2)
                </p> */}
              </Col>
            </Row>
          </Container>
        </header>
        <Hero
          bannerImage={bannerImage}
          isDrops
        >
          <Container className={styles.drops__hero__content}>
            <Row className={styles.drops__hero_welcome}>
              <Col lg={12} className="mb-2">
                <h1 className="text-black fw-bolder ">
                  Get
                  {' '}
                  {currentDropReward}
                  % off this drop for a limited time.
                </h1>
              </Col>
              <Col xs={12} className={[styles.drops__counter, 'py-2'].join(' ')}>
                <div className={styles.drops__counter_middle}>
                  {/* <p>
                    <span>
                      {hrs + (days * 24)}
                      {' '}
                      hrs
                    </span>
                    :
                    <span>
                      {mins}
                      {' '}
                      mins
                    </span>
                    :
                    <span>
                      {secs}
                      {' '}
                      secs
                    </span>
                  </p> */}
                  <CountDownTimer />
                </div>
              </Col>
              { !!gsctx.members.length && (
              <>
                {getChackback() !== 0 && (
                <Col lg={12}>
                  <h5 className="text-black font-bold mt-4">
                    🎉 Plus unlock $
                    <span className="fw-bolder">
                      {getChackback()}
                      {' '}
                      cashback
                    </span>
                    {' '}
                    for
                  </h5>
                </Col>
                )}
                {
                  gsctx.members.length > 2 && (
                    <Col lg={12}>
                      <h5 className="text-black fw-light mt-3 mb-0">
                        🛍 Shopping with friends is better
                      </h5>
                    </Col>
                  )
                }
                <div className="flex-wrap pt-2 d-flex flex-row justify-content-center">
                  <Members
                    names={gsctx.members?.map(
                      (mem: any, index: any) => ({
                        fname: `${mem.orderDetail.customer.firstName ?? ''} ${
                          mem.orderDetail.customer.firstName ? mem?.orderDetail.customer?.lastName?.charAt(0) || '' : mem.orderDetail.customer.lastName
                        }`,
                        lineItems: mem.lineItems,
                        email: mem.orderDetail.customer.email,
                        orderId: mem.orderId,
                        availedDiscount: mem.availedDiscount,
                      }),
                    )}
                    cashback={['']}
                    pending={pending}
                    discount={discount}
                    fullshareurl={gsShortURL}
                    shareUrl={gsURL}
                    rewards={gsctx?.store?.drops?.rewards}
                    brandname={brandName}
                    currencySymbol={currencySymbol}
                    page="drops"
                  />
                </div>
              </>
              ) }
            </Row>
          </Container>
        </Hero>
        {
          !!nextDropReward && (
          <div className="bg-black text-center py-2">
            <span
              role="button"
              className="text-center text-white"
              onClick={() => setDropReward(true)}
            >
              Want
              {' '}
              {nextDropReward}
              % off? Click here to learn how.
            </span>
          </div>
          )
        }

        {/* <ProductGrid
          isDrops
          isSpotLight
          title="Today’s Spotlight"
          xs={6}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          products={uniqueArray(spotLightProductsList)}
          maxrows={3}
          addProducts={handleAddProduct}
          handleDetail={(prd) => setsProduct(prd)}
          showHoverButton
          id="spotlightdrops"
          isModalForMobile={isModalForMobile}
          urlForActivation={urlForActivation}
        /> */}

        <ProductGrid
          isDrops
          title="Latest Drops"
          xs={6}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          products={uniqueArray(latestProductsList)}
          maxrows={3}
          addProducts={handleAddProduct}
          handleDetail={(prd) => setsProduct(prd)}
          showHoverButton
          id="latestdrops"
          isModalForMobile={isModalForMobile}
          urlForActivation={urlForActivation}
          showPagination={false}
        />

        <ProductGrid
          isDrops
          title="Best Sellers"
          xs={6}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          products={uniqueArray(bestSellerProductsList)}
          maxrows={3}
          addProducts={handleAddProduct}
          handleDetail={(prd) => setsProduct(prd)}
          showHoverButton
          id="bestsellerdrops"
          isModalForMobile={isModalForMobile}
          urlForActivation={urlForActivation}
          showPagination={false}
        >
          {/* <Row>
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className={styles.drops_col_dropheading}>
                    Latest Drops
                  </div>
                </div>
                <div className="d-flex">
                  <FaArrowLeft className="me-2" />
                  <FaArrowRight className="ms-2" />
                </div>
              </div>
            </Col>
          </Row> */}
        </ProductGrid>

        {/* <ProductGrid
          isDrops
          xs={6}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          products={uniqueArray(bestSellerProductsList)}
          maxrows={3}
          addProducts={handleAddProduct}
          handleDetail={(prd) => setsProduct(prd)}
          showHoverButton
          id="allproductsdrops"
          isModalForMobile={isModalForMobile}
          urlForActivation={urlForActivation}
        > */}
        {/* <Row>
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className={styles.drops_col_dropheading}>
                    Best Sellers
                  </div>
                </div>
                <div className="d-flex">
                  <FaArrowLeft className="me-2" />
                  <FaArrowRight className="ms-2" />
                </div>
              </div>
            </Col>
          </Row> */}
        {/* </ProductGrid> */}

        <ProductGrid
          isDrops
          xs={6}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          products={uniqueArray(allProductsList)}
          maxrows={3}
          addProducts={handleAddProduct}
          handleDetail={(prd) => setsProduct(prd)}
          showHoverButton
          id="allproductsdrops"
          isModalForMobile={isModalForMobile}
          urlForActivation={urlForActivation}
        >
          {/* <Row>
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className={styles.drops_col_dropheading}>
                    All products
                  </div>
                </div>
                <div className="d-flex">
                  <FaArrowLeft className="me-2" />
                  <FaArrowRight className="ms-2" />
                </div>
              </div>
            </Col>
          </Row> */}
          <div>
            <div className={styles.drops_col_dropheadingOuter} style={{ position: 'relative' }}>
              <div id="scrollDiv" style={{ position: 'absolute', top: '-130px' }} />
              All Products
            </div>
          </div>
        </ProductGrid>

        <Footer LeftComp={undefined} RightComp={undefined} isDrops setLearnHowDrops={setLearnHow} />
        <ProductsSearch
          show={showps}
          handleClose={() => setshowps(false)}
          isCreateGS={false}
          showProduct={showProduct}
          isDrops
        />
        <LinkShareMobileView
          show={showQrscan}
          handleClose={() => setshowQrscan(false)}
          shareurl={isExpired ? shortActivateURL ?? activateURL ?? '' : gsShortURL ?? gsURL}
        />
        <ProductDetail
          show={showDetail}
          handleClose={() => setshowDetail(false)}
          product={sProduct}
          showSearch={showSearchProds}
          isDrops
        />
        <Cart
          show={showCart}
          setShow={setshowCart}
          handleClose={() => setshowCart(false)}
          product={undefined}
          handleDetail={(prd) => setsProduct(prd)}
          isDrops
        />
        <AlertComponent />
        <RewardBox2
          show={showRewards}
          discount={discount}
          shareurl={isExpired ? shortActivateURL ?? activateURL ?? '' : gsShortURL ?? gsURL}
          fullshareurl={isExpired ? activateURL : gsURL}
          handleClose={() => setShowRewards(false)}
          brandName={brandName}
          maxPercent={gsctx?.campaign?.salesTarget?.rewards?.[2]?.discount ?? ''}
        />
        <HowShopDropBox
          show={openLearnHow}
          handleClose={() => setLearnHow(false)}
        />
        {isModalForMobile && (
        <HowShopDropVideoBox
          show={!isExpired && showObPopup}
          handleClose={updateOnboarding}
        />
        )}
        <DropsRewardBox
          show={dropReward}
          handleClose={() => setDropReward(false)}
        />
        <GetNotify
          show={showSignup}
          handleClose={() => setSignup(false)}
        />
        {isModalForMobile && <ExpiredLinked show={isExpired} handleClose={() => {}} />}
        {isModalForMobile && (
          <div>
            <ShoppingBoxMobile
              shareurl={isExpired ? shortActivateURL ?? activateURL ?? '' : gsShortURL ?? gsURL}
              // onClick={() => setShowRewards(true)}
              val=""
              label={isExpired ? 'Share to unlock' : 'Share with friends'}
              brandName={brandName}
              isDrops
            />
          </div>
        )}
        {
          isModalForMobile
          && (
            <QRBox
              show={showQR}
              discount={gsctx?.discountCode.percentage}
              text={socialText}
              shareurl={isExpired ? shortActivateURL ?? activateURL ?? '' : gsShortURL ?? gsURL}
              handleClose={() => setShowQR(false)}
              fullshareurl={gsURL}
            />
          )
        }
      </div>
      {/* <ExpiredLinked
        show
        handleClose={() => {}}
      /> */}
      {!isModalForMobile && gsShortURL !== '' && (
      <Scan
        show
        shareurl={gsShortURL ?? gsURL}
        handleClose={() => {}}
      />
      )}
    </>
  );
};

export default GroupShop;

export const getServerSideProps = async (context: any) => {
  const url = `${process.env.API_URL}/me?name=${context.params.shop}`;
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

const mockDiscoverBrands = [
  {
    name: 'Jelice',
    with: 'Iman',
    discount: '15',
  },
  {
    name: 'The Renatural',
    with: 'Lala',
    discount: '10',
  },
  {
    name: 'Sani',
    with: 'Iman',
    discount: '20',
  },
  {
    name: 'Sani',
    with: 'Jelice',
    discount: '5',
  },

];
