import React, { useState, useEffect, useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import styles from 'styles/Partner.module.scss';
import { StoreContext } from 'store/store.context';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_PARTERS, UPDATE_PARTNER_GROUPSHOP } from 'store/store.graphql';
import { InfoCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import UniqueClicksLogo from 'assets/images/unique-clicks.svg';
import ArrowRightLogo from 'assets/images/arrow-right.svg';
import useUtilityFunction from 'hooks/useUtilityFunction';
import { IPartnerTools } from 'types/store';
import AffiliateDetail from './AffiliateDetail';

interface ActiveAffiliateProps {
  partnerList: any[];
  handleAfterSubmit: any;
}

export default function ActiveAffiliate({ partnerList, handleAfterSubmit }: ActiveAffiliateProps) {
  const { store, dispatch } = useContext(StoreContext);
  const [partnerId, setPartnerId] = useState('');
  const [partnerCommission, setPartnerCommission] = useState('');
  const [showSidebar, setshowSidebar] = React.useState(true);
  const [partnerRewards, setpartnerRewards] = useState({
    minDiscount: '',
    maxDiscount: '',
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
    setShowAffiliateDetail(true);
    setshowSidebar(false);
    setpartnerRewards({
      minDiscount: currentPartner[0].partnerRewards.baseline.replace('%', ''),
      maxDiscount: currentPartner[0].partnerRewards.maximum.replace('%', ''),
    });
  };

  return (
    <>
      <Col xxl={8} xl={8} lg={8} md={8} xs={12}>
        <section className={styles.partner__box_2}>
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
          {partnerList.map((part: any, index: number) => (
            <Row className={styles.partner__data_row}>
              <Col xl={2} lg={2} md={2}>
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
                <div className={styles.partner__data_row__name}>
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
                  428 generated
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
                className="d-flex justify-content-center"
                onClick={() => {
                  handlePartner(part.id);
                }}
              >
                <ArrowRightLogo />
              </Col>
            </Row>
          ))}
        </section>
      </Col>
      <Col xxl={4} xl={4} lg={4} md={4} xs={12}>
        {showAffiliateDetail && (
        <AffiliateDetail
          handleAfterSubmit={handleAfterSubmit}
          partnerId={partnerId}
          partnerCommission={partnerCommission}
          partnerRewards={partnerRewards}
          partnerDetails={partnerDetails}
          setshowSidebar={setshowSidebar}
          showSidebar={showSidebar}
        />
        )}
      </Col>
    </>
  );
}
