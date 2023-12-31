/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_GROUPSHOP, GET_MATCHING_GS } from 'store/store.graphql';
import Header from 'components/Layout/HeaderGS/HeaderGS';
import Counter from 'components/Layout/Counter/Counter';
import styles from 'styles/Groupshop.module.scss';
import {
  Col, Container, Dropdown, Row, Button as Button2,
} from 'react-bootstrap';
import Brand from 'components/Groupshop/Brand/Brand';
import Members from 'components/Groupshop/Members/Members';
import Gmembers from 'components/Groupshop/Members/Gmembers';
import QRClickIcon from 'assets/images/qr-click.svg';
import IconButton from 'components/Buttons/IconButton';
import Icon from 'assets/images/small cone.svg';
import ArrowSort from 'assets/images/ArrowSort.svg';
import Customize from 'assets/images/customize.svg';
import DownArrow from 'assets/images/DownArrowSmall.svg';
import {
  Handbag, Plus, Search,
} from 'react-bootstrap-icons';
import Hero from 'components/Groupshop/Hero/Hero';
import ProductGrid from 'components/Groupshop/ProductGrid/ProductGrid';
import { GroupshopContext, gsInit } from 'store/groupshop.context';
import { IGroupshop, MatchingGS, Member } from 'types/groupshop';
import { IProduct } from 'types/store';
import ProductsSearch from 'components/Groupshop/ProductsSearch/ProductsSearch';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import Cart from 'components/Groupshop/Cart/Cart';
import useDeal from 'hooks/useDeal';
import useCode from 'hooks/useCode';
import useAlert from 'hooks/useAlert';
import Button from 'components/Buttons/Button/Button';
import Footer from 'components/Layout/FooterGS/FooterGS';
import InfoBox from 'components/Groupshop/InfoBox/InfoBox';
import useDetail from 'hooks/useDetail';
import ProductDetail from 'components/Groupshop/ProductDetail/ProductDetail';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import useUtilityFunction from 'hooks/useUtilityFunction';
import Head from 'next/head';
import BigBannerBox from 'components/Groupshop/BigBannerBox/BigBannerBox';
import SmallBannerBox from 'components/Groupshop/SmallBannerBox/SmallBannerBox';
import SmallBannerBox2 from 'components/Groupshop/SmallBannerBox2/SmallBannerBox2';
import TickCircle from 'assets/images/tick-circle.svg';
import GradientCircle from 'assets/images/gradient-circle.svg';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import useGtm from 'hooks/useGtm';
import useTopBanner from 'hooks/useTopBanner';
import useTopPicks from 'hooks/useTopPicks';
import useProducts from 'hooks/useProducts';
import ShoppingBoxMobile from 'components/Groupshop/ShoppingBoxMobile/ShoppingBoxMobile';
import RewardBox2 from 'components/Groupshop/RewardBox/RewardBox2';
import useBanner from 'hooks/useBanner';
import useLogo from 'hooks/useLogo';
import usePopular from 'hooks/usePopularProduct';
import useSaveCart from 'hooks/useSaveCart';
import ShareUnlockButton from 'components/Buttons/ShareUnlockButton/ShareUnlockButton';
import useExpired from 'hooks/useExpired';
import Link from 'next/link';
import LinkShareMobileView from 'components/LinkShare/LinkShareMobileView';
import useOwnerOnboarding from 'hooks/useOwnerOnboarding';
import useSKU from 'hooks/useSKU';
import ExpiredBox from 'components/Groupshop/ExpiredBox/ExpiredBox';
import QRBox from 'components/Groupshop/QRBox/QRBox';
import VideoWidget from 'components/Groupshop/VideoWidget/VideoWidget';
import useDiscoverSortingGS from 'hooks/useDiscoverSortingGS';
import { AiOutlineSetting } from 'react-icons/ai';
// icon:settings-outline | Ionicons https://ionicons.com/ | Ionic Framework

