import React from 'react';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';
import useQueryString from 'hooks/useQueryString';
import { useQuery } from '@apollo/client';
import styles from 'styles/Campaign.module.scss';
import { GET_SALES_TARGET } from 'store/store.graphql';
import { InfoCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import useUtilityFunction from 'hooks/useUtilityFunction';

interface IProps {
  handleChange: any;
  values: any;
  setFieldValue: any;
  errors: any;
  editMin: boolean;
  editMax: boolean;
  setEditMin: any;
  setEditMax: any;
}

export default function DBRewards({
  handleChange, values, setFieldValue, errors, editMax, editMin,
  setEditMax, setEditMin,
}: IProps) {
  const {
    loading: appLodaing, data: { salesTarget } = { salesTarget: [] },
  } = useQuery(GET_SALES_TARGET);

  // const { store, dispatch } = React.useContext(StoreContext);
  const { multiple5 } = useUtilityFunction();

  const currentPreset = () => {
    // setting current preset on change in minDiscount value
    const minDiscountVal = `${values.minDiscount}%`;
    const maxDiscountVal = `${values.maxDiscount}%`;
    const lowBaseline = parseInt(salesTarget[0].rewards[0].discount, 10);
    const avgBaseline = parseInt(salesTarget[1].rewards[0].discount, 10);
    const highBaseline = parseInt(salesTarget[2].rewards[0].discount, 10);
    const superBaseline = parseInt(salesTarget[3].rewards[0].discount, 10);

    if (values.minDiscount! <= lowBaseline) {
      setFieldValueByPreset(0, minDiscountVal, maxDiscountVal);
    } else if (values.minDiscount! > lowBaseline
      && values.minDiscount! <= avgBaseline) {
      setFieldValueByPreset(1, minDiscountVal, maxDiscountVal);
    } else if (values.minDiscount! >= highBaseline
      && values.minDiscount! < superBaseline) {
      setFieldValueByPreset(2, minDiscountVal, maxDiscountVal);
    } else if (values.minDiscount! >= superBaseline) {
      setFieldValueByPreset(3, minDiscountVal, maxDiscountVal);
    }
  };

  const setFieldValueByPreset = (index: number, minDiscountVal: string, maxDiscountVal: string) => {
    const newAverage = multiple5((+values.minDiscount! + +values.maxDiscount!) / 2);
    setFieldValue('rewards', salesTarget[index].id);
    setFieldValue('selectedTarget', {
      ...values.selectedTarget,
      id: salesTarget[index].id,
      name: salesTarget[index].name,
      rogsMin: salesTarget[index]?.rogsMin,
      rogsMax: salesTarget[index]?.rogsMax,
      status: salesTarget[index]?.status,
      rewards: [
        {
          ...salesTarget[index].rewards?.[0],
          ...values.selectedTarget?.rewards?.[0],
          discount: minDiscountVal,
        },
        {
          ...salesTarget[index].rewards?.[1],
          ...values.selectedTarget?.rewards?.[1],
          discount: `${newAverage}%`,
        },
        {
          ...salesTarget[index].rewards?.[2],
          ...values.selectedTarget?.rewards?.[2],
          discount: maxDiscountVal,
        },
      ],
    });
  };

  const btns = [
    { text: 'Low', light: styles.low_btn, dark: styles.low_btn_dark },
    { text: 'Average', light: styles.avg_btn, dark: styles.avg_btn_dark },
    { text: 'High', light: styles.high_btn, dark: styles.high_btn_dark },
    { text: 'SuperCharged', light: styles.super_btn, dark: styles.super_btn_dark },
  ];

  return (
    <>
      <Row>
        <Col className="text-start" id="rbtn">

          {salesTarget.map((starget: any, index: number) => (
            <Button
              key={starget.id}
              id={starget.id}
              variant="none"
              className={values?.selectedTarget?.name
                === starget.name ? btns[index].dark : btns[index].light}
              onClick={async (e) => {
                const selectedTarget = starget;
                setFieldValue('rewards', selectedTarget.id);
                setFieldValue('selectedTarget', { ...selectedTarget });
                await setFieldValue('minDiscount', parseInt(selectedTarget.rewards?.[0].discount, 10));
                await setFieldValue('maxDiscount', parseInt(selectedTarget.rewards?.[2].discount, 10));
              }}
            >
              {btns[index].text}

            </Button>
          ))}
        </Col>
      </Row>

      <Row className="mt-3">
        <Col sm={6}>
          <h4>
            Baseline
            {' '}
            <ToolTip
              className={styles.dashboard_campaign__pop}
              icon={<InfoCircle size={10} />}
              popContent={(
                <p>
                  This is the first discount tier and  the ongoing commission
                  your customer earns on new orders after
                  they have received all their cashback. Learn more about how rewards work
                  {' '}
                  <a rel="noreferrer" href="https://groupshop.zendesk.com/hc/en-us/articles/4414348927635-How-do-I-set-cashback-and-discounts-" target="_blank">here</a>
                  .
                </p>
)}
            />
          </h4>
          {!editMin && (
          <>
            <div className={styles.dbrewards__percent_btn}>
              {values.minDiscount}
              %
            </div>
            <Button
              variant="link"
              onClick={() => {
                if ((errors && Object.keys(errors).length === 0 && Object.getPrototypeOf(errors) === Object.prototype) || errors.maxDiscount === '' || (errors && !Object.keys(errors).includes('maxDiscount'))) {
                  setEditMin(true);
                  setEditMax(false);
                }
              }}
            >
              Edit

            </Button>
          </>
          )}
          <div className={editMin ? 'd-block' : 'd-none'}>
            <div className="d-flex">
              <Form.Control
                type="text"
                name="minDiscount"
                value={values.minDiscount}
                onChange={handleChange}
                className={styles.dbrewards_input}
                isInvalid={!!errors.minDiscount}
                placeholder="Enter %"
              />

              <Button
                variant="link"
                onClick={() => {
                  if (!(errors.minDiscount)) {
                    setEditMin(false);
                    currentPreset();
                  }
                }}
              >
                Save

              </Button>
            </div>
            <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
              {errors.minDiscount}
            </Form.Control.Feedback>
          </div>

        </Col>
        <Col sm={6}>
          <h4>
            Maximum
            {' '}
            <ToolTip
              placement="bottom"
              className={styles.dashboard_campaign__pop}
              icon={<InfoCircle size={10} />}
              popContent={(
                <p>
                  This is the maximum discount and cashback that you are willing to
                  give per conversion. We won’t offer the maximum discount unless your
                  customer’s Groupshop is performing really well.
                  Think of this as an ‘up to X% off’. Learn more about how rewards work
                  {' '}
                  <a rel="noreferrer" href="https://groupshop.zendesk.com/hc/en-us/articles/4414348927635-How-do-I-set-cashback-and-discounts-" target="_blank">here</a>
                  .
                </p>
)}
            />
          </h4>
          {!editMax && (
          <>
            <div className={styles.dbrewards__percent_btn}>
              {values.maxDiscount}
              %
            </div>
            <Button
              variant="link"
              onClick={() => {
                if ((errors && Object.keys(errors).length === 0 && Object.getPrototypeOf(errors) === Object.prototype) || errors.minDiscount === '' || (errors && !Object.keys(errors).includes('minDiscount'))) {
                  setEditMax(true);
                  setEditMin(false);
                  currentPreset();
                }
              }}
            >
              Edit

            </Button>
          </>
          )}
          <div className={editMax ? 'd-block' : 'd-none'}>
            <div className="d-flex">
              <Form.Control
                type="text"
                name="maxDiscount"
                value={values.maxDiscount}
                onChange={handleChange}
                className={styles.dbrewards_input}
                isInvalid={!!errors.maxDiscount}
                placeholder="Enter %"
              />
              <Button
                variant="link"
                onClick={() => {
                  if (!(errors.maxDiscount)) {
                    setEditMax(false);
                    currentPreset();
                  }
                }}
              >
                Save

              </Button>
            </div>
            <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
              {errors.maxDiscount}
            </Form.Control.Feedback>
            {/* <span className={styles.dbrewards_rewardBtn}>save</span> */}
          </div>

        </Col>
      </Row>
    </>
  );
}
