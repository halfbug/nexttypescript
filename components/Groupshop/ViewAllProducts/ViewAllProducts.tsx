import useAppContext from 'hooks/useAppContext';
import React, { useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { IProduct, RootProps } from 'types/store';
import useDetail from 'hooks/useDetail';
import useUtilityFunction from 'hooks/useUtilityFunction';
import ProductDetail from '../ProductDetail/ProductDetail';
import ProductGrid from '../ProductGrid/ProductGrid';

interface ViewAllProductProps extends RootProps {
  show: boolean;
  handleClose(): any;
  section: any;
}

const ViewAllProducts = ({
  show, handleClose, section,
}: ViewAllProductProps) => {
  const viewAllProductRef = useRef<HTMLDivElement | null>(null);
  const { gsctx } = useAppContext();

  const { uniqueArray } = useUtilityFunction();
  const [allProductsList, setAllProductsList] = useState<IProduct[] | undefined>([]);

  const {
    showDetail, setshowDetail, sProduct, setsProduct, showQrscan, setshowQrscan,
  } = useDetail(allProductsList);

  useEffect(() => {
    if (section?.products?.length > 0) {
      const temp: IProduct[] = [];
      section?.products.forEach((prd: any) => {
        temp.push(prd);
      });
      setAllProductsList(temp);
    }
  }, [section]);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
          >
            {section?.name}

          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body ref={viewAllProductRef} id="viewallscroll">
          <ProductGrid
            key={section?.shopifyId}
            sectionID={section?.shopifyId}
            isDrops
            title=""
            type="allproduct"
            xs={6}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            products={uniqueArray(section?.products)}
            maxrows={12}
            handleDetail={(prd: any) => setsProduct(prd)}
            showHoverButton
            id="viewAllproductsdrops"
            showPagination={false}
            loading={gsctx.loading}
            loadmore
            isViewAll
          >
            <div />
          </ProductGrid>

        </Offcanvas.Body>
      </Offcanvas>
      <ProductDetail
        show={showDetail}
        handleClose={() => setshowDetail(false)}
        product={sProduct}
        isDrops
      />
    </>
  );
};

export default ViewAllProducts;
