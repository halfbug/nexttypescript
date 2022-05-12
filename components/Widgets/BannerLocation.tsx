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
  const [check, setCheck] = React.useState(true);
  return (
    <section className={styles.layout__box_1}>
      <h4 className="mt-0">
        Choose the location of  your
        <br />
        product page banner
      </h4>
      <Row>
        <Col lg={12} className="mt-2">
          <Form.Check
            className="p-2 ps-0 py-1"
            onChange={(e) => {
              handleChange(e);
            }}
            type="radio"
          // eslint-disable-next-line react/jsx-closing-bracket-location
          >
            <Form.Check.Input type="radio" name="location" className={styles.layout__checkbox__input} />
            <Form.Check.Label className={styles.layout__checkbox__input__label}>
              Below product price tag
              <span className={styles.badge}>Recommended</span>
            </Form.Check.Label>
          </Form.Check>
          <Form.Check
            className="p-2 ps-0 py-1"
            onChange={(e) => {
              handleChange(e);
            }}
            type="radio"
          >
            <Form.Check.Input type="radio" name="location" className={styles.layout__checkbox__input} />
            <Form.Check.Label className={styles.layout__checkbox__input__label}>
              Below Add to cart
            </Form.Check.Label>
          </Form.Check>
          <Form.Check
            className="p-2 ps-0 py-1"
            onChange={(e) => {
              handleChange(e);
            }}
            type="radio"
          >
            <Form.Check.Input type="radio" name="location" className={styles.layout__checkbox__input} />
            <Form.Check.Label className={styles.layout__checkbox__input__label}>
              Customize location (Advanced)
            </Form.Check.Label>
          </Form.Check>

          {check && (
            <>
              <div className="m-2 mt-3 ms-0">
                <h4>Step 1</h4>
                <div className={styles.layout__description}>
                  When you are done customizing your
                  banner, add the code below right after
                  the opening
                  {' '}
                  {'<'}
                  body
                  {'>'}
                  {' '}
                  tag of your website.
                  The code only needs to be added once
                  per page
                  –
                  add it on all the pages you will
                  be displaying the Groupshop banner.
                </div>
                <Row className={styles.layout__codesnip}>
                  <Col lg={2} className={styles.layout__codesnip__col}>
                    <div className={styles.layout__codesnip__txt}>1</div>
                    <div className={styles.layout__codesnip__txt}>2</div>
                    <div className={styles.layout__codesnip__txt}>3</div>
                    <div className={styles.layout__codesnip__txt}>4</div>
                    <div className={styles.layout__codesnip__txt}>5</div>
                  </Col>
                  <Col lg={10} className="pt-2 w-50">
                    <div className={['ps-2', styles.layout__codesnip__code].join(' ')}>
                      {'<'}
                      script
                      {'>'}
                    </div>
                    <div className={styles.layout__codesnip__code}>some code</div>
                    <div className={['ps-2', styles.layout__codesnip__code].join(' ')}>is going</div>
                    <div className={['ps-3', styles.layout__codesnip__code].join(' ')}>here</div>
                    <div className={['ps-2', styles.layout__codesnip__code].join(' ')}>
                      {'<'}
                      /script
                      {'>'}
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="m-2 mt-3 ms-0">
                <h4>Step 2</h4>
                <div className={styles.layout__description}>
                  Add the following code anywhere you want to display the Groupshop banner.
                  We recommend placing them on your product page and on your cart page or modal.
                </div>
                <Row className={styles.layout__codesnip}>
                  <Col lg={2} className={styles.layout__codesnip__col}>
                    <div className={styles.layout__codesnip__txt}>1</div>
                    <div className={styles.layout__codesnip__txt}>2</div>
                    <div className={styles.layout__codesnip__txt}>3</div>
                    <div className={styles.layout__codesnip__txt}>4</div>
                    <div className={styles.layout__codesnip__txt}>5</div>
                  </Col>
                  <Col lg={10} className="pt-2 w-50">
                    <div className={['ps-2', styles.layout__codesnip__code].join(' ')}>
                      {'<'}
                      script
                      {'>'}
                    </div>
                    <div className={styles.layout__codesnip__code}>some code</div>
                    <div className={['ps-2', styles.layout__codesnip__code].join(' ')}>is going</div>
                    <div className={['ps-3', styles.layout__codesnip__code].join(' ')}>here</div>
                    <div className={['ps-2', styles.layout__codesnip__code].join(' ')}>
                      {'<'}
                      /script
                      {'>'}
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          )}

        </Col>
      </Row>
    </section>
  );
}
