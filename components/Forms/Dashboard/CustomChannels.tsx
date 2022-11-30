/* eslint-disable jsx-quotes */
import React, { useState, useEffect, useContext } from 'react';
import styles from 'styles/Retail.module.scss';
import {
  Form, Button, Col, Row,
} from 'react-bootstrap';
import ArrowRightLogo from 'assets/images/arrow-right.svg';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import { GET_ALL_RETAIL_TOOLS } from 'store/store.graphql';
import { useQuery } from '@apollo/client';
import { StoreContext } from 'store/store.context';
import useDimensions from 'hooks/useDimentions';
import usePagination from 'hooks/usePagination';
import Pagination from 'react-bootstrap/Pagination';
import AddChannelBox from 'components/Groupshop/AddChannelBox/AddChannelBox';
import UpdateChannel from './UpdateChannel';

const CustomChannels = () => {
  const [showChannelInfo, setShowChannelInfo] = useState<boolean>(false);
  const [refreshChannelList, setRefreshChannelList] = React.useState(false);
  const [showAddChannelPopup, setShowAddChannelPopup] = useState<boolean>(false);
  const [channelInfoData, setChannelInfoData] = useState<any>();
  const [channelList, setChannelList] = useState<any>([]);

  const { store, dispatch } = useContext(StoreContext);
  const [ref, dimensions] = useDimensions();
  const {
    loading, data, refetch,
  } = useQuery(GET_ALL_RETAIL_TOOLS, {
    variables: { storeId: store.id },
  });

  useEffect(() => {
    if (data) {
      setChannelList(data.getChannels);
    }
  }, [data]);

  const {
    screens, breakPoint, pageSize,
    totalPages, renderItems, currentPage, setCurrentPage, getPageNumbers,
  } = usePagination({
    dimensions,
    maxrows: 7,
    screens: {
      xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12,
    },
    items: channelList,
    siblingCount: 4,
  });

  useEffect(() => {
    if (refreshChannelList) {
      refetch();
      setShowAddChannelPopup(false);
      setRefreshChannelList(false);
    }
  }, [refreshChannelList]);

  const handleChannelClick = (channel: any) => {
    setShowChannelInfo(true);
    setChannelInfoData(channel);
  };

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
        <Col ref={ref} lg={8} className="px-2">
          {renderItems !== undefined && renderItems.map((channel:any) => (
            <>
              <div className={channel.isActive
                ? styles.retail__customChannels__channel__active
                : styles.retail__customChannels__channel}
              >
                <div className={styles.retail__customChannels__channel__name}>
                  {channel?.name}
                </div>
                <div className={styles.retail__customChannels__channel__arrow}>
                  <ArrowRightLogo onClick={() => handleChannelClick(channel)} />
                </div>
              </div>
            </>
          ))}
          {totalPages > 1 && (
          <Pagination className={styles.groupshop_pagination}>
            <Pagination.Prev
              className={[(currentPage === 1) ? 'd-none' : '', styles.groupshop_pagination_prev].join(' ')}
              onClick={() => {
                setCurrentPage(
                  (currentPage > 1) ? currentPage - 1 : currentPage,
                );
              }}
            />

            {getPageNumbers().map((n, index) => (
              <Pagination.Item
                active={currentPage === n}
                onClick={() => {
                  setCurrentPage(n);
                }}
                className={currentPage === n
                  ? styles.groupshop_pagination_activeItem
                  : styles.groupshop_pagination_item}
              >
                {n}
              </Pagination.Item>
            ))}

            <Pagination.Next
              className={[(currentPage === totalPages) ? 'd-none' : '', styles.groupshop_pagination_next].join(' ')}
              onClick={() => {
                setCurrentPage(
                  (currentPage >= 1 && currentPage < totalPages)
                    ? currentPage + 1
                    : currentPage,
                );
              }}
            />

          </Pagination>

          )}
          <div className={styles.retail__customChannels__addBtn}>
            <WhiteButton onClick={() => { setShowAddChannelPopup(true); }}>
              Add Channel
            </WhiteButton>
          </div>
        </Col>
        <Col lg={4}>
          { showChannelInfo && (
          <UpdateChannel
            channel={channelInfoData}
            refreshChannelList={setRefreshChannelList}
          />
          )}
        </Col>
      </Row>
      <AddChannelBox
        show={showAddChannelPopup}
        handleClose={() => setShowAddChannelPopup(false)}
        storeId={store.id}
        channelList={channelList}
        refreshChannelList={setRefreshChannelList}
      />
    </>
  );
};

export default CustomChannels;
