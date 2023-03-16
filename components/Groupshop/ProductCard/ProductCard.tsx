/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import dStyles from 'styles/Drops.module.scss';
import NoImage from 'assets/images/noImage.png';
import {
  Button, Card, Col, Row,
} from 'react-bootstrap';
import { RootProps } from 'types/store';

type IProductCardProps = {
  imgOverlay : React.ReactNode;
  isrc: string;
  vsrc?: string;
  type?: 'small' | 'large';
  isDrops?: boolean;
  isVault?: boolean;
  isSpotlight?: boolean;
  onImageClick?: any;
} & React.ComponentPropsWithoutRef<'div'> & RootProps

const ProductCard = ({
  isrc, vsrc, children, type, imgOverlay, pending, onClick, isDrops, isSpotlight, isVault,
  onImageClick, ...rest
}: IProductCardProps) => {
  // console.log('sas');
  switch (type) {
    case 'large':
      return (
        <Card {...rest} className={[styles.groupshop__pcard, rest.className, isVault ? dStyles.drops__vault__pcard : ''].join(' ')}>
          <div className={isDrops ? [dStyles.drops__pcard_image_wrapper, isSpotlight ? dStyles.drops__pcard_image_wrapper_spotlight : ''].join(' ') : styles.groupshop__pcard_image_wrapper} style={{ backgroundImage: `url(${isrc || NoImage.src})` }}>
            {
            !isrc && <video onClick={onImageClick} src={vsrc} muted autoPlay loop style={{ width: '306px' }} />
            }
            <Card.ImgOverlay onClick={onClick} className={[' p-0', styles.groupshop__pcard_overlay].join(' ')}>
              {imgOverlay}
            </Card.ImgOverlay>
            {/* <Card.Img variant="top" src={isrc} className=
            {[' img-fluid', styles.groupshop__pcard_image].join(' ')} /> */}
          </div>
          <Card.Body className="px-2">
            {children}
          </Card.Body>
        </Card>
      );
    case 'small':
      return (
        <Card {...rest} className={isDrops ? [dStyles.drops__pcard_small, rest.className, isVault ? dStyles.drops__vault__pcard : ''].join(' ') : [styles.groupshop__pcard_small, rest.className].join(' ')}>
          <Card.ImgOverlay onClick={onClick} className={styles.groupshop__pcard_overlay_small}>
            {imgOverlay}
          </Card.ImgOverlay>
          {
           isrc ? <Card.Img variant="top" src={isrc} className={isDrops ? dStyles.drops__pcard_image_small : styles.groupshop__pcard_image_small} />
             : <video src={vsrc} muted autoPlay loop />
          }
          <Card.Body>
            {children}
          </Card.Body>
        </Card>
      );

    default:
      return (
        <Card {...rest} className={[styles.groupshop__pcard, rest.className, isVault ? dStyles.drops__vault__pcard : ''].join(' ')}>
          {
           isrc ? <Card.Img variant="top" src={isrc} className={styles.groupshop__pcard_image} />
             : <video src={vsrc} muted autoPlay loop />
          }
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
  vsrc: undefined,
  isDrops: false,
  isVault: false,
  isSpotlight: false,
  onImageClick: () => {},
};

export default ProductCard;
