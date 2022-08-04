/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  Col, Form, ListGroup, Row, Container,
} from 'react-bootstrap';
import Styles from 'styles/Screen1.module.scss';
import IconButton from 'components/Buttons/IconButton';
import { ChevronRight } from 'react-bootstrap-icons';
import { ICollection } from 'types/store';
import styles2 from 'styles/product.module.scss';

export interface ICollectionsProps {
    data: ICollection[] | undefined;
    handleCollectionButton(id:string): any;
    handleChecked(e:any):any;
    isChecked(id:string, entity?:string):boolean;
    // All other props
  [x:string]: any;
}

export default function Collections({
  data, handleCollectionButton, handleChecked, isChecked, ...props
}: ICollectionsProps) {
  // useEffect(() => {
  //   console.log(data, 'data collection');
  // }, [data]);

  return (
    <Container {...props}>
      <Row>
        <Col xs={12} className="mt-4">
          <h4 className={styles2.product_collection}>Collections</h4>
        </Col>
      </Row>
      <Row className="m-0">
        <Col xs={12} className={Styles.screen1_collections}>
          <ListGroup as="ol" className="">
            { data?.map(({
              title, productsCount, id, products,
            }) => (
              <ListGroup.Item
                as="li"
                className={styles2.border_listgroup}
                key={id}
                onClick={() => handleCollectionButton(id)}
              >
                <div className=" p-2 ms-2 me-auto">
                  <div className="fw-bold d-flex align-items-center">
                    {/* <Form.Check
                      type="checkbox"
                      inline
                      className={['fs-4', styles2.product_check].join(' ')}
                      name="collections"
                      id={id}
                      onChange={handleChecked}
                      checked={isChecked(id, 'collections')}
                    /> */}
                    <div className={['m-0', styles2.product_all_product].join(' ')}>
                      {title}
                      {' '}
                      (
                      {/* {productsCount} */}
                      {products.length}
                      )
                    </div>
                  </div>
                </div>
                <IconButton icon={<ChevronRight />} onClick={() => handleCollectionButton(id)} />

              </ListGroup.Item>
            ))}

          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
