import React from 'react';
import RBButton from 'components/Buttons/RoundedButton/RBButton';
import Dialogue from 'components/Layout/Dialogue/dialogue';
// import { Row } from 'react-bootstrap';
import {
  Col, Form, ListGroup, Row,
} from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import useQueryString from 'hooks/useQueryString';
import { StoreContext } from 'store/store.context';
import Layout from './Layout';

interface IScreen1Props {
  show: boolean,
}

const Screen1 = ({ show }: IScreen1Props) => {
  const [, setParams] = useQueryString();
  const { store } = React.useContext(StoreContext);
  console.log('🚀 ~ file: Screen1.tsx ~ line 20 ~ Screen1 ~ store', store);
  return (
    <Dialogue show={show} size="lg">
      <Layout>
        <Row className="m-0">
          <Col xs={12} className="m-0 p-0">
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto p-2">
                  <div className="fw-bold">
                    <Form.Check type="checkbox" inline />

                    All Products (
                    {store.totalProducts}
                    )

                  </div>
                </div>
                <ChevronRight />
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mt-3">
            <h3>Collections</h3>
          </Col>
        </Row>
        <Row className="m-0">
          <Col xs={12} className="m-0 p-0">
            <ListGroup as="ol" className="">
              { store.collections?.map(({ title, productsCount }) => (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start mt-4"
                >
                  <div className=" p-2 ms-2 me-auto">
                    <div className="fw-bold">
                      <Form.Check type="checkbox" inline />
                      {title}
                      {' '}
                      (
                      {productsCount}
                      )
                    </div>
                  </div>
                  <ChevronRight />
                </ListGroup.Item>
              ))}

            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={6} className="text-end">
            <RBButton onClick={() => setParams({ ins: 2 })}>Go Back</RBButton>
          </Col>
          <Col xs={6} className="text-start">
            <RBButton>Save</RBButton>
          </Col>
        </Row>

      </Layout>
    </Dialogue>

  );
};

export default Screen1;
