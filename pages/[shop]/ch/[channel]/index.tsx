import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ACTIVE_CAMPAIGN_PRODUCTS, GET_STORE, GET_CHANNEL_BY_NAME } from 'store/store.graphql';
import Header from 'components/Layout/HeaderGS/HeaderGS';
import Counter from 'components/Layout/Counter/Counter';
import styles from 'styles/Groupshop.module.scss';
import {
  Col, Container, Dropdown, Row,
} from 'react-bootstrap';
import Brand from 'components/Groupshop/Brand/Brand';
import QRClickIcon from 'assets/images/qr-click.svg';
import IconButton from 'components/Buttons/IconButton';
import ArrowSort from 'assets/images/ArrowSort.svg';
import {
  Handbag, Search,
} from 'react-bootstrap-icons';
import Hero from 'components/Groupshop/Hero/Hero';
import ProductGrid from 'components/Groupshop/ProductGrid/ProductGrid';
import { IProduct, IStore } from 'types/store';
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
import { useMediaQuery } from 'react-responsive';
import useGtm from 'hooks/useGtm';
import useTopPicks from 'hooks/useTopPicks';
import ProductDetail from 'components/Groupshop/ProductDetail/ProductDetail';
import Link from 'next/link';
import LinkShareMobileView from 'components/LinkShare/LinkShareMobileView';
import GetRewardBox from 'components/Groupshop/RewardBox/GetRewardBox';
import InfoBox from 'components/Influencer/InfoBox/InfoBox';
import Router, { useRouter } from 'next/router';

