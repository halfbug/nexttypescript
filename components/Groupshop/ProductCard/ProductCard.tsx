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
  type?: 'small' | 'large';
} & React.ComponentPropsWithoutRef<'div'> & RootProps

const ProductCard = ({
  isrc, children, type, imgOverlay, pending, ...rest
}: IProductCardProps) => {
  // console.log('sas');
  switch (type) {
    case 'large':
      return (
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
    case 'small':
      return (
        <Card {...rest} className={[styles.groupshop__pcard_small, rest.className].join(' ')}>
          <Card.Img variant="top" src={isrc} className={styles.groupshop__pcard_image_small} />
          <Card.ImgOverlay className={styles.groupshop__pcard_overlay_small}>
            {imgOverlay}
          </Card.ImgOverlay>
          <Card.Body className="styles.groupshop__pcard_cardBody">
            {children}
          </Card.Body>
        </Card>
      );

    default:
      return (
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
  }
};

ProductCard.defaultProps = {
  type: 'large',
};

export default ProductCard;
