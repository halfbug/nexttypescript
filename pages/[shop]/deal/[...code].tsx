import React, { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_GROUPSHOP, GET_PRODUCTS } from 'store/store.graphql';
import Header from 'components/Layout/HeaderGS/HeaderGS';
import Counter from 'components/Layout/Counter/Counter';
import styles from 'styles/Groupshop.module.scss';
// import { StoreContext } from 'store/store.context';
import InfoButton from 'components/Buttons/InfoButton/InfoButton';
import {
  Button,
  Col, Container, Dropdown, ListGroup, Row, ButtonGroup,
} from 'react-bootstrap';
import Brand from 'components/Groupshop/Brand/Brand';
import Members from 'components/Groupshop/Members/Members';
import EarnButton from 'components/Buttons/EarnButton/EarnButton';
import CopyToClipboard from 'components/Buttons/CopyToClipboard/CopyToClipboard';
import SocialButton from 'components/Buttons/SocialButton/SocialButton';
import IconButton from 'components/Buttons/IconButton';
import {
  ArrowDown,
  Cart, ChevronDown, Handbag, MenuDown, Search,
} from 'react-bootstrap-icons';
import Hero from 'components/Groupshop/Hero/Hero';
import ProductCard from 'components/Groupshop/ProductCard/ProductCard';
import ProductGrid from 'components/Groupshop/ProductGrid/ProductGrid';
import { GroupshopContext, gsInit } from 'store/groupshop.context';
import { IGroupshop, Member } from 'types/groupshop';
import { IProduct } from 'types/store';
import ProductsSearch from 'components/Groupshop/ProductsSearch/ProductsSearch';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

