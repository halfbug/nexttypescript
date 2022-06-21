import React from 'react';
import {
  Form, Button, Col, Row,
} from 'react-bootstrap';
import InfoIcon from 'assets/images/info-icon.svg';
import styles from 'styles/Partner.module.scss';
import cstyles from 'styles/Campaign.module.scss';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import { StoreContext } from 'store/store.context';

interface IProps {
  handleChange: any;
  values: any;
  touched: any;
  errors: any;
  editMin: boolean;
  editParterCommission: boolean;
  editMax: boolean;
  setEditMin: any;
  setEditParterCommisson: any;
  setEditMax: any;
  handleForm: any;
  setFieldValue: any;
}

export default function PartnerRewards({
  handleChange, values, touched, errors, editMax, editMin,
  editParterCommission, setEditMax, setEditMin, setEditParterCommisson, handleForm, setFieldValue,
}: IProps) {
  return (
    <section className={styles.partner__rewards_box}>
      {/* <div className={styles.partner__rewards_box__header}>
        Partner Rewards
      </div> */}
      <h4>Partner Rewards</h4>
      <Row>
        <Col md={6}>
          <div className={styles.partner__rewards_box__heading}>
            Baseline
            <ToolTip
              placement="bottom"
              className={cstyles.dashboard_campaign__pop}
              icon={<InfoIcon size={10} />}
              popContent={(
                <p>
                  This is the first discount tier offered to friends joining the Groupshop.
                </p>
              )}
            />
          </div>
          <div>
            {!editMin && (
            <>
              <span className={styles.partner__rewards_box__percentage}>
                {values.minDiscount}
                %
              </span>
              <Button className="fw-bolder" variant="link" onClick={() => setEditMin(!editMin)}>Edit</Button>
              <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                {errors.minDiscount}
              </Form.Control.Feedback>
            </>
            )}
            <div className={editMin ? 'd-block' : 'd-none'}>
              <Form.Control
                type="text"
                name="minDiscount"
                value={values.minDiscount}
                onChange={handleChange}
                className={styles.dbrewards_input}
                isInvalid={!!errors.minDiscount}
                placeholder="Enter %"
              />
              <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                {errors.minDiscount}
              </Form.Control.Feedback>

              <Button
                className="fw-bolder"
                variant="link"
                onClick={() => {
                  if (!(errors.minDiscount)) {
                    setEditMin(false);
                  }
                }}
              >
                Save

              </Button>

            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className={styles.partner__rewards_box__heading}>
            Maximum
            <ToolTip
              placement="bottom"
              className={cstyles.dashboard_campaign__pop}
              icon={<InfoIcon size={10} />}
              popContent={(
                <p>
                  This is the maximum rewards offered in discounts to friends joining
                  the Groupshop. This tier is only accessed for order values significantly
                  higher than your AOV (at least 2x).
                </p>
              )}
            />
          </div>
          <div>
            {!editMax && (
            <>
              <span className={styles.partner__rewards_box__percentage}>
                {values.maxDiscount}
                %
              </span>
              <Button className="fw-bolder" variant="link" onClick={() => setEditMax(!editMax)}>Edit</Button>
            </>
            )}
          </div>
          <div className={editMax ? 'd-block' : 'd-none'}>
            <Form.Control
              type="text"
              name="maxDiscount"
              value={values.maxDiscount}
              onChange={handleChange}
              className={styles.dbrewards_input}
              isInvalid={!!errors.maxDiscount}
              placeholder="Enter %"
            />
            <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
              {errors.maxDiscount}
            </Form.Control.Feedback>

            <Button
              className="fw-bolder"
              variant="link"
              onClick={() => {
                if (!(errors.maxDiscount)) {
                  setEditMax(false);
                }
              }}
            >
              Save

            </Button>

          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mt-4">
          <div className={styles.partner__rewards_box__heading}>
            Partner Commission
            <ToolTip
              placement="bottom"
              className={cstyles.dashboard_campaign__pop}
              icon={<InfoIcon size={10} />}
              popContent={(
                <p>
                  Your affiliate partners and customers who have already earned 100%
                  earn a fixed commission on every sale. Set that percentage below.
                </p>
              )}
            />
          </div>
          <div>
            {!editParterCommission && (
            <>
              <span className={styles.partner__rewards_box__percentage}>
                {values.partnerCommission}
                %
              </span>
              <Button className="fw-bolder" variant="link" onClick={() => setEditParterCommisson(!editParterCommission)}>Edit</Button>
            </>
            )}
          </div>
          <div className={editParterCommission ? 'd-block' : 'd-none'}>
            <Form.Control
              type="text"
              name="partnerCommission"
              value={values.partnerCommission}
              onChange={handleChange}
              className={styles.dbrewards_input}
              isInvalid={!!errors.partnerCommission}
              placeholder="Enter %"
            />
            <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
              {errors.partnerCommission}
            </Form.Control.Feedback>

            <Button
              className="fw-bolder"
              variant="link"
              onClick={() => {
                if (!(errors.partnerCommission)) {
                  setEditParterCommisson(false);
                }
              }}
            >
              Save

            </Button>

          </div>
        </Col>
      </Row>
    </section>
  );
}
