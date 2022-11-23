/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Retail.module.scss';
import {
  Row, Col,
} from 'react-bootstrap';
import ArrowRightLogo from 'assets/images/arrow-right.svg';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import { useState } from 'react';
import AddChannelBox from 'components/Groupshop/AddChannelBox/AddChannelBox';

interface CustomChannelsProps {
  channel: any;

}
const CustomChannels = () => {
  const [showChannelInfo, setShowChannelInfo] = useState<boolean>(false);
  const [channelInfoData, setChannelInfoData] = useState<any>();
  const [showAddChannelPopup, setShowAddChannelPopup] = useState<boolean>(false);

  const handleChannelClick = (channel: any) => {
    setShowChannelInfo(true);
    setChannelInfoData(channel);
  };
  const ChannelInfo = ({ channel }: CustomChannelsProps) => (
    <>
      <Row>
        <Col lg={12}>
          <div className={styles.retail__customChannels__channelInfo}>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <div className={styles.retail__customChannels__channelInfo__name}>
                {channel.name}
              </div>
              <div className={styles.retail__customChannels__channelInfo__lineBtn}>
                Rename
              </div>
            </div>
            <div className={styles.retail__customChannels__channelInfo__amountsRow}>
              <div className={styles.retail__customChannels__channelInfo__amount}>
                Commission
              </div>
              <div>
                <span className={styles.retail__customChannels__channelInfo__percentage}>
                  {channel.commision}
                </span>
                <span className={styles.retail__customChannels__channelInfo__lineBtn}>Edit</span>
              </div>
            </div>
            <div className={styles.retail__customChannels__channelInfo__amountsRow}>
              <div className={styles.retail__customChannels__channelInfo__amount}>
                Baseline Discount
              </div>
              <div>
                <span className={styles.retail__customChannels__channelInfo__percentage}>
                  {channel.baseDiscount}
                </span>
                <span className={styles.retail__customChannels__channelInfo__lineBtn}>Edit</span>
              </div>
            </div>
            <div className={styles.retail__customChannels__channelInfo__amountsRow}>
              <div className={styles.retail__customChannels__channelInfo__amount}>
                Maximum Discount
              </div>
              <div>
                <span className={styles.retail__customChannels__channelInfo__percentage}>
                  {channel.maxDiscount}
                </span>
                <span className={styles.retail__customChannels__channelInfo__lineBtn}>Edit</span>
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
                <WhiteButton>
                  Copy URL
                </WhiteButton>
              </div>
            </div>
            <div className={styles.retail__customChannels__channelInfo__delete}>
              Delete Channel
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
  return (
    <>
      <Row>
        <Col lg={7}>
          <h2 className={styles.retail__customChannels__heading}>
            Custom Channels
          </h2>
          <div className={styles.retail__customChannels__text}>
            Add custom channels here - every channel includes a unique QR code you can use on
            {' '}
            packaging, inserts or display so you can opt to track where your customers came
            {' '}
            from when they signup.
          </div>
        </Col>
        <Col lg={12}>
          <h5 className={styles.retail__customChannels__subHeading}>
            Active Channels
          </h5>
        </Col>
        <Col lg={8} className="px-2">
          {channelsData.map((channel) => (
            <>
              <div className={channel.isActive
                ? styles.retail__customChannels__channel__active
                : styles.retail__customChannels__channel}
              >
                <div className={styles.retail__customChannels__channel__name}>
                  {channel.name}
                </div>
                <div className={styles.retail__customChannels__channel__arrow}>
                  <ArrowRightLogo onClick={() => handleChannelClick(channel)} />
                </div>
              </div>
            </>
          ))}
          <div className={styles.retail__customChannels__addBtn}>
            <WhiteButton onClick={() => { setShowAddChannelPopup(true); }}>
              Add Channel
            </WhiteButton>
          </div>
        </Col>
        <Col lg={4}>
          { showChannelInfo
            && <ChannelInfo channel={channelInfoData} />}
        </Col>
      </Row>
      <AddChannelBox
        show={showAddChannelPopup}
        values={{
          minDiscount: '10',
          maxDiscount: '40',
          commission: '10',
        }}
        handleClose={() => setShowAddChannelPopup(false)}
      />
    </>
  );
};

export default CustomChannels;

const channelsData = [
  {
    name: 'Retail - Los Angeles',
    commision: '10%',
    baseDiscount: '10%',
    maxDiscount: '20%',
    isActive: true,
  },
  {
    name: 'Amazon',
    commision: '15%',
    baseDiscount: '10%',
    maxDiscount: '30%',
    isActive: false,
  },
  {
    name: 'Coachella 2022',
    commision: '20%',
    baseDiscount: '5%',
    maxDiscount: '30%',
    isActive: false,
  },
  {
    name: 'Whole Foods',
    commision: '10%',
    baseDiscount: '10%',
    maxDiscount: '20%',
    isActive: false,
  },
];
