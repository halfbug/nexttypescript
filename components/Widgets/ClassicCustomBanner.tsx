import * as React from 'react';
import {
  Row,
} from 'react-bootstrap';
import C3 from 'assets/images/ClassicGROUPSHOP.svg';
import styles from 'styles/LayoutForm.module.scss';

export interface BannerProps {
  image: any
}

export default function ClassicCustomBanner(
) {
  return (

    <section className={[styles.layout_BannerBox, ''].join(' ')}>
      <div className={styles.layout_CustomBanner}>
        <Row className=" d-flex flex-row mx-0 d-flex align-items-center align-self-center">

          <div className="">
            <h6 className={styles.layout_ClassicBannerText}>
              <b>Earn cashback</b>
              {' '}
              when you shop with friends
              <span className="ms-1">
                <C3 />
              </span>
            </h6>
          </div>
        </Row>
      </div>
    </section>

  );
}
