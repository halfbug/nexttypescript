/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Retail.module.scss';
import {
  Row, Col, Form,
} from 'react-bootstrap';
import CrossIcon from 'assets/images/round-cross.svg';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';

const RetailProducts = () => (
  <>
    <Row className={styles.retail__retailProducts}>
      <Col lg={12}>
        <h2 className={styles.retail__retailProducts__heading}>
          Retail Products
        </h2>
      </Col>
      <Col lg={12}>
        <div className={styles.retail__retailProducts__container}>
          <h4>Add your products to Groupshop</h4>
          <p>All the products you select below will be available for your customers to curate.</p>
          <div className='d-flex align-items-center'>
            <Form.Check
              type="checkbox"
              checked={false}
            >
              <Form.Check.Input type="checkbox" name="bnr" />
              <Form.Check.Label className='ms-2'>
                All products
              </Form.Check.Label>
            </Form.Check>
            <div className={styles.retail__retailProducts__recommended}>
              <span>Recommended</span>
            </div>
          </div>
          <p className={styles.retail__retailProducts__specific}>
            Or select specific products/collections
          </p>
          <p>The more products you select, the better your customers’ shopping experience.</p>
          <div className={styles.retail__retailProducts__productBtn}>
            <WhiteButton>
              Add products/collections
            </WhiteButton>
            <span className='px-2'>25 product(s) selected</span>
            <CrossIcon />
          </div>
        </div>
      </Col>
    </Row>
  </>
);

export default RetailProducts;
