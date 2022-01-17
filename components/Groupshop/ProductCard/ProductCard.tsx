/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import {
  Button, Card, Col, Row,
} from 'react-bootstrap';
import { RootProps } from 'types/store';

type IProductCardProps = {
  imgOverlay : React.ReactNode;
  isrc: string;
} & React.ComponentPropsWithoutRef<'div'> & RootProps

const ProductCard = ({
  isrc, children, imgOverlay, pending, ...rest
}: IProductCardProps) => (
  <Card {...rest} className={[styles.groupshop__pcard, rest.className].join(' ')}>
    <Card.Img variant="top" src={isrc} className={styles.groupshop__pcard_image} />
    <Card.ImgOverlay className={styles.groupshop__pcard_overlay}>
      {imgOverlay}
    </Card.ImgOverlay>
    <Card.Body>
      {children}
    </Card.Body>

  </Card>

);

// ProductCard.defaultProps = {
//   user: {},
// };

export default ProductCard;
