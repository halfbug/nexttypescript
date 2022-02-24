/* eslint-disable max-len */
import * as React from 'react';
import {
  Row, Col, Button as RButton,
} from 'react-bootstrap';
import useQueryString from 'hooks/useQueryString';
import { useQuery } from '@apollo/client';
import { GET_COLLECTIONS, TOTAL_PRODUCTS, GET_PRODUCTS } from 'store/store.graphql';
import { StoreContext } from 'store/store.context';
import { XCircleFill } from 'react-bootstrap-icons';
import useCampaign from 'hooks/useCampaign';
import IconButton from '../IconButton';
import DeleteButton from '../DeleteButton';

interface IProps {
    // setFieldValue: any;
  // eslint-disable-next-line react/require-default-props
//   totalProducts?: number;
}

export default function AddProductButton() {
  const [, setParams] = useQueryString();
  const {
    store: { shop, newCampaign, campaigns }, store, dispatch,
  } = React.useContext(StoreContext);

  const { data } = useQuery(TOTAL_PRODUCTS, {

    variables: { shop },
  });
  const { newcampaign } = useCampaign();
  const { campaign } = useCampaign();
  console.log({ campaign }, '.....add....');
  console.log({ newCampaign }, '....add.....');

  React.useEffect(() => {
    if (data) {
      dispatch({ type: 'UPDATE_TOTALPRODUCTS', payload: { totalProducts: data.TotalProducts.count } });
    }
  }, [data]);

  const collectionsql = useQuery(GET_COLLECTIONS, {

    variables: { shop },
  });

  React.useEffect(() => {
    if (collectionsql.data) {
      dispatch({ type: 'SET_COLLECTIONS', payload: { collections: collectionsql.data.collections } });
    }
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

  const handleAddProduct = () => {
    setParams({ ins: 'addproduct' });
  };

  return (
    <>
      <Row className="mt-2 justify-content-center">
        <Col>
          <RButton
            variant="outline-primary"
            onClick={handleAddProduct}
            // disabled={disableBtn}
          >
            Add Products
          </RButton>

        </Col>
      </Row>
      { (newCampaign?.addableProducts?.length || campaign?.addableProducts?.length)
      && (
      <Row className="m-2 justify-content-center">
        <Col className="text-muted">
          { (campaign?.addableProducts?.length) ? campaign?.addableProducts?.length : newCampaign?.addableProducts?.length}
          product(s)/
          { (campaign?.addableCollections?.length) ? campaign?.addableCollections?.length : newCampaign?.addableCollections?.length}
          collection(s)

          <DeleteButton icon={<XCircleFill className="text-muted" />} handleDelete={() => dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: { addableProducts: [], addableCollections: [] } } })} message="Are you sure to clear all selection?" />
        </Col>
      </Row>
      )}
    </>
  );
}