const GroupShop: NextPage<{ meta: any }> = ({ meta }: { meta: any }) => {
  const { gsctx, dispatch } = useContext(GroupshopContext);
  const { AlertComponent, showError } = useAlert();
  const { stepModal } = useOwnerOnboarding();
  const {
    SKU, memberProducts, hideSection, hideTopPicks, hidePopular,
  } = useSKU();
  const { shop, discountCode, status } = useCode();
  const isModalForMobile = useMediaQuery({
    query: '(max-width: 475px)',
  });
  const Router = useRouter();
  const shareEarnBtn = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const {
    loading,
    error,
    data: { groupshop } = { groupshop: gsInit },
  } = useQuery<{ groupshop: IGroupshop }, { code: string | undefined, status: string | undefined }>(
    GET_GROUPSHOP,
    {
      variables: { code: discountCode, status: status ?? '' },
      notifyOnNetworkStatusChange: true,
      skip: !discountCode,
    },
  );

  // load all products
  useProducts(`${shop}.myshopify.com`);

  const [allProducts, setallProducts] = useState<IProduct[] | undefined>(
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
  const [showQR, setShowQR] = useState<boolean>(false);
  const [shoppedBy, setshoppedBy] = useState<IProduct[] | undefined>(undefined);
  const [matchingStoreIds, setMatchingStoreIds] = useState([]);
  const { urlForActivation, loaderInvite } = useExpired();
  const [matchingGroupshop, setMatchingGroupshop] = useState<any[]>([]);

  useEffect(() => {
    if (groupshop.id && pending) {
      setpending(false);
      // setallProducts(groupshop?.allProducts);
      const filteredProducts = groupshop?.allProducts?.filter(
        (item) => item.outofstock === false || item.outofstock === null,
      ).sort((a, b) => a.title.localeCompare(b.title));
      setallProducts(filteredProducts);
      setmember(groupshop?.members[0]);
      console.log('=== update gs ...code GS');
      console.log('new testing console', process.env.IMAGE_PATH);
      dispatch({ type: 'UPDATE_GROUPSHOP', payload: groupshop });
    }
  }, [groupshop, pending]);

  useEffect(() => {
    if (gsctx.id && allProducts && gsctx.popularProducts) {
      const arr = [...allProducts, ...gsctx.popularProducts];
      const temp = arr.filter((item) => !item.outofstock)
        .sort((a, b) => a.title.localeCompare(b.title));
      setallProducts(JSON.parse(JSON.stringify(temp)));
    }
  }, [gsctx]);

  // banner image and logo load
  const bannerImage = useBanner();
  const storeLogo = useLogo();
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
    currencySymbol,
    activateURL,
    maxPercent,
    topFive,
    shortActivateURL,
    leftOverProducts,
    getOwnerName,
  } = useDeal();
  const {
    days, hrs, mins, secs,
  } = getDateDifference();

  const { googleEventCode, googleButtonCode } = useGtm();

  const {
    members: [
      {
        orderDetail: { customer: owner },
        products: ownerProducts,
      },
    ],
    members,
    store: { brandName, logoImage, shop: fullStoreName } = { brandName: '', logoImage: '' },
    popularProducts,
    dealProducts,
    addedProducts,
    refferalDealsProducts,
    // allProducts,
  } = gsctx;
  const facebookPixels = gsctx?.store?.settings?.marketing?.facebookPixels ?? '';
  const googlePixels = gsctx?.store?.settings?.marketing?.googlePixels ?? '';
  const tiktokPixels = gsctx?.store?.settings?.marketing?.tiktokPixels ?? '';
  const snapchatPixels = gsctx?.store?.settings?.marketing?.snapchatPixels ?? '';

  console.log('🚀 ~ file: [...code].tsx ~ line 171 ~ shoppedBy', shoppedBy);
  const {
    findInArray,
    filterArray,
    getSignedUrlS3,
    getKeyFromS3URL,
    uniqueArray,
    findInArray2,
  } = useUtilityFunction();
  const { popularShuffled } = usePopular(popularProducts);
  const { topPicks } = useTopPicks();
  useEffect(() => {
    // setallProducts(Array.from(new Set(
    //   // [...gsctx?.popularProducts ?? [], ...gsctx?.allProducts ?? []],
    //   [...gsctx?.allProducts ?? []],
    // )));
    // setallProducts(
    //   [...(allProducts ?? [])]?.sort((a, b) => a.title.localeCompare(b.title)),
    // );

    setbannerDiscount(getDiscounts());
    // fillAddedPrdInCTX();
  }, [gsctx, gsctx.dealProducts]);

  const [getMatchingGS] = useLazyQuery<MatchingGS>(GET_MATCHING_GS, {
    fetchPolicy: 'network-only',
    onCompleted: async (matchingAllStore: any) => {
      console.log('matchingAllStore🚀🚀🚀', matchingAllStore);
      if (matchingAllStore?.matchingGS?.length > 0 && matchingStoreIds?.length > 0) {
        const finalMathingGSData = useDiscoverSortingGS(
          matchingAllStore?.matchingGS, matchingStoreIds,
        );
        console.log('🚀🚀🚀finalMathingGSData', finalMathingGSData);
        setMatchingGroupshop(finalMathingGSData);
      }
    },
  });

  useEffect(() => {
    // show ob products with owner products. dont show ob prds with other customer
    if (gsctx?.ownerDeals && gsctx?.ownerDeals.length) {
      setshoppedBy(member?.orderId === gsctx?.members[0].orderId
        ? uniqueArray([...member?.products ?? [], ...gsctx?.ownerDeals ?? []])
        : uniqueArray([...member?.products ?? []]));
    } else {
      setshoppedBy(uniqueArray(member?.products));
    }
  }, [gsctx?.ownerDeals, gsctx.dealProducts, member]);

  useEffect(() => {
    // const addedPrds = filterArray(dealProducts ?? [], ownerProducts ?? [], 'productId', 'id');
    // const addedPrds = dealProducts?.filter((item));
    // const addedPrdsCtx = filterArray(
    //   addedProducts ?? [], ownerProducts ?? [], 'productId', 'id',
    // );
    // check owner prodcut is added. member[0].product ===sDealPrd then move it into addedProducts
    // console.log('🚀 ~ file: useDeal.ts ~ line 264 ~ fillAddedPrdInCTX ~ addedPrds', addedPrds);
    console.log('=== update gs addedPrd ...code GS');
    dispatch({
      type: 'UPDATE_GROUPSHOP',
      payload: {
        ...gsctx,
        addedProducts: _.uniq([...gsctx?.refferalDealsProducts ?? [],
          ...gsctx?.ownerDealsProducts ?? []]),
      },
    });
  }, [gsctx?.refferalDealsProducts, gsctx?.ownerDealsProducts]);

  useEffect(() => {
    // mixing popular produt with topPicks to complete the count of 4 if popular are less.
    if (popularProducts?.length) {
      if (popularProducts.length < 4) {
        const finalTP = uniqueArray(filterArray(topPicks ?? [], popularProducts ?? [], 'id', 'id'));
        const uniqueBestSeller = finalTP?.slice(0, 4 - popularProducts.length);
        console.log('🚀 ~ file: [...code].tsx ~ uniqueBestSeller', uniqueBestSeller);
        const newPopularArr = Array.from(
          new Set([...[...uniqueArray(popularProducts) ?? []], ...uniqueBestSeller ?? []]),
        );
        setNewPopularPrd([...newPopularArr].filter((prd) => prd.outofstock !== true));
      } else {
        setNewPopularPrd([...uniqueArray(popularProducts ?? [])]
          .filter((prd) => prd.outofstock !== true));
      }
    }
  }, [popularProducts, topPicks]);

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

  console.log('🚀 ~ file: [...code] line 247 ~ leftOverProducts', leftOverProducts()?.length);
  console.log('🚀 ~ file: [...code] line 244 ~ member', member);

  const { text, cashBackText, cashbackVal } = useTopBanner();
  const [value, setvalue] = useState<undefined | string>('...');
  useEffect(() => {
    if (cashbackVal && cashbackVal !== '...') {
      // const numInt = parseInt(cashbackVal.toString(), 10);
      setvalue((parseInt(cashbackVal, 10)).toString());
    } else {
      setvalue('...');
    }
  }, [cashbackVal]);

  const {
    showDetail, setshowDetail, sProduct, setsProduct, showQrscan, setshowQrscan,
  } = useDetail(allProducts);

  console.log('🚀 ~ file: [...code].tsx ~ line 65 ~ gsctx', gsctx);
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
  console.log('test commit');
  console.log('popular', refferalDealsProducts);

  const showSearchProds = () => {
    setshowps(true);
  };

  const showProduct = (e: Event, prd: any) => {
    setsProduct(prd);
  };

  return (
    <>
      <Head>
        <title>Microstore</title>
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

        <meta name="application-name" content="Microstore" />
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="og:type" content="website" />
        <meta name="description" content={`Shop ${meta.brandName} on my Microstore and get ${meta.maxReward} off.`} />
        <meta name="og:title" content="Microstore" />
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
                ? <QRClickIcon onClick={() => { setShowQR(true); }} />
                : <Counter expireDate={gsctx?.expiredAt} pending={pending} />
            }
            RightComp={isExpired ? (
              <ExpiredBox
                discount={gsctx?.discountCode.percentage}
                mes="How does this work?"
                brandname={brandName ?? ''}
                shareUrl={shortActivateURL ?? activateURL ?? ''}
                products={allProducts?.slice(0, 3) ?? []}
              // maxPercent={maxPercent}
              />
            ) : (
              <div className="d-flex align-items-center">
                {/* <div className={styles.groupshop_customizebutton}>
                  <Customize />
                  <span className="ms-1 me-3">Customize</span>
                </div> */}
                <InfoBox mes="How does this work?" brandname={brandName} fullshareurl={gsURL} shareUrl={gsShortURL ?? gsURL} />
              </div>
            )}

          />
          <VideoWidget />
          <Container
            fluid
            className={styles.groupshop_web_header}
          >
            <Row className={['gx-0 d-sm-flex d-xs-flex', styles.groupshop__top].join(' ')}>
              <Col md={3} className={styles.groupshop__top_members}>
                <h5 className="text-start ps-2 mb-0">
                  SHOPPING WITH
                </h5>
                <div className="d-flex flex-row justify-content-start align-items-center">
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
                  <span className="pe-1 text-nowrap">
                    {`+${gsctx?.members.length - 5} more`}
                  </span>
                  )}
                  <ShareButton
                    placement="bottom"
                    shareurl={isExpired ? shortActivateURL ?? activateURL ?? '' : gsShortURL ?? gsURL}
                    fullshareurl={isExpired ? activateURL : gsURL}
                    label="Invite"
                    className={styles.groupshop__top_invite}
                    icon={<Plus size={18} className="me-0 pe-0" />}
                    onClick={() => googleEventCode('invite-share-modal')}
                  />
                </div>
              </Col>
              <Col md={6} sm={6} className="d-flex justify-content-center">
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
              </Col>
              <Col xs={3} className={styles.groupshop__counter}>
                <h6 className="text-center">Store expires in</h6>
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
                </div>
              </Col>
              <Col
                md={3}
                sm={3}
                xs={3}
                className={[
                  'text-center text-lg-end m-md-0 p-md-0 m-xl-auto p-xl-auto d-flex justify-content-end align-items-baseline',
                  styles.groupshop__top__left_icons,
                ].join(' ')}
              >
                <ShareButton
                  placement="bottom"
                  shareurl={isExpired ? shortActivateURL ?? activateURL ?? '' : gsShortURL ?? gsURL}
                  fullshareurl={isExpired ? activateURL ?? '' : gsURL ?? ''}
                  label={(gsctx.members.length > 5 && 'Invite a Friend') || (isExpired ? 'SHARE TO UNLOCK' : `Share & Earn ${currencySymbol}${value}`)}
                  onClick={() => googleEventCode('earn-cashback-modal')}
                  className={styles.groupshop__hero_share_btn}
                />
                {SKU.length > 1 && leftOverProducts()?.length > 0 ? (
                  <IconButton
                    icon={<Search size={24} />}
                    className={styles.groupshop__hero_iconSearchBtn}
                    onClick={handleAddProduct}
                    disabled={isExpired}
                  />
                ) : <></>}
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
          {/* mobile first header */}

          <Container
            fluid
            className={styles.groupshop_mobile_header}
          >
            <Row className="gx-0 py-2 align-items-center">
              <Col xs={3} className="d-flex align-items-center">
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
              </Col>
              <Col
                xs={6}
                className={styles.groupshop__counterMobile}
              >
                <h6 className="text-center">Store expires in</h6>
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
                </div>
              </Col>
              <Col
                xs={3}
                className="d-flex align-items-center justify-content-end"
              >
                <div>
                  {SKU.length > 1 && leftOverProducts()?.length > 0 ? (
                    <IconButton
                      icon={<Search size={20} />}
                      className={[styles.groupshop__hero_smSearchBtn, 'px-0'].join(' ')}
                      onClick={handleAddProduct}
                      disabled={isExpired}
                    />
                  ) : <></>}
                </div>
                <div
                  className={[
                    'text-center text-lg-end m-md-0 p-md-0 m-xl-auto p-xl-auto d-flex justify-content-end align-items-baseline',
                    styles.groupshop__top__left_icons,
                  ].join(' ')}
                >
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
                </div>
              </Col>
            </Row>
          </Container>
        </header>
        <Hero bannerImage={bannerImage}>
          <Container className={styles.groupshop__hero__content}>
            <Row className={styles.groupshop__hero_welcome}>
              {isExpired ? (
                <Col lg={12}>
                  <h3>
                    <span className="text-capitalize text-decoration-none">
                      {owner?.firstName}
                    </span>
                    ’s Microstore has expired – but it’s not too late!
                  </h3>
                  <p>Invite 1 friend to restart the timer and access the discounts below.</p>
                </Col>
              ) : (
                <Col lg={12}>
                  <h3>
                    Welcome to
                    {' '}
                    <span className="text-capitalize text-decoration-none">
                      {' '}
                      {owner?.firstName}
                      {' '}
                      <span className="text-lowercase text-decoration-none">’s</span>
                      {' '}
                      {brandName}
                      {' '}
                    </span>
                    Microstore
                  </h3>
                  <p>The more friends shop, the more discounts and cashback!</p>
                </Col>

              )}
            </Row>
            <Row className="d-flex justify-content-evenly">
              <Col
                md={4}
                className={styles.groupshop__hero__small_banner_right}
              >
                {members.length > 1 && members.length < 6 ? (
                  <div className="d-flex flex-column justify-content-center align-items-center ">
                    <div className="mb-2">Unlocked</div>
                    <SmallBannerBox bannerDiscount={bannerDiscount} />
                    <TickCircle />
                  </div>
                ) : (
                  ''
                )}
              </Col>
              <Col md={4} className="text-center mb-5">
                <div className={styles.groupshop__hero_current_reward}>
                  Current Rewards
                </div>
                <div
                  role="button"
                  onClick={() => {
                    setShowRewards(true);
                  }}
                  className={styles.groupshop__big_banner_wrapper}
                >
                  <BigBannerBox text={text} />
                </div>
              </Col>
              <Col md={4} className={styles.groupshop__hero__small_banner_left}>
                {members.length < 5 ? (
                  <div className="d-flex flex-column justify-content-center align-items-center ">
                    <div className="mb-2">Next Rewards</div>
                    <SmallBannerBox2 bannerDiscount={bannerDiscount} />
                    <GradientCircle />
                  </div>
                ) : (
                  ''
                )}
              </Col>
            </Row>
            <Row>
              <p className="mb-2 text-center">
                <Icon />
                {' '}
                {cashBackText}
              </p>
            </Row>
            <div className="flex-wrap mt-2 d-flex justify-content-center align-items-center">
              <Gmembers
                names={gsctx?.members.map(
                  (mem: any) => ({
                    name: `${mem.orderDetail.customer.firstName ?? ''} ${mem.orderDetail.customer.firstName ? mem.orderDetail?.customer?.lastName?.charAt(0) || '' : mem.orderDetail.customer.lastName
                    }`,
                    availedDiscount: mem.availedDiscount,
                    role: mem.role,
                    lineItems: mem.lineItems,
                    price: mem.orderDetail.price,
                    refund: (mem.refund) ? mem.refund : [],
                  }),
                )}
                memberLength={gsctx?.members.length}
                brandname={brandName}
                fullshareurl={gsURL}
                shareUrl={gsShortURL ?? gsURL}
                rewards={gsctx?.campaign?.salesTarget?.rewards}
                discount={gsctx?.discountCode.percentage}
                currencySymbol={currencySymbol}
                pending={pending}
              />
            </div>
            <Row className={['mt-4', styles.groupshop__hero_how_to].join(' ')}>
              {isExpired ? (
                <ExpiredBox
                  discount={gsctx?.discountCode.percentage}
                  mes="How it works"
                  brandname={brandName ?? ''}
                  shareUrl={shortActivateURL ?? activateURL ?? ''}
                  products={allProducts?.slice(0, 3) ?? []}
                // maxPercent={maxPercent}
                />
              ) : (
                <InfoBox mes="How it works" brandname={brandName} fullshareurl={gsURL} shareUrl={gsShortURL ?? gsURL} />
              )}
            </Row>
          </Container>
        </Hero>

        <ProductGrid
          xs={6}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          products={(SKU.length >= 2 && SKU.length <= 4)
            ? uniqueArray(memberProducts) : shoppedBy}
          maxrows={1}
          addProducts={handleAddProduct}
          handleDetail={(prd: any) => setsProduct(prd)}
          id="shoppedby"
          isModalForMobile={isModalForMobile}
          urlForActivation={urlForActivation}
          skuCount={SKU.length}
        >
          <h2 className={styles.groupshop_col_shoppedby}>
            SHOPPED BY
            {' '}
            <span className={styles.groupshop_firstName}>
              {/* {getOwnerName()} */}
              {member?.orderDetail?.customer.firstName
                ? `${member.orderDetail.customer.firstName} ${member.orderDetail.customer.lastName ? member.orderDetail.customer.lastName.charAt(0) : ''}`
                : `${member?.orderDetail.customer.lastName}`}
            </span>
            {/* !pending && gsctx?.members?.length > 1 */}
            {SKU.length > 4 && !pending && gsctx?.members?.length > 1 ? (
              <Dropdown className="d-inline mx-2" align={{ lg: 'start', sm: 'end' }}>
                <Dropdown.Toggle
                  disabled={SKU.length < 5}
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
                  {gsctx?.members.map((mem: any, index) => (
                    <div className={`${index === 0 ? styles.groupshop_dropdownItem_owner : styles.groupshop_dropdownItem}`}>
                      <Dropdown.Item onClick={() => setmember(mem)}>
                        {index === 0 && '👑 '}
                        {`${mem.orderDetail.customer.firstName ?? ''
                        } ${mem.orderDetail.customer.firstName ? mem.orderDetail?.customer?.lastName?.charAt(0) || '' : mem.orderDetail?.customer?.lastName
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
            {member?.orderDetail?.customer?.firstName ? member?.orderDetail?.customer?.firstName || '' : member?.orderDetail?.customer?.lastName ?? ''}
            ’s
            previous purchases and recommendations.
          </p>
        </ProductGrid>
        {!hidePopular && SKU.length > 4 && (
          members?.length > 1 || refferalDealsProducts?.length ? (
            <ProductGrid
              xs={6}
              sm={6}
              md={6}
              lg={4}
              xl={3}
              products={
                ownerProducts
                && (ownerProducts!.length > 3
                  // ? popularProducts?.slice(0, 3)
                  ? popularShuffled
                  : newPopularPrd)
              }
              maxrows={1}
              addProducts={handleAddProduct}
              handleDetail={(prd: any) => setsProduct(prd)}
              id="popularproducts"
              isModalForMobile={isModalForMobile}
              urlForActivation={urlForActivation}
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
                  products={
                    ((SKU.length >= 2 && SKU.length <= 4)
                      ? uniqueArray(memberProducts).length > 3 : shoppedBy && shoppedBy.length > 3)
                      ? topPicks?.slice(0, 3)
                      : topPicks?.slice(0, 4)
                  }
                  maxrows={1}
                  addProducts={handleAddProduct}
                  handleDetail={(prd: any) => setsProduct(prd)}
                  id="toppicks"
                  isModalForMobile={isModalForMobile}
                  urlForActivation={urlForActivation}
                  skuCount={SKU.length}
                >
                  <h2>Top Picks</h2>
                </ProductGrid>
              )}
            </>
          ))}

        {!hideSection && SKU.length > 1 ? (
          <ProductGrid
            xs={6}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            // products={allProducts}
            products={uniqueArray(allProducts)}
            maxrows={3}
            addProducts={handleAddProduct}
            handleDetail={(prd: any) => setsProduct(prd)}
            showHoverButton
            id="allproducts"
            isModalForMobile={isModalForMobile}
            urlForActivation={urlForActivation}
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
                    <div className={styles.groupshop_sort_menu_border} />
                    <Dropdown.Item
                      className={styles.groupshop_sort_menu_item}
                      onClick={() => {
                        const arr = [...(allProducts ?? [])]?.sort();
                        const newArr = arr?.sort((a, b) => b.purchaseCount! - a.purchaseCount!);
                        setallProducts(newArr);
                      }}
                    >
                      Best seller
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </ProductGrid>
        ) : <></>}
        {/* Discover Section */}
        {matchingGroupshop?.length > 0 ? (
          <Container>
            <Row>
              <Col xs={12} className="px-0">
                <hr />
                <div className={styles.groupshop__ready}>
                  Ready for something new?
                </div>
              </Col>
              <Col xs={12} className="px-0">
                <div className={styles.groupshop__discover}>
                  Discover new brands with Microstore and get exclusive discounts!
                </div>
              </Col>
              {matchingGroupshop?.map((brand) => (
                <>
                  <Col xs={12} md={matchingGroupshop.length === 1 ? 12 : 6} className="px-0">
                    <ProductGrid
                      xs={6}
                      sm={6}
                      md={6}
                      lg={5}
                      xl={matchingGroupshop.length === 1 ? 3 : 5}
                      products={
                        brand?.products?.length
                        && brand?.products
                      }
                      maxrows={2}
                      addProducts={handleAddProduct}
                      handleDetail={(prd: any) => setsProduct(prd)}
                      id="discoverproducts1"
                      isModalForMobile={isModalForMobile}
                      urlForActivation={urlForActivation}
                      skuCount={SKU.length}
                      showHoverButton
                      isSuggestion
                      membersForDiscover={brand.members}
                      className="px-3"
                      isDiscoveryTool
                      brandurl={brand.url}
                      discoveryDiscount={brand?.discount}
                      currency={brand?.currency}
                    >
                      <div className={styles.groupshop__shopWith}>
                        <div className={styles.groupshop__shopWith__img}>
                          <img
                            src={`${brand?.logoImage}`}
                            alt={`${brand?.brandName}`}
                            className="img-fluid"
                            style={{ maxWidth: '80px' }}
                          />
                        </div>
                        <div className={styles.groupshop__shopWith__txt}>
                          Shop
                          {' '}
                          <strong>{brand?.brandName}</strong>
                          {' '}
                          with
                          {' '}
                          {brand.customerName?.lastName ?? brand.customerName?.firstName}
                          {' '}
                          and get
                          {' '}
                          <strong>
                            {brand?.discount}
                            %
                            {' '}
                            off
                          </strong>
                        </div>
                        <Button2
                          variant="primary"
                          className={styles.groupshop__shopWith__btn}
                          onClick={() => window.open(`${window.location.origin}${brand.url}`, '_blank')}
                        >
                          Shop
                        </Button2>
                      </div>
                    </ProductGrid>
                  </Col>
                </>
              ))}
            </Row>
          </Container>
        ) : ''}
        <Row className="w-100 align-items-center text-center justify-content-center my-4 mx-0">
          <Col className="d-flex justify-content-center flex-column">
            {isExpired ? (
              <>
                <p className={styles.groupshop_expShopTheseProducts}>
                  Want to shop these products?
                </p>
                <ShareUnlockButton
                  className={['align-self-center my-2 px-3 py-2', styles.groupshop_expInviteFrnd].join(' ')}
                  onClick={() => googleEventCode('earn-cashback-modal')}
                  label="INVITE A FRIEND TO SHOP WITH YOU"
                  shareurl={shortActivateURL ?? urlForActivation ?? ''}
                  placement="bottom"
                />

              </>

            )
              : ((SKU.length > 1 && leftOverProducts()?.length > 0) && (
                <>
                  <p>Don’t see what you like?</p>
                  <Button
                    className={['align-self-center my-2 px-5 py-2'].join(' ')}
                    onClick={handleAddProduct}
                  >
                    Add a Product
                  </Button>

                </>

              )) || <></>}
          </Col>
        </Row>
        <Footer LeftComp={undefined} RightComp={undefined} pending={pending} />
        <ProductsSearch
          show={showps}
          handleClose={() => setshowps(false)}
          isCreateGS={false}
          showProduct={showProduct}
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
        />
        <Cart
          show={showCart}
          setShow={setshowCart}
          handleClose={() => setshowCart(false)}
          product={undefined}
          handleDetail={(prd) => setsProduct(prd)}
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
        {isModalForMobile && (
          <div>
            <ShoppingBoxMobile
              shareurl={isExpired ? shortActivateURL ?? activateURL ?? '' : gsShortURL ?? gsURL}
              // onClick={() => setShowRewards(true)}
              val={value}
              label={isExpired ? 'Share to unlock' : 'Share & earn'}
              brandName={brandName}
              maxPercent={gsctx?.campaign?.salesTarget?.rewards?.[2]?.discount ?? ''}
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
        {/* STEP MODALs  */}
        {stepModal()}
      </div>
    </>
  );
};

export default GroupShop;

export const getServerSideProps = async (context: any) => {
  // console.log(' [...code].tsx ~ line 725 ~ constgetServerSideProps  context', context.params);
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
