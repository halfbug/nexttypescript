import React, { useState, useEffect, useContext } from 'react';
import InfoIcon from 'assets/images/info-icon-medium.svg';
import styles from 'styles/Analytics.module.scss';
import ProductLogo from 'assets/images/viral-product-icon.svg';
import vstyles from 'styles/ViralityScoreBox.module.scss';
import { useQuery } from '@apollo/client';
import { GET_MOST_VIRAL_PRODUCTS } from 'store/store.graphql';
import useUtilityFunction from 'hooks/useUtilityFunction';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import ViralityScoreBox from './ViralityScoreBox';

interface ViralityProp{
  mostViralProducts: any;
  currencyCode: any;
}

export default function ViralityMetrics({
  mostViralProducts, currencyCode,
} : ViralityProp) {
  const { formatNumber } = useUtilityFunction();

  return (
    <div className={styles.viralityMetrics}>
      <div className={styles.viralityMetrics__header}>
        <h3>Virality Metrics</h3>
      </div>
      <div className={styles.viralityMetrics__body}>
        <div className={[styles.viralityMetrics__body__heading, 'mb-3'].join(' ')}>
          Most Viral Products

          <ToolTip
            placement="bottom"
            className={['d-flex align-item-center', styles.dashboard_campaign__pop].join(' ')}
            icon={<InfoIcon />}
            popContent="Your products Virality Score takes into account the
            amount of revenue, sales, and unique clicks generated on Groupshop pages."
          />
        </div>
        {mostViralProducts?.map((part: any, index: number) => (
          <>
            {part?.productDetails[0]?.title && (
            <>
              <div className={vstyles.viralityScoreBox}>
                <div className={vstyles.viralityScoreBox__infoBox}>
                  <div className={vstyles.viralityScoreBox__infoBox__logo}>
                    <img className="img-responsive" style={{ width: '88px' }} src={part?.productDetails[0]?.featuredImage} alt="product" />
                  </div>
                  <div className={vstyles.viralityScoreBox__infoBox__detail}>
                    <div className={vstyles.viralityScoreBox__infoBox__detail__txt}>
                      {part?.productDetails[0]?.title}
                    </div>
                    <div className={vstyles.viralityScoreBox__infoBox__detail__generated}>
                      {currencyCode}
                      {formatNumber(part?.revenue)}
                      {' '}
                      generated
                    </div>
                    <div className={vstyles.viralityScoreBox__infoBox__detail__buys}>
                      🛒
                      {' '}
                      {part?.purchaseCount}
                      {' '}
                      buys
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.viralityMetrics__body__hr} />
            </>
            )}
          </>
        ))}
        {mostViralProducts.length === 0 && (
          <div className={styles.customerData__mostViral__noRecord}>No product found!</div>
        )}

      </div>
    </div>

  );
}
