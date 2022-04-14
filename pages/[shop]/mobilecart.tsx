import React from 'react';
import { NextPage } from 'next';
import {
  Badge, Button, Card, Col, Form, Row,
} from 'react-bootstrap';
import styles from 'styles/MobileCart.module.scss';
import LeftArrowIcon from 'assets/images/left-arrow.svg';
import ItemImage from 'assets/images/item-mobile.png';
import ShowMoreText from 'react-show-more-text';
import Icon from 'assets/images/cart-cone.svg';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';

const MobileCart: NextPage = () => (
  <div className={styles.mobilecart}>
    <div className={styles.mobilecart__navigation}>
      <LeftArrowIcon />
      <span className={styles.mobilecart__navigation__txt}>Back To All</span>
    </div>
    <Row className={['gx-0', styles.mobilecart__pcard].join(' ')}>
      <Card className={styles.mobilecart__card}>
        <Card.Img variant="top" src={ItemImage.src} className={styles.mobilecart__pcard__image} />
        <Card.ImgOverlay className={styles.mobilecart__pcard__overlay}>
          <Badge
            bg="light"
            text="dark"
            className={['shadow-sm', styles.mobilecart__pcard__overlay__tag1].join(' ')}
          >
            $30
            {' '}
            OFF
          </Badge>
          <Badge
            bg="light"
            text="dark"
            className={['shadow-sm', styles.mobilecart__pcard__overlay__tag].join(' ')}
          >
            Added By Elisa
          </Badge>
        </Card.ImgOverlay>
      </Card>
    </Row>
    <p className={styles.mobilecart__item_name}>Coupé One-Piece</p>
    <Row className="m-2">
      <Col xs={3} className="d-flex align-items-center">
        <p className={styles.mobilecart__price_light}>$50</p>
        <p className={styles.mobilecart__price_bold}>$20</p>
      </Col>
      <Col xs={8} className={['d-flex align-items-center justtify-content-center', styles.mobilecart__txt_area].join(' ')}>
        <p className={styles.mobilecart__txt_light}>Plus up to</p>
        <p className={styles.mobilecart__txt_bold}>$17 cashback</p>
      </Col>
    </Row>

    <div className="mt-3 mx-3">
      <h4 className="me-1">Size</h4>
      <Form.Select
        aria-label="option"
        className="w-50"
        onChange={() => { }}
        defaultValue="Small"
      >
        <option value={1}>Small</option>
        <option value={2}>Medium</option>
        <option value={3}>Large</option>
      </Form.Select>
    </div>
    <div className="mt-3 mx-3">
      <h4 className="me-1">Color</h4>
      <Form.Select
        aria-label="option"
        className="w-50"
        onChange={() => { }}
        defaultValue="Black"
      >
        <option value={1}>Black</option>
        <option value={2}>Red</option>
        <option value={3}>Green</option>
      </Form.Select>
    </div>
    <div className="m-3">
      <ShowMoreText
        lines={3}
        more="Show more"
        less="Show less"
        className="fw-normal"
        anchorClass="my-anchor-css-class"
        expanded={false}
        width={0}
        truncatedEndingComponent="... "
      >
        Simply clip our Miley buns over your natural hair buns for a look that’s
        totally far out! Style her in messy
        or ballerina buns, our space buns are out of this world.
      </ShowMoreText>
    </div>
    <Row className="d-flex align-items-center mx-2 my-3">
      <Col xs={1} className="text-nowrap">
        <Icon />
      </Col>
      <Col xs={11}>
        Over
        {' '}
        13
        {' '}
        people have earned cashback and discounts on this item!
      </Col>
    </Row>
    <Row className="m-3 ms-4">
      <Col xs={6}>
        <Button variant="light" className={styles.mobilecart__memberBtn}>
          Neil D.
        </Button>
        <Button variant="light" className={styles.mobilecart__memberBtn}>
          Paul B.
        </Button>
      </Col>
      <Col xs={6}>
        <ShareButton
          placement="auto-end"
          label="Invite more friends"
          shareurl=""
          className={styles.mobilecart_InviteBtn}
        />
      </Col>
    </Row>

    <hr className="mb-3 mt-5" />

    <Row className="m-3">
      <Col xs={10} className="d-flex align-items-center">
        <Button
          variant="primary"
          className={styles.mobilecart__addtoCart_btn}
          onClick={() => { }}
        >
          Add to Cart
        </Button>
      </Col>
      <Col xs={2} className="d-flex justify-content-end">
        <ShareButton
          placement="right-start"
          shareurl=""
          label=""
          className={styles.mobilecart__InviteBtn_round}
        />
      </Col>
    </Row>
  </div>
);

export default MobileCart;
