/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'components/Buttons/Button/Button';
import {
  Col, Row, Button, Container,
} from 'react-bootstrap';
import { ArrowDown, CaretDown, Eye } from 'react-bootstrap-icons';

interface FooterProps {
  LeftComp : React.ReactNode;
  RightComp : React.ReactNode;
}

const Footer = ({
  LeftComp, RightComp,
}: FooterProps) => (

  <>
    <hr />
    <Row className="w-100 align-items-center">
      <Col xs={12}>
        {' '}
      </Col>

    </Row>
  </>

);

// Footer.defaultProps = {
//   user: {},
// };

export default Footer;
