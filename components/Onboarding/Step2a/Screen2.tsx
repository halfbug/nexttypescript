import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
// import { Row } from 'react-bootstrap';
import Prod from 'assets/products/Rectangle10.png';
import { Col, Row } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import RBButton from 'components/Buttons/RoundedButton/RBButton';
import Layout from './Layout';
import ProductCard from './ProductCard';

interface IScreen2Props {
  show: boolean,
}

const Screen2 = ({ show }: IScreen2Props) => (
  <Dialogue show={show} size="lg">
    <Layout>
      <Row>
        <h3>
          <ArrowLeft />
&nbsp;
          Summer Sale
        </h3>
      </Row>
      <Row className="bg-light">
        <Col xs={6} md={3}><ProductCard ProdImage={Prod.src} title="Exploit Cargo Pants Olive..." price="$169.99" /></Col>
        <Col xs={6} md={3}><ProductCard ProdImage={Prod.src} title="Exploit Cargo Pants Olive..." price="$169.99" /></Col>
        <Col xs={6} md={3}><ProductCard ProdImage={Prod.src} title="Exploit Cargo Pants Olive..." price="$169.99" /></Col>
        <Col xs={6} md={3}><ProductCard ProdImage={Prod.src} title="Exploit Cargo Pants Olive..." price="$169.99" /></Col>
        <Col xs={6} md={3}><ProductCard ProdImage={Prod.src} title="Exploit Cargo Pants Olive..." price="$169.99" /></Col>
        <Col xs={6} md={3}><ProductCard ProdImage={Prod.src} title="Exploit Cargo Pants Olive..." price="$169.99" /></Col>
      </Row>
      <Row className="mt-4">
        <Col xs={6} className="text-end">
          <RBButton>Go Back</RBButton>
        </Col>
        <Col xs={6} className="text-start">
          <RBButton>Save</RBButton>
        </Col>
      </Row>
    </Layout>
  </Dialogue>
);

export default Screen2;
