/* eslint-disable no-unused-vars */
import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import styles from 'styles/Groupshop.module.scss';
import Navbar from 'react-bootstrap/Navbar';
import { IProduct, RootProps } from 'types/store';
import {
  Button,
  Col, Form, Modal, Overlay, OverlayTrigger, Placeholder, Popover, Row,
} from 'react-bootstrap';
import useStore from 'hooks/useStore';
import { GroupshopContext, GSContextType, gsInit } from 'store/groupshop.context';
import useDebounce from 'hooks/useDebounce';
import { X } from 'react-bootstrap-icons';
import IconButton from 'components/Buttons/IconButton';
import AddDealProduct from 'components/Forms/AddDealProduct';
import useDeal from 'hooks/useDeal';
import useAlert from 'hooks/useAlert';
import ProductGrid from '../ProductGrid/ProductGrid';
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

  const { clientDealProducts } = useDeal();

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const { googleEventCode } = useDeal();
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
        <Modal.Body className="px-5">
          <div className="d-flex justify-content-between">
            <h3>Search for products</h3>
            <p className="text-muted d-flex justify-content-end align-items-center">
              Add up to 5 products
              {[...new Array(5)].map((v, i) => (
                <li className={selectedCount > i ? styles.groupshop_modal_search_meter_fill : styles.groupshop_modal_search_meter}>{' '}</li>
              ))}
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 " controlId="searchField">
              <Form.Control size="lg" className="bg-light pt-2 border-0" type="text" placeholder="Start your search..." name="searchField" onChange={(e) => handleSearch(e)} />
            </Form.Group>
          </Form>

          {(otherProducts && otherProducts.length > 0) && (
          <p>
            {otherProducts?.length}
            {' '}
            results found
          </p>
          )}
          <Row className={styles.groupshop_search}>
            {otherProducts ? (
              otherProducts.map(
                (prd) => (
                  <Col xs={6} sm={4} className="p-1">
                    <ProductCard
                      isrc={prd.featuredImage}
                      className={styles.groupshop_search_pcard}
                      imgOverlay={(
                        <>
                          { selected?.includes(prd.id) ? (
                            <>
                              <span className={styles.groupshop__pcard_tag_price}>
                                {`${percentage}% OFF`}
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
                            : <Button variant="outline-primary" disabled={selectedCount === 5} className={styles.groupshop__pcard_tag_product} onClick={() => addProducts(prd.id)}>ADD A PRODUCT</Button>}
                        </>
)}
                    >
                      <h5 className="text-center fw-bold text-truncate">
                        { prd.title }
                      </h5>
                      <p className="text-center fw-bold fs-5 mb-0">
                        $
                        {' '}
                        {prd.price}
                      </p>
                    </ProductCard>
                  </Col>
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
              <Col xs={12} className="text-center fs-5 pt-1">
                {selectedCount}
                {' '}
                product selected
                {' '}
              </Col>
            </Row>
            )}
            <Row>
              <Col xs={12} className="text-center">
                <div ref={ref}>
                  <Button
                    onClick={handleClick}
                    className="text-center rounded-pill text-uppercase px-4 fs-4 fw-bold"
                  >
                    ADD  to groupshop

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
                          <AddDealProduct
                            selectedProducts={selected}
                            handleClose={(e) => {
                              closeModal(e);
                              showSuccess('Product(s) has been added successfully.');
                            }}
                          />
                        </p>
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
