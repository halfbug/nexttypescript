/* eslint-disable react/require-default-props */
import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import styles from 'styles/Groupshop.module.scss';
import dStyles from 'styles/Drops.module.scss';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  Col, Dropdown, Form, InputGroup, Modal, Overlay, Placeholder, Popover, Spinner, Row,
} from 'react-bootstrap';
import { GroupshopContext } from 'store/groupshop.context';
import { useRouter } from 'next/router';
import useDebounce from 'hooks/useDebounce';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';
import { X, StarFill, Star } from 'react-bootstrap-icons';
import IconButton from 'components/Buttons/IconButton';
import AddDealProduct from 'components/Forms/AddDealProduct';
import useDeal from 'hooks/useDeal';
import useAlert from 'hooks/useAlert';
import useDrops from 'hooks/useDrops';
import useGtm from 'hooks/useGtm';
import SearchIcon from 'assets/images/search-icon.svg';
import Cross from 'assets/images/CrossLg.svg';
import CrossGrey from 'assets/images/cross-grey.svg';
import ArrowSort from 'assets/images/ArrowSort.svg';
import useUtilityFunction from 'hooks/useUtilityFunction';
import { propTypes } from 'react-bootstrap/esm/Image';
import useAppContext from 'hooks/useAppContext';
import useOwnerOnboarding from 'hooks/useOwnerOnboarding';
import useCode from 'hooks/useCode';
import useDetail from 'hooks/useDetail';
import { GET_DROP_PRODUCT_SEARCH } from 'store/store.graphql';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ProductCard from '../ProductCard/ProductCard';
import 'react-loading-skeleton/dist/skeleton.css';
import ProductGrid from '../ProductGrid/ProductGrid';

interface ProductsSearchProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;
  getData?(data: IProduct[], ids: string[]): any;
  setData?: any;
  allowSelectAll?: boolean,
  isCreateGS: boolean;
  isChannel?: boolean;
  isDrops?: boolean;
  showProduct?: (e: any, prd: any) => any;
}

