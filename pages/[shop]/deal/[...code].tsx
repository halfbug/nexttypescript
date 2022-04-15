/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_GROUPSHOP, GET_PRODUCTS } from 'store/store.graphql';
import Header from 'components/Layout/HeaderGS/HeaderGS';
import Counter from 'components/Layout/Counter/Counter';
import styles from 'styles/Groupshop.module.scss';
// import { StoreContext } from 'store/store.context';
import {
  Col, Container, Dropdown, Row,
} from 'react-bootstrap';
import Brand from 'components/Groupshop/Brand/Brand';
import Members from 'components/Groupshop/Members/Members';
import CopyToClipboard from 'components/Buttons/CopyToClipboard/CopyToClipboard';
import SocialButton from 'components/Buttons/SocialButton/SocialButton';
import IconButton from 'components/Buttons/IconButton';
import Icon from 'assets/images/small cone.svg';
import {
  ChevronDown, Handbag, Link, Plus, Search,
} from 'react-bootstrap-icons';
import Hero from 'components/Groupshop/Hero/Hero';
import ProductGrid from 'components/Groupshop/ProductGrid/ProductGrid';
import { GroupshopContext, gsInit } from 'store/groupshop.context';
import { IGroupshop, Member } from 'types/groupshop';
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
import PopoverButton from 'components/Buttons/PopoverButton/PopoverButton';
import useDetail from 'hooks/useDetail';
import ProductDetail from 'components/Groupshop/ProductDetail/ProductDetail';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import useUtilityFunction from 'hooks/useUtilityFunction';
import Head from 'next/head';
import script from 'next/script';
import BigBannerBox from 'components/Groupshop/BigBannerBox/BigBannerBox';
import SmallBannerBox from 'components/Groupshop/SmallBannerBox/SmallBannerBox';
import SmallBannerBox2 from 'components/Groupshop/SmallBannerBox2/SmallBannerBox2';
import TickCircle from 'assets/images/tick-circle.svg';
import GradientCircle from 'assets/images/gradient-circle.svg';
import RewardBox from 'components/Groupshop/RewardBox/RewardBox';

