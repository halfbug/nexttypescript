/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  Col, Form, ListGroup, Row, Container,
} from 'react-bootstrap';
import Styles from 'styles/Screen1.module.scss';
import IconButton from 'components/Buttons/IconButton';
import { ChevronRight } from 'react-bootstrap-icons';
import { ICollection } from 'types/store';

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
  return (
    <Container {...props}>
      <Row>
        <Col xs={12} className="mt-5">
          <h4>Collections</h4>
        </Col>
      </Row>
      <Row className="m-0">
        <Col xs={12} className={Styles.screen1_collections}>
          <ListGroup as="ol" className="">
            { data?.map(({ title, productsCount, id }) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-center mt-1 rounded-3 border border-1"
                key={id}
              >
                <div className=" p-2 ms-2 me-auto">
                  <div className="fw-bold d-flex align-items-center">
                    <Form.Check type="checkbox" inline className="fs-4" name="collections" id={id} onChange={handleChecked} checked={isChecked(id, 'collections')} />
                    <p className="m-0">
                      {title}
                      {' '}
                      (
                      {' '}
                      {productsCount}
                      {' '}
                      )
                    </p>
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
