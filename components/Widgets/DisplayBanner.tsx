/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import styles from 'styles/LayoutForm.module.scss';
import {
  Row, Col, Form,
} from 'react-bootstrap';
import Banner from 'assets/images/display banner.png';

export interface DisplayBannerProps {
values: any;
errors: any;
touched: any;
handleChange: any;
handleForm: any;
setFieldValue?: any;
}

export default function DisplayBanner(
  {
    values, errors, touched, handleChange, handleForm,
  }
  : DisplayBannerProps,
) {
  return (
    <section className={styles.layout}>
      <Row className={styles.layout__box_orange}>
        <Col lg={6}>
          <h4 className="mt-0">
            Display banners on your order summary page

          </h4>
          <h6 className="text-muted mt-1 text-nowrap">Showcase Groupshop's exclusive benefits with dedicated banners after checkout.</h6>
          <div className="row">
            <div className="col-sm-12">

              <form>
                <div className="radio py-2 mt-2">
                  <label>
                    <input type="radio" value="option1" checked />
                    {' '}
                    <div className="d-inline mx-2">
                      Show both
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
                      Show left one only
                    </div>
                  </label>
                </div>
                <div className="radio  py-2">
                  <label>
                    <input type="radio" value="option3" />
                    {' '}
                    <div className="d-inline mx-2">
                      Show right one only
                    </div>
                  </label>
                </div>
                <div className="radio  py-2">
                  <label>
                    <input type="radio" value="option3" />
                    {' '}
                    <div className="d-inline mx-2">
                      Don’t show
                    </div>
                  </label>
                </div>
              </form>

            </div>
          </div>
        </Col>
        <Col lg={6} className="d-flex justify-content-end">
          <img src={Banner.src} alt="Banner" width="413" height="215" />
        </Col>
      </Row>
    </section>
  );
}
