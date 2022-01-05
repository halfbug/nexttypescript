import React, { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_GROUPSHOP } from 'store/store.graphql';
import Header from 'components/Layout/HeaderGS/HeaderGS';
import Counter from 'components/Layout/Counter/Counter';
import styles from 'styles/Groupshop.module.scss';
// import { StoreContext } from 'store/store.context';
import InfoButton from 'components/Buttons/InfoButton/InfoButton';
import {
  Button,
  Col, Container, Dropdown, ListGroup, Row,
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
import { GroupshopContext } from 'store/groupshop.context';

const GroupShop: NextPage = () => {
  const router = useRouter();
  const { query: { code, source } } = router;
  const { groupshop: gsctx, dispatch } = useContext(GroupshopContext);

  const {
    loading, error, data: { groupshop } = { groupshop: { members: [{ orderDetail: { customer: '' } }], store: { brandName: '' } } }, networkStatus,
  } = useQuery(GET_GROUPSHOP, {

    variables: { code: code?.length ? code[0] : null },
    // pollInterval: 500,
    notifyOnNetworkStatusChange: true,
    skip: !code,

  });
  console.log('🚀 ~  ~ line 21 ~ data', groupshop);
  // //   // console.log('🚀 ~  ~ line 21 ~ error', error);
  console.log('🚀 ~  ~ line 21 ~ loading', loading);
  // //   const { installationDialogue } = useInstallation(ins);

  // //   const { store, dispatch } = useContext(StoreContext);
  const [pending, setpending] = useState<Boolean>(true);
  useEffect(() => {
    if (groupshop.id && pending) {
      console.log('🚀 ~ file: [...code].tsx ~ line 52 ~ useEffect ~ groupshop', groupshop);
      setpending(false);
      dispatch({ type: 'UPDATE_GROUPSHOP', payload: groupshop });
    }
  }, [groupshop, pending]);

  // if (groupshop) {
  const {
    members: [{ orderDetail: { customer: owner } }],
    store: { brandName },
    popularProducts,
    allProducts,
  } = groupshop;
  // }
  console.log('🚀 ~ file: [...code].tsx ~ line 65 ~ gsctx', gsctx);
  console.log('🚀 ~ file: [...code].tsx ~ line 55 ~ owner', owner);

  if (error) {
    // router.push('/404');
    return <p>groupshop not found</p>;
  }

  return (
    <>
      <Header LeftComp={<Counter expireDate={groupshop?.expiredAt} pending={pending} />} RightComp={<InfoButton handleClick={() => console.log('info link clicked')} message="How does this work?" />} />
      <Container fluid>
        <Row className={styles.groupshop__top}>
          <Col md={3} className="text-center text-lg-start"><Brand name={brandName} pending={pending} /></Col>
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
      <Container>
        <Row className={styles.groupshop_row}>
          <Col xs={12} className={styles.groupshop_col}>
            <h2>
              SHOPPED BY ELISA
              {/* <IconButton icon={<ChevronDown />} className="rounded-pill p-2 border" /> */}
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle id="dropdown-autoclose-true" variant="outline-primary" className={styles.groupshop_dropdown}>
                  <ChevronDown />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </h2>
            <p>Shop from Elisa’s previous pruchases and recommendations.</p>
          </Col>
        </Row>
        <Row>
          {[0, 1, 2, 3].map((mproducts) => (
            <Col xs={12} md={6} lg={4} xl={3} className="d-flex justify-content-center ">
              <ProductCard isrc="https://static-01.daraz.pk/p/bddacc10cdf258fb1daa001db136dfb3.jpg_340x340q80.jpg_.web" imgOverlay={undefined} />
            </Col>
          ))}
        </Row>
      </Container>
      <ProductGrid xs={12} md={6} lg={4} xl={3} products={popularProducts} maxrows={1}>
        <h2>Popular in Group</h2>
      </ProductGrid>
      <ProductGrid xs={12} md={6} lg={4} xl={3} products={allProducts} maxrows={2}>
        <h2>All Products</h2>
      </ProductGrid>
    </>
  );
};

export default GroupShop;
