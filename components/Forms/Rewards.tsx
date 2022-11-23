import React, { useEffect, useState } from 'react';
import {
  Form, Row, Col, Button as MyButton,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useMutation, useQuery } from '@apollo/client';
import { ICampaign } from 'types/store';
import styles from 'styles/Step3.module.scss';
import Placeholder from 'react-bootstrap/Placeholder';
import { GET_SALES_TARGET, UPDATE_CAMPAIGN } from 'store/store.graphql';
import useCampaign from 'hooks/useCampaign';
import Star from 'assets/images/star.svg';
import { InfoCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import styles1 from 'styles/Campaign.module.scss';
import * as constant from 'configs/constant';
import useUtilityFunction from 'hooks/useUtilityFunction';

interface IValues {
  rewards: string;
  selectedTarget: any;
  minValue: number;
  maxValue: number;
}

const initvalz: IValues = {
  rewards: '',
  selectedTarget: '',
  minValue: 0,
  maxValue: 0,
};

export default function Rewards() {
  const [, setParams] = useQueryString();

  const [editMin, setEditMin] = useState(false);
  const [editMax, setEditMax] = useState(false);
  const { isMultiple5, multiple5 } = useUtilityFunction();

  const {
    loading: appLodaing, data: { salesTarget } = { salesTarget: [] },
  } = useQuery(GET_SALES_TARGET);

  const [addReward] = useMutation<ICampaign>(UPDATE_CAMPAIGN);
  const { store, dispatch } = React.useContext(StoreContext);

  const validationSchema = yup.object({
    rewards: yup
      .string()
      .required('required.'),
    minValue: yup
      .number().typeError('you must specify a number')
      .min(5)
      .max(40)
      .test('is-empty',
        'This field should not be empty',
        (value) => {
          if (!value) {
            return false;
          }
          return true;
        })
      .lessThan(yup.ref('maxValue'), constant.EDIT_REWARDS_MSG2) // .test("diff", "diff",
      .test('diff', constant.EDIT_REWARDS_MSG1,
        (val: number | undefined, context) => {
          if (val && (context.parent.maxValue - val) < 10) {
            return false;
          }
          return true;
        })
      .test('multiple', constant.EDIT_REWARDS_MSG3,
        (val: number | undefined) => {
          if (val && isMultiple5(val)) {
            return true;
          }

          return false;
        }),
    maxValue: yup
      .number().typeError('you must specify a number')
      .moreThan(yup.ref('minValue'), constant.EDIT_REWARDS_MSG4)
      .max(50)
      .test('is-empty',
        'This field should not be empty',
        (value) => {
          if (!value) {
            return false;
          }
          return true;
        })
      .test('diff', constant.EDIT_REWARDS_MSG1,
        (val: number | undefined, context) => {
          if (val && (val - context.parent.minDiscount) < 10) {
            return false;
          }
          return true;
        })
      .test('multiple', constant.EDIT_REWARDS_MSG3,
        (val: number | undefined) => {
          if (val && isMultiple5(val)) {
            return true;
          }
          return false;
        }),

  });

  const { newcampaign } = useCampaign();

  const {
    handleSubmit, values, setFieldValue, handleChange, errors,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: initvalz,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const { rewards, selectedTarget } = valz;
      const id = store?.newCampaign?.id;
      const newAverage = multiple5((+values.minValue! + +values.maxValue!) / 2);
      const newPayload = JSON.parse(JSON.stringify(selectedTarget));
      newPayload.rewards[0].discount = `${values.minValue}%`;
      newPayload.rewards[1].discount = `${newAverage}%`;
      newPayload.rewards[2].discount = `${values.maxValue}%`;
      if (id) {
        await addReward({
          variables: {
            updateCampaignInput: {
              storeId: store.id,
              id: store?.newCampaign?.id,
              rewards,
              salesTarget: newPayload,

            },
          },
        });
      }
      dispatch({ type: 'UPDATE_CAMPAIGN_REWARDS', payload: { rewards: { rewards, selectedTarget: newPayload } } });
      setParams({ ins: 4 });
    },
  });

  useEffect(() => {
    if (salesTarget.length > 0) {
      initvalz.rewards = salesTarget[3].id;
      // eslint-disable-next-line prefer-destructuring
      initvalz.selectedTarget = salesTarget[3];
      if (values.minValue === 0 && values.maxValue === 0) {
        setFieldValue('minValue', parseInt(salesTarget[3].rewards[0].discount, 10));
        setFieldValue('maxValue', parseInt(salesTarget[3].rewards[2].discount, 10));
      }
    }
  }, [salesTarget]);
  useEffect(() => {
    /// initial value display
    if (newcampaign?.selectedTarget) {
      initvalz.rewards = newcampaign?.selectedTarget.id;
      // eslint-disable-next-line prefer-destructuring
      initvalz.selectedTarget = newcampaign?.selectedTarget;
      if (newcampaign?.selectedTarget?.rewards) {
        setFieldValue('minValue', parseInt(newcampaign?.selectedTarget?.rewards[0]?.discount!, 10));
        setFieldValue('maxValue', parseInt(newcampaign?.selectedTarget?.rewards[2]?.discount!, 10));
      }
    }
  }, [newcampaign]);

  const Bstyle = {
    width: '143px',
  };

  useEffect(() => {
    if (values.selectedTarget !== '') {
      setFieldValue('minValue', parseInt(values.selectedTarget?.rewards[0].discount, 10));
      setFieldValue('maxValue', parseInt(values.selectedTarget?.rewards[2].discount, 10));
    }
  }, [values.selectedTarget]);

  if (appLodaing) {
    return (
      <section className="text-sm-start">
        <Row className="mt-3"><h4>Adjust your target sales volume</h4></Row>
        <Row className="text-muted"><h6>Choose one of our recommended options. You can adjust them later on in the Settings page.</h6></Row>
        <Row className="mt-2">
          <Col>
            <Placeholder animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </Col>
          <Col>
            <Placeholder animation="glow">
              <Placeholder xs={6} />
            </Placeholder>

          </Col>
          <Col>
            <Placeholder animation="glow">
              <Placeholder xs={7} />
              <Placeholder xs={4} />
              <Placeholder xs={4} />
              <Placeholder xs={6} />
              <Placeholder xs={8} />
            </Placeholder>

          </Col>

        </Row>
      </section>
    );
  }

  const btns = [
    { text: 'Low', light: styles.low_btn, dark: styles.low_btn_dark },
    { text: 'Average', light: styles.avg_btn, dark: styles.avg_btn_dark },
    { text: 'High', light: styles.high_btn, dark: styles.high_btn_dark },
    { text: 'SuperCharged', light: styles.super_btn, dark: styles.super_btn_dark },
  ];

  return (
    <section className={styles.rewards}>

      <Form noValidate onSubmit={handleSubmit} className="mx-4">
        <Row className="mt-5"><Col><h4 className="mb-0">Adjust your target sales volume</h4></Col></Row>
        <Row>
          <p>
            Choose one of our recommended options to get started. You can
            <br />
            customize each percentage later on in the Settings page.

          </p>
        </Row>
        <Row><Col><h4 className="mb-0">Select your desired sales volume:</h4></Col></Row>
        <Row>
          <p>
            {' '}
            We’ll set your reward tiers based on our
            recommendations.
          </p>
        </Row>
        <Row className="mb-2">
          <Col className="text-start" id="rbtn">

            {salesTarget.map((starget: any, index: number) => (
              <MyButton
                key={starget.id}
                id={starget.id}
                variant="none"
                className={(values?.selectedTarget?.name === starget.name)
                  ? btns[index].dark : btns[index].light}
                onClick={async () => {
                  const selectedTarget = starget;
                  setFieldValue('rewards', selectedTarget.id);
                  setFieldValue('selectedTarget', { ...selectedTarget });
                  await setFieldValue('minValue', parseInt(selectedTarget?.rewards[0].discount, 10));
                  await setFieldValue('maxValue', parseInt(selectedTarget?.rewards[2].discount, 10));
                }}
              >
                {btns[index].text}

              </MyButton>
            ))}
          </Col>
        </Row>
        <Row className={styles.rewards__box2}>
          <Col lg={6}>
            <div className={styles.rewards_BaseMax}>
              Baseline
              {' '}
              <ToolTip
                className={styles.dashboard_campaign__pop}
                icon={<InfoCircle size={10} />}
                popContent={(
                  <p>
                    This is the first discount tier and  the ongoing commission your
                    customer earns on new orders after
                    they have received all their cashback. Learn more about how rewards work
                    {' '}
                    <a rel="noreferrer" href="https://groupshop.zendesk.com/hc/en-us/articles/4414348927635-How-do-I-set-cashback-and-discounts-" target="_blank">here</a>
                    .
                  </p>
                )}
              />
            </div>
            <div className="d-flex align-items-center">
              {!editMin
                ? <div className={styles.rewards__percent_btn}>{`${values.minValue}%`}</div>
                : (
                  <Form.Control
                    type="text"
                    name="minValue"
                    style={{ width: '60px' }}
                    value={values.minValue}
                    onChange={handleChange}
                    className={styles1.dbrewards_input}
                    isInvalid={!!errors.minValue}
                    placeholder="Enter %"
                  />
                )}
              {!editMin
                ? (
                  <MyButton
                    variant="link"
                    onClick={() => {
                      setEditMin(true);
                    }}
                  >
                    Edit
                  </MyButton>
                )
                : (
                  <>
                    <MyButton
                      variant="link"
                      onClick={() => {
                        setEditMin(false);
                      }}
                    >
                      Save
                    </MyButton>
                  </>
                )}
            </div>
            <Form.Control.Feedback type="invalid" className={styles1.dbrewards_error}>
              {errors.minValue}
            </Form.Control.Feedback>
          </Col>
          <Col lg={6}>
            <div className={styles.rewards_BaseMax}>
              Maximum
              {' '}
              <ToolTip
                className={styles.dashboard_campaign__pop}
                icon={<InfoCircle size={10} />}
                popContent={(
                  <p>
                    This is the maximum discount and cashback that
                    you are willing to give per conversion. We won’t offer the maximum discount
                    unless your customer’s Groupshop is performing really well.
                    Think of this as an ‘up to X% off’. Learn more about how rewards work
                    {' '}
                    <a rel="noreferrer" href="https://groupshop.zendesk.com/hc/en-us/articles/4414348927635-How-do-I-set-cashback-and-discounts-" target="_blank">here</a>
                    .
                  </p>
                )}
              />
            </div>
            <div className="d-flex align-items-center">
              {!editMax ? <div className={styles.rewards__percent_btn}>{`${values.maxValue}%`}</div>
                : (
                  <Form.Control
                    type="text"
                    name="maxValue"
                    style={{ width: '60px' }}
                    value={values.maxValue}
                    onChange={handleChange}
                    className={styles1.dbrewards_input}
                    isInvalid={!!errors.maxValue}
                    placeholder="Enter %"
                  />
                )}
              {!editMax
                ? (
                  <MyButton
                    variant="link"
                    onClick={() => {
                      setEditMax(true);
                    }}
                  >
                    Edit
                  </MyButton>
                )
                : (
                  <MyButton
                    variant="link"
                    onClick={() => {
                      setEditMax(false);
                    }}
                  >
                    Save
                  </MyButton>
                )}
            </div>
            <Form.Control.Feedback type="invalid" className={styles1.dbrewards_error}>
              {errors.maxValue}
            </Form.Control.Feedback>
          </Col>

        </Row>

        <Row className={styles.rewards_Generous}>
          <Col lg={1} className="pe-0 me-0 float-right">
            <Star size={18} />
          </Col>
          <Col lg={10} className="px-0 ms-0 float-left">
            Be generous – reward your customers the same
            way you reward Facebook or Google for finding
            you leads. We’ll do the math to make sure you’re
            always winning, and so are your customers.
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={4}>
            <Button
              style={Bstyle}
              className={styles.rewards_btn_pre}
              onClick={() => setParams({ ins: 2 })}
            >
              Previous
            </Button>
          </Col>
          <Col xs={4} className="text-center d-flex align-items-center justify-content-center">
            <span className="text-muted">3/4</span>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button style={Bstyle} type="submit"> Next </Button>
          </Col>
        </Row>
      </Form>
    </section>
  );
}
