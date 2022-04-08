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
import {
  ChevronDown, Handbag, Plus, Search,
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
  console.log('🚀 ~ file: [...code].tsx ~ line 43 ~ error', error);
  console.log('🚀 ~~ line 21 ~ groupshop', groupshop);
  console.log('🚀 ~~ line 21 ~ loading', loading);

  const [allProducts, setallProducts] = useState<IProduct[] | undefined>(undefined);
  const [member, setmember] = useState<Member | undefined>(undefined);
  const [showps, setshowps] = useState<boolean>(false);
  const [showCart, setshowCart] = useState<boolean>(false);
  const [pending, setpending] = useState<boolean>(true);
  const [newPopularPrd, setNewPopularPrd] = useState<IProduct[]>();
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
    members: [{ orderDetail: { customer: owner }, products: ownerProducts }],
    members,
    store: { brandName } = { brandName: '' },
    popularProducts, bestSeller, dealProducts,
    // allProducts,
  } = gsctx;
  const { findInArray, filterArray } = useUtilityFunction();

  useEffect(() => {
    setallProducts(Array.from(new Set(
      // [...gsctx?.popularProducts ?? [], ...gsctx?.allProducts ?? []],
      [...gsctx?.allProducts ?? []],
    )));
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
  console.log({ newPopularPrd });

  useEffect(() => {
    setshowCart(true);
  }, [gsctx.cart]);
  const {
    gsURL, clientDealProducts, isExpired, googleEventCode,
  } = useDeal();

  const {
    showDetail, setshowDetail, sProduct, setsProduct,
  } = useDetail(allProducts);
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
  // console.log('🚀 ~ file: [...code].tsx ~ line 55 ~ owner', owner);

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
        <Container fluid>
          <Row className={styles.groupshop__top}>
            <Col md={3} className="text-center text-lg-start"><Brand name={brandName || ''} pending={pending} /></Col>
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
                  onClick={googleEventCode}
                />
              </div>
            </Col>
            <Col md={3} className="text-center text-lg-end m-md-0 p-md-0 m-xl-auto p-xl-auto">
              <ShareButton
                placement="bottom"
                shareurl={gsURL}
                label="EARN CASHBACK"
                onClick={googleEventCode}
              />
              <IconButton icon={<Search size={24} />} className="mx-2" onClick={handleAddProduct} disabled={isExpired} />
              <IconButton icon={<Handbag size={24} />} className="mx-2" onClick={() => setshowCart(true)}>{gsctx?.cart && (gsctx?.cart?.length > 0) ? `(${gsctx?.cart?.length})` : ''}</IconButton>
            </Col>

          </Row>
        </Container>
        <Hero>

          <Col xs={12} className="text-center">
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

        </Hero>

        <ProductGrid
          xs={12}
          md={6}
          lg={4}
          xl={3}
          products={member?.products}
          maxrows={1}
          addProducts={handleAddProduct}
          handleDetail={(prd) => setsProduct(prd)}
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
            xs={12}
            md={6}
            lg={4}
            xl={3}
            products={ownerProducts
              && (ownerProducts!.length > 3 ? popularProducts?.slice(0, 3) : newPopularPrd)}
            maxrows={1}
            addProducts={handleAddProduct}
            handleDetail={(prd) => setsProduct(prd)}
          >
            <h2>Popular in Group</h2>
          </ProductGrid>

        )
          : (
            <ProductGrid
              xs={12}
              md={6}
              lg={4}
              xl={3}
              products={ownerProducts
                && (ownerProducts!.length > 3 ? bestSeller?.slice(0, 3) : bestSeller)}
              maxrows={1}
              addProducts={handleAddProduct}
              handleDetail={(prd) => setsProduct(prd)}
            >
              <h2>Top Picks</h2>
            </ProductGrid>

          )}

        <ProductGrid
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          products={allProducts}
          maxrows={3}
          addProducts={handleAddProduct}
          handleDetail={(prd) => setsProduct(prd)}
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
            <Button className="align-self-center fs-4 px-5" onClick={handleAddProduct}>Add a Product</Button>
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
      </div>
    </>
  );
};

export default GroupShop;
