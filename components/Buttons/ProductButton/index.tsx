import * as React from 'react';
import {
  Row, Col, Button as RButton,
} from 'react-bootstrap';
import useQueryString from 'hooks/useQueryString';
import { useQuery } from '@apollo/client';
import { GET_COLLECTIONS, TOTAL_PRODUCTS } from 'store/store.graphql';
import { StoreContext } from 'store/store.context';

export default function ProductButton() {
  const [, setParams] = useQueryString();
  const { store, dispatch } = React.useContext(StoreContext);
  console.log('🚀 ~ file: index.tsx ~ line 13 ~ ProductButton ~ store', store);
  const { data } = useQuery(TOTAL_PRODUCTS, {

    variables: { shop: store.shop },
  });

  React.useEffect(() => {
    if (data) {
      dispatch({ type: 'UPDATE_TOTALPRODUCTS', payload: { totalProducts: data.TotalProducts.count } });
      console.log(data);
    }
    // return () => {
    //   cleanup
    // }
  }, [data]);

  const collections = useQuery(GET_COLLECTIONS, {

    variables: { shop: store.shop },
  });

  React.useEffect(() => {
    if (collections.data) {
      dispatch({ type: 'SET_COLLECTIONS', payload: { collections: collections.data.collections } });
      console.log(collections.data);
    }
    // return () => {
    //   cleanup
    // }
  }, [collections.data]);

  const handleEditProduct = () => {
    setParams({ ins: '2a' });
  };
  return (
    <>
      <Row className="mt-3 justify-content-center">
        <Col>
          <RButton variant="outline-secondary" onClick={handleEditProduct}>
            Edit products/collections
          </RButton>

        </Col>
      </Row>
      <Row className="m-2 justify-content-center">
        {/* <Col className="text-muted">25 product(s)/2 collection(s) selected</Col> */}
      </Row>
    </>
  );
}
