import React, {
  useState, Dispatch, SetStateAction,
} from 'react';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';
import useQueryString from 'hooks/useQueryString';
import { StoreContext } from 'store/store.context';
import { useQuery } from '@apollo/client';
import styles from 'styles/Campaign.module.scss';
import { GET_SALES_TARGET } from 'store/store.graphql';
import { InfoCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import useUtilityFunction from 'hooks/useUtilityFunction';
import useCampaign from 'hooks/useCampaign';

interface IValues {
  rewards: string;
  selectedTarget: any;
}
interface IProps {
  handleChange: any;
  values: any;
  setFieldValue: any;
  // touched?: any;
  errors: any;
  // campaignInitial: any;
  editMin: boolean;
  editMax: boolean;
  setEditMin: any;
  setEditMax: any;
  // handleForm: any;
  setcampaignInitial: Dispatch<SetStateAction<any>>;
}

export default function DBRewards({
  handleChange, values, setFieldValue, errors, editMax, editMin,
  setEditMax, setEditMin, setcampaignInitial,
}: IProps) {
  const [, setParams] = useQueryString();
  const { campaign } = useCampaign();

  // const [minDiscount, setMinDiscount] = useState('');
  // const [maxDiscount, setMaxDiscount] = useState('');

  const {
    loading: appLodaing, data: { salesTarget } = { salesTarget: [] },
  } = useQuery(GET_SALES_TARGET);

  const { store, dispatch } = React.useContext(StoreContext);
  const { multiple5, isMultiple5 } = useUtilityFunction();

  React.useEffect(() => {
    /// initial value display
    if (salesTarget.length > 0) {
      setcampaignInitial((prev: any) => {
        console.log({ prev });

        return {
          ...prev,
          name: values.name,
          products: store?.newCampaign?.productsArray || [],
          addableProducts: store?.newCampaign?.addableProductsArray || [],
          criteria: values.criteria,
          brandColor: values.brandColor,
          selectedTarget: values.selectedTarget,
          rewards: values.selectedTarget?.id,
          minDiscountVal: values.selectedTarget?.rewards?.[0]?.discount || '',
          maxDiscountVal: values.selectedTarget?.rewards?.[2]?.discount || '',
          minDiscount: values.selectedTarget?.rewards?.[0]?.discount
            ? parseInt(values.selectedTarget?.rewards[0]?.discount, 10) : 0,
          maxDiscount: values.selectedTarget?.rewards?.[2]?.discount
            ? parseInt(values.selectedTarget?.rewards[2]?.discount, 10) : 0,
          isRewardEdit: false,
        };
      });
    }
  }, [values.selectedTarget]);
  React.useEffect(() => {
    /// initial value display
    if (campaign?.salesTarget) {
      setcampaignInitial((prev: any) => {
        console.log({ prev });
        return {
          ...prev,
          name: values.name,
          products: store?.newCampaign?.productsArray || [],
          addableProducts: store?.newCampaign?.addableProductsArray || [],
          criteria: values.criteria,
          brandColor: values.brandColor,
          rewards: campaign?.salesTarget?.id,
          minDiscountVal: campaign?.salesTarget?.rewards?.[0]?.discount || '',
          maxDiscountVal: campaign?.salesTarget?.rewards?.[2]?.discount || '',
          selectedTarget: campaign?.salesTarget,
          minDiscount: campaign?.salesTarget?.rewards?.[0]?.discount
            ? parseInt(campaign?.salesTarget?.rewards[0]?.discount, 10) : 0,
          maxDiscount: campaign?.salesTarget?.rewards?.[2]?.discount
            ? parseInt(campaign?.salesTarget?.rewards[2]?.discount, 10) : 0,
        };
      });
    }
  }, [campaign?.salesTarget]);

  const btns = [
    { text: 'Low', light: styles.low_btn, dark: styles.low_btn_dark },
    { text: 'Average', light: styles.avg_btn, dark: styles.avg_btn_dark },
    { text: 'High', light: styles.high_btn, dark: styles.high_btn_dark },
    { text: 'SuperCharged', light: styles.super_btn, dark: styles.super_btn_dark },
  ];
  console.log({ values });
  // console.log({ campaignInitial });
  // console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");

  // const menuItems = ["Easy", "Medium", "Hard"];
  const [activeButton, setActiveButton] = useState('');
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
                await setFieldValue('minDiscount', parseInt(selectedTarget.rewards[0].discount, 10));
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
                if (errors.maxDiscount === '' || (errors && Object.keys(errors).length === 0 && Object.getPrototypeOf(errors) === Object.prototype)) {
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
              // value={values.minDiscountVal[values.minDiscountVal.length - 1]
              // !== '%' ? `${values.minDiscountVal}%` : values.minDiscountVal}
                onChange={handleChange}
                className={styles.dbrewards_input}
                isInvalid={!!errors.minDiscount}
              // isInvalid={!!errors.minDiscount}
                placeholder="Enter %"
              />
              <Button
                variant="link"
                onClick={() => {
                  if (!(errors.minDiscount)) {
                    setEditMin(false);
                    setFieldValue('isRewardEdit', true);
                  // handleSubmit();
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
                if (errors.minDiscount === '' || (errors && Object.keys(errors).length === 0 && Object.getPrototypeOf(errors) === Object.prototype)) {
                  setEditMax(true);
                  setEditMin(false);
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
                    setFieldValue('isRewardEdit', true);
                  // handleSubmit();
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
