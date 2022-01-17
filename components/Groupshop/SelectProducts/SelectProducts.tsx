/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from 'styles/Groupshop.module.scss';
import Navbar from 'react-bootstrap/Navbar';
import { RootProps } from 'types/store';
import {
  Placeholder, ToggleButton, ToggleButtonGroup, Button,
} from 'react-bootstrap';
import { Send } from 'react-bootstrap-icons';
import ProductCard from '../ProductCard/ProductCard';

interface SelectProductsProps extends RootProps {
  name : string;
}

const SelectProducts = ({
  name, pending = false,
}: SelectProductsProps) => {
  if (pending) {
    return (<Placeholder as="h1" bg="secondary" className="w-100" />);
  }
  const [value, setValue] = useState([1, 3]);
  const handleChange = (val:number[]) => setValue(val);

  return (
    <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
      <ToggleButton id="tbg-btn-1" value={1}>
        <ProductCard
          isrc="/images/empty.png"
          imgOverlay={(
            <>
              <span className={styles.groupshop__pcard_tag_price}>
                20% OFF
                {/* {`${percentage}% OFF`} */}
              </span>
              <Button
                variant="outline-primary"
                className={styles.groupshop__pcard_tag_product}
              // onClick={() => addProducts(true)}
              >
                ADD A PRODUCT

              </Button>
            </>
)}
        >
          <h5 className="text-center fw-bold text-truncate">Don’t see what you like?</h5>

          <p className="text-center mb-1 fs-5">
            Add your favorite product
          </p>

          <p className="text-center fw-bold fs-5 mb-0">
            <br />
            {' '}
          </p>
          <Button variant="primary" disabled className="rounded-pill w-75">Add to Cart</Button>
          <Button variant="outline-primary" className="m-1 rounded-pill">
            <Send size={18} />
          </Button>
        </ProductCard>
      </ToggleButton>
      <ToggleButton id="tbg-btn-2" value={2}>
        Option 2
      </ToggleButton>
      <ToggleButton id="tbg-btn-3" value={3}>
        Option 3
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

// SelectProducts.defaultProps = {
//   user: {},
// };

export default SelectProducts;
