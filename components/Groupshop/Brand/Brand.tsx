/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import Navbar from 'react-bootstrap/Navbar';

interface BrandProps {
  name : string;
}

const Brand = ({
  name,
}: BrandProps) => (
  <h1 className={styles.groupshop_brand}>
    {name}
  </h1>
);

// Brand.defaultProps = {
//   user: {},
// };

export default Brand;
