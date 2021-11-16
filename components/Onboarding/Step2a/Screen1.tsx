import React from 'react';
// import RBButton from 'components/Buttons/RoundedButton/RBButton';
import Dialogue from 'components/Layout/Dialogue/dialogue';
// import { Row } from 'react-bootstrap';
import {
  Col, Form, ListGroup, Row, Button,
} from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import useQueryString from 'hooks/useQueryString';
import { StoreContext } from 'store/store.context';
import Styles from 'styles/Screen1.module.scss';
import IconButton from 'components/Buttons/IconButton';
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
                className="d-flex justify-content-between align-items-center"
              >
                <div className="ms-2 me-auto p-2">
                  <div className="fw-bold">
                    { store?.totalProducts && store?.totalProducts < 80 && <Form.Check type="checkbox" inline className="fs-4" />}

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
          <Col xs={12} className="mt-5">
            <h4>Collections</h4>
          </Col>
        </Row>
        <Row className="m-0">
          <Col xs={12} className={Styles.screen1__scroll}>
            <ListGroup as="ol" className="">
              { store.collections?.map(({ title, productsCount }) => (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-center mt-3 rounded-3 border border-1"
                >
                  <div className=" p-2 ms-2 me-auto">
                    <div className="fw-bold d-flex align-items-center">
                      <Form.Check type="checkbox" inline className="fs-4" />
                      <p className="m-0">
                        {title}
                        {' '}
                        (
                        {' '}
                        {productsCount}
                        {' '}
                        )
                      </p>
                    </div>
                  </div>
                  <IconButton icon={<ChevronRight />} onClick={() => setParams({ ins: '2b' })} />

                </ListGroup.Item>
              ))}

            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={6} className="text-end">
            {/* <RBButton >Go Back</RBButton> */}
            <Button variant="outline-primary" size="lg" className="rounded-pill" onClick={() => setParams({ ins: 2 })}>
              Go Back
            </Button>
          </Col>
          <Col xs={6} className="text-start">
            {/* <RBButton>Save</RBButton> */}
            <Button variant="primary" size="lg" className="rounded-pill">
              Save
            </Button>
          </Col>
        </Row>

      </Layout>
    </Dialogue>

  );
};

export default Screen1;
