/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, Form,
} from 'react-bootstrap';

export interface BannerLocationProps {
values: any;
errors: any;
touched: any;
handleChange: any;
handleForm: any;
setFieldValue?: any;
}

export default function BannerLocation(
  {
    values, errors, touched, handleChange, handleForm,
  }
  : BannerLocationProps,
) {
  return (
    <Col lg={5}>
      <section className={styles.layout__box_1}>
        <h4 className="mt-0">
          Choose the location of  your
          <br />
          product page banner

        </h4>

        <div className="row">
          <div className="col-sm-12">

            <form>
              <div className="radio py-2 mt-2">
                <label>
                  <input type="radio" value="option1" checked />
                  {' '}
                  <div className="d-inline mx-2">
                    Below product price tag
                    {' '}
                    <span className={styles.badge}>Recommended</span>
                  </div>
                </label>
              </div>
              <div className="radio  py-2">
                <label>
                  <input type="radio" value="option2" />
                  {' '}
                  <div className="d-inline mx-2">
                    Below Add to cart
                  </div>
                </label>
              </div>
              <div className="radio  py-2">
                <label>
                  <input type="radio" value="option3" />
                  {' '}
                  <div className="d-inline mx-2">
                    Customize location (Advanced)
                  </div>
                </label>
              </div>
            </form>

          </div>
        </div>

      </section>
    </Col>
  );
}
