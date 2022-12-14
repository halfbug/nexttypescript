/* eslint-disable max-len */
import * as React from 'react';
import {
  Row, Col, Button as RButton,
} from 'react-bootstrap';
import useQueryString from 'hooks/useQueryString';
import { useQuery } from '@apollo/client';
import { GET_COLLECTIONS, TOTAL_PRODUCTS, GET_PRODUCTS } from 'store/store.graphql';
import { StoreContext } from 'store/store.context';
import { XCircle } from 'react-bootstrap-icons';
import useCampaign from 'hooks/useCampaign';
import IconButton from '../IconButton';
import DeleteButton from '../DeleteButton';

interface IProps {
  disableBtn: boolean;
  // eslint-disable-next-line react/require-default-props
  totalProducts?: number;
  // eslint-disable-next-line react/require-default-props
  handleDelete?: any;
}

export default function ProductButton({ disableBtn, totalProducts, handleDelete }:IProps) {
  const [, setParams] = useQueryString();
  const {
    store: { shop, newCampaign, campaigns }, store, dispatch,
  } = React.useContext(StoreContext);

  const { data } = useQuery(TOTAL_PRODUCTS, {
    skip: !shop,
    variables: { shop },
  });
  const { newcampaign } = useCampaign();
  const { campaign } = useCampaign();
  // console.log({ campaign }, '....campaign.....');
  // console.log({ newCampaign }, '.........');

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
  }, [productsql.data]);

  const handleEditProduct = () => {
    setParams({ ins: '2a' });
  };
  // console.log(totalProducts);
  // console.log({ campaign });
  return (
    <>
      <Row className="mt-3 mb-4">
        <Col lg={4} md={6} sm={12}>
          <RButton
            variant="outline-primary"
            onClick={handleEditProduct}
            disabled={disableBtn}
            className="text-nowrap"
          >
            Edit products/collections
          </RButton>

        </Col>
        <Col lg={8} md={6} sm={12} className="ps-4 mt-1">
          { (((newCampaign?.products) && (newCampaign?.products?.length > 0) && (newCampaign?.criteria === 'custom' || newCampaign?.criteria === ''))
      // || (totalProducts !== 0 && criteria === 'custom'))
      || (campaign?.products?.length && campaign?.criteria === 'custom')
      // || (newcampaign?.products?.length)
          )
            ? (
              <Row className=" justify-content-start">
                <Col>
                  {(newCampaign?.products?.length)
          || (campaign?.products?.length)}
                  {' '}
                  product(s)
                  {/* {(newCampaign?.collections?.length || campaign?.collections?.length)}
                  {'/ '}
                  collection(s) selected */}
                  <DeleteButton
                    icon={<XCircle width={14} height={13.5} />}
                    handleDelete={handleDelete}
            // handleDelete={() => dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: { products: [], collections: [] } } })}
                    message="Are you sure to clear all selection?"
                  />
                </Col>
              </Row>
            ) : ''}
        </Col>
      </Row>
    </>
  );
}
