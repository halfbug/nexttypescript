import * as React from 'react';
import {
  Row, Col, Button as RButton,
} from 'react-bootstrap';
import useQueryString from 'hooks/useQueryString';
import { useQuery } from '@apollo/client';
import { GET_COLLECTIONS, TOTAL_PRODUCTS, GET_PRODUCTS } from 'store/store.graphql';
import { StoreContext } from 'store/store.context';
import { XCircleFill } from 'react-bootstrap-icons';
import IconButton from '../IconButton';
import DeleteButton from '../DeleteButton';

interface IProps {
  disableBtn: boolean;
}

export default function ProductButton({ disableBtn }:IProps) {
  const [, setParams] = useQueryString();
  const {
    store: { shop, newCampaign }, dispatch,
  } = React.useContext(StoreContext);

  const { data } = useQuery(TOTAL_PRODUCTS, {

    variables: { shop },
  });

  React.useEffect(() => {
    if (data) {
      dispatch({ type: 'UPDATE_TOTALPRODUCTS', payload: { totalProducts: data.TotalProducts.count } });
    }
    // return () => {
    //   cleanup
    // }
  }, [data]);

  const collectionsql = useQuery(GET_COLLECTIONS, {

    variables: { shop },
  });

  React.useEffect(() => {
    if (collectionsql.data) {
      dispatch({ type: 'SET_COLLECTIONS', payload: { collections: collectionsql.data.collections } });
    }
    // return () => {
    //   cleanup
    // }
  }, [collectionsql.data]);

  const productsql = useQuery(GET_PRODUCTS, {

    variables: {
      productQueryInput: {
        shop,
        sort: -1,
        limit: 10000,
      },
    },
  });

  React.useEffect(() => {
    if (productsql.data) {
      dispatch({ type: 'SET_PRODUCTS', payload: { products: productsql.data.products } });
    }
    // return () => {
    //   cleanup
    // }
  }, [productsql.data]);

  const handleEditProduct = () => {
    setParams({ ins: '2a' });
  };
  return (
    <>
      <Row className="mt-3 justify-content-center">
        <Col>
          <RButton
            variant="outline-secondary"
            onClick={handleEditProduct}
            disabled={disableBtn}
          >
            Edit products/collections
          </RButton>

        </Col>
      </Row>
      { newCampaign?.products && newCampaign?.products?.length > 0 && (
      <Row className="m-2 justify-content-center">
        <Col className="text-muted">
          {(newCampaign?.products && newCampaign?.products?.length) || 0}
          {' '}
          product(s)/
          {(newCampaign?.collections && newCampaign?.collections?.length) || 0}
          {' '}
          collection(s) selected
          {' '}
          <DeleteButton icon={<XCircleFill className="text-muted" />} handleDelete={() => dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: { products: [], collections: [] } } })} message="Are you sure to clear all selection?" />
        </Col>
      </Row>
      )}
    </>
  );
}