const ProductsSearch = ({
  show: showSearch, pending = false, handleClose, setData, allowSelectAll, getData, isCreateGS,
  isChannel, isDrops, showProduct,
}: ProductsSearchProps) => {
  // const {
  //   gsctx,
  //   dispatch,
  // } = useContext(GroupshopContext);
  const { gsctx, dispatch } = useAppContext();
  const { isOwner } = useOwnerOnboarding();
  const { setsProduct } = useDetail(gsctx.allProducts);
  const {
    shop, discountCode, ownerCode, productSearch, setProductSearch,
  } = useCode();
  // console.log('🚀 ~ file: ProductsSearch.tsx ~ line 42 ~ gsctx', gsctx);
  const {
    clientDealProducts, currencySymbol, currencySymbolDiscovery,
    dPrice, disPrice, isInfluencer, isInfluencerGS,
  } = useDeal();

  const { spotlightProducts } = useDrops();
  const { formatNumber } = useUtilityFunction();

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [isloader, setIsloader] = useState(false);
  const [showMsg, setshowMsg] = useState('');
  const [productsArr, setProductsArr] = useState<IProduct[] | undefined>([]);
  // const [searchValue, setsearchValue] = useState('');
  const ref = useRef(null);
  const Router = useRouter();
  const { googleEventCode } = useGtm();
  useEffect(() => {
    if (showSearch) { googleEventCode('product-search-modal'); }
  }, [showSearch]);

  const [otherProducts, setotherProducts] = useState<IProduct[] | undefined>(undefined);
  const { uniqueArray } = useUtilityFunction();
  const {
    allProducts,
    discountCode: { percentage },
    store: { products } = { store: { products: [] } },
    popularProducts, addedProducts, dealProducts, totalProducts,
  } = gsctx;

  const [getSearchResult, { data: lineItems, loading }] = useLazyQuery(GET_DROP_PRODUCT_SEARCH, {
    fetchPolicy: 'network-only',
    onCompleted: async (searchResult: any) => {
      const filterProducts:any = [];
      searchDropsPrd(searchResult.searchProducts[0].products);
    },
  });

  // const refreshProduct = () => products?.filter(
  //   (item: { id: string; }) => !popularProducts?.some((item2) => item2.id === item.id),
  // ).filter(
  //   (item) => !addedProducts?.some((item2) => item2.productId === item.id),
  // );

  useEffect(() => {
    if (gsctx && gsctx.popularProducts && gsctx.allProducts) {
      const temp: any = [...gsctx.popularProducts, ...gsctx.allProducts];
      setProductsArr(temp);
    }
    if (isDrops && gsctx.sections?.length) {
      const temp: IProduct[] = [];
      gsctx.sections.forEach((ele) => {
        ele.products.forEach((prd) => {
          temp.push(prd);
        });
      });
      setProductsArr(temp);
      setotherProducts(uniqueArray(temp));
    }
    if (isChannel && gsctx.allProducts && gsctx.dealProducts) {
      const temp: any = gsctx.allProducts.filter((ele) => !(gsctx.dealProducts
        ?.some((item) => item.productId === ele.id)));
      setProductsArr(temp);
      setotherProducts(uniqueArray(temp));
    }
  }, [gsctx]);

  const refreshProduct = () => uniqueArray((isInfluencerGS ? productsArr?.filter(
    (item) => !dealProducts?.some((item2) => item2.productId === item.id),
  ) : productsArr?.filter(
    (item) => !addedProducts?.some((item2) => item2.productId === item.id),
  ).filter(
    (item) => !gsctx.ownerDeals?.some((item2) => item2.id === item.id),
  )));

  useEffect(() => {
    // console.log(products);
    if (products && (!otherProducts || otherProducts?.length < 1)) {
      const arr = refreshProduct();
      setotherProducts(arr);
    }
  }, []);
  useEffect(() => {
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
  const [searchKeyword, setSearchKeyword] = useState<string | undefined>(undefined);
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const [selectedCountState, setselectedCountState] = useState<number>(0);
  // if > 5 disable selection of product in popup
  const [disableSelection, setDisableSelection] = useState<number>(0);
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

  const searchDropsPrd = (filteredproducts: any) => {
    setIsloader(false);
    const newFilteredSearchArray:any = [];
    if (otherProducts && filteredproducts && searchKeyword !== '') {
      filteredproducts.forEach((pid:string) => {
        const newFiltered = otherProducts?.filter(
          (p: IProduct) => p.id.includes(pid),
        );
        if (newFiltered.length > 0) {
          newFilteredSearchArray.push(newFiltered[0]);
        }
      });
      setotherProducts(newFilteredSearchArray);
    }
    if ((!otherProducts || otherProducts?.length < 1) && filteredproducts) {
      const arr = refreshProduct();
      filteredproducts.forEach((pid:string) => {
        const newFiltered = arr?.filter(
          (p: IProduct) => p.id.includes(pid),
        );
        if (newFiltered.length > 0) {
          newFilteredSearchArray.push(newFiltered[0]);
        }
      });
      setotherProducts(newFilteredSearchArray);
    }
    if (newFilteredSearchArray && newFilteredSearchArray.length > 0) {
      setshowMsg('');
    } else {
      setshowMsg('No matches found!');
    }
  };
  const debouncedSearch = useDebounce(
    (nextValue: string) => (isDrops ? getSearchResult({ variables: { searchTerm: nextValue, shop: `${shop}.myshopify.com` } }) : searchPrd(nextValue)), 1000, otherProducts || [],
  );
  const { AlertComponent, showSuccess, showError } = useAlert();
  const handleSubmit = (e: any) => { e.preventDefault(); };
  const closeModal = (e: any) => {
    setShow(false);
    setshowMsg('');
    setotherProducts(undefined);
    setSelected([]);
    handleClose(e);
    setProductSearch(undefined);
  };
  const addProducts = (e: any, prd: IProduct) => {
    e.stopPropagation();
    setSelected([...selected ?? [], prd.id]);
    setSelectedProducts([...selectedProducts, prd]);
  };
  const handleSearch = (event: any) => {
    setIsloader(true);
    // const { value: searchText } = event.target;
    if (event.charCode === 13) {
      setotherProducts(undefined);
    }
    // eslint-disable-next-line max-len
    if (event.keyCode !== 37 || event.keyCode !== 38 || event.keyCode !== 39 || event.keyCode !== 40 || event.keyCode !== 13) {
    // eslint-disable-next-line no-unused-expressions
      (searchKeyword === '' || searchKeyword === undefined) ? setotherProducts(undefined) : debouncedSearch(searchKeyword);
    }
  };

  useEffect(() => {
    if (searchKeyword === '') {
      setotherProducts(undefined);
    } else if (searchKeyword !== undefined) {
      debouncedSearch(searchKeyword);
    }
  }, [searchKeyword]);

  // const selectedCountState = (selected?.length ?? 0 + clientDProducts?.length) || 0;
  useEffect(() => {
    if (selected && selected?.length) {
      const cdp = clientDealProducts() ?? [];
      console.log('🚀 ~ file: ProductsSearch.tsx ~ line 179 ~ useEffect selected ~ cdp ooo', cdp);
      const sp = selected ?? [];
      console.log('🚀 ~ file: ProductsSearch.tsx ~ line 181 ~ useEffect ~ sp ooo', sp);
      // total sleected plus prev selected count
      setDisableSelection(sp.length + cdp.length);
      setselectedCountState((sp.length));
    } else {
      setselectedCountState(0);
      setDisableSelection(0);
    }
  }, [selected, showSearch]);
  // console.log('🚀 ~ file: ProductsSearch.tsx ~ line 184 ~ selected', selected);

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
    if (selectedProducts && selectedProducts.length && selected && selected.length) {
      if ((selected.length + totalProducts) < 101) {
        if (!allowSelectAll) {
          setShow(!show);
          setTarget(event.target);
        } else {
        getData!(selectedProducts, selected!);
        handleClose(false);
        }
      } else {
        showError(`Groupshop is full you can not add more products to it, There is still place for ${(100 - totalProducts)} products, select only ${(100 - totalProducts)} products`);
      }
    }
  };

  const openDetail = (e: any, prd: any) => {
    setsProduct(prd);
    if (showProduct) {
      showProduct(e, prd);
    }
    closeModal(e);
  };
  const isSuggestion = false;
  const discoveryDiscount = '';

  const priceUI = (prod: any) => (
    <p className={[!isDrops ? 'text-center' : '', 'fw-bold fs-5 mb-0'].join(' ')}>
      <span className="text-decoration-line-through fw-light me-1">
        {isSuggestion ? currencySymbolDiscovery(currencySymbol) : currencySymbol}
        {/* {prod.price} */}
        {!prod?.compareAtPrice && (+(prod.price)).toFixed(2).toString().replace('.00', '')}
        {prod?.compareAtPrice && formatNumber(prod?.compareAtPrice ?? prod.price)}
      </span>
      {' '}
      <span className={isDrops ? 'me-2' : ''}>
        {isSuggestion ? currencySymbolDiscovery(currencySymbol) : currencySymbol}
        {prod?.compareAtPrice && spotlightProducts.includes(prod.id) && !isSuggestion
          && formatNumber(prod.price)}
        {prod?.compareAtPrice && !spotlightProducts.includes(prod.id) && !isSuggestion
          && formatNumber(dPrice(prod.price))}
        {!prod?.compareAtPrice && !isSuggestion && dPrice(+(prod.price)).toFixed(2).toString().replace('.00', '')}
        {!prod?.compareAtPrice && isSuggestion && disPrice(+(prod.price), +discoveryDiscount!).toFixed(2).toString().replace('.00', '')}
      </span>
    </p>

  );

  return (
    <>
      <Modal
        show={showSearch || productSearch}
        onHide={closeModal}
        centered
        size="lg"
        dialogClassName={styles.groupshop_modal_search}
        backdrop={isOwner || isInfluencer ? 'static' : 'true'}
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
        <Row className={styles.groupshop_modal_search_body}>
          {!isDrops && (
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
                      Create your
                      {' '}
                      {isDrops ? 'Groupshop' : 'Microstore'}
                      {' '}
                      by adding your favorite products from
                      {' '}
                      {gsctx?.store?.brandName}
                    </h3>
                  )}
                </div>
              )
              : (
                <>
                  <h3>Search for products & feature your favorites</h3>
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
          )}

          <Form onSubmit={handleSubmit} className={isDrops ? 'px-0' : ''}>
            <Form.Group className={['mb-3 d-flex align-items-center bg-light px-3 ', styles.groupshop_modal_search_body_top_inputArea].join(' ')} controlId="searchField">
              { loading ? (<Spinner style={{ maxHeight: '1rem', maxWidth: '1rem' }} animation="border" variant="primary" />) : (<SearchIcon />)}
              <Form.Control
                size="lg"
                className={['bg-light pt-2 border-0 ', isDrops ? dStyles.drops_modal_search_body_top_input : styles.groupshop_modal_search_body_top_input].join('')}
                type="text"
                placeholder={isDrops ? 'SEARCH PRODUCTS' : 'Start your search...'}
                name="searchField"
                // eslint-disable-next-line max-len
                onChange={(e: any) => { setSearchKeyword(e.target.value); }}
                disabled={!!loading}
                onKeyPress={handleSearch}
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

          {!isDrops && (otherProducts && otherProducts.length > 0) && (
            <div className="d-flex justify-content-between m-0 flex-nowrap">
              <p className={styles.groupshop_modal_search_body_top_resultFound}>
                {otherProducts?.length}
                {' '}
                results found
              </p>
              {isModalForMobile && (isCreateGS || isInfluencer) && (
              <div className={['d-inline', styles.groupshop_modal_search_body_meter].join(' ')}>
                <p className="text-muted d-flex justify-content-end align-items-center">
                  Add up to 5 products
                  {[...new Array(5)].map((v, i) => (
                    <li className={selectedCountState > i ? styles.groupshop_modal_search_meter_fill : styles.groupshop_modal_search_meter}>{' '}</li>
                  ))}
                </p>
              </div>
              )}
              {!isModalForMobile && (isInfluencer || isCreateGS) && (
              <div className={styles.groupshop_modal_search_body_meter}>
                <p className="d-inline text-muted d-flex justify-content-end align-items-center">
                  Add up to 5 products
                  {[...new Array(5)].map((v, i) => (
                    <li className={selectedCountState > i ? styles.groupshop_modal_search_meter_fill : styles.groupshop_modal_search_meter}>{' '}</li>
                  ))}
                </p>
              </div>
              )}
            </div>
          )}

          {isDrops && (otherProducts && otherProducts.length > 0) && (
          <div className="d-flex justify-content-between m-0 flex-nowrap align-items-center">
            <div className={dStyles.drops_modal_search_body_top_resultFound}>
              {lineItems && !isloader && (`
                ${otherProducts?.length}
                ${' '}
                results found`
              )}
            </div>
            <div className={styles.groupshop_sort}>
              <Dropdown align="end" drop="down">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  <span
                    className={[
                      'd-sm-inline text-capitalize',
                      dStyles.drops_sort_txt,
                    ].join(' ')}
                  >
                    Sort by
                  </span>
                  {/* <ChevronDown width={8} /> */}
                  <ArrowSort />
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.groupshop_sort_menu}>
                  <Dropdown.Item
                    className={styles.groupshop_sort_menu_item}
                    onClick={() => setotherProducts(
                      [...(otherProducts ?? [])]?.sort(
                        (a, b) => parseFloat(a.compareAtPrice ?? a.price)
                        - parseFloat(b.compareAtPrice ?? b.price),
                      ),
                    )}
                  >
                    Price (Low to High)
                  </Dropdown.Item>
                  <div className={styles.groupshop_sort_menu_border} />
                  <Dropdown.Item
                    className={styles.groupshop_sort_menu_item}
                    onClick={() => setotherProducts(
                      [...(otherProducts ?? [])]?.sort(
                        (a, b) => parseFloat(b.compareAtPrice ?? b.price)
                        - parseFloat(a.compareAtPrice ?? a.price),
                      ),
                    )}
                  >
                    Price ( High to Low)
                  </Dropdown.Item>
                  <div className={styles.groupshop_sort_menu_border} />
                  <Dropdown.Item
                    className={styles.groupshop_sort_menu_item}
                    onClick={() => setotherProducts(
                      [...(otherProducts ?? [])]?.sort(
                        (a, b) => a.title.localeCompare(b.title),
                      ),
                    )}
                  >
                    Name (a-z)
                  </Dropdown.Item>
                  <div className={styles.groupshop_sort_menu_border} />
                  <Dropdown.Item
                    className={styles.groupshop_sort_menu_item}
                    onClick={() => setotherProducts(
                      [...(otherProducts ?? [])]
                        ?.sort((a, b) => a.title.localeCompare(b.title))
                        .reverse(),
                    )}
                  >
                    Name (z-a)
                  </Dropdown.Item>
                  <div className={styles.groupshop_sort_menu_border} />
                  <Dropdown.Item
                    className={styles.groupshop_sort_menu_item}
                    onClick={() => {
                      const arr = [...(otherProducts ?? [])]?.sort();
                      const newArr = arr?.sort((a, b) => b.purchaseCount! - a.purchaseCount!);
                      setotherProducts(newArr);
                    }}
                  >
                    Best seller
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          )}
        </Row>
        <Modal.Body className={styles.groupshop_modal_search_productSection}>
          <Row className={styles.groupshop_search}>
            {otherProducts && !isloader ? (
              otherProducts.map(
                (prd) => (
                  (+prd.price > 0) && (
                    <Col xs={6} sm={6} md={4}>
                      <ProductCard
                        isDrops={isDrops}
                        onClick={(e) => openDetail(e, prd)}
                        onImageClick={(e: any) => openDetail(e, prd)}
                        isrc={prd.featuredImage}
                        className={styles.groupshop_search_pcard}
                        imgOverlay={!isDrops ? (
                          <>
                            {selected?.includes(prd.id) ? (
                              <>
                                <span className={styles.groupshop__pcard_tag_price}>
                                  {`${currencySymbol}${(prd.compareAtPrice ? (+prd.compareAtPrice - +prd.price) : (+prd.price - dPrice(+(prd.price)))).toFixed(2).replace('.00', '')} OFF`}
                                </span>
                                <IconButton
                                  className={styles.groupshop__pcard_tag_cross}
                                  icon={<X size={18} />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelected(selected?.filter((pid) => pid !== prd.id) ?? []);
                                    setSelectedProducts(selectedProducts?.filter(
                                      (pid: any) => pid.id !== prd.id,
                                    ) ?? []);
                                  }}
                                />
                                <Button
                                  variant="outline-primary"
                                  className={styles.groupshop_search_pcard_addProduct}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelected(selected?.filter((pid) => pid !== prd.id) ?? []);
                                    setSelectedProducts(selectedProducts?.filter(
                                      (pid: any) => pid.id !== prd.id,
                                    ) ?? []);
                                  }}
                                >
                                  <StarFill style={{ color: '#FFD700' }} />
                                  <span>Selected</span>
                                </Button>
                              </>

                            )
                              // : (
                              //   <Button
                              //     variant="outline-primary"
                              //     disabled={disableSelection === 5}
                              //     className={styles.groupshop_search_pcard_addProduct}
                              //     onClick={() => addProducts(prd)}
                              //   >
                              //     ADD PRODUCT
                              //   </Button>
                              // )
                              : (
                                <Button variant="outline-primary" disabled={disableSelection === 5} className={styles.groupshop_search_pcard_addProduct} onClick={(e) => addProducts(e, prd)}>
                                  <Star />
                                  <span>ADD TO FAVS</span>
                                </Button>
                              )}
                          </>
                        )
                          : (
                            <span className={dStyles.drops__pcard_tag_price}>
                              {`${currencySymbol}${(prd.compareAtPrice ? (+prd.compareAtPrice - +prd.price) : (+prd.price - dPrice(+(prd.price)))).toFixed(2).replace('.00', '')} OFF`}
                            </span>
                          )}
                      >
                        <div
                          role="button"
                          className={[!isDrops ? 'text-center' : '', 'fw-bold'].join(' ')}
                          onClick={(e) => openDetail(e, prd)}
                          onKeyDown={(e) => openDetail(e, prd)}
                          tabIndex={0}
                        >
                          <h5 className={styles.groupshop_product_desc_title}>
                            {prd.title}
                          </h5>
                        </div>
                        {priceUI(prd)}
                      </ProductCard>
                    </Col>
                  )
                ),
              )
            ) : (
              new Array(6).fill(null).map(() => (
                <Col xs={6} sm={6} md={4}>
                  <ProductCard
                    isDrops={isDrops}
                    loading={isloader}
                  >
                    <Skeleton width="100%" />
                  </ProductCard>
                </Col>
              ))
            )}
            {!(otherProducts && otherProducts.length > 0) && (
              <div className={styles.groupshop_modal_empty}>
                <p>{showMsg}</p>
              </div>
            )}
          </Row>
        </Modal.Body>
        {!isDrops && (otherProducts && otherProducts.length > 0) && (
          <>
            <div ref={ref} className={styles.groupshop_addtocartmodal}>
              {!isOwner && isCreateGS
                ? (
                  <>
                    {
                      !isChannel && (
                      <div className="pb-3">
                        Enter your name to confirm and get started!
                      </div>
                      )
                    }
                    <AddDealProduct
                      selectedProducts={selected}
                      isCreateGS={isCreateGS}
                      handleClose={(e) => {
                        closeModal(e);
                        if (selected && selected?.length > 0) {
                          if (!isChannel
                            || (isChannel && (selected.length + totalProducts) < 101)) {
                            showSuccess('Product(s) has been added successfully.');
                          } else {
                            showError(`Groupshop is full you can not add more products to it, There is still place for ${(100 - totalProducts)} products, select only ${(100 - totalProducts)} products`);
                          }
                        } else {
                          showError('No product(s) has been selected.');
                        }
                      }}
                    />
                  </>
                )
                : (
                  <>
                    {selected && selected.length > 0 ? (
                      <div className="pb-3">
                        {selected.length}
                        {' '}
                        product selected
                        {' '}
                      </div>
                    ) : (<div className="mt-1 pb-4">{' '}</div>)}
                    <Button
                      onClick={handleClick}
                      className="rounded-pill text-center text-uppercase px-5 fw-bold"
                      disabled={selected?.length === 0}
                    >
                      {isChannel ? 'Save My Favs' : 'Add to FAVORITES'}

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
                        {/* Add
                        <strong>
                          {' '}
                          {selectedCountState}
                          {' '}
                          products
                        </strong>
                        {' '}
                        to this Groupshop */}
                        Enter your name to personalize your store
                      </p>
                      <AddDealProduct
                        selectedProducts={selected}
                        handleClose={(e) => {
                          closeModal(e);
                          if (selected && selected?.length > 0) {
                            if (!isChannel
                              || (isChannel && (selected.length + totalProducts) < 101)) {
                              showSuccess('Product(s) has been added successfully.');
                            } else {
                              showError(`Groupshop is full you can not add more products to it, There is still place for ${(100 - totalProducts)} products, select only ${(100 - totalProducts)} products`);
                            }
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
  isChannel: false,
  isDrops: false,
  showProduct: '',
};

export default ProductsSearch;
