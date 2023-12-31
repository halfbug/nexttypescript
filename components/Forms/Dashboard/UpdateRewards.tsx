/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
/* eslint-disable quotes */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Form, Row, Col, ButtonGroup, ToggleButton, Button, Button as RButton,
} from 'react-bootstrap';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useMutation, useQuery } from '@apollo/client';
import { ICampaign } from 'types/store';
import * as constant from 'configs/constant';
import styles from 'styles/Campaign.module.scss';
import { GET_SALES_TARGET, UPDATE_CAMPAIGN } from 'store/store.graphql';
import useCampaign from 'hooks/useCampaign';
import useUtilityFunction from 'hooks/useUtilityFunction';
import Star from 'assets/images/star.svg';
import Bulb from 'assets/images/bulb.svg';
import { Check2Circle, InfoCircle, XCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import EditRewardsBox from './EditRewardsBox';

interface IValues {
  rewards: string;
  selectedTarget: any;
  maxDiscountVal: string;
  minDiscountVal: string;
  minDiscount: number,
  maxDiscount: number,

}

export default function UpdateRewards() {
  const [, setParams] = useQueryString();

  // const [minDiscount, setMinDiscount] = useState<string | undefined>('');
  // const [maxDiscount, setMaxDiscount] = useState<string | undefined>('');
  const [editMin, setEditMin] = useState(false);
  const [editMax, setEditMax] = useState(false);
  const [editRewardBox, setEditRewardBox] = useState(false);
  const [initvalz, setInitValz] = useState<IValues>({
    rewards: '',
    selectedTarget: '',
    maxDiscountVal: '',
    minDiscountVal: '',
    minDiscount: 0,
    maxDiscount: 0,
  });

  const {
    loading: appLodaing, data: { salesTarget } = { salesTarget: [] },
  } = useQuery(GET_SALES_TARGET);
  const [addReward] = useMutation<ICampaign>(UPDATE_CAMPAIGN);
  const { store, dispatch } = React.useContext(StoreContext);
  const { multiple5, isMultiple5 } = useUtilityFunction();

  const validationSchema = yup.object({
    minDiscount: yup
      .number()
      .lessThan(yup.ref('maxDiscount'), constant.EDIT_REWARDS_MSG2) // .test("diff", "diff",
      .test("diff", constant.EDIT_REWARDS_MSG1,
        (val: number | undefined, context) => {
          if (val && (context.parent.maxDiscount - val) < 10) {
            // console.log(context);
            return false;
          }
          return true;
        })
      .test("multiple", constant.EDIT_REWARDS_MSG3,
        (val: number | undefined) => {
          if (val && isMultiple5(val)) {
            return true;
          }
          return false;
        }),
    maxDiscount: yup
      .number()
      .moreThan(yup.ref('minDiscount'), constant.EDIT_REWARDS_MSG4)
      .test("less then 10", "Entered value should be atleast 10",
        (val: number | undefined) => {
          if (val && val < 10) {
            // console.log(context);
            return false;
          }
          return true;
        })
      .test("diff", constant.EDIT_REWARDS_MSG1,
        (val: number | undefined, context) => {
          if (val && (val - context.parent.minDiscount) < 10) {
            console.log(context);
            return false;
          }
          return true;
        })
      .test("multiple", constant.EDIT_REWARDS_MSG3,
        (val: number | undefined) => {
          if (val && isMultiple5(val)) {
            return true;
          }
          return false;
        }),
  });

  const { campaign } = useCampaign();
  useEffect(() => {
    /// initial value display
    if (campaign?.salesTarget) {
      if (campaign?.salesTarget?.rewards?.length) {
        // setMinDiscount(campaign?.salesTarget?.rewards[0].discount);
        // setMaxDiscount(campaign?.salesTarget?.rewards[2].discount);
        setInitValz({
          rewards: campaign?.salesTarget?.id,
          minDiscountVal: campaign?.salesTarget?.rewards[0]?.discount || '',
          maxDiscountVal: campaign?.salesTarget?.rewards[2]?.discount || '',
          selectedTarget: campaign?.salesTarget,
          minDiscount: campaign?.salesTarget?.rewards[0]?.discount ? parseInt(campaign?.salesTarget?.rewards[0]?.discount) : 0,
          maxDiscount: campaign?.salesTarget?.rewards[2]?.discount ? parseInt(campaign?.salesTarget?.rewards[2]?.discount) : 0,
        });
      }
    }
    // console.log({ values });
  }, [campaign]);
  // const [campaign, setcampaign] = useState(second);

  const {
    handleSubmit, values, setFieldValue, touched, errors,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: initvalz,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const {
        rewards, selectedTarget, minDiscount, maxDiscount,
      } = valz;
      // let { minDiscountVal, maxDiscountVal } = valz;
      // console.log({ valz });

      const { __typename, ...newSelectedTarget } = selectedTarget;
      if (newSelectedTarget.rewards.length) {
        const newR = newSelectedTarget?.rewards.map((item: any) => {
          const { __typename: tpn, ...valWithoutTypename } = item;
          return valWithoutTypename;
        });
        newSelectedTarget.rewards = [...newR];
      }
      // console.log({ selectedTarget });
      // console.log({ newSelectedTarget });
      // if (newSelectedTarget?.rewards && (editMax || editMin)) {
      //   const baseline = parseInt(minDiscountVal);
      //   const maximum = parseInt(maxDiscountVal);
      //   const lowBaseline = 10;
      //   const avgBaseline = 15;
      //   const highBaseline = 20;
      //   const superBaseline = 25;

      //   if (baseline <= lowBaseline) {
      //     newSelectedTarget.name = "Low";
      //   } else if (baseline > lowBaseline && baseline <= avgBaseline) {
      //     newSelectedTarget.name = "Average";
      //   } else if (baseline >= highBaseline && baseline < superBaseline) {
      //     newSelectedTarget.name = "High";
      //   } else if (baseline >= superBaseline) {
      //     newSelectedTarget.name = "Super-charged";
      //   }
      //   const newAverage = multiple5((minDiscount! + maxDiscount!) / 2);
      //   if (minDiscountVal[minDiscountVal.length - 1] !== '%') {
      //     minDiscountVal = `${minDiscountVal}%`;
      //   }
      //   if (maxDiscountVal[maxDiscountVal.length - 1] !== '%') {
      //     maxDiscountVal = `${maxDiscountVal}%`;
      //   }

      //   newSelectedTarget.rewards[0].discount = minDiscountVal;
      //   newSelectedTarget.rewards[2].discount = maxDiscountVal;
      //   newSelectedTarget.rewards[1].discount = `${newAverage}%`;
      // }
      const campRew:null | any = await addReward({
        variables: {
          updateCampaignInput: {
            storeId: store.id,
            id: store.singleEditCampaignId,
            rewards,
            salesTarget: newSelectedTarget,
          },
        },
      });
      const newCamp = campRew.data.updateCampaign;
      const updatedCampaigns = store?.campaigns?.map((item:any) => {
        if (item.id === newCamp.id) {
          return newCamp;
        }
        return item;
      });
      dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: updatedCampaigns } });
      // setEditMin(false);
      // setEditMax(false);
    },
  });
  useEffect(() => {
    if (values.selectedTarget !== '') {
      values.maxDiscountVal = values.selectedTarget?.rewards[2].discount;
      values.minDiscountVal = values.selectedTarget?.rewards[0].discount;
      values.minDiscount = values.selectedTarget?.rewards[0]?.discount ? parseInt(values.selectedTarget?.rewards[0]?.discount) : 0;
      values.maxDiscount = values.selectedTarget?.rewards[2]?.discount ? parseInt(values.selectedTarget?.rewards[2]?.discount) : 0;
    }
  }, [values.selectedTarget]);

  const btns = [
    { text: 'Low', light: styles.low_btn, dark: styles.low_btn_dark },
    { text: 'Average', light: styles.avg_btn, dark: styles.avg_btn_dark },
    { text: 'High', light: styles.high_btn, dark: styles.high_btn_dark },
    { text: 'SuperCharged', light: styles.super_btn, dark: styles.super_btn_dark },
  ];
  // console.log({ values });

  return (
    <section className={[styles.dbrewards, styles.dbrewards_box].join(' ')}>

      <Form noValidate onSubmit={handleSubmit}>
        <Row><Col><h4>Set your rewards</h4></Col></Row>
        <Row className={styles.dbrewards_text_lg}>
          <p className="mt-1">
            Set the discount and chashback percentages
            your customers will earn on their order
            as they reach different milestones.
          </p>
        </Row>
        <Row><Col><h5>Select your desired sales volume:</h5></Col></Row>
        <Row className={styles.dbrewards_text_lg}>
          <p className="mt-1">
            We’ll set your reward tiers based on our
            recommendations.
          </p>
        </Row>
        <Row className="px-0">
          <Col className="text-start" id="rbtn">
            {salesTarget.map((starget: any, index: number) => (
              <Button
                key={starget.id}
                id={starget.id}
                variant="none"
                value={JSON.stringify(starget)}
                // checked={starget.id === values.rewards}
                className={values.selectedTarget?.name === starget.name ? btns[index].dark : btns[index].light}
                onClick={(e) => {
                  // const selectedTarget = starget;
                  // setFieldValue('rewards', selectedTarget.id);
                  // setFieldValue('selectedTarget', { ...selectedTarget });
                  // handleSubmit();
                }}
              >
                {btns[index].text}
                {/* <span className={btns[index].cssName}>
                    <button type="button">{btns[index].text}</button>
                  </span> */}
              </Button>

            ))}
          </Col>
        </Row>

        {/* <Row className={styles.dbrewards__box2}> */}
        <Row className="mt-3">
          <Col sm={6}>
            <h4 className="mb-3">
              Baseline
              {' '}
              <ToolTip
                className={styles.dashboard_campaign__pop}
                icon={<InfoCircle size={10} />}
                popContent={(
                  <p>
                    This is the first discount tier and  the ongoing commission your customer earns on new orders after
                    they have received all their cashback. Learn more about how rewards work
                    {' '}
                    <a rel="noreferrer" href="https://groupshop.zendesk.com/hc/en-us/articles/4414348927635-How-do-I-set-cashback-and-discounts-" target="_blank">here</a>
                    .
                  </p>
)}
              />
            </h4>
            {/* {!editMin && (
              <> */}
            <div className={styles.dbrewards__percent_btn}>{values.minDiscountVal}</div>
            {/* <Button
              variant="link"
              onClick={() => {
                setEditMin(!editMin);
                setEditRewardBox(true);
              }}
            >
              Edit

            </Button> */}
            {/*  <span className={styles.dbrewards_rewardBtn} onClick={() => setEditMin(!editMin)}>Edit</span>
              </>
            )} */}

            {/* <div className={editMin ? 'd-block' : 'd-none'}>
              <Form.Control
                type="text"
                name="minDiscount"
                value={values.minDiscountVal}
                onChange={(e) => {
                  setFieldValue('minDiscountVal', e.currentTarget.value);
                  // eslint-disable-next-line radix
                  setFieldValue('minDiscount', parseInt(e.currentTarget.value));
                }}
                className={styles.dbrewards_input}
                isInvalid={touched.minDiscount && !!errors.minDiscount}
                placeholder="Enter %"
              />
              <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                {errors.minDiscount}
              </Form.Control.Feedback>

              <Button variant="link" type="submit">Save</Button>
            </div> */}

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
                    This is the maximum discount and cashback that you are willing to give per conversion. We won’t offer the maximum discount unless your customer’s Groupshop is performing really well.
                    Think of this as an ‘up to X% off’. Learn more about how rewards work
                    {' '}
                    <a rel="noreferrer" href="https://groupshop.zendesk.com/hc/en-us/articles/4414348927635-How-do-I-set-cashback-and-discounts-" target="_blank">here</a>
                    .
                  </p>
)}

              />
            </h4>
            {/* {!editMax && (
              <> */}
            <div className={styles.dbrewards__percent_btn}>{values.maxDiscountVal}</div>
            {/* <Button
              variant="link"
              onClick={() => {
                setEditMax(!editMax);
                setEditRewardBox(true);
              }}
            >
              Edit

            </Button> */}
            {/* <span className={styles.dbrewards_rewardBtn} onClick={() => setEditMax(!editMax)}>Edit</span>
              </>
            )} */}
            {/* <div className={editMax ? 'd-block' : 'd-none'}>
              <Form.Control
                type="text"
                name="maxDiscount"
                value={values.maxDiscountVal}
                onChange={(e) => {
                  setFieldValue('maxDiscountVal', e.currentTarget.value);
                  // eslint-disable-next-line radix
                  setFieldValue('maxDiscount', parseInt(e.currentTarget.value));
                }}
                className={styles.dbrewards_input}
                isInvalid={touched.maxDiscount && !!errors.maxDiscount}
                placeholder="Enter %"
              />
              <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                {errors.maxDiscount}
              </Form.Control.Feedback>
              <Button variant="link" type="submit">Save</Button>
            </div> */}

          </Col>
        </Row>

        <div className="mt-3">
          <RButton
            variant="outline-primary"
            onClick={() => setEditRewardBox(true)}
            className="text-nowrap"
          >
            Edit rewards
          </RButton>
        </div>

        <div className="border-top mt-4 mb-1">
          <Row className=" mt-3 d-inline-flex justify-content-center">
            <Col lg={1}>
              <Bulb size={16} />
            </Col>
            <Col lg={10} className={['ms-1 px-0', styles.dbrewards_icon_text].join(' ')}>
              You can’t edit your rewards after your campaign is created. Want to set different rewards? Duplicate this campaign to set new rewards.
              {' '}

            </Col>
          </Row>
        </div>
        <EditRewardsBox
          show={editRewardBox}
          handleClose={() => setEditRewardBox(false)}
        />
      </Form>
    </section>
  );
}
