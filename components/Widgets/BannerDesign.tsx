/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, Form, Button,
} from 'react-bootstrap';
import Banner1 from 'assets/images/Banner B - Neon.png';
import Banner2 from 'assets/images/Banner B - Light.png';
import Banner3 from 'assets/images/Banner B - Dark.png';
import Banner4 from 'assets/images/Banner B  - Clear.png';

export interface BannerDesignProps {
values: any;
errors: any;
touched: any;
handleChange: any;
handleForm: any;
setFieldValue?: any;
}

export default function BannerDesign(
  {
    values, errors, touched, handleChange, handleForm,
  }
  : BannerDesignProps,
) {
  return (
    <section className={styles.layout}>
      <Col lg={7}>
        <section className={styles.layout__box_1}>
          <h4 className="mt-0">
            Banner Design

          </h4>
          <div className="d-inline-flex mt-2">
            <h5 className="text-muted mt-2">
              Select style:

            </h5>
            <Button variant="outline-primary" className="mx-2 me-2 styles.enable_btn btn-sm rounded-3">
              Modern

            </Button>
            {' '}
            <Button variant="outline-primary" className="styles.disable_btn btn-sm">
              Classic

            </Button>
            {' '}
          </div>
          <div className="row">
            <div className="col-sm-12">

              <form>
                <div className="radio py-2 ">
                  <label>
                    <input type="radio" value="option1" checked />
                    {' '}
                    <div className="d-inline mx-2">
                      <img src={Banner1.src} alt="B1" width="252" height="49" />
                    </div>
                    {' '}
                  </label>
                </div>
                <div className="radio  py-2">
                  <label>
                    <input type="radio" value="option2" />
                    {' '}
                    <div className="d-inline mx-2">
                      <img src={Banner2.src} alt="B2" width="252" height="49" />
                    </div>
                  </label>
                </div>
                <div className="radio  py-2">
                  <label>
                    <input type="radio" value="option3" />
                    {' '}
                    <div className="d-inline mx-2">
                      <img src={Banner3.src} alt="B3" width="252" height="49" />
                    </div>
                  </label>
                </div>
                <div className="radio  py-2">
                  <label>
                    <input type="radio" value="option3" />
                    {' '}
                    <div className="d-inline mx-2">
                      <img src={Banner4.src} alt="B4" width="252" height="49" />
                    </div>
                  </label>
                </div>
              </form>

            </div>
          </div>

          <hr className="mt-2 " style={{ color: '$black' }} />
          <h4 className="mt-0">
            Select the call-to-action that customer will see

          </h4>

          <div className="row">
            <div className="col-sm-12">

              <form>
                <div className="radio py-2 mt-2">
                  <label>
                    <input type="radio" value="option1" checked />
                    {' '}
                    <div className="d-inline mx-2">
                      Shop with friends, get $50 cashback.
                    </div>
                    {' '}
                    <span className={styles.badge}>Recommended</span>
                  </label>
                </div>
                <div className="radio  py-2">
                  <label>
                    <input type="radio" value="option2" />
                    {' '}
                    <div className="d-inline mx-2">
                      Shop with friends, get up to 90% back.
                    </div>
                  </label>
                </div>

              </form>

            </div>
          </div>
        </section>
      </Col>
    </section>
  );
}