const GroupShop: NextPage = () => {
  const { gsctx, dispatch } = useContext(GroupshopContext);
  const { AlertComponent, showError } = useAlert();
  const { shop, discountCode } = useCode();

  const {
    loading, error, data: { groupshop } = { groupshop: gsInit },
  } = useQuery<{groupshop: IGroupshop }, {code: string | undefined}>(GET_GROUPSHOP, {
    variables: { code: discountCode },
    notifyOnNetworkStatusChange: true,
    skip: !discountCode,
  });

  const productsql = useQuery(GET_PRODUCTS, {
    variables: {
      productQueryInput: {
        shop: `${shop}.myshopify.com`,
        sort: -1,
        limit: 10000,
      },
    },
    skip: !shop,
  });
  console.log('🚀 ~ file: [...code].tsx ~ line74  ~ error', error);
  console.log('🚀 ~~ line 75 ~ groupshop', groupshop);
  console.log('🚀 ~~ line 75 ~ loading', loading);

  const [allProducts, setallProducts] = useState<IProduct[] | undefined>(undefined);
  const [member, setmember] = useState<Member | undefined>(undefined);
  const [showps, setshowps] = useState<boolean>(false);
  const [showCart, setshowCart] = useState<boolean>(false);
  const [pending, setpending] = useState<boolean>(true);
  const [bannerDiscount, setbannerDiscount] = useState<(string | undefined)[]
    | undefined>(undefined);
  const [newPopularPrd, setNewPopularPrd] = useState<IProduct[]>();
  const [showRewards, setShowRewards] = useState<boolean>(false);
  const [newBestSeller, setnewBestSeller] = useState<IProduct[]>();

  useEffect(() => {
    if (groupshop.id && pending) {
      console.log('🚀 ~ file: [...code].tsx ~ line 52 ~ useEffect ~ groupshop', groupshop);
      setpending(false);
      setallProducts(groupshop?.allProducts);
      setmember(groupshop?.members[0]);
      dispatch({ type: 'UPDATE_GROUPSHOP', payload: groupshop });
    }
  }, [groupshop, pending]);

  const {
    gsURL, clientDealProducts, isExpired, googleEventCode, discount,
    getDiscounts, milestones, getBannerTotalCashBack,
  } = useDeal();

  const {
    members: [{ orderDetail: { customer: owner }, products: ownerProducts }],
    members,
    store: { brandName } = { brandName: '' },
    popularProducts, bestSeller, dealProducts,
    // allProducts,
  } = gsctx;
  const { findInArray, filterArray } = useUtilityFunction();

  useEffect(() => {
    // setallProducts(Array.from(new Set(
    //   // [...gsctx?.popularProducts ?? [], ...gsctx?.allProducts ?? []],
    //   [...gsctx?.allProducts ?? []],
    // )));
    setallProducts([...allProducts ?? []]?.sort(
      (a, b) => a.title.localeCompare(b.title),
    ));

    setbannerDiscount(getDiscounts());
  }, [gsctx]);

  useEffect(() => {
    // mixing popular produt with best seller to complete the count of 4 if popular are less.
    if (popularProducts?.length) {
      if (popularProducts.length < 4) {
        // removing popular prd from bestseller so no duplication
        const uniqueBestSeller = filterArray(bestSeller as any[], popularProducts as any[], 'id', 'id').slice(0, 4 - popularProducts.length);
        const newPopularArr = Array.from(new Set(
          [...popularProducts ?? [], ...uniqueBestSeller ?? []],
        ));
        setNewPopularPrd([...newPopularArr]);
      } else {
        setNewPopularPrd([...popularProducts ?? []]);
      }
    }
  }, [popularProducts, dealProducts]);

  useEffect(() => {
    if (bestSeller?.length) {
      const nb = bestSeller!.filter((prd) => prd.outofstock === false);
      setnewBestSeller([...nb]);
    }
  }, [bestSeller]);

  useEffect(() => {
    setshowCart(true);
  }, [gsctx.cart]);

  const {
    showDetail, setshowDetail, sProduct, setsProduct,
  } = useDetail(allProducts);

  // const { findInArray } = useUtilityFunction();

  React.useEffect(() => {
    let otherProducts: IProduct[];
    if (productsql?.data?.products && gsctx.allProducts) {
      if (gsctx.campaign?.addableProducts?.length) {
        otherProducts = findInArray(gsctx.campaign?.addableProducts, productsql?.data?.products || [], null, 'id');
        // console.log(findInArray(gsctx.campaign?.addableProducts, productsql?
        // .data?.products || [], null, 'id'));
      } else {
        otherProducts = productsql?.data?.products.filter(
          (o1:IProduct) => !gsctx?.allProducts?.some(
            (o2:IProduct) => o1.id === o2.id,
          ),
        );
      }
      dispatch({ type: 'UPDATE_PRODUCTS', payload: { ...gsctx, store: { ...gsctx.store, products: otherProducts } } });
    }
  }, [productsql.data]);

  console.log('🚀 ~ file: [...code].tsx ~ line 65 ~ gsctx', gsctx);

  const handleAddProduct = () => {
    if (gsctx?.totalProducts < 101) {
      const cprod = clientDealProducts()?.length || 0;
      if (cprod >= 5) { showError('Only 5 products can be added to this Group Shop per person.'); } else { setshowps(true); }
    } else showError('Groupshop is full you can not add more products to it');
  };

  // if (error) {
  //   router.push('/404');
  //   return <p>groupshop not found</p>;
  // }

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
      </Head>
      <div className={styles.groupshop}>
        <Header
          LeftComp={(
            <Counter
              expireDate={gsctx?.expiredAt}
              pending={pending}
            />
)}
          RightComp={<InfoBox />}
        />
        <Container fluid className="border-top">
          <Row className={['gx-0', styles.groupshop__top].join(' ')}>
            <Col md={3} xs={3} className="text-center text-lg-start d-flex justify-content-start"><Brand name={brandName || ''} pending={pending} /></Col>
            <Col md={6} className={styles.groupshop__top_members}>
              <h5 className="text-center">Shop or invite your friends to shop to get started!</h5>
              <div className="d-flex flex-row justify-content-center">
                <Members names={gsctx?.members.map((mem: any) => `${mem.orderDetail.customer.firstName} ${mem.orderDetail?.customer?.lastName?.charAt(0) || ''}`)} cashback={['$23', '$20']} />

                <ShareButton
                  placement="bottom"
                  shareurl={gsURL}
                  label="Invite"
                  className={styles.groupshop__top_invite}
                  icon={<Plus size={18} className="me-0 pe-0" />}
                  onClick={() => googleEventCode('invite-share-modal')}
                />
              </div>
            </Col>
            <Col xs={6} className={styles.groupshop__counter}>
              <div className={styles.groupshop__counter_middle}>
                <p>
                  <span>35H</span>
                  :
                  <span>59M</span>
                  {' '}
                  :
                  <span>10S</span>
                </p>
              </div>
            </Col>
            <Col
              md={3}
              xs={3}
              className={['text-center text-lg-end m-md-0 p-md-0 m-xl-auto p-xl-auto d-flex justify-content-end align-items-baseline',
                styles.groupshop__top__left_icons].join(' ')}
            >
              <ShareButton
                placement="bottom"
                shareurl={gsURL}
                label="EARN CASHBACK"
                onClick={() => googleEventCode('earn-cashback-modal')}
                className={styles.groupshop__hero_share_btn}
              />
              <IconButton
                icon={<Search size={24} />}
                className={styles.groupshop__hero_iconBtn}
                onClick={handleAddProduct}
                disabled={isExpired}
              />
              <IconButton icon={<Handbag size={24} />} className={styles.groupshop__hero_iconBtn} onClick={() => setshowCart(true)}>{gsctx?.cart && (gsctx?.cart?.length > 0) ? `(${gsctx?.cart?.length})` : ''}</IconButton>
              <p className={['d-flex align-items-center', styles.groupshop__hero__cart_count].join(' ')}>(2)</p>
            </Col>

          </Row>
        </Container>
        <Hero>
          <Container>
            <Row className={styles.groupshop__hero_welcome}>
              <Col lg={12}>
                <h3>
                  Welcome to
                  {' '}
                  <span className="text-capitalize">
                    {' '}
                    {owner?.firstName}
                    {' '}
                  </span>
                  ’s Groupshop
                </h3>
                <p>The more friends shop, the more discounts and cashback!</p>
              </Col>
            </Row>
            <Row className="d-flex justify-content-evenly">
              <Col md={4} className={styles.groupshop__hero__small_banner_right}>
                {(members.length > 2 && members.length < 6)
                  ? (
                    <div className="d-flex flex-column justify-content-center align-items-center ">
                      <div className="mb-2">Unlocked</div>
                      <SmallBannerBox bannerDiscount={bannerDiscount} />
                      <TickCircle />
                    </div>
                  ) : '' }
              </Col>
              <Col md={4} className="text-center mb-5">
                <div className={styles.groupshop__hero_current_reward}>
                  Current Rewards
                </div>
                <div role="button" onClick={() => { setShowRewards(true); }}>
                  <BigBannerBox />
                </div>
              </Col>
              <Col md={4} className={styles.groupshop__hero__small_banner_left}>
                {members.length < 5
                  ? (
                    <div className="d-flex flex-column justify-content-center align-items-center ">
                      <div className="mb-2">Next Rewards</div>
                      <SmallBannerBox2 bannerDiscount={bannerDiscount} />
                      <GradientCircle />
                    </div>
                  ) : '' }
              </Col>
            </Row>
            <Row>
              <p className="mb-2 text-center">
                <Icon />
                {' '}
                Plus unlock $27 cashback for
              </p>
            </Row>
            <div className="mt-2 mb-4 d-flex justify-content-center">
              <Members names={gsctx?.members.map((mem: any) => `${mem.orderDetail.customer.firstName} ${mem.orderDetail?.customer?.lastName?.charAt(0) || ''}`)} cashback={['$23', '$20']} />
            </div>
            <Row className={styles.groupshop__hero_how_to}>
              How it works
            </Row>
          </Container>
        </Hero>

        <ProductGrid
          xs={6}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          products={member?.products}
          maxrows={1}
          addProducts={handleAddProduct}
          handleDetail={(prd) => setsProduct(prd)}
          id="shoppedby"
        >
          <h2>
            SHOPPED BY
            {' '}
            <span className={styles.groupshop_firstName}>
              {member?.orderDetail?.customer.firstName}
            </span>
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true" variant="outline-primary" className={styles.groupshop_dropdown}>
                <ChevronDown />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {gsctx?.members.map((mem: any) => <Dropdown.Item onClick={() => setmember(mem)}>{`${mem.orderDetail.customer.firstName} ${mem.orderDetail?.customer?.lastName?.charAt(0) || ''}`}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          </h2>
          <p>
            Shop from
            {' '}
            {member?.orderDetail?.customer?.firstName || ''}
            {' '}
            ’s previous pruchases and recommendations.
          </p>

        </ProductGrid>
        {members?.length > 1 ? (
          <ProductGrid
            xs={6}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            products={ownerProducts
              && (ownerProducts!.length > 3 ? popularProducts?.slice(0, 3) : newPopularPrd)}
            maxrows={1}
            addProducts={handleAddProduct}
            handleDetail={(prd) => setsProduct(prd)}
            id="popularproducts"
          >
            <h2>Popular in Group</h2>
          </ProductGrid>

        )
          : (
            <ProductGrid
              xs={6}
              sm={6}
              md={6}
              lg={4}
              xl={3}
              products={ownerProducts
                && (ownerProducts!.length > 3 ? newBestSeller?.slice(0, 3)
                  : newBestSeller?.slice(0, 4))}
              maxrows={1}
              addProducts={handleAddProduct}
              handleDetail={(prd) => setsProduct(prd)}
              id="toppicks"
            >
              <h2>Top Picks</h2>
            </ProductGrid>

          )}

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
            <div className={['position-absolute top-0 end-0', styles.groupshop_sort].join(' ')}>
              <Dropdown align="end" drop="down">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  <span className="d-none d-sm-inline text-capitalize">
                    Sort by
                  </span>
                  <ChevronDown />

                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setallProducts([...allProducts ?? []]?.sort(
                    (a, b) => (parseFloat(a.price) - parseFloat(b.price)),
                  ))}
                  >
                    Price (Low to High)
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setallProducts([...allProducts ?? []]?.sort(
                    (a, b) => (parseFloat(b.price) - parseFloat(a.price)),
                  ))}
                  >
                    Price ( High to Low)

                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setallProducts([...allProducts ?? []]?.sort(
                    (a, b) => a.title.localeCompare(b.title),
                  ))}
                  >
                    Name (a-z)

                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setallProducts([...allProducts ?? []]?.sort(
                    (a, b) => a.title.localeCompare(b.title),
                  ).reverse())}
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
            <Button className="align-self-center fs-4 my-2 px-5" onClick={handleAddProduct}>Add a Product</Button>
          </Col>
        </Row>
        <Footer LeftComp={undefined} RightComp={undefined} />
        <ProductsSearch show={showps} handleClose={() => setshowps(false)} />
        <ProductDetail
          show={showDetail}
          handleClose={() => setshowDetail(false)}
          product={sProduct}
        />
        <Cart
          show={showCart}
          handleClose={() => setshowCart(false)}
          product={undefined}
          handleDetail={(prd) => setsProduct(prd)}
        />
        <AlertComponent />
        <RewardBox
          show={showRewards}
          handleClose={() => setShowRewards(false)}
        />
      </div>
    </>
  );
};

export default GroupShop;
