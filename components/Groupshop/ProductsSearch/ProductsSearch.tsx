/* eslint-disable react/require-default-props */
import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  Col, Form, InputGroup, Modal, Overlay, Placeholder, Popover, Row,
} from 'react-bootstrap';
import { GroupshopContext } from 'store/groupshop.context';
import { useRouter } from 'next/router';
import useDebounce from 'hooks/useDebounce';

import { useMediaQuery } from 'react-responsive';
import { X } from 'react-bootstrap-icons';
import IconButton from 'components/Buttons/IconButton';
import AddDealProduct from 'components/Forms/AddDealProduct';
import useDeal from 'hooks/useDeal';
import useAlert from 'hooks/useAlert';
import useGtm from 'hooks/useGtm';
import SearchIcon from 'assets/images/search-icon.svg';
import Cross from 'assets/images/CrossLg.svg';
import CrossGrey from 'assets/images/cross-grey.svg';
import useUtilityFunction from 'hooks/useUtilityFunction';
import { propTypes } from 'react-bootstrap/esm/Image';
import useAppContext from 'hooks/useAppContext';
import useOwnerOnboarding from 'hooks/useOwnerOnboarding';
import useCode from 'hooks/useCode';
import ProductCard from '../ProductCard/ProductCard';

interface ProductsSearchProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;
  getData?(data: IProduct[], ids: string[]): any;
  setData?: any;
  allowSelectAll?: boolean,
  isCreateGS: boolean;
}