const GroupShop: NextPage = () => {
  const router = useRouter();
  const { query: { shop, code, source } } = router;
  const { gsctx, dispatch } = useContext(GroupshopContext);

  const {
    loading, error, data: { groupshop } = { groupshop: gsInit }, networkStatus,
  } = useQuery<{groupshop: IGroupshop }, {code: string | undefined}>(GET_GROUPSHOP, {
    variables: { code: code?.length ? code[0] : undefined },
    notifyOnNetworkStatusChange: true,
    skip: !code,
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

  console.log('🚀 ~~ line 21 ~ data', groupshop);
  console.log('🚀 ~~ line 21 ~ loading', loading);

  const [allProducts, setallProducts] = useState<IProduct[] | undefined>(undefined);
  const [member, setmember] = useState<Member | undefined>(undefined);
  const [showps, setshowps] = useState<boolean>(false);

  const [pending, setpending] = useState<Boolean>(true);
  useEffect(() => {
    if (groupshop.id && pending) {
      console.log('🚀 ~ file: [...code].tsx ~ line 52 ~ useEffect ~ groupshop', groupshop);
      setpending(false);
      setallProducts(groupshop?.allProducts);
      setmember(groupshop?.members[0]);
      dispatch({ type: 'UPDATE_GROUPSHOP', payload: groupshop });
    }
  }, [groupshop, pending]);

  // const { shop, getProducts } = useStore();

  React.useEffect(() => {
    if (productsql?.data?.products && gsctx.allProducts) {
      const otherProducts: IProduct[] = productsql?.data?.products.filter(
        (o1:IProduct) => !gsctx?.allProducts?.some(
          (o2:IProduct) => o1.id === o2.id,
        ),
      );

      dispatch({ type: 'UPDATE_PRODUCTS', payload: { ...gsctx, store: { ...gsctx.store, products: otherProducts } } });
      console.log('🚀 ~ file: [...code].tsx ~ line 88 ~ React.useEffect ~ otherProducts', otherProducts);
    }
  }, [productsql.data]);

  const {
    members: [{ orderDetail: { customer: owner } }],
    store: { brandName } = { brandName: '' },
    popularProducts,
    // allProducts,
  } = groupshop;

  console.log('🚀 ~ file: [...code].tsx ~ line 65 ~ gsctx', gsctx);
  // console.log('🚀 ~ file: [...code].tsx ~ line 55 ~ owner', owner);

  if (error) {
    router.push('/404');
    return <p>groupshop not found</p>;
  }

  return (
    <div className={styles.groupshop}>
      <Header LeftComp={<Counter expireDate={groupshop?.expiredAt} pending={pending} />} RightComp={<InfoButton handleClick={() => console.log('info link clicked')} message="How does this work?" />} />
      <Container fluid>
        <Row className={styles.groupshop__top}>
          <Col md={3} className="text-center text-lg-start"><Brand name={brandName || ''} pending={pending} /></Col>
          <Col md={6} className={styles.groupshop__top_members}>
            <h5 className="text-center">Shop or invite your friends to shop to get started!</h5>
            <div className="d-flex flex-row justify-content-center">
              <Members names={groupshop?.members.map((mem: any) => `${mem.orderDetail.customer.firstName} ${mem.orderDetail?.customer?.LastName?.charAt(0) || ''}`)} cashback={['$23', '$20']} />
              <EarnButton
                popContent={(
                  <div className="pt-1">
                    <CopyToClipboard value="www.groupshop.short.url.much.more.text" />
                    <Row className="p-2">
                      <Col className="p-0 d-flex justify-content-center"><SocialButton network="Instagram" url="https://www.figma.com/file/zx6flytdYb7DCGXyHJmXwi/Groupshop---Consumer-Facing?node-id=669%3A516" /></Col>
                      <Col className="p-0 d-flex justify-content-center"><SocialButton network="Pinterest" url="https://www.figma.com/file/zx6flytdYb7DCGXyHJmXwi/Groupshop---Consumer-Facing?node-id=669%3A516" /></Col>
                      <Col className="p-0 d-flex justify-content-center"><SocialButton network="Tiktok" url="https://www.figma.com/file/zx6flytdYb7DCGXyHJmXwi/Groupshop---Consumer-Facing?node-id=669%3A516" /></Col>
                      <Col className="p-0 d-flex justify-content-center"><SocialButton network="Twitter" url="https://www.figma.com/file/zx6flytdYb7DCGXyHJmXwi/Groupshop---Consumer-Facing?node-id=669%3A516" /></Col>
                      <Col className="p-0 d-flex justify-content-center"><SocialButton network="Facebook" url="https://www.figma.com/file/zx6flytdYb7DCGXyHJmXwi/Groupshop---Consumer-Facing?node-id=669%3A516" /></Col>
                    </Row>
                    <Row className="flex-column">
                      <Col><h3>Shop, share, earn</h3></Col>
                      <Col>
                        <p>
                          Send special discounts to your
                          friends by sharing this Groupshop page
                          with them. If you also shopped from this
                          page, you’ll earn cashback every time the
                          y shop with you.
                        </p>

                      </Col>
                    </Row>
                  </div>
              )}
                label="+Invite"
                className={styles.groupshop__top_invite}
                displayIcon={false}
              />
            </div>
          </Col>
          <Col md={3} className="text-center text-lg-end m-md-0 p-md-0 m-xl-auto p-xl-auto">
            <EarnButton
              popContent={(
                <div className="pt-1">
                  <CopyToClipboard value="www.groupshop.short.url.much.more.text" />
                  <Row className="p-2">
                    <Col className="p-0 d-flex justify-content-center"><SocialButton network="Instagram" url="https://www.figma.com/file/zx6flytdYb7DCGXyHJmXwi/Groupshop---Consumer-Facing?node-id=669%3A516" /></Col>
                    <Col className="p-0 d-flex justify-content-center"><SocialButton network="Pinterest" url="https://www.figma.com/file/zx6flytdYb7DCGXyHJmXwi/Groupshop---Consumer-Facing?node-id=669%3A516" /></Col>
                    <Col className="p-0 d-flex justify-content-center"><SocialButton network="Tiktok" url="https://www.figma.com/file/zx6flytdYb7DCGXyHJmXwi/Groupshop---Consumer-Facing?node-id=669%3A516" /></Col>
                    <Col className="p-0 d-flex justify-content-center"><SocialButton network="Twitter" url="https://www.figma.com/file/zx6flytdYb7DCGXyHJmXwi/Groupshop---Consumer-Facing?node-id=669%3A516" /></Col>
                    <Col className="p-0 d-flex justify-content-center"><SocialButton network="Facebook" url="https://www.figma.com/file/zx6flytdYb7DCGXyHJmXwi/Groupshop---Consumer-Facing?node-id=669%3A516" /></Col>
                  </Row>
                  <Row className="flex-column">
                    <Col><h3>Shop, share, earn</h3></Col>
                    <Col>
                      <p>
                        Send special discounts to your
                        friends by sharing this Groupshop page
                        with them. If you also shopped from this
                        page, you’ll earn cashback every time the
                        y shop with you.
                      </p>

                    </Col>
                  </Row>
                </div>
              )}
              label="EARN CASHBACK"
            />
            <IconButton icon={<Search size={24} />} className="mx-2" />
            <IconButton icon={<Handbag size={24} />} className="mx-2">(2)</IconButton>
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
        addProducts={setshowps}
      >
        ;

        <h2>
          SHOPPED BY
          {' '}
          {member?.orderDetail?.customer.firstName}
          <Dropdown className="d-inline mx-2">
            <Dropdown.Toggle id="dropdown-autoclose-true" variant="outline-primary" className={styles.groupshop_dropdown}>
              <ChevronDown />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {groupshop?.members.map((mem: any) => <Dropdown.Item onClick={() => setmember(mem)}>{`${mem.orderDetail.customer.firstName} ${mem.orderDetail?.customer?.LastName?.charAt(0) || ''}`}</Dropdown.Item>)}
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

      <ProductGrid
        xs={12}
        md={6}
        lg={4}
        xl={3}
        products={popularProducts}
        maxrows={1}
        addProducts={setshowps}
      >
        <h2>Popular in Group</h2>
      </ProductGrid>
      <ProductGrid
        xs={12}
        sm={6}
        md={6}
        lg={4}
        xl={3}
        products={allProducts}
        maxrows={3}
        addProducts={setshowps}
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
      <ProductsSearch show={showps} handleClose={() => setshowps(false)} />
    </div>
  );
};

export default GroupShop;
