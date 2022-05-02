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
import useDebounce from 'hooks/useDebounce';
import { X } from 'react-bootstrap-icons';
import IconButton from 'components/Buttons/IconButton';
import AddDealProduct from 'components/Forms/AddDealProduct';
import useDeal from 'hooks/useDeal';
import useAlert from 'hooks/useAlert';
import useGtm from 'hooks/useGtm';
import SearchIcon from 'assets/images/search-icon.svg';
import useUtilityFunction from 'hooks/useUtilityFunction';
import ProductCard from '../ProductCard/ProductCard';

interface ProductsSearchProps extends RootProps {
  show : boolean;
  handleClose(e:any): any;
  // handleSearch(e:any): any;
}

const ProductsSearch = ({
  show: showSearch, pending = false, handleClose,
}: ProductsSearchProps) => {
  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);

  const { clientDealProducts, currencySymbol, dPrice } = useDeal();
  const { formatNumber } = useUtilityFunction();

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const { googleEventCode } = useGtm();
  useEffect(() => {
    if (showSearch) { googleEventCode('product-search-modal'); }
  }, [showSearch]);

  const handleClick = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  const [otherProducts, setotherProducts] = useState<IProduct[] | undefined>(undefined);

  const {
    discountCode: { percentage },
    store: { products } = { store: { products: [] } },
  } = gsctx;

  useEffect(() => {
    // console.log(products);
    if (!otherProducts) { setotherProducts(products); }
  }, [otherProducts]);

  useEffect(() => {
    if (products && (!otherProducts || otherProducts?.length < 1)) { setotherProducts(products); }
  }, [products]);

  const [selected, setSelected] = useState<string[]|undefined>(undefined);
  const clientDProducts = clientDealProducts();

  useEffect(() => {
    if ((!selected || selected.length < 1)
      && (clientDProducts !== undefined && clientDProducts?.length > 0)) {
      setSelected(clientDealProducts());
    }
  }, [selected, clientDProducts]);

  const searchPrd = (name:string) => {
    if (products && name) {
      setotherProducts(
        products.filter(
          (p:IProduct) => p.title.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
        ),
      );
    }
  };
  const debouncedSearch = useDebounce(
    (nextValue:string) => searchPrd(nextValue), 1000, products || [],
  );
  const { AlertComponent, showSuccess } = useAlert();
  const handleSubmit = (e:any) => { e.preventDefault(); };
  const closeModal = (e: any) => {
    setShow(false);
    setotherProducts(undefined);
    setSelected(undefined);
    handleClose(e);
  };
  const addProducts = (id: string) => setSelected([...selected ?? [], id]);
  const handleSearch = (event:any) => {
    const { value: searchText } = event.target;
    const code = event.keyCode || event.key;
    // console.log({ e });
    if (code !== 37 || code !== 38 || code !== 39 || code !== 40 || code !== 13) {
      debouncedSearch(searchText);
    }

    if (searchText === '') { setotherProducts(undefined); }
  };
  const selectedCount = selected?.length || 0;
  if (pending) {
    return (<Placeholder as="h1" bg="secondary" className="w-100" />);
  }
  return (
    <>
      <Modal
        show={showSearch}
        onHide={closeModal}
        centered
        size="lg"
        dialogClassName={styles.groupshop_modal_search}
        backdrop="static"
        fullscreen="lg-down"
      >
        <Modal.Header closeButton className="pb-0" />
        <Modal.Body className={styles.groupshop_modal_search_body}>
          <div className={styles.groupshop_modal_search_body_top}>
            <h3>Search for products</h3>
            <p className="text-muted d-flex justify-content-end align-items-center">
              <span className={styles.groupshop_modal_search_body_top_txt}>
                Add up to 5 products
              </span>
              {[...new Array(5)].map((v, i) => (
                <li className={selectedCount > i ? styles.groupshop_modal_search_meter_fill : styles.groupshop_modal_search_meter}>{' '}</li>
              ))}
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            {/* <Form.Group className="mb-3 " controlId="searchField">
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm"><SearchIcon /></InputGroup.Text>
                <Form.Control size="lg" className="bg-light pt-2 border-0" type="text" placeholder=
                "Start your search..." name="searchField" onChange={(e) => handleSearch(e)} />
              </InputGroup>
            </Form.Group> */}

            <Form.Group className={['mb-3 d-flex align-items-center bg-light px-3 ', styles.groupshop_modal_search_body_top_inputArea].join(' ')} controlId="searchField">
              <SearchIcon />
              <Form.Control size="lg" className={['bg-light pt-2 border-0 ', styles.groupshop_modal_search_body_top_input].join('')} type="text" placeholder="Start your search..." name="searchField" onChange={(e) => handleSearch(e)} />
            </Form.Group>
          </Form>

          {(otherProducts && otherProducts.length > 0) && (
            <Row>
              <Col xs={4}>
                <p className={styles.groupshop_modal_search_body_top_resultFound}>
                  {otherProducts?.length}
                  {' '}
                  results found
                </p>
              </Col>
              <Col xs={8} className={styles.groupshop_modal_search_body_meter}>
                <p className="text-muted d-flex justify-content-end align-items-center">
                  Add up to 5 products
                  {[...new Array(5)].map((v, i) => (
                    <li className={selectedCount > i ? styles.groupshop_modal_search_meter_fill : styles.groupshop_modal_search_meter}>{' '}</li>
                  ))}
                </p>
              </Col>
            </Row>
          )}
          <Row className={styles.groupshop_search}>
            {otherProducts ? (
              otherProducts.map(
                (prd) => (
                  (+prd.price > 0) && (
                  <Col xs={6} sm={6} md={4} className="p-1">
                    <ProductCard
                      isrc={prd.featuredImage}
                      className={styles.groupshop_search_pcard}
                      imgOverlay={(
                        <>
                          { selected?.includes(prd.id) ? (
                            <>
                              <span className={styles.groupshop__pcard_tag_price}>
                                {/* {`${currencySymbol}
                          ${formatNumber(+prd.price - dPrice(+(prd.price)))} OFF`} */}
                                {`${currencySymbol}${(+prd.price - dPrice(+(prd.price))).toFixed(2).replace('.00', '')} OFF`}
                              </span>
                              <IconButton
                                className={styles.groupshop__pcard_tag_cross}
                                icon={<X size={18} />}
                                onClick={() => setSelected(
                                  selected?.filter((pid) => pid !== prd.id),
                                )}
                              />
                            </>

                          )
                            : <Button variant="outline-primary" disabled={selectedCount === 5} className={styles.groupshop__pcard_tag_product} onClick={() => addProducts(prd.id)}>ADD PRODUCT</Button>}
                        </>
)}
                    >
                      <h5 className="text-center fw-bold text-truncate">
                        { prd.title }
                      </h5>
                      <p className="text-center fw-bold fs-5 mb-0">
                        <span className="text-decoration-line-through fw-light me-1">
                          {currencySymbol}
                          {/* {prod.price} */}
                          {(+(prd.price)).toFixed(2).toString().replace('.00', '')}
                        </span>
                        {' '}
                        <span>
                          {currencySymbol}
                          {dPrice(+(prd.price)).toFixed(2).toString().replace('.00', '')}
                        </span>
                        {/* $
                        {' '}
                        {(+(prd.price)).toFixed(2).toString().replace('.00', '')} */}
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
          </Row>
          {(otherProducts && otherProducts.length > 0) && (
          <>
            {selected && (
            <Row>
              <Col xs={12} className="text-center fs-5 pt-3">
                {selectedCount}
                {' '}
                product selected
                {' '}
              </Col>
            </Row>
            )}
            <Row>
              <Col xs={12} className="text-center my-3">
                <div ref={ref}>
                  <Button
                    onClick={handleClick}
                    className={['rounded-pill text-center text-uppercase px-5 fw-bold ', styles.groupshop_modal_groupshopBtn].join('')}
                  >
                    ADD to groupshop

                  </Button>

                  <Overlay
                    show={show}
                    target={target}
                    placement="bottom"
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
                              {selectedCount}
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
                          />
                        </>
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                </div>
                {/* <OverlayTrigger
                  trigger="click"
                  placement="top"
                  overlay={(
                    <Popover
                      className={styles.groupshop_search_popover}
                      style={{ maxWidth: '325px' }}
                      id="popover-positioned"
                    >

                      <Popover.Body>
                        <p className="text-center fs-5">
                          Add
                          <strong>
                            {' '}
                            {selectedCount}
                            {' '}
                            products
                          </strong>
                          {' '}
                          to this Groupshop
                          <AddDealProduct selectedProducts={selected} handleClose={closeModal} />
                        </p>
                      </Popover.Body>

                    </Popover>
      )}
                >
                  <Button
                    variant="outline-primary"
                    className="text-center rounded-pill text-uppercase px-4 fs-4 fw-bold"
                  >
                    ADD  to groupshop

                  </Button>
                </OverlayTrigger> */}

              </Col>
            </Row>
          </>
          )}
        </Modal.Body>

      </Modal>
      <AlertComponent />
    </>
  );
};

// ProductsSearch.defaultProps = {
//   user: {},
// };

export default ProductsSearch;
