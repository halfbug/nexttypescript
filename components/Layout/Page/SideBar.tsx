import React, { useContext } from 'react';
import Logo from 'assets/images/logosmall.svg';
import {
  Col, Container, Row, Nav,
} from 'react-bootstrap';
import { StoreContext } from 'store/store.context';
// import './page.css';

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
        <Col>
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link href={`/${shopName}/overview`}>Overview</Nav.Link>
            <Nav.Link href={`/${shopName}/campaign`}>Campaign</Nav.Link>
            <Nav.Link href={`/${shopName}/analytics`}>Analytics</Nav.Link>
            <Nav.Link href={`/${shopName}/settings`}>Settings</Nav.Link>
            <Nav.Link href={`/${shopName}/billing`}>Billing</Nav.Link>
            <Nav.Link href={`/${shopName}/knowledgeBase`}>Knowledge Base</Nav.Link>
          </Nav>
          {' '}

        </Col>
      </Row>

    </Container>
  );
};

export default SideBar;
