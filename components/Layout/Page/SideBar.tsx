import React, { useContext } from 'react';
import Logo from 'assets/images/logosmall.svg';
import {
  Gear, Activity, Image, CalendarMinus, Cloud,
} from 'react-bootstrap-icons';
import styles from 'styles/Sidebar.module.scss';

import {
  Col, Container, Row, Nav,
} from 'react-bootstrap';
import { StoreContext } from 'store/store.context';
import Link from 'next/link';
// interface SideBarProps {
//     shopName?: string;
// //   onCreateAccount: () => void;
// //   headingText: string;
// //   children: {}
// }

const SideBar = () => {
  const { store } = useContext(StoreContext);
  const shopName: string[] | undefined = store?.shop?.split('.', 1);
  console.log(store);
  return (
    <Container>
      <Row>
        <Col className="mt-2">
          <Logo />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className={styles.sidebar}>
          <Nav defaultActiveKey="/" className="flex-column">
            <Row>
              <Col className={styles.icon}><Image className="icons" color="light grey" size={20} /></Col>
              {' '}
              <Col className={styles.link}>
                <Nav.Link className="m-2 p-4">
                  <Link href={`/${shopName}/overview`}>Overview</Link>
                </Nav.Link>
              </Col>
            </Row>
            <Row>
              <Col className={styles.icon}><Gear color="light grey" size={20} /></Col>
              <Col className={styles.link}>
                <Nav.Link className="m-2 p-4">
                  <Link href={`/${shopName}/campaign`}>Campaign</Link>
                </Nav.Link>
              </Col>
            </Row>
            <Row>
              <Col className={styles.icon}><Activity color="light grey" size={20} /></Col>
              <Col className={styles.link}>
                <Nav.Link className="m-2 p-4">
                  <Link href={`/${shopName}/analytics`}>Analytics</Link>
                </Nav.Link>
              </Col>
            </Row>
            <Row>
              <Col className={styles.icon}><Gear color="light grey" size={20} /></Col>
              <Col className={styles.link}>
                <Nav.Link className="m-2 p-4">
                  <Link href={`/${shopName}/settings`}>Settings</Link>
                </Nav.Link>
              </Col>
            </Row>
            <Row>
              <Col className={styles.icon}><CalendarMinus color="light grey" size={20} /></Col>
              <Col className={styles.link}>
                <Nav.Link className="m-2 p-4">
                  <Link href={`/${shopName}/billing`}>Billing</Link>
                </Nav.Link>
              </Col>
            </Row>
            <Row>
              <Col className={styles.icon}>
                <Cloud color="light grey" size={20} />
              </Col>
              <Col className={styles.link}>
                <Nav.Link className="m-2 p-4">
                  <Link href={`/${shopName}/knowledgeBase`}>Knowledge Base</Link>
                </Nav.Link>
              </Col>
            </Row>

          </Nav>
        </Col>
      </Row>

    </Container>
  );
};

export default SideBar;
