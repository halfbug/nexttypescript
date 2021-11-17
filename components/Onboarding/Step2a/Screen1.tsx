import React, { useState } from 'react';
// import RBButton from 'components/Buttons/RoundedButton/RBButton';
import Dialogue from 'components/Layout/Dialogue/dialogue';
// import { Row } from 'react-bootstrap';
import {
  Col, Form, ListGroup, Row, Button,
} from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import useQueryString from 'hooks/useQueryString';
import { StoreContext } from 'store/store.context';
import { ICollection, IProduct } from 'types/store';
import IconButton from 'components/Buttons/IconButton';
import Layout from './Layout';
import Collections from './Collections';
import Products from './Products';

interface IScreen1Props {
  show: boolean,
}

const Screen1 = ({ show }: IScreen1Props) => {
  const [, setParams] = useQueryString();
  const { store } = React.useContext(StoreContext);
  const [view, setview] = useState<'List' | 'Detail' | 'Search'>('List');
  const [products, setproducts] = useState<IProduct[] | null | undefined>(null);
  const [title, setTitle] = useState<string | null>(null);

  const getCollectionById = (id:string): ICollection | undefined => store?.collections?.find(
    (col) => col.id === id,
  );

  const backToList = () => {
    setview('List');
  };

  const handleCollectionButton = (id:string) => {
    setview('Detail');
    if (id === 'all') {
      setproducts(store?.products); setTitle('Total Products');
    } else {
      const collection = getCollectionById(id);
      if (collection) { setproducts(collection.products); setTitle(collection.title); }
    }
  };
  console.log('🚀 ~ file: Screen1.tsx ~ line 20 ~ Screen1 ~ store', store);

  return (
    <Dialogue show={show} size="lg">
      <Layout>

        <Row className={`m-0 ${view !== 'List' ? 'd-none' : ''}`}>
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
                <IconButton icon={<ChevronRight />} onClick={() => handleCollectionButton('all')} />

              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Collections data={store.collections} handleCollectionButton={handleCollectionButton} className={`m-0 ${view !== 'List' ? 'd-none' : ''}`} />
        <Products data={products} heading={title} className={`m-0 ${view !== 'Detail' ? 'd-none' : ''} `} handleBackClick={backToList} />
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
