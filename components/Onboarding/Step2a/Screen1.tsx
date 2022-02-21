/* eslint-disable react/require-default-props */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
import {
  Col, Form, ListGroup, Row, Button,
} from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import useQueryString from 'hooks/useQueryString';
import { StoreContext } from 'store/store.context';
import { ICollection, IProduct } from 'types/store';
import IconButton from 'components/Buttons/IconButton';
import { useRouter } from 'next/router';
import useCampaign from 'hooks/useCampaign';
import Layout from './Layout';
import Collections from './Collections';
import Products from './Products';

interface IScreen1Props {
  show: boolean,
  selectedProducts?: IProduct[];
}

type SelectedType = {
  collections? : ICollection[] ;
  products? : IProduct[];
}

const Screen1 = ({ show, selectedProducts }: IScreen1Props) => {
  const [, setParams] = useQueryString();
  const { store, dispatch } = React.useContext(StoreContext);
  const [view, setview] = useState<'List' | 'Detail' | 'Search'>('List');
  const [products, setproducts] = useState<IProduct[] | null | undefined>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [scollections, setscollections] = useState<ICollection[] | undefined>(undefined);
  const [campaign, setcampaign] = useState<SelectedType | undefined>(
    {
      collections: store.newCampaign?.collections ?? [],
      products: selectedProducts ?? store.newCampaign?.products ?? [],
    },
  );
  const { query: { ins } } = useRouter();
  const getEntityById = (id:string, entity: string):
   ICollection | IProduct => store?.[entity]?.find(
    (col:IProduct | ICollection) => col.id === id,
  );

  React.useEffect(() => {
    // if (selectedProducts && !campaign?.products?.length) {
    if (selectedProducts) {
      setcampaign({ ...campaign, products: selectedProducts });
    }
  }, [selectedProducts]);
  const backToList = () => {
    setview('List');
  };

  const handleCollectionButton = (id:string) => {
    setview('Detail');
    if (id === 'all') {
      setproducts(store?.products); setTitle('Total Products');
    } else {
      const collection = getEntityById(id, 'collections') as ICollection;
      if (collection) { setproducts(collection.products); setTitle(collection.title); }
    }
  };

  const handleSearch = (e:any) => {
    const { value } = e.target;

    setview(value.length === 0 ? 'List' : 'Search');
    const filteredCollections = store?.collections?.filter((col):boolean | undefined => {
      if (col.title.toLowerCase().includes(value)) return true;
      return false;
    });
    const filteredProducts = store?.products?.filter((prod):boolean | undefined => {
      if (prod.title.toLowerCase().includes(value)) return true;
      return false;
    });
    setscollections(filteredCollections);
    setproducts(filteredProducts);
    setTitle(`Search Results for "${value}"`);
  };

  const handleChecked = (e: any) => {
    const { checked, id, name } = e.target;
    const ncamp = { ...campaign };

    if (checked) {
      if (name === 'collections') {
        const entity = getEntityById(id, name) as ICollection;
        ncamp.products = [...campaign?.products ?? [], ...entity?.products];
        ncamp?.collections?.push(entity);
      } else {
        const entity = getEntityById(id, name) as IProduct;
        ncamp?.products?.push(entity);
      }
    } else if (checked === false) {
      if (name === 'collections') {
        ncamp.collections = campaign?.collections?.filter((col) => col.id !== id);
        const ccol = getEntityById(id, name) as ICollection;
        ncamp.products = campaign?.products?.filter(
          (prd) => !ccol?.products.find((ccolprd) => ccolprd.id === prd.id),
        );
      } else {
        ncamp.products = ncamp?.products?.filter((prod) => prod.id !== id);
      }
    }
    setcampaign(ncamp);
  };

  const isChecked = (id: string, entity?:string):boolean => {
    if (entity) {
      return Boolean(
        campaign?.collections?.find((col) => col.id === id),
      );
    }
    return Boolean(
      campaign?.products?.find((cprod) => cprod.id === id),
    );
  };
  const { updateSelectedCampaignAddProducts, updateSelectedCampaignProducts } = useCampaign();
  const handleSave = () => {
    // const finalArray = (ins === '2a') ? 'productsArray' : 'addableProductsArray';
    if (ins === '2a') {
      if (campaign?.products && campaign?.products?.length < 81) {
        dispatch({
          type: 'NEW_CAMPAIGN',
          payload: {
            newCampaign: {
              products: campaign?.products,
              collections: campaign?.collections,
              productsArray: campaign?.products?.map((prod) => prod.id),
            },
          },
        });
        // update selected campaign context in store
        // updateSelectedCampaignProducts(campaign?.products);
      }
    } else {
      console.log('im inelse');

      // if (campaign?.products) {
      // if screen addproducts then update newCampaign
      // as well particular campaign in store.campaigns
      dispatch({
        type: 'NEW_CAMPAIGN',
        payload: {
          newCampaign: {
            addableProducts: campaign?.products,
            addableCollections: campaign?.collections,
            addableProductsArray: campaign?.products?.map((prod) => prod.id),
            // productsArray: [],
          },
        },
      });
      // update selected campaign context in store
      // updateSelectedCampaignAddProducts(campaign?.products);

      // }
    }
    setParams({ ins: 2 });
  };
  console.log({ campaign });
  console.log({ store });
  console.log({ selectedProducts });
  console.log('....................');

  return (
    <Dialogue show={show} size="lg" className="p-3 m-0">
      <Layout handleSearch={handleSearch} campaign={campaign}>

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

        <Products
          data={products}
          heading={title}
          className={`m-0 ${['Search', 'Detail'].includes(view) ? '' : 'd-none'} `}
          handleBackClick={backToList}
          isChecked={isChecked}
          handleChecked={handleChecked}
        />
        <Collections data={scollections || store.collections} isChecked={isChecked} handleCollectionButton={handleCollectionButton} className={`m-0 ${view === 'Detail' ? 'd-none' : ''}`} handleChecked={handleChecked} />

        <Form.Control.Feedback type="invalid" className={`${campaign?.products && campaign?.products?.length > 80 ? 'd-block' : 'd-none'} text-center`}>
          you can select only 80 products.
        </Form.Control.Feedback>

        <Row className="mt-4">
          <Col xs={6} className="text-end">
            {/* <RBButton >Go Back</RBButton> */}
            <Button variant="outline-primary" size="lg" className="rounded-pill" onClick={() => setParams({ ins: 2 })}>
              Go Back
            </Button>
          </Col>
          <Col xs={6} className="text-start">
            {/* <RBButton>Save</RBButton> */}
            <Button variant="primary" size="lg" className="rounded-pill" onClick={handleSave}>
              Save
            </Button>
          </Col>
        </Row>

      </Layout>
    </Dialogue>

  );
};

export default Screen1;
