import React, { useState, useEffect, useContext } from 'react';
import InfoIcon from 'assets/images/info-icon-medium.svg';
import styles from 'styles/Analytics.module.scss';
import ProductLogo from 'assets/images/viral-product-icon.svg';
import vstyles from 'styles/ViralityScoreBox.module.scss';
import { useQuery } from '@apollo/client';
import { GET_MOST_VIRAL_PRODUCTS } from 'store/store.graphql';
import useUtilityFunction from 'hooks/useUtilityFunction';
import ViralityScoreBox from './ViralityScoreBox';

interface ViralityProp{
  startDate: any;
  endDate: any;
  currencyCode: any;
  shop: any;
}

export default function ViralityMetrics({
  startDate, endDate, currencyCode, shop,
} : ViralityProp) {
  const [mostViralProducts, setMostViralProducts] = useState<any>([]);
  const { formatNumber } = useUtilityFunction();
  const {
    loading, error, data, refetch,
  } = useQuery(GET_MOST_VIRAL_PRODUCTS, {
    variables: { shop, startDate, endDate },
  });

  useEffect(() => {
    if (data) {
      setMostViralProducts(data?.mostViralProducts);
    }
  }, [data]);
  return (
    <div className={styles.viralityMetrics}>
      <div className={styles.viralityMetrics__header}>
        <h3>Virality Metrics</h3>
      </div>
      <div className={styles.viralityMetrics__body}>
        <div className={styles.viralityMetrics__body__heading}>
          Most Viral Products
          <InfoIcon />
        </div>
        {mostViralProducts?.map((part: any, index: number) => (
          <>
            <div className={vstyles.viralityScoreBox}>
              <div className={vstyles.viralityScoreBox__infoBox}>
                <div className={vstyles.viralityScoreBox__infoBox__logo}>
                  <img className="img-responsive" style={{ width: '88px' }} src={part?.productDetails[0].featuredImage} alt="product" />
                </div>
                <div className={vstyles.viralityScoreBox__infoBox__detail}>
                  <div className={vstyles.viralityScoreBox__infoBox__detail__txt}>
                    {part?.productDetails[0].title}
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
        ))}
        {mostViralProducts.length === 0 && (
          <div className={styles.customerData__mostViral__noRecord}>No product found!</div>
        )}

      </div>
    </div>

  );
}
