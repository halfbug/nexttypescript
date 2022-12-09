/* eslint-disable jsx-quotes */
import React, { useState, useEffect, useContext } from 'react';
import styles from 'styles/Retail.module.scss';
import {
  Form, Button, Col, Row,
} from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import { UPDATE_CHANNEL } from 'store/store.graphql';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { StoreContext } from 'store/store.context';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as yup from 'yup';
import useAlert from 'hooks/useAlert';
import { IRetailTools } from 'types/store';
import DeleteConfirmModel from 'components/Widgets/Model/DeleteConfirmModel';

interface CustomChannelsProps {
  channel: any;
  channelList:any
  refreshChannelList: any;
}

const UpdateChannel = ({ channel, refreshChannelList, channelList } : CustomChannelsProps) => {
  const [editChannel, setEditChannel] = React.useState(false);
  const [editCommission, setEditCommission] = React.useState(false);
  const [editBaseline, setEditBaseline] = React.useState(false);
  const [channelStatus, setChannelStatus] = React.useState(true);
  const [deleteStatus, setDeleteStatus] = React.useState(false);
  const { AlertComponent, showError, showSuccess } = useAlert();
  const [editMaximum, setEditMaximum] = React.useState(false);
  const channelInitial = {
    channelname: channel.name,
    slugName: channel?.name.replace(' ', '-').toLowerCase(),
    commission: channel?.rewards.commission.replace('%', ''),
    minDiscount: channel?.rewards.baseline.replace('%', ''),
    maxDiscount: channel?.rewards.maximum.replace('%', ''),
  };

  useEffect(() => {
    if (channel) {
      setEditChannel(false);
      setEditCommission(false);
      setEditBaseline(false);
      setEditMaximum(false);
    }
  }, [channel]);

  const { store, dispatch } = useContext(StoreContext);
  const shopName: string[] | undefined = store?.shop?.split('.', 1);

  const [
    editChannelStatus,
  ] = useMutation<IRetailTools | null>(UPDATE_CHANNEL);

  const duplicateChannel = (values: string | undefined) => {
    if (values !== '' && values !== undefined) {
      // eslint-disable-next-line max-len
      const arr:any = channelList.filter((item:any) => item.name.toLowerCase().trim() === values.toLowerCase().trim() && item.id !== channel.id);
      if (arr[0]?.id !== '' && arr[0]?.id !== undefined) {
        return false;
      }
      return true;
    }
    return true;
  };

  const handleClose = () => setDeleteStatus(false);
  const handleProcess = () => {
    setChannelStatus(false);
    handleSubmit();
    setDeleteStatus(false);
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
      .min(0)
      .max(50)
      .required('channel Commisson is required.'),
  });

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
  }: FormikProps<IRetailTools> = useFormik<IRetailTools>({
    initialValues: channelInitial,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IRetailTools>) => {
      if (validateForm) validateForm(valz);
      const {
        channelname, commission, minDiscount, maxDiscount,
      } = valz;
      setEditChannel(false);
      setEditCommission(false);
      setEditBaseline(false);
      setEditMaximum(false);
      const minDiscountVal = `${minDiscount}%`;
      const maxDiscountVal = `${maxDiscount}%`;
      const commissionVal = `${commission}%`;
      const newAverage = ((+valz.minDiscount! + +valz.maxDiscount!) / 2);
      const newAverageVal = `${newAverage}%`;
      const channelObj: null | any = await editChannelStatus({
        variables: {
          updateChannelInput: {
            id: channel.id,
            name: channelname,
            slugName: channelname.replaceAll(' ', '-').toLowerCase(),
            rewards: {
              baseline: minDiscountVal,
              average: newAverageVal,
              maximum: maxDiscountVal,
              commission: commissionVal,
            },
            isActive: channelStatus,
          },
        },
      });
      refreshChannelList(true);
      setChannelStatus(true);
      console.log({ channelObj });
    },
  });
  return (
    <>
      <Row>
        <Col lg={12}>
          <div className={styles.retail__customChannels__channelInfo}>
            <Form noValidate onSubmit={handleSubmit}>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <div className={editChannel ? 'd-none' : ''}>
                  <div className={styles.retail__customChannels__channelInfo__name}>
                    {values.channelname}
                  </div>
                </div>
                <div>
                  {!editChannel && (
                  <>
                    <Button className={styles.retail__customChannels__channelInfo__lineBtn} variant="link" onClick={() => { setEditChannel(!editChannel); }}>Rename</Button>
                  </>
                  )}
                  <div className={editChannel ? ' ' : 'd-none'}>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="text"
                        name="channelname"
                        onChange={handleChange}
                        value={values.channelname}
                        className={styles.customChannels_modal__rewardBox__input}
                        placeholder="Enter Channel name"
                        isInvalid={touched.channelname && !!errors.channelname}
                        maxLength={20}
                      />
                      <div className="ms-4 text-muted">
                        {values.channelname.length}
                        /20
                      </div>
                    </div>
                    <div className="text-danger ms-2 fs-6 mt-0">
                      {errors.channelname}
                    </div>
                    <Button
                      type="submit"
                      className="fw-bolder"
                      variant="link"
                      value={1}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>

              <div className={styles.retail__customChannels__channelInfo__amountsRow}>
                <div className={styles.retail__customChannels__channelInfo__amount}>
                  Commission
                </div>
                <div>
                  {!editCommission && (
                  <>
                    <span className={styles.retail__customChannels__channelInfo__percentage}>
                      {values.commission}
                      %
                    </span>
                    {' '}
                    <Button className={styles.retail__customChannels__channelInfo__lineBtn} variant="link" onClick={() => { setEditCommission(!editCommission); }}>Edit</Button>
                  </>
                  )}
                  <div className={editCommission ? ' ' : 'd-none'}>
                    <Form.Control
                      type="number"
                      name="commission"
                      onChange={handleChange}
                      value={values.commission}
                      className={styles.customChannels_modal__rewardBox__input}
                      placeholder="Enter %"
                      isInvalid={!!errors.commission}
                    />
                    <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                      {errors.commission}
                    </Form.Control.Feedback>
                    <Button
                      type="submit"
                      className="fw-bolder"
                      variant="link"
                      value={1}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>

              <div className={styles.retail__customChannels__channelInfo__amountsRow}>
                <div className={styles.retail__customChannels__channelInfo__amount}>
                  Baseline Discount
                </div>
                <div>
                  {!editBaseline && (
                  <>
                    <span className={styles.retail__customChannels__channelInfo__percentage}>
                      {values.minDiscount}
                      %
                    </span>
                    {' '}
                    <Button className={styles.retail__customChannels__channelInfo__lineBtn} variant="link" onClick={() => { setEditBaseline(!editBaseline); }}>Edit</Button>
                  </>
                  )}
                  <div className={editBaseline ? ' ' : 'd-none'}>
                    <Form.Control
                      type="number"
                      name="minDiscount"
                      onChange={handleChange}
                      value={values.minDiscount}
                      className={styles.customChannels_modal__rewardBox__input}
                      placeholder="Enter %"
                      isInvalid={!!errors.minDiscount}
                    />
                    <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                      {errors.minDiscount}
                    </Form.Control.Feedback>
                    <Button
                      type="submit"
                      className="fw-bolder"
                      variant="link"
                      value={1}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>

              <div className={styles.retail__customChannels__channelInfo__amountsRow}>
                <div className={styles.retail__customChannels__channelInfo__amount}>
                  Maximum Discount
                </div>
                <div>
                  {!editMaximum && (
                  <>
                    <span className={styles.retail__customChannels__channelInfo__percentage}>
                      {values.maxDiscount}
                      %
                    </span>
                    {' '}
                    <Button className={styles.retail__customChannels__channelInfo__lineBtn} variant="link" onClick={() => { setEditMaximum(!editMaximum); }}>Edit</Button>
                  </>
                  )}
                  <div className={editMaximum ? ' ' : 'd-none'}>
                    <Form.Control
                      type="number"
                      name="maxDiscount"
                      onChange={handleChange}
                      value={values.maxDiscount}
                      className={styles.customChannels_modal__rewardBox__input}
                      placeholder="Enter %"
                      isInvalid={!!errors.maxDiscount}
                    />
                    <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                      {errors.maxDiscount}
                    </Form.Control.Feedback>
                    <Button
                      type="submit"
                      className="fw-bolder"
                      variant="link"
                      value={1}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>

              <hr />
              <div className={styles.retail__customChannels__channelInfo__qr}>
                Add the unique QR code or create your own with the URL
                {' '}
                below to the relevant touchpoint for this channel to start discovering customers.
              </div>
              <div className='d-flex justify-content-between mt-3'>
                <div>
                  <WhiteButton>
                    Download QR Code
                  </WhiteButton>
                </div>
                <div>
                  <CopyToClipboard
                    text={`${window.location.origin}/${shopName}/ch/${values.slugName}`}
                    onCopy={() => showSuccess('Channel URL copied!')}
                  >
                    <WhiteButton>
                      Copy URL
                    </WhiteButton>
                  </CopyToClipboard>
                </div>
              </div>
              <Button
                onClick={() => setDeleteStatus(true)}
                className={styles.retail__customChannels__channelInfo__delete}
              >
                Deactivate Channel
              </Button>
            </Form>
          </div>
        </Col>
        <AlertComponent />
        <DeleteConfirmModel
          deleteStatus={deleteStatus}
          handleClose={handleClose}
          handleProcess={handleProcess}
        />
      </Row>
    </>
  );
};

export default UpdateChannel;
