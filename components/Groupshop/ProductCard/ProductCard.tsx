/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import {
  Button, Card, Col, Row,
} from 'react-bootstrap';

interface IProductCardProps {
  // children : React.ReactNode;
  isrc: string;
}

const ProductCard = ({
  isrc,
}: IProductCardProps) => (
  <Card className={styles.groupshop__pcard}>
    <Card.Img variant="top" src={isrc} className={styles.groupshop__pcard_image} />
    <Card.ImgOverlay className={styles.groupshop__pcard_overlay}>
      <span className={styles.groupshop__pcard_tag_price}> $30% OFF</span>
      <span className={styles.groupshop__pcard_tag_buyer}> MS</span>
      <span className={styles.groupshop__pcard_tag_addedby}>ADDED BY ELISA</span>
    </Card.ImgOverlay>
    <Card.Body>
      <Card.Title className="text-center fw-bold">Card Title</Card.Title>
      <Card.Text className="text-center mb-1">
        Some quick example.
      </Card.Text>
      <Card.Text className="text-center fw-bold fs-5 mb-0">
        $20
      </Card.Text>
      <Button variant="primary" className="rounded-pill w-75">Add to Cart</Button>
      <Button variant="outline-primary" className="m-1 rounded-pill">test</Button>
    </Card.Body>

  </Card>

);

// ProductCard.defaultProps = {
//   user: {},
// };

export default ProductCard;
