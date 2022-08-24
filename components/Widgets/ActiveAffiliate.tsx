import React, { useState, useEffect, useContext } from 'react';
import {
  Col, Form, Row, Spinner,
} from 'react-bootstrap';
import styles from 'styles/Partner.module.scss';
import { StoreContext } from 'store/store.context';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_PARTERS, UPDATE_PARTNER_GROUPSHOP } from 'store/store.graphql';
import { InfoCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import UniqueClicksLogo from 'assets/images/unique-clicks.svg';
import ArrowRightLogo from 'assets/images/arrow-right.svg';
import useUtilityFunction from 'hooks/useUtilityFunction';
import useDimensions from 'hooks/useDimentions';
import usePagination from 'hooks/usePagination';
import Pagination from 'react-bootstrap/Pagination';
import { IPartnerTools } from 'types/store';
import AffiliateDetail from './AffiliateDetail';

interface ActiveAffiliateProps {
  partnerList: any[];
  handleAfterSubmit: any;
  xs?: any,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
}

const ActiveAffiliate = ({
  partnerList, handleAfterSubmit, xs = 12, sm = 12, md = 12, lg = 12, xl = 12, xxl = 12,
}: ActiveAffiliateProps) => {
  const { store, dispatch } = useContext(StoreContext);
  const [partnerId, setPartnerId] = useState('');
  const [partnerCommission, setPartnerCommission] = useState('');
  const [revenue, setRevenue] = useState('');
  const [comissionAmount, setcomissionAmount] = useState('');
  const [purchases, setPurchases] = useState('');
  const [showSidebar, setshowSidebar] = React.useState(true);
  const [groupshopLink, setGroupshopLink] = useState('');
  const [partnerRewards, setpartnerRewards] = useState({
    minDiscount: '',
    maxDiscount: '',
  });
  const [discountCode, setdiscountCode] = useState({
    title: null,
    percentage: null,
    priceRuleId: null,
  });
  const [partnerDetails, setPartnerDetails] = useState({
    email: '',
    fname: '',
    lname: '',
    shopifyCustomerId: '',
  });

  const [showAffiliateDetail, setShowAffiliateDetail] = useState(false);
  const { formatNumber, storeCurrencySymbol } = useUtilityFunction();

  const [
    editPartnerGroupshopStatus,
  ] = useMutation<IPartnerTools | null>(UPDATE_PARTNER_GROUPSHOP);

  const [ref, dimensions] = useDimensions();
  const {
    screens, breakPoint, pageSize,
    totalPages, renderItems, currentPage, setCurrentPage, getPageNumbers,
  } = usePagination<IPartnerTools>({
    dimensions,
    maxrows: 10,
    screens: {
      xs, sm, md, lg, xl, xxl,
    },
    items: partnerList || [],
    siblingCount: 4,
  });

  const handleToggle = async (id: string) => {
    const currentPartner: any = partnerList?.filter(
      (item: any) => item.id === id,
    );
    const active = currentPartner[0]?.isActive;
    const isActive = !active;
    const partnerGroupshopObj: null | any = await editPartnerGroupshopStatus({
      variables: {
        updatePartnersInput: {
          storeId: store.id,
          id,
          isActive,
        },
      },
    });
    handleAfterSubmit();
    console.log({ partnerGroupshopObj });
  };

  const handlePartner = async (id: string) => {
    const currentPartner: any = partnerList?.filter(
      (item: any) => item.id === id,
    );
    setPartnerId(id);
    setPartnerCommission(currentPartner[0].partnerCommission.replace('%', ''));
    setPartnerDetails(currentPartner[0].partnerDetails);
    setGroupshopLink(currentPartner[0].shortUrl);
    setRevenue(currentPartner[0].revenue);
    setcomissionAmount(currentPartner[0].comissionAmount);
    setPurchases(currentPartner[0].purchases);
    setShowAffiliateDetail(true);
    setshowSidebar(false);
    setpartnerRewards({
      minDiscount: currentPartner[0].partnerRewards.baseline.replace('%', ''),
      maxDiscount: currentPartner[0].partnerRewards.maximum.replace('%', ''),
    });
    setdiscountCode({
      title: currentPartner[0].discountCode.title,
      percentage: currentPartner[0].discountCode.percentage,
      priceRuleId: currentPartner[0].discountCode.priceRuleId,
    });
  };

  return (
    <>
      <Col xxl={8} xl={8} lg={8} md={8} xs={12}>
        <section ref={ref} className={styles.partner__box_2}>
          <h4 className="mt-0">
            Active Affiliates
          </h4>
          <Row className={styles.partner__light_txt}>
            Track performance and manage your current affiliates.
          </Row>
          <h4 className="mt-4 d-flex align-items-center">
            Active
            <ToolTip
              className="mx-2"
              icon={<InfoCircle size={13} />}
              popContent="Active"
            />
          </h4>
          <Row className={styles.partner__table_head}>
            <Col xl={2} lg={2} md={2}>
              Active
            </Col>
            <Col xl={3} lg={3} md={3}>
              Name
            </Col>
            <Col xl={3} lg={3} md={3}>
              Commission
            </Col>
            <Col xl={3} lg={3} md={3}>
              Revenue
            </Col>
          </Row>
          {renderItems?.map((part: any, index: number) => (
            <Row className={styles.partner__data_row}>
              <Col xl={2} lg={2} md={2}>
                {/* {<Spinner animation="border" />} */}
                <Form.Check
                  checked={part.isActive}
                  type="switch"
                  id="custom-switch-4"
                  className={styles.partner__switch}
                  onChange={() => {
                    handleToggle(part.id);
                  }}
                />
              </Col>
              <Col xl={3} lg={3} md={3}>
                <div className={['text-truncate', styles.partner__data_row__name].join(' ')}>
                  {part.partnerDetails.fname !== null ? `${part.partnerDetails.fname} ` : ''}
                  {part.partnerDetails.lname !== null ? part.partnerDetails.lname : ''}
                  {part.partnerDetails.fname === null && part.partnerDetails.lname === null ? part.partnerDetails.email : '' }

                </div>
              </Col>
              <Col xl={3} lg={3} md={3}>
                <div className={styles.partner__data_row__commission}>
                  {part.partnerCommission}
                </div>
              </Col>
              <Col xl={3} lg={3} md={3}>
                <div className={styles.partner__data_row__tag1}>
                  {storeCurrencySymbol(store?.currencyCode ?? 'USD')}
                  {formatNumber(part.comissionAmount)}
                  {' '}
                  generated
                </div>
              </Col>
              {/* <Col xl={3} lg={3} md={3}>
                <div className={styles.partner__data_row__tag2}>
                  <UniqueClicksLogo />
                </div>
              </Col> */}
              <Col
                xl={1}
                lg={1}
                md={1}
                className={styles.partner_handPointer}
                onClick={() => {
                  handlePartner(part.id);
                }}
              >
                <ArrowRightLogo />
              </Col>
            </Row>
          ))}
          <Row>
            <Col>
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
            </Col>
          </Row>
        </section>
      </Col>
      <Col xxl={4} xl={4} lg={4} md={4} xs={12}>
        {showAffiliateDetail && (
        <AffiliateDetail
          handleAfterSubmit={handleAfterSubmit}
          partnerId={partnerId}
          storeCurrency={storeCurrencySymbol(store?.currencyCode ?? 'USD')}
          groupshopLink={groupshopLink}
          revenue={formatNumber(revenue)}
          purchases={purchases}
          partnerCommission={partnerCommission}
          comissionAmount={formatNumber(comissionAmount)}
          partnerRewards={partnerRewards}
          partnerDetails={partnerDetails}
          discountDetails={discountCode}
          setshowSidebar={setshowSidebar}
          showSidebar={showSidebar}
        />
        )}
      </Col>
    </>
  );
};

ActiveAffiliate.defaultProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

export default ActiveAffiliate;
