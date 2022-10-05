import React from 'react';
import styles from 'styles/Campaign.module.scss';
import { RootProps } from 'types/store';
import {
  Col, Modal, Row, Button,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import Bulb from 'assets/images/bulb.svg';
import { InfoCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';

interface EditRewardsBoxProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;
  // addToCart(e: any): any;
}

const EditRewardsBox = ({
  show = false, handleClose,
}: EditRewardsBoxProps) => {
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
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
          <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className={styles.editRewardsBox_modal__body}>
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
          <Row className="px-0">
            <Col className="text-start" id="rbtn">
              {salesTargetMock.map((starget: any, index: number) => (
                <Button
                  key={starget.id}
                  id={starget.id}
                  variant="none"
                  value={JSON.stringify(starget)}
                  className={valuesMock[0].selectedTarget?.name === starget.name
                    ? btns[index].dark : btns[index].light}
                >
                  {btns[index].text}
                </Button>
              ))}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={3}>
              <h5>
                Baseline
                {' '}
                <ToolTip
                  className={styles.dashboard_campaign__pop}
                  icon={<InfoCircle size={10} />}
                  popContent={(
                    <p>
                      This is the first discount tier and
                      the ongoing commission your customer earns on new orders after
                      they have received all their cashback. Learn more about how rewards work
                      {' '}
                      <a rel="noreferrer" href="https://groupshop.zendesk.com/hc/en-us/articles/4414348927635-How-do-I-set-cashback-and-discounts-" target="_blank">here</a>
                      .
                    </p>
                  )}
                />
              </h5>
              <div className={styles.dbrewards__percent_btn}>{valuesMock[0].minDiscountVal}</div>
              <Button variant="link" onClick={() => { }}>Edit</Button>
            </Col>
            <Col sm={9}>
              <h5>
                Maximum
                {' '}
                <ToolTip
                  placement="bottom"
                  className={styles.dashboard_campaign__pop}
                  icon={<InfoCircle size={10} />}
                  popContent={(
                    <p>
                      This is the maximum discount and cashback
                      that you are willing to give per conversion.
                      We won’t offer the maximum discount unless your customer’s
                      Groupshop is performing really well.
                      Think of this as an ‘up to X% off’. Learn more about how rewards work
                      {' '}
                      <a rel="noreferrer" href="https://groupshop.zendesk.com/hc/en-us/articles/4414348927635-How-do-I-set-cashback-and-discounts-" target="_blank">here</a>
                      .
                    </p>
                  )}
                />
              </h5>
              <div className={styles.dbrewards__percent_btn}>{valuesMock[0].maxDiscountVal}</div>
              <Button variant="link" onClick={() => { }}>Edit</Button>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className={styles.editRewardsBox_modal__btnSection}>
                <Button
                  onClick={handleClose}
                  className={styles.editRewardsBox_modal__whiteBtn}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleClose}
                  className={styles.editRewardsBox_modal__purpleBtn}
                >
                  Duplicate with new rewards
                </Button>
              </div>
            </Col>
          </Row>
          <Row />
        </Modal.Body>
      </Modal>
    </>
  );
};
EditRewardsBox.defaultProps = {
};

export default EditRewardsBox;

const salesTargetMock = [{
  id: '696d5547-e956-47a2-a319-6cbabb538cd7',
  name: 'Low',
  rewards: [
    { id: '2751f335-4cf6-45a7-b4dd-913266ad561f', customerCount: '1', discount: '10%' },
    { id: 'fca62019-9170-477b-8e7d-18facbcb716a', customerCount: '3', discount: '15%' },
    { id: 'ad377702-9c6f-4596-8581-b0a822adb4e1', customerCount: '5', discount: '20%' },
  ],
  rogsMax: '10',
  rogsMin: '5',
  status: 'active',
},
{
  id: '8c48eec7-caac-42a4-840f-d4962eb9ad54',
  name: 'Average',
  rewards: [
    { id: '2751f335-4cf6-45a7-b4dd-913266ad561f', customerCount: '1', discount: '10%' },
    { id: 'fca62019-9170-477b-8e7d-18facbcb716a', customerCount: '3', discount: '15%' },
    { id: 'ad377702-9c6f-4596-8581-b0a822adb4e1', customerCount: '5', discount: '20%' }],
  rogsMax: '6.6',
  rogsMin: '4',
  status: 'active',
},
{
  id: '50d02be0-930e-4531-b359-6df38fe4a702',
  name: 'High',
  rewards: [
    { id: '2751f335-4cf6-45a7-b4dd-913266ad561f', customerCount: '1', discount: '10%' },
    { id: 'fca62019-9170-477b-8e7d-18facbcb716a', customerCount: '3', discount: '15%' },
    { id: 'ad377702-9c6f-4596-8581-b0a822adb4e1', customerCount: '5', discount: '20%' }],
  rogsMax: '5',
  rogsMin: '3.3',
  status: 'active',
},
{
  id: 'b1012814-fe04-4f02-8fca-63f17fb64f03',
  name: 'Super-charged',
  rewards: [
    { id: '2751f335-4cf6-45a7-b4dd-913266ad561f', customerCount: '1', discount: '10%' },
    { id: 'fca62019-9170-477b-8e7d-18facbcb716a', customerCount: '3', discount: '15%' },
    { id: 'ad377702-9c6f-4596-8581-b0a822adb4e1', customerCount: '5', discount: '20%' }],
  rogsMax: '4',
  rogsMin: '2.8',
  status: 'active',
},
];

const btns = [
  { text: 'Low', light: styles.low_btn, dark: styles.low_btn_dark },
  { text: 'Average', light: styles.avg_btn, dark: styles.avg_btn_dark },
  { text: 'High', light: styles.high_btn, dark: styles.high_btn_dark },
  { text: 'SuperCharged', light: styles.super_btn, dark: styles.super_btn_dark },
];

const valuesMock = [
  {
    rewards: 'b1012814-fe04-4f02-8fca-63f17fb64f03',
    minDiscountVal: '25%',
    maxDiscountVal: '40%',
    selectedTarget: {
      id: 'b1012814-fe04-4f02-8fca-63f17fb64f03',
      name: 'Super-charged',
      rewards: [
        {
          id: '17924c9a-ae53-44dc-b96c-368835055fb4',
          discount: '25%',
        },
        {
          id: 'aef8d8d8-332c-4101-8ab0-f4a91a7e7d23',
          discount: '30%',
        },
        {
          id: '1605877a-a486-4158-92d4-0821ffc421cf',
          discount: '40%',
        },
      ],
    },
    minDiscount: 25,
    maxDiscount: 40,
  },
];
