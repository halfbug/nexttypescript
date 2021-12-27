/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'components/Buttons/Button/Button';
import {
  Col, Row, Button, Container,
} from 'react-bootstrap';
import { ArrowDown, CaretDown, Eye } from 'react-bootstrap-icons';

interface HeaderProps {
  LeftComp : React.ReactNode;
  RightComp : React.ReactNode;
}

const Header = ({
  LeftComp, RightComp,
}: HeaderProps) => (
  <Navbar bg="light" className={styles.groupshop}>
    <Container fluid>
      <Row className="w-100 align-items-center">
        <Col xs={{ span: 12, order: 2 }} md={{ span: 3, order: 1 }}>{LeftComp}</Col>
        <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }} className={styles.groupshop__logo}><Navbar.Brand href="#home"><img src="/logo.svg" alt="Groupshop" /></Navbar.Brand></Col>
        <Col
          xs={{ span: 12, order: 3 }}
          md={{ span: 3, order: 3 }}
          className={styles.groupshop__last}
        >
          {RightComp}

        </Col>
      </Row>
    </Container>
  </Navbar>
);

// Header.defaultProps = {
//   user: {},
// };

export default Header;
