import React, { useContext, useEffect } from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_STORE } from 'store/store.graphql';
import Header from 'components/Layout/HeaderGS/HeaderGS';
import Counter from 'components/Layout/Counter/Counter';
import styles from 'styles/Groupshop.module.scss';
import { StoreContext } from 'store/store.context';
import InfoButton from 'components/Buttons/InfoButton/InfoButton';
import {
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

const GroupShop: NextPage = () => {
  const { query: { code, source } } = useRouter();
  console.log('🚀 ~ file: [...code].tsx ~ line 14 ~ source', source);
  console.log('🚀 ~ file: [...code].tsx ~ line 14 ~ code', code);

  // //   const { loading, error, data } = useQuery(GET_STORE, {

  // //     variables: { shop },
  // //   });
  // //   // console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ data', data);
  // //   // console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ error', error);
  // //   // console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ loading', loading);
  // //   const { installationDialogue } = useInstallation(ins);

  // //   const { store, dispatch } = useContext(StoreContext);

  //   useEffect(() => {
  //     if (data) {
  //       dispatch({ type: 'UPDATE_STORE', payload: data?.storeName });
  //     }
  //     // return () => {
  //     //   cleanup
  //     // }
  //   }, [data]);

  return (
    <>
      <Header LeftComp={<Counter expireDate={new Date()} />} RightComp={<InfoButton handleClick={() => console.log('info link clicked')} message="How does this work?" />} />
      <Container fluid>
        <Row className={styles.groupshop__top}>
          <Col md={3} className="text-center text-lg-start"><Brand name="Brand Name" /></Col>
          <Col md={6} className={styles.groupshop__top_members}>
            <h5 className="text-center">Shop or invite your friends to shop to get started!</h5>
            <div className="d-flex flex-row justify-content-center">
              <Members name="" />
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
          <h3>Welcome to Elisa’s Groupshop</h3>
          <p>The more friends shop, the more discounts and cashback!</p>
        </Col>

      </Hero>
      <Container>
        <Row>
          <Col xs={12} className="p-2 text-center ">
            <h2 className="fw-bold">
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
      </Container>
    </>
  );
};

export default GroupShop;
