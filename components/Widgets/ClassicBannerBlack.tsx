import * as React from 'react';
import {
  Row,
} from 'react-bootstrap';
import C2 from 'assets/images/ClassicBlackGROUPSHOP.svg';
import styles from 'styles/LayoutForm.module.scss';

export interface BannerProps {
  image: any
}

export default function ClassicBannerBlack(
) {
  return (

    <section className={[styles.layout_BannerBox, ''].join(' ')}>
      <div className="my-1 p-1 bg-dark rounded">
        <Row className=" d-flex flex-row mx-0 d-flex align-items-center align-self-center">

          <div className="">
            <h6 className={styles.layout_ClassicBannerTextWhite}>
              <b>Earn cashback</b>
              {' '}
              when you shop with friends
              <span className="ms-1">
                <C2 />
              </span>
            </h6>
          </div>
        </Row>
      </div>
    </section>

  );
}