const ProductsSearch = ({
  show: showSearch, pending = false, handleClose, setData, allowSelectAll, getData, isCreateGS,
}: ProductsSearchProps) => {
  // const {
  //   gsctx,
  //   dispatch,
  // } = useContext(GroupshopContext);
  const { gsctx, dispatch } = useAppContext();
  const { isOwner } = useOwnerOnboarding();
  const {
    shop, discountCode, ownerCode,
  } = useCode();
  console.log('🚀 ~ file: ProductsSearch.tsx ~ line 42 ~ gsctx', gsctx);
  const {
    clientDealProducts, currencySymbol, dPrice, isInfluencer,
  } = useDeal();
  const { formatNumber } = useUtilityFunction();

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [showMsg, setshowMsg] = useState('');
  // const [searchValue, setsearchValue] = useState('');
  const ref = useRef(null);
  const Router = useRouter();
  const { googleEventCode } = useGtm();
  useEffect(() => {
    if (showSearch) { googleEventCode('product-search-modal'); }
  }, [showSearch]);

  const [otherProducts, setotherProducts] = useState<IProduct[] | undefined>(undefined);

  const {
    discountCode: { percentage },
    store: { products } = { store: { products: [] } },
    popularProducts, addedProducts,
  } = gsctx;

  const refreshProduct = () => products?.filter(
    (item: { id: string; }) => !popularProducts?.some((item2) => item2.id === item.id),
  ).filter(
    (item) => !addedProducts?.some((item2) => item2.productId === item.id),
  );

  useEffect(() => {
    // console.log(products);
    if (products && (!otherProducts || otherProducts?.length < 1)) {
      const arr = refreshProduct();
      setotherProducts(arr);
    }
  }, []);
  useEffect(() => {
    // console.log(products);
    if (!otherProducts) {
      const arr = refreshProduct();
      setotherProducts(arr);
    }
  }, [otherProducts]);
  useEffect(() => {
    const arr = refreshProduct();
    if (products && products.length > 0) {
      setotherProducts(arr);
    }
    if (products && (!otherProducts || otherProducts?.length < 1)) {
      // console.log({ addproducts });
      setotherProducts(arr);
    }
  }, [products, addedProducts]);

  const [selected, setSelected] = useState<string[] | undefined>([]);
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const [selectedCountState, setselectedCountState] = useState<number>(0);
  const clientDProducts: string[] = clientDealProducts() ?? [];

  // useEffect(() => {
  //   if ((!selected || selected.length < 1)
  //     && (clientDProducts !== undefined && clientDProducts?.length > 0)) {
  //     setSelected(clientDealProducts());
  //   }
  // }, [selected, clientDProducts]);

  useEffect(() => {
    if (setData) {
      setSelected(setData?.selectProducts ?? []);
      setSelectedProducts(setData?.productArray ?? []);
    }
  }, [setData]);

  const searchPrd = (name: string) => {
    let newFilteredSearchArray;
    if (otherProducts && name) {
      newFilteredSearchArray = otherProducts?.filter(
        (p: IProduct) => p.title.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      );
      setotherProducts(newFilteredSearchArray);
    }
    if ((!otherProducts || otherProducts?.length < 1) && name) {
      const arr = refreshProduct();
      newFilteredSearchArray = arr?.filter(
        (p: IProduct) => p.title.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      );

      setotherProducts(newFilteredSearchArray);
    }
    if (newFilteredSearchArray && newFilteredSearchArray.length > 0) {
      setshowMsg('');
    } else {
      setshowMsg(`No matches found for "${name}"`);
    }
  };
  const debouncedSearch = useDebounce(
    (nextValue: string) => searchPrd(nextValue), 1000, otherProducts || [],
  );
  const { AlertComponent, showSuccess, showError } = useAlert();
  const handleSubmit = (e: any) => { e.preventDefault(); };
  const closeModal = (e: any) => {
    setShow(false);
    setshowMsg('');
    setotherProducts(undefined);
    setSelected(undefined);
    handleClose(e);
  };
  const addProducts = (prd: IProduct) => {
    setSelected([...selected ?? [], prd.id]);
    setSelectedProducts([...selectedProducts, prd]);
  };
  const handleSearch = (event: any) => {
    const { value: searchText } = event.target;
    const code = event.keyCode || event.key;
    if (code !== 37 || code !== 38 || code !== 39 || code !== 40 || code !== 13) {
      debouncedSearch(searchText);
    }

    if (searchText === '') { setotherProducts(undefined); }
  };
  // const selectedCountState = (selected?.length ?? 0 + clientDProducts?.length) || 0;
  useEffect(() => {
    if (selected?.length !== clientDealProducts()?.length) {
      const cdp = clientDealProducts() ?? [];
      const sp = selected ?? [];
      setselectedCountState((cdp.length + sp.length));
    }
  }, [selected]);

  if (pending) {
    return (<Placeholder as="h1" bg="secondary" className="w-100" />);
  }
  const isModalForMobile = useMediaQuery({
    query: '(max-width: 475px)',
  });

  const skipThisStep = () => {
    handleClose(false);
    if (shop && ownerCode && discountCode) {
      Router.push(`/${shop}/deal/${discountCode}/owner&${ownerCode}`);
    }
  };

  const handleClick = (event: any) => {
    if (selectedProducts.length > clientDealProducts.length) {
      if (!allowSelectAll) {
        setShow(!show);
        setTarget(event.target);
      } else {
      getData!(selectedProducts, selected!);
      handleClose(false);
      }
    }
  };

  return (
    <>
      <Modal
        show={showSearch}
        onHide={closeModal}
        centered
        size="lg"
        dialogClassName={styles.groupshop_modal_search}
        backdrop={isOwner ? 'static' : 'true'}
        fullscreen="lg-down"
      >
        {!isModalForMobile && !isCreateGS && (
          <Modal.Header className={styles.groupshop_modal__closebtnlg}>
            <Row onClick={(e: any) => {
              // handleClose(e);
              closeModal(e);
              // setShow(false);
            }}
            >
              <div>
                <Cross />
              </div>
            </Row>
          </Modal.Header>
        )}
        <Modal.Body className={styles.groupshop_modal_search_body}>
          <div className={styles.groupshop_modal_search_body_top}>
            {isCreateGS
              ? (
                <div className="mx-auto">
                  {isInfluencer ? (
                    <h3>
                      Add your favorite products from
                      {' '}
                      {gsctx?.store?.brandName}
                      {' '}
                      store
                    </h3>
                  ) : (
                    <h3>
                      Create your Groupshop by adding your favorite products from
                      {' '}
                      {gsctx?.store?.brandName}
                    </h3>
                  )}
                </div>
              )
              : (
                <>
                  <h3>Search for products</h3>
                  <p className="text-muted d-flex justify-content-end align-items-center">
                    <span className={styles.groupshop_modal_search_body_top_txt}>
                      Add up to 5 products
                    </span>
                    {[...new Array(5)].map((v, i) => (
                      <li className={clientDProducts && clientDProducts?.length > i
                        ? styles.groupshop_modal_search_meter_fill
                        : styles.groupshop_modal_search_meter}
                      >
                        {' '}

                      </li>
                    ))}
                  </p>
                </>
              )}

          </div>

          <Form onSubmit={handleSubmit}>

            <Form.Group className={['mb-3 d-flex align-items-center bg-light px-3 ', styles.groupshop_modal_search_body_top_inputArea].join(' ')} controlId="searchField">
              <SearchIcon />
              <Form.Control
                size="lg"
                className={['bg-light pt-2 border-0 ', styles.groupshop_modal_search_body_top_input].join('')}
                type="text"
                placeholder="Start your search..."
                name="searchField"
                onChange={(e: any) => handleSearch(e)}
                // value={searchValue}
              />
              {isModalForMobile && (
                <Row onClick={(e: any) => {
                  closeModal(e);
                }}
                >
                  <div>
                    <CrossGrey />
                  </div>
                </Row>
              )}
            </Form.Group>
          </Form>

          {(otherProducts && otherProducts.length > 0) && (
            <div className="d-flex justify-content-between m-0 flex-nowrap">
              <p className={styles.groupshop_modal_search_body_top_resultFound}>
                {otherProducts?.length}
                {' '}
                results found
              </p>
              { !isCreateGS && (
              <div className={styles.groupshop_modal_search_body_meter}>
                <p className="text-muted d-flex justify-content-end align-items-center">
                  Add up to 5 products
                  {[...new Array(5)].map((v, i) => (
                    <li className={selectedCountState > i ? styles.groupshop_modal_search_meter_fill : styles.groupshop_modal_search_meter}>{' '}</li>
                  ))}
                </p>
              </div>
              )}
            </div>
          )}
          <Row className={styles.groupshop_search}>
            {otherProducts ? (
              otherProducts.map(
                (prd) => (
                  (+prd.price > 0) && (
                    <Col xs={6} sm={6} md={4}>
                      <ProductCard
                        isrc={prd.featuredImage}
                        className={styles.groupshop_search_pcard}
                        imgOverlay={(
                          <>
                            {selected?.includes(prd.id) ? (
                              <>
                                <span className={styles.groupshop__pcard_tag_price}>

                                  {`${currencySymbol}${(+prd.price - dPrice(+(prd.price))).toFixed(2).replace('.00', '')} OFF`}
                                </span>
                                <IconButton
                                  className={styles.groupshop__pcard_tag_cross}
                                  icon={<X size={18} />}
                                  onClick={() => {
                                    setSelected(selected?.filter((pid) => pid !== prd.id));
                                    setSelectedProducts(selectedProducts?.filter(
                                      (pid: any) => pid.id !== prd.id,
                                    ));
                                  }}
                                />
                              </>

                            )
                              : <Button variant="outline-primary" disabled={selectedCountState === 5} className={styles.groupshop_search_pcard_addProduct} onClick={() => addProducts(prd)}>ADD PRODUCT</Button>}
                          </>
                        )}
                      >
                        <h5 className="text-center fw-bold text-truncate">
                          {prd.title}
                        </h5>
                        <p className="text-center fw-bold fs-5 mb-0">
                          <span className="text-decoration-line-through fw-light me-1">
                            {currencySymbol}

                            {(+(prd.price)).toFixed(2).toString().replace('.00', '')}
                          </span>
                          {' '}
                          <span className="fw-bolder">
                            {currencySymbol}
                            {dPrice(+(prd.price)).toFixed(2).toString().replace('.00', '')}
                          </span>

                        </p>
                      </ProductCard>
                    </Col>
                  )
                ),
              )
            ) : (
              <div className={styles.groupshop_modal_empty}>
                <p>SEARCH TO FIND YOUR FAVORITE PRODUCTS</p>
              </div>
            )}
            {!(otherProducts && otherProducts.length > 0) && (
              <div className={styles.groupshop_modal_empty}>
                <p>{showMsg}</p>
              </div>
            )}
          </Row>
        </Modal.Body>
        {(otherProducts && otherProducts.length > 0) && (
          <>
            <div ref={ref} className={styles.groupshop_addtocartmodal}>
              {!isOwner && isCreateGS
                ? (
                  <>
                    <div className="pb-3">
                      Enter your name to confirm and get started!
                    </div>
                    <AddDealProduct
                      selectedProducts={selected}
                      isCreateGS={isCreateGS}
                      handleClose={(e) => {
                        closeModal(e);
                        if (selected && selected?.length > 0) {
                          showSuccess('Product(s) has been added successfully.');
                        } else {
                          showError('No product(s) has been selected.');
                        }
                      }}
                    />
                  </>
                )
                : (
                  <>
                    {!isOwner && selected && selected.length > 0 && (
                    <div className="pb-3">
                      {selected.length}
                      {' '}
                      product selected
                      {' '}
                    </div>
                    )}
                    <Button
                      onClick={handleClick}
                      className="rounded-pill text-center text-uppercase px-5 fw-bold"
                      disabled={selectedProducts?.length === 0}
                    >
                      ADD to groupshop

                    </Button>
                    {isOwner && (
                    <div className={`mt-3 ${styles.welcome__modal__body__btnskip}`} onClick={skipThisStep} onKeyDown={skipThisStep} role="button" tabIndex={0}>
                      Skip for now
                    </div>
                    )}
                  </>
                )}

              <Overlay
                show={show}
                target={target}
                placement="top"
                container={ref}
                containerPadding={20}
              >
                <Popover
                  id="popover-contained"
                  className={styles.groupshop_search_popover}
                  style={{ maxWidth: '325px' }}
                >
                  <Popover.Body>
                    <>
                      <p className={styles.groupshop_search_popover_txt}>
                        Add
                        <strong>
                          {' '}
                          {selectedCountState}
                          {' '}
                          products
                        </strong>
                        {' '}
                        to this Groupshop
                      </p>
                      <AddDealProduct
                        selectedProducts={selected}
                        handleClose={(e) => {
                          closeModal(e);
                          if (selected && selected?.length > 0) {
                            showSuccess('Product(s) has been added successfully.');
                          } else {
                            showSuccess('No product(s) has been selected.');
                          }
                        }}
                        isCreateGS={false}
                      />
                    </>
                  </Popover.Body>
                </Popover>
              </Overlay>
            </div>
          </>
        )}

      </Modal>
      <AlertComponent />
    </>
  );
};

ProductsSearch.defaultProps = {
  allowSelectAll: false,
  setData: [],
};

export default ProductsSearch;
