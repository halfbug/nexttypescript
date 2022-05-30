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
  isrc, children, type, imgOverlay, pending, onClick, ...rest
}: IProductCardProps) => {
  // console.log('sas');
  switch (type) {
    case 'large':
      return (
        <Card {...rest} className={[styles.groupshop__pcard, rest.className].join(' ')}>
          <div className={styles.groupshop__pcard_image_wrapper}>
            <Card.ImgOverlay onClick={onClick} className={[' p-0', styles.groupshop__pcard_overlay].join(' ')}>
              {imgOverlay}
            </Card.ImgOverlay>
            <Card.Img variant="top" src={isrc} className={[' img-fluid', styles.groupshop__pcard_image].join(' ')} />
          </div>
          <Card.Body className="px-2">
            {children}
          </Card.Body>
        </Card>
      );
    case 'small':
      return (
        <Card {...rest} className={[styles.groupshop__pcard_small, rest.className].join(' ')}>
          <Card.ImgOverlay onClick={onClick} className={styles.groupshop__pcard_overlay_small}>
            {imgOverlay}
          </Card.ImgOverlay>
          <Card.Img variant="top" src={isrc} className={styles.groupshop__pcard_image_small} />
          <Card.Body>
            {children}
          </Card.Body>
        </Card>
      );

    default:
      return (
        <Card {...rest} className={[styles.groupshop__pcard, rest.className].join(' ')}>
          <Card.Img variant="top" src={isrc} className={styles.groupshop__pcard_image} />
          <Card.ImgOverlay onClick={onClick} className={styles.groupshop__pcard_overlay}>
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