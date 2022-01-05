/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import Navbar from 'react-bootstrap/Navbar';
import { RootProps } from 'types/store';
import { Placeholder } from 'react-bootstrap';

interface BrandProps extends RootProps {
  name : string;
}

const Brand = ({
  name, pending = false,
}: BrandProps) => {
  if (pending) {
    return (<Placeholder as="h1" bg="secondary" className="w-100" />);
  }
  return (
    <h1 className={styles.groupshop_brand}>
      {name}
    </h1>
  );
};

// Brand.defaultProps = {
//   user: {},
// };

export default Brand;
