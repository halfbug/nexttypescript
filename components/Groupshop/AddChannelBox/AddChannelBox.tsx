import React, { useState } from 'react';
import styles from 'styles/Modal.module.scss';
import {
  Button,
  Col, Form, Modal, Row,
} from 'react-bootstrap';
import { RootProps } from 'types/store';
import InfoIcon from 'assets/images/info-icon.svg';
import cstyles from 'styles/Campaign.module.scss';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';

interface AddChannelBoxProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;
  values: any;
}

const AddChannelBox = ({
  show = false, handleClose, values,
}: AddChannelBoxProps) => {
  const closeModal = (e: any) => {
    handleClose(e);
  };
  const [editMin, setEditMin] = useState(false);
  const [editMax, setEditMax] = useState(false);
  const [editCommission, setEditCommission] = useState(false);
  const [channelName, setChannelName] = useState('');

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
          <div className={styles.addChannelBox_modal__nameBox}>
            <h5>Name your channel</h5>
            <div className="d-flex align-items-center">
              <Form.Control
                className="w-75"
                type="text"
                name="channelname"
                onChange={(e) => setChannelName(e.currentTarget.value)}
                placeholder="Retail Stores"
                maxLength={20}
              />
              <div className="ms-4 text-muted">
                {channelName.length}
                /20
              </div>
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
                      className={styles.addChannelBox_modal__rewardBox__input}
                      placeholder="Enter %"
                      max={20}
                      min={5}
                    />
                    <Button
                      className="fw-bolder"
                      variant="link"
                      onClick={() => {
                        setEditMin(false);
                      }}
                    >
                      Save

                    </Button>

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
                    defaultValue={values.maxDiscount}
                    className={styles.addChannelBox_modal__rewardBox__input}
                    placeholder="Enter %"
                    max={40}
                    min={10}
                  />
                  <Button
                    className="fw-bolder"
                    variant="link"
                    onClick={() => {
                      setEditMax(false);
                    }}
                  >
                    Save
                  </Button>

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
                    name="partnerCommission"
                    defaultValue={values.commission}
                    className={styles.addChannelBox_modal__rewardBox__input}
                    placeholder="Enter %"
                    max={20}
                    min={5}
                  />

                  <Button
                    className="fw-bolder"
                    variant="link"
                    onClick={() => {
                      setEditCommission(false);
                    }}
                  >
                    Save
                  </Button>

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
              onClick={handleClose}
              variant="primary"
            >
              Create Channel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannelBox;
