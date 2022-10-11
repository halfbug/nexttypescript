import * as React from 'react';
import {
  Row, Col,
} from 'react-bootstrap';
import B1 from 'assets/images/GS-1.png';
import styles from 'styles/LayoutForm.module.scss';

export interface BannerProps {
  image: any
}

export default function BannerComponent(
  {
    image,
  }
    : BannerProps,
) {
  return (

    <section className={[styles.layout_BannerBox, 'w-75'].join(' ')}>
      <div className="ms-2 p-1 bg-body rounded">
        <Row className=" d-flex flex-row mx-0 d-flex align-items-center align-self-center">
          <Col lg={5}>
            <img src={image.src} alt="B1" width="94" height="27" />
          </Col>
          <Col lg={7}>
            <h6 className="pt-2">
              Shop with friends, get
              {' '}
              <b>$50 cashback.</b>

            </h6>
          </Col>
        </Row>
      </div>
    </section>

  );
}
