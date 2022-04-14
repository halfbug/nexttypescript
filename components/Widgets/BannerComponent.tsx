import * as React from 'react';
import {
  Row, Col,
} from 'react-bootstrap';
import B1 from 'assets/images/GS-1.png';

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

    <section>
      <div className="w-75 shadow-sm p-2 bg-body rounded">
        <Row className=" d-flex flex-row mx-2 d-flex align-items-center align-self-center">
          <Col lg={5}>
            <img src={image.src} alt="B1" width="94" height="25" />
          </Col>
          <Col lg={7}>
            <h6>
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
