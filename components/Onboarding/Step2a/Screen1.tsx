/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
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
import useUtilityFunction from 'hooks/useUtilityFunction';
import styles from 'styles/product.module.scss';
import _ from 'lodash';
import Layout from './Layout';
import Collections from './Collections';
import Products from './Products';

interface IScreen1Props {
  show: boolean,
  selectedProducts?: IProduct[];
  selectedCollections?: ICollection[];
}

type SelectedType = {
  collections? : ICollection[] ;
  products? : IProduct[];
}

const Screen1 = ({
  show, selectedProducts, selectedCollections,
}: IScreen1Props) => {
  const { query: { ins } } = useRouter();
  const [, setParams] = useQueryString();
  const { store, dispatch } = React.useContext(StoreContext);
  const [view, setview] = useState<'List' | 'Detail' | 'Search'>('List');
  const [products, setproducts] = useState<IProduct[] | null | undefined>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [scollections, setscollections] = useState<ICollection[] | undefined>(undefined);
  const [allProductChecked, setAllProductChecked] = useState<boolean | undefined>(false);
  const CampPrd = store.newCampaign?.products?.filter((item) => item !== undefined);
  const CampAddPrd = store.newCampaign?.addableProducts?.filter((item) => item !== undefined);
  const CampCollection = store.newCampaign?.collections?.filter((item) => item !== undefined);
  const [campaign, setcampaign] = useState<SelectedType | undefined>(
    {
      collections: CampCollection ?? [],
      products: selectedProducts ?? (ins === '2a' ? CampPrd : CampAddPrd) ?? [],
    },
  );
  const [showError, setshowError] = useState<boolean>(false);
  const getEntityById = (id:string, entity: string):
   ICollection | IProduct => store?.[entity]?.filter((item: any) => item !== undefined).find(
    (col:IProduct | ICollection) => col.id === id,
  );

  React.useEffect(() => {
    // if (selectedProducts && !campaign?.products?.length) {
    if (selectedProducts) {
      setcampaign({
        ...campaign,
        products: selectedProducts,
        collections: selectedCollections ?? [],
      });
    }
  }, [selectedProducts]);
  const { filterArray } = useUtilityFunction();
  React.useEffect(() => {
  //
    // setcampaign({
    //   products: [], collections: [],
    // });
    if (ins === '2a') {
      setcampaign((prev) => ({
        ...prev,
        products: CampPrd ?? [],
        collections: CampCollection ?? [],
      }));
      setscollections(store?.collections);
      setproducts(store?.products);
      if (store?.products?.length === campaign?.products?.length) {
        setAllProductChecked(true);
      } else {
        setAllProductChecked(false);
      }
    } else if (ins === 'addproduct') {
      setscollections(filterArray(store?.collections ?? [], store?.newCampaign?.collections ?? [], 'id', 'id'));
      setproducts(filterArray(store?.products ?? [], store?.newCampaign?.products ?? [], 'id', 'id'));

      setcampaign((prev) => ({
        ...prev,
        products: store.newCampaign?.addableProducts ?? [],
        collections: store.newCampaign?.addableCollections ?? [],
      }));
      if (store?.products?.length === campaign?.products?.length) {
        setAllProductChecked(true);
      } else {
        setAllProductChecked(false);
      }
    }
  }, [ins]);

  const backToList = () => {
    setshowError(false);
    setview('List');

    if (ins === 'addproduct') {
      setscollections(filterArray(store?.collections ?? [], store?.newCampaign?.collections ?? [], 'id', 'id'));
      setproducts(filterArray(store?.products ?? [], store?.newCampaign?.products ?? [], 'id', 'id'));
    } else {
      setscollections(store.collections);
      setproducts(store.products);
    }
  };

  const handleCollectionButton = (id:string) => {
    setshowError(false);
    setview('Detail');
    if (id === 'all') {
      setproducts(store?.products); setTitle('Total Products');
    } else if (id === 'selected') {
      setproducts(campaign?.products); setTitle('Selected Products');
    } else {
      const collection = getEntityById(id, 'collections') as ICollection;
      if (collection) { setproducts(collection.products); setTitle(collection.title); }
    }
  };

  const handleSearch = (e:any) => {
    const { value } = e.target;

    setview(value.length === 0 ? 'List' : 'Search');
    const baseCollectionArray = ins === '2a' ? store?.collections : filterArray(store?.collections ?? [], store?.newCampaign?.collections ?? [], 'id', 'id');
    const baseProductArray = ins === '2a' ? store?.products : filterArray(store?.products ?? [], store?.newCampaign?.products ?? [], 'id', 'id');
    const filteredCollections = baseCollectionArray?.filter((col: any):boolean | undefined => {
      if (col.title.toLowerCase().includes(value)) return true;
      return false;
    });
    const filteredProducts = baseProductArray?.filter((prod: any):boolean | undefined => {
      if (prod.title.toLowerCase().includes(value)) return true;
      return false;
    });
    setscollections(filteredCollections);
    setproducts(filteredProducts);
    setTitle(`Search Results for "${value}"`);
  };

  const clickAllProducts = (e: any) => {
    setshowError(false);
    const { checked } = e.target;
    if (checked === true) {
      if (store?.products && store?.products?.length <= 80) {
        setcampaign({
          products: store?.products, collections: store?.collections,
        });
        setAllProductChecked(true);
      } else {
        setshowError(true);
      }
    } else {
      setcampaign({
        products: [], collections: [],
      });
      setAllProductChecked(false);
    }
  };

  const clickSelectedProducts = () => {
    setshowError(false);
    setcampaign({
      products: [], collections: [],
    });
    setAllProductChecked(false);
  };

  const handleChecked = (e: any) => {
    setshowError(false);
    const { checked, id, name } = e.target;
    const ncamp = { ...campaign };

    if (checked) {
      if (name === 'collections') {
        const entity = getEntityById(id, name) as ICollection;
        if (campaign?.products && campaign?.products?.length + entity?.products.length <= 80) {
          ncamp.products = [...campaign?.products ?? []];
          entity.products.forEach((p: IProduct) => {
            if (!campaign?.products?.find((cp: IProduct) => cp.id === p.id)) {
              ncamp.products?.push(p);
            }
          });
          const tempCol: Array<ICollection> = store.collections?.filter((col: ICollection) => _.differenceBy(col.products, [...entity.products, ...campaign.products!], 'id').length === 0) ?? [];
          ncamp.collections = _.unionBy(ncamp.collections, tempCol, 'id');
        } else {
          setshowError(true);
        }
      } else if (name === 'products') {
        if (campaign?.products && campaign?.products?.length < 80) {
          const entity = getEntityById(id, name) as IProduct;
          const storeColl = store.collections
          && store?.collections.filter((col: ICollection) => col !== undefined)
            .filter((col: ICollection) => col.products.find((p: IProduct) => p.id === entity.id));
          const tempCol: Array<ICollection> = [];
          const toCompare: Array<IProduct> = [...campaign.products, entity];
          storeColl?.forEach((col: ICollection) => {
            if (_.differenceBy(col.products, toCompare, 'id').length === 0) {
              tempCol.push(col);
            }
          });
          ncamp.collections = _.unionBy(ncamp?.collections, _.differenceBy(tempCol, campaign?.collections ?? [], 'id'), 'id');
          ncamp?.products?.push(entity);
        } else {
          setshowError(true);
        }
      }

      if (store?.collections?.length === ncamp?.collections?.length) {
        setAllProductChecked(true);
      } else {
        setAllProductChecked(false);
      }
    } else if (checked === false) {
      if (name === 'collections') {
        const ccol = getEntityById(id, name) as ICollection;
        const tempCol: Array<ICollection> = store.collections?.filter((col: ICollection) => _.intersectionBy(col.products, ccol.products, 'id').length > 0) ?? [];
        ncamp.collections = campaign?.collections?.filter((item: any) => item !== undefined)
          .filter((col) => !tempCol.includes(col));
        ncamp.products = campaign?.products?.filter((item: any) => item !== undefined).filter(
          (prd) => !ccol?.products.find((ccolprd) => ccolprd.id === prd.id),
        );
      } else {
        const storeColl = store.collections && store?.collections
          .filter((col: ICollection) => col !== undefined)
          .filter((col: ICollection) => col.products.find((p: IProduct) => p.id === id));
        ncamp.collections = ncamp.collections
          ?.filter((col: ICollection) => !storeColl?.includes(col));
        ncamp.products = ncamp?.products?.filter((prod) => prod.id !== id);
      }
      setAllProductChecked(false);
    }

    setcampaign(ncamp);
  };

  const isChecked = (id: string, entity?:string):boolean => {
    if (entity) {
      return Boolean(
        campaign?.collections?.filter((item: any) => item !== undefined)
          .find((col) => col.id === id),
      );
    }
    return Boolean(
      campaign?.products?.filter((item: any) => item !== undefined)
        .find((cprod: any) => cprod.id === id),
    );
  };
  const { updateSelectedCampaignAddProducts, updateSelectedCampaignProducts } = useCampaign();
  const handleSave = () => {
    setTitle('Total Products');
    // const finalArray = (ins === '2a') ? 'productsArray' : 'addableProductsArray';
    if (ins === '2a') {
      if (campaign?.products && campaign?.products?.length < 81) {
        dispatch({
          type: 'NEW_CAMPAIGN',
          payload: {
            newCampaign: {
              products: campaign?.products?.filter((item: any) => item !== undefined),
              collections: campaign?.collections?.filter((item: any) => item !== undefined),
              productsArray: campaign?.products?.filter((item: any) => item !== undefined)
                .map((prod) => prod.id),
              collectionsArray: campaign?.collections?.filter((item: any) => item !== undefined)
                .map((prod) => prod.id),
            },
          },
        });
        // update selected campaign context in store
        // updateSelectedCampaignProducts(campaign?.products);
      }
    } else {
      // if (campaign?.products) {
      // if screen addproducts then update newCampaign
      // as well particular campaign in store.campaigns
      dispatch({
        type: 'NEW_CAMPAIGN',
        payload: {
          newCampaign: {
            addableProducts: campaign?.products?.filter((item: any) => item !== undefined),
            addableCollections: campaign?.collections?.filter((item: any) => item !== undefined),
            addableProductsArray: campaign?.products?.filter((item: any) => item !== undefined)
              .map((prod) => prod.id),
            // productsArray: [],
          },
        },
      });
      // update selected campaign context in store
      // updateSelectedCampaignAddProducts(campaign?.products);

      // }
    }
    setcampaign({
      products: [], collections: [],
    });
    setParams({ ins: 2 });
  };
  React.useEffect(() => {
    if (store?.products?.length === campaign?.products?.length) {
      setAllProductChecked(true);
    } else {
      setAllProductChecked(false);
    }
  });
  // console.log({ store });
  // console.log({ selectedProducts });
  // console.log('....................');

  return (
    <Dialogue show={show} size="lg" className="p-3 m-0">
      <Layout handleSearch={handleSearch} campaign={campaign}>
        {
          campaign?.products && campaign?.products?.length > 0
          && (
          <Row className={`m-0 ${view !== 'List' ? 'd-none' : ''}`}>
            <Col xs={12} className="m-0 p-0">
              <ListGroup as="ol">
                <ListGroup.Item
                  as="li"
                  onClick={() => handleCollectionButton('selected')}
                  className={['d-flex justify-content-between align-items-center ', styles.border_listgroup].join(' ')}
                >
                  <div className="ms-2 me-auto p-2">
                    <div className={styles.product_all_product}>
                      { campaign?.products && false && <Form.Check type="checkbox" disabled inline className="fs-4" id="selected-products-handle" onClick={(event) => event.stopPropagation()} checked={!!campaign?.products} onChange={clickSelectedProducts} />}
                      Selected Products (
                      {campaign?.products?.length}
                      )
                    </div>
                  </div>
                  <IconButton icon={<ChevronRight />} onClick={() => handleCollectionButton('selected')} />
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          )
        }
        <Row className={`m-0 ${view !== 'List' ? 'd-none' : ''}`}>
          <Col xs={12} className="m-0 p-0">
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                onClick={() => handleCollectionButton('all')}
                className={['d-flex justify-content-between align-items-center ', styles.border_listgroup].join(' ')}
              >
                <div className="ms-2 me-auto p-2">
                  <div className={styles.product_all_product}>
                    { store?.totalProducts && store?.totalProducts < 80 && <Form.Check type="checkbox" inline className="fs-4" id="all-products-handle" checked={allProductChecked} onChange={clickAllProducts} />}

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
        <Collections
          data={scollections || store.collections}
          isChecked={isChecked}
          handleCollectionButton={handleCollectionButton}
          className={`m-0 ${view === 'Detail' ? 'd-none' : ''}`}
          handleChecked={handleChecked}
        />

        <Form.Control.Feedback type="invalid" className={`${showError ? 'd-block' : 'd-none'} text-center`}>
          { ins === 'addproduct' ? '' : 'you can select only 80 products' }
        </Form.Control.Feedback>

        <Row className="mt-4 d-flex justify-content-end">
          <Col xs={6} className="text-end">
            {/* <RBButton >Go Back</RBButton> */}
            <Button
              variant="outline-primary"
              className={styles.product_btnClose}
              onClick={() => {
                setview('List');
                setParams({ ins: 2 });
              }}
            >
              Close
            </Button>
            {/* <RBButton>Save</RBButton> */}
            <Button
              variant="outline-primary"
              className={styles.product_btnSave}
              onClick={() => {
                setview('List');
                handleSave();
              }}
            >
              Save
            </Button>
          </Col>
        </Row>

      </Layout>
    </Dialogue>

  );
};

export default Screen1;
