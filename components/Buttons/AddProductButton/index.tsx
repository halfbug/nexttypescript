/* eslint-disable no-nested-ternary */
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
    // setFieldValue: any;
  // eslint-disable-next-line react/require-default-props
//   totalProducts?: number;
// eslint-disable-next-line react/require-default-props
handleDelete?: any;
}

export default function AddProductButton({ handleDelete }:IProps) {
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
  // console.log({ campaign }, '.....add....');
  // console.log({ newCampaign }, '....add.....');

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
      <Row className="">
        <Col xl={4} lg={6} sm={12}>
          <RButton
            variant="outline-primary"
            onClick={handleAddProduct}
            className="text-nowrap"
            // disabled={disableBtn}
            disabled
          >
            Add Products/collections
          </RButton>

        </Col>
        <Col lg={9} md={6} sm={12} className="d-flex align-items-center justify-content-start">
          { (newCampaign?.addableProducts?.length || campaign?.addableProducts?.length)
            ? (
              <Row className=" justify-content-start">
                <Col>
                  { newCampaign?.addableProducts?.length ? newCampaign?.addableProducts?.length : campaign?.addableProducts?.length }
                  {/* campaign?.addableProducts?.length ? campaign?.addableProducts?.length : '' */}
                  {' '}
                  product(s)/
                  {/* { campaign?.addableCollections?.length ? campaign?.addableCollections?.length : newCampaign?.addableCollections?.length ? newCampaign?.addableCollections?.length : ''}
                  collection(s) */}

                  <DeleteButton
                    icon={<XCircle width={14} height={13.5} />}
                    handleDelete={handleDelete}
                    // handleDelete={() => dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: { addableProducts: [], addableCollections: [] } } })}
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