const GroupShop: NextPage<{ meta: any }> = ({ meta }: { meta: any }) => {
  const { AlertComponent, showError } = useAlert();
  const {
    shop, discountCode, status, channelName,
  } = useCode();
  const isModalForMobile = useMediaQuery({
    query: '(max-width: 475px)',
  });
  const {
    data, refetch,
  } = useQuery(GET_STORE, {

    variables: { shop },
  });

  const [getActiveCampaignProducts, { data: data1 }] = useLazyQuery(GET_ACTIVE_CAMPAIGN_PRODUCTS);

  const [Channel, setChannel] = useState({
    rewards: {
      baseline: '',
      commission: '',
      maximum: '',
    },
    name: '',
    id: '',
  });
  const [Error1, setError1] = useState<string>('');

  const [callFun, { data: channelData, error }] = useLazyQuery(GET_CHANNEL_BY_NAME, {
    fetchPolicy: 'network-only',
  });

  const [allProducts, setallProducts] = useState<IProduct[] | undefined>(
    undefined,
  );
  const [showCart, setshowCart] = useState<boolean>(false);
  const [pending, setpending] = useState<boolean>(true);
  const [newPopularPrd, setNewPopularPrd] = useState<IProduct[]>();
  // console.log('🚀 ~ file: [...code].tsx ~ line 110 ~ newPopularPrd', newPopularPrd);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [store, setstore] = useState<IStore>({});
  const storeLogo = data?.storeName?.logoImage;
  useEffect(() => {
    if (data) {
      setstore(data?.storeName);
    }
  }, [data]);

  const { googleEventCode, googleButtonCode } = useGtm();
  const {
    uniqueArray,
  } = useUtilityFunction();

  const {
    showDetail, setshowDetail, sProduct, setsProduct, showQrscan, setshowQrscan,
  } = useDetail(allProducts);

  useEffect(() => {
    if (store.id && channelName) {
      callFun({
        variables: {
          getChannelByName: {
            storeId: store?.id,
            name: channelName,
          },
        },
      });
    }
  }, [store.id, channelName]);

  useEffect(() => {
    if (channelData?.getChannelByName) {
      const {
        rewards: {
          baseline,
          commission,
          maximum,
        },
        name,
        id,
        isActive,
      } = channelData?.getChannelByName;
      setChannel({
        rewards: {
          baseline,
          commission,
          maximum,
        },
        name,
        id,
      });
      if (isActive !== true) {
        setError1('channel is Inactive');
      }
    }
  }, [channelData?.getChannelByName]);

  useEffect(() => {
    if (shop) {
      getActiveCampaignProducts({
        variables: {
          shop,
        },
      });
    }
  }, [shop]);

  // load all products
  useEffect(() => {
    // let otherProducts: IProduct[];
    if (data1?.activeCampaignWithProducts) {
      setallProducts(data1?.activeCampaignWithProducts?.allProducts);
    }
  }, [data1]);

  if (error) {
    Router.push('/404');
    return <p>channel not found</p>;
  }

  if (Error1 !== '') {
    return <p>{Error1}</p>;
  }

  const getLogoHTML = () => (
    <>
      <div className={styles.groupshop_main_logo}>
        {store.logoImage === '' || store.logoImage === undefined ? (
          <Link href={`https://${store.shop}`}>
            <Brand
              name={
                (store.brandName || '').split(' ').slice(0, 2).join(' ') || ''
              }
              pending={pending}
            />
          </Link>
        ) : (
          <Link href={`https://${store.shop}`}>
            <a target="_blank" style={{ cursor: 'pointer' }}>
              <img
                src={storeLogo}
                alt={`${store.brandName}`}
                // alt="d"
                className="img-fluid"
              />
            </a>
          </Link>
        )}
      </div>
    </>
  );
  return (
    <>
      <Head>
        <title>
          Groupshop -
          {' '}
          {Channel?.name ?? channelName ?? ''}
        </title>
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
        <meta name="application-name" content="Groupshop" />
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="og:type" content="website" />
        <meta name="description" content={`Shop ${meta.brandName} on my Groupshop and get ${meta.maxReward} off.`} />
        <meta name="og:title" content="Groupshop" />
        <meta name="description" content={`Shop ${meta.brandName} on my Groupshop and get ${meta.maxReward} off.`} />
        <meta name="keywords" content="group, shop, discount, deal" />
        {/* <meta name="og:url" content={gsShortURL ?? gsURL} /> */}
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
                // <Counter expireDate={new Date()} pending={false} isRetail />
            }
            RightComp={(
              <>
                <InfoBox
                  mes={isModalForMobile ? '' : 'How does this work?'}
                  brandname=""
                  shareUrl=""
                  name=""
                />
              </>
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
                    <IconButton
                      icon={<Search size={24} />}
                      className={styles.groupshop__hero_iconSearchBtn}
                      onClick={() => {}}
                    />
                  </>
                )}
              </Col>
              <Col md={6} className={styles.groupshop__top_members}>
                {/*  */}
              </Col>
              <Col xs={6} className={styles.groupshop__counter}>
                {isModalForMobile && (
                  <>
                    {getLogoHTML()}
                  </>
                )}
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
                  shareurl=""
                  fullshareurl=""
                  label="Share with friends"
                  onClick={() => googleEventCode('earn-cashback-modal')}
                  className={styles.groupshop__hero_share_btn}
                />
                {!isModalForMobile
                  && (
                  <IconButton
                    icon={<Search size={24} />}
                    className={styles.groupshop__hero_iconSearchBtn}
                    onClick={() => {}}
                  />
                  )}
                <IconButton
                  icon={<Handbag size={24} />}
                  className={styles.groupshop__hero_iconBtn}
                  onClick={() => setshowCart(true)}
                />
              </Col>
            </Row>
          </Container>
        </header>
        <Hero bannerImage={store.settings?.general?.imageUrl}>
          <Container className={styles.groupshop__hero__content}>
            <Row className={styles.groupshop__hero_welcome}>
              <Col lg={12}>
                {/* <h3>
                  Welcome to
                  {' '}
                  <span className="text-capitalize text-decoration-none">
                    {' '}
                    {gsctx?.partnerDetails?.fname}
                    {' '}
                  </span>
                  ’s Groupshop
                </h3>
                <p>
                  Shop with me & get exclusive discounts on my favorite products
                  Explore my favorite
                  {' '}
                  {gsctx?.store?.brandName}
                  {' '}
                  products and access exclusive discounts when you shop with me!
                </p> */}
              </Col>
            </Row>
          </Container>
        </Hero>

        <ProductGrid
          xs={6}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          isModalForMobile={isModalForMobile}
          products={uniqueArray(allProducts ?? [])}
          maxrows={3}
          addProducts={() => {}}
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
              onClick={() => {}}
            >
              Add a Product
            </Button>
          </Col>
        </Row>
        {/* <Footer LeftComp={undefined} RightComp={undefined} /> */}

        {/* signup modal */}
        <GetRewardBox
          show
          handleClose={() => {}}
          store={store}
          Channel={Channel}
          setError1={setError1}
        />

        <LinkShareMobileView
          show={showQrscan}
          handleClose={() => setshowQrscan(false)}
          shareurl=""
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
      </div>
    </>
  );
};

export default GroupShop;
export const getServerSideProps = async (context: any) => {
  // console.log(' [...code].tsx ~ line 725 ~ constgetServerSideProps  context', context.params);
  const url = `${process.env.API_URL}/mepartner?name=${context.params.code}`;
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
