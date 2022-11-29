import React, { useState } from 'react';
import styles from 'styles/Modal.module.scss';
import {
  Button,
  Col, Form, Modal, Row,
} from 'react-bootstrap';
import { IRetailTools } from 'types/store';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import useAlert from 'hooks/useAlert';
import * as yup from 'yup';
import InfoIcon from 'assets/images/info-icon.svg';
import cstyles from 'styles/Campaign.module.scss';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import { CREATE_CHANNEL_DB } from 'store/store.graphql';

interface AddChannelBoxProps {
  show: boolean;
  handleClose(e: any): any;
  storeId: any;
  channelList:any;
  refreshChannelList:any;
}

const AddChannelBox = ({
  show = false, handleClose, storeId, refreshChannelList, channelList,
}: AddChannelBoxProps) => {
  const closeModal = (e: any) => {
    handleClose(e);
  };
  const [editMin, setEditMin] = useState(false);
  const [editMax, setEditMax] = useState(false);
  const [editCommission, setEditCommission] = useState(false);
  const { AlertComponent, showError } = useAlert();

  const [
    createChannel,
    { loading, error },
  ] = useMutation<IRetailTools>(CREATE_CHANNEL_DB);

  const channelInitial = {
    channelname: '',
    slugName: '',
    minDiscount: 10,
    maxDiscount: 20,
    commission: 20,
  };

  const duplicateChannel = (values: string | undefined) => {
    if (values !== '' && values !== undefined) {
      // eslint-disable-next-line max-len
      const arr:any = channelList.filter((item:any) => item.name.toLowerCase() === values.toLowerCase());
      if (arr[0]?.id !== '' && arr[0]?.id !== undefined) {
        return false;
      }
      return true;
    }
    return true;
  };

  const validationSchema = yup.object({
    channelname: yup
      .string()
      .test('Unique', 'Channel name should be unique. ', (values) => duplicateChannel(values))
      .required('Channel Name is required.'),
    minDiscount: yup
      .number().typeError('you must specify a number')
      .min(5)
      .max(40)
      .required('Min Discount is required.'),
    maxDiscount: yup
      .number().typeError('you must specify a number')
      .min(15)
      .max(50)
      .required('Max Discount is required.'),
    commission: yup
      .number().typeError('you must specify a number')
      .required('channel Commisson is required.'),
  });

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    resetForm,
    setFieldValue,
  }: FormikProps<IRetailTools> = useFormik<IRetailTools>({
    initialValues: channelInitial,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IRetailTools>) => {
      if (validateForm) validateForm(valz);
      const {
        channelname, minDiscount, maxDiscount, commission,
      } = valz;
      const minDiscountVal = `${minDiscount}%`;
      const maxDiscountVal = `${maxDiscount}%`;
      const newAverage = ((+minDiscount! + +maxDiscount!) / 2);
      const newAverageVal = `${newAverage}%`;
      const commissionVal = `${commission}%`;
      const channelObj = await createChannel({
        variables: {
          createChannelInput: {
            storeId,
            name: channelname,
            slugName: channelname.replaceAll(' ', '-').toLowerCase(),
            rewards: {
              baseline: minDiscountVal,
              average: newAverageVal,
              maximum: maxDiscountVal,
              commission: commissionVal,
            },
            isActive: true,
          },
        },
      });
      refreshChannelList(true);
      resetForm();
    },
  });

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        size="lg"
        centered
        dialogClassName={styles.addChannelBox_modal}
        contentClassName={styles.addChannelBox_modal__content}
      >
        <Modal.Body className={styles.addChannelBox_modal__body}>
          <h2>
            Create New Channel
          </h2>
          <Form noValidate onSubmit={handleSubmit}>
            <div className={styles.addChannelBox_modal__nameBox}>
              <h5>Name your channel</h5>
              <div className="d-flex align-items-center">
                <Form.Control
                  className="w-75"
                  type="text"
                  name="channelname"
                  value={values.channelname}
                  onChange={handleChange}
                  placeholder="Retail Stores"
                  isInvalid={touched.channelname && !!errors.channelname}
                  maxLength={20}
                />
                <div className="ms-4 text-muted">
                  {values.channelname.length}
                  /20
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.channelname}
                </Form.Control.Feedback>
              </div>
            </div>
            <div className={styles.addChannelBox_modal__rewardBox}>
              <h5>Channel Rewards</h5>
              <Row>
                <Col md={6}>
                  <div className={styles.addChannelBox_modal__rewardBox__heading}>
                    Baseline Discount
                    <ToolTip
                      placement="bottom"
                      className={cstyles.dashboard_campaign__pop}
                      icon={<InfoIcon size={10} />}
                      popContent={(
                        <p>
                          This is the minimum discount.
                        </p>
                        )}
                    />
                  </div>
                  <div>
                    {!editMin && (
                    <>
                      <span className={styles.addChannelBox_modal__rewardBox__percentage}>
                        {values.minDiscount}
                        %
                      </span>
                      <Button className="fw-bolder" variant="link" onClick={() => setEditMin(!editMin)}>Edit</Button>
                    </>
                    )}
                    <div className={editMin ? 'd-flex' : 'd-none'}>
                      <Form.Control
                        type="number"
                        name="minDiscount"
                        defaultValue={values.minDiscount}
                        onChange={handleChange}
                        className={styles.addChannelBox_modal__rewardBox__input}
                        isInvalid={!!errors.minDiscount}
                        placeholder="Enter %"
                        max={20}
                        min={5}
                      />
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
                      <Form.Control.Feedback type="invalid" className={styles.channel_rewards_error}>
                        {errors.minDiscount}
                      </Form.Control.Feedback>

                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className={styles.addChannelBox_modal__rewardBox__heading}>
                    Maximum Discount
                    <ToolTip
                      placement="bottom"
                      className={cstyles.dashboard_campaign__pop}
                      icon={<InfoIcon size={10} />}
                      popContent={(
                        <p>
                          This is the maximum discount.
                        </p>
                        )}
                    />
                  </div>
                  <div>
                    {!editMax && (
                    <>
                      <span className={styles.addChannelBox_modal__rewardBox__percentage}>
                        {values.maxDiscount}
                        %
                      </span>
                      <Button className="fw-bolder" variant="link" onClick={() => setEditMax(!editMax)}>Edit</Button>
                    </>
                    )}
                  </div>
                  <div className={editMax ? 'd-flex' : 'd-none'}>
                    <Form.Control
                      type="number"
                      name="maxDiscount"
                      onChange={handleChange}
                      defaultValue={values.maxDiscount}
                      className={styles.addChannelBox_modal__rewardBox__input}
                      isInvalid={!!errors.maxDiscount}
                      placeholder="Enter %"
                      max={40}
                      min={10}
                    />
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
                    <Form.Control.Feedback type="invalid" className={styles.channel_rewards_error}>
                      {errors.maxDiscount}
                    </Form.Control.Feedback>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mt-4">
                  <div className={styles.addChannelBox_modal__rewardBox__heading}>
                    Commission
                    <ToolTip
                      placement="bottom"
                      className={cstyles.dashboard_campaign__pop}
                      icon={<InfoIcon size={10} />}
                      popContent={(
                        <p>
                          This is commission percentage.
                        </p>
                        )}
                    />
                  </div>
                  <div>
                    {!editCommission && (
                    <>
                      <span className={styles.addChannelBox_modal__rewardBox__percentage}>
                        {values.commission}
                        %
                      </span>
                      <Button className="fw-bolder" variant="link" onClick={() => setEditCommission(!editCommission)}>Edit</Button>
                    </>
                    )}
                  </div>
                  <div className={editCommission ? 'd-flex' : 'd-none'}>
                    <Form.Control
                      type="number"
                      name="commission"
                      onChange={handleChange}
                      defaultValue={values.commission}
                      className={styles.addChannelBox_modal__rewardBox__input}
                      placeholder="Enter %"
                      isInvalid={!!errors.commission}
                    />

                    <Button
                      className="fw-bolder"
                      variant="link"
                      onClick={() => {
                        if (!(errors.commission)) {
                          setEditCommission(false);
                        }
                      }}

                    >
                      Save
                    </Button>
                    <Form.Control.Feedback type="invalid" className={styles.channel_rewards_error}>
                      {errors.commission}
                    </Form.Control.Feedback>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={styles.addChannelBox_modal__btnSection}>
              <Button
                className={styles.addChannelBox_modal__whiteBtn}
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                className={styles.addChannelBox_modal__purpleBtn}
                type="submit"
                variant="primary"
              >
                Create Channel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannelBox;
