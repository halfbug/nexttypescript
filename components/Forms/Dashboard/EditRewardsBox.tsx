import React, { useEffect, useState } from 'react';
import styles from 'styles/Campaign.module.scss';
import { RootProps, ICampaignForm } from 'types/store';
import {
  Form, Col, Modal, Row, Button,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import Bulb from 'assets/images/bulb.svg';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CAMPAIGN, GET_ALL_CAMPAIGNS } from 'store/store.graphql';
import { StoreContext } from 'store/store.context';
import useCampaign from 'hooks/useCampaign';
import useUtilityFunction from 'hooks/useUtilityFunction';
import { useRouter } from 'next/router';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import * as constant from 'configs/constant';
import useCode from '../../../hooks/useCode';
import DBRewards from './DBRewards';

interface EditRewardsBoxProps extends RootProps {
  show: boolean;
  handleClose(): any;
  // addToCart(e: any): any;
}
interface IValues {
  rewards: string;
  selectedTarget: any;
  maxDiscountVal: string;
  minDiscountVal: string;
  minDiscount: number,
  maxDiscount: number,
}

const EditRewardsBox = ({
  show = false, handleClose,
}: EditRewardsBoxProps) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const { campaign } = useCampaign();
  const { isMultiple5, duplicateCampaignName } = useUtilityFunction();
  const { shop } = useCode();
  const Router = useRouter();
  const {
    data: { campaigns } = { campaigns: [] }, refetch,
  } = useQuery(GET_ALL_CAMPAIGNS, {
    variables: { storeId: store.id },
  });

  const [
    addCampaign,
    // eslint-disable-next-line no-unused-vars
    { data, loading, error },
  ] = useMutation<any | null>(CREATE_CAMPAIGN);

  const [editMin, setEditMin] = useState(false);
  const [editMax, setEditMax] = useState(false);
  const [mainError, setmainError] = useState('');
  const [initvalz, setInitValz] = useState<IValues>({
    rewards: '',
    selectedTarget: '',
    maxDiscountVal: '',
    minDiscountVal: '',
    minDiscount: 0,
    maxDiscount: 0,
  });

  useEffect(() => {
    /// initial value display
    if (campaign?.salesTarget) {
      if (campaign?.salesTarget?.rewards?.length) {
        setInitValz({
          rewards: campaign?.salesTarget?.id,
          minDiscountVal: campaign?.salesTarget?.rewards[0]?.discount || '',
          maxDiscountVal: campaign?.salesTarget?.rewards[2]?.discount || '',
          selectedTarget: campaign?.salesTarget,
          minDiscount: campaign?.salesTarget?.rewards[0]?.discount
            ? parseInt(campaign?.salesTarget?.rewards[0]?.discount, 10) : 0,
          maxDiscount: campaign?.salesTarget?.rewards[2]?.discount
            ? parseInt(campaign?.salesTarget?.rewards[2]?.discount, 10) : 0,
        });
      }
    }
  }, [campaign]);

  const validationSchema = yup.object({
    minDiscount: yup
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
      .lessThan(yup.ref('maxDiscount'), constant.EDIT_REWARDS_MSG2) // .test("diff", "diff",
      .test('diff', constant.EDIT_REWARDS_MSG1,
        (val: number | undefined, context) => {
          if (val && (context.parent.maxDiscount - val) < 10) {
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
    maxDiscount: yup
      .number().typeError('you must specify a number')
      .moreThan(yup.ref('minDiscount'), constant.EDIT_REWARDS_MSG4)
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

  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue, setValues,
  }: FormikProps<ICampaignForm> = useFormik<ICampaignForm>({
    initialValues: initvalz,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (valz, { validateForm }: FormikHelpers<ICampaignForm>) => {
      if (validateForm) validateForm(valz);
      const {
        selectedTarget, customBg,
      } = valz;
      let { media } = valz;
      if (customBg) media = '';
      const newSelectedTarget = {
        ...selectedTarget,
      };

      if (editMin || editMax) {
        setmainError('Save your changes first');
      } else if (!newSelectedTarget || (newSelectedTarget.rewards[0].discount
          === campaign?.salesTarget?.rewards?.[0]?.discount
          && newSelectedTarget.rewards[2].discount
          === campaign?.salesTarget?.rewards?.[2]?.discount)) {
        setmainError('There is no change in baseline or in maximum');
      } else {
        const names = campaigns.filter((item: any) => item !== undefined)
          .map((item: any) => item.name);
        await addCampaign({
          variables: {
            createCampaignInput: {
              storeId: store.id,
              name: duplicateCampaignName(names, campaign),
              criteria: campaign?.criteria,
              rewards: newSelectedTarget.id,
              joinExisting: campaign?.joinExisting,
              isActive: true,
              products: campaign?.products,
              collections: campaign?.collections,
              addableProducts: campaign?.addableProducts,
              salesTarget: { ...newSelectedTarget, isActive: true },
            },
          },
        });
        closeModal();
        Router.push(`/${shop}/campaign`);
      }
    },
  });

  useEffect(() => {
    /// initial value display

    if (values.selectedTarget?.rewards?.length > 0) {
      // on click event in preset
      setInitValz((prev: any) => ({
        ...prev,
        selectedTarget: values.selectedTarget,
        rewards: values.selectedTarget?.id,
        minDiscountVal: values.selectedTarget?.rewards?.[0]?.discount || '',
        maxDiscountVal: values.selectedTarget?.rewards?.[2]?.discount || '',
        minDiscount: values.selectedTarget?.rewards?.[0]?.discount
          ? parseInt(values.selectedTarget?.rewards[0]?.discount, 10) : 0,
        maxDiscount: values.selectedTarget?.rewards?.[2]?.discount
          ? parseInt(values.selectedTarget?.rewards[2]?.discount, 10) : 0,
      }));
    }
  }, [values.rewards]);

  useEffect(() => {
    setmainError('');
  }, [values]);

  const closeModal = () => {
    setValues({
      rewards: campaign?.salesTarget?.id,
      minDiscountVal: campaign?.salesTarget?.rewards?.[0]?.discount || '',
      maxDiscountVal: campaign?.salesTarget?.rewards?.[2]?.discount || '',
      selectedTarget: campaign?.salesTarget,
      minDiscount: campaign?.salesTarget?.rewards?.[0]?.discount
        ? parseInt(campaign?.salesTarget?.rewards?.[0]?.discount, 10) : 0,
      maxDiscount: campaign?.salesTarget?.rewards?.[2]?.discount
        ? parseInt(campaign?.salesTarget?.rewards?.[2]?.discount, 10) : 0,
    });
    setEditMax(false);
    setEditMin(false);
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        size="lg"
        centered
        dialogClassName={styles.editRewardsBox_modal}
        contentClassName={styles.editRewardsBox_modal__content}
      >
        {/* <Modal.Header className={styles.editRewardsBox_modal_header}>
          <Row onClick={handleClose}><ArrowDown /></Row>
        </Modal.Header> */}
        <Modal.Header className={styles.editRewardsBox_modal__closebtnlg}>
          <Row onClick={closeModal}>
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className={styles.editRewardsBox_modal__body}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={12}>
                <div className={styles.editRewardsBox_modal__top}>
                  <h3>
                    You’ll need to duplicate your campaign
                  </h3>
                  <p>
                    <Bulb />
                    You can’t edit your rewards after your campaign is created.
                    Want to set different rewards?
                    Duplicate this campaign to set new rewards -  all
                    your other settings will stay the same.
                  </p>
                </div>
              </Col>
            </Row>
            <Row><Col><h5>Select your desired sales volume:</h5></Col></Row>
            <Row className={styles.editRewardsBox_modal_text_lg}>
              <p>
                We’ll set your reward tiers based on our
                recommendations.
              </p>
            </Row>
            <DBRewards
              values={values}
              handleChange={handleChange}
              errors={errors}
              setFieldValue={setFieldValue}
              editMax={editMax}
              editMin={editMin}
              setEditMax={setEditMax}
              setEditMin={setEditMin}
            />
            <Row>
              <Col lg={12}>
                { mainError && (
                <div className={styles.dbrewards_error}>
                  {mainError}
                </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className={styles.editRewardsBox_modal__btnSection}>
                  <Button
                    onClick={closeModal}
                    className={styles.editRewardsBox_modal__whiteBtn}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={styles.editRewardsBox_modal__purpleBtn}
                    type="submit"
                  >
                    Duplicate with new rewards
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
          <Row />
        </Modal.Body>
      </Modal>
    </>
  );
};
EditRewardsBox.defaultProps = {
};

export default EditRewardsBox;
