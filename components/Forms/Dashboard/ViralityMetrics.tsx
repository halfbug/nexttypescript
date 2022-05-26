import * as React from 'react';
import InfoIcon from 'assets/images/info-icon-medium.svg';
import styles from 'styles/Analytics.module.scss';
import ViralityScoreBox from './ViralityScoreBox';

export default function ViralityMetrics() {
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

        <ViralityScoreBox score={10} />

        <div className={styles.viralityMetrics__body__hr} />

        <ViralityScoreBox score={9} />

        <div className={styles.viralityMetrics__body__hr} />

        <ViralityScoreBox score={8} />

        <div className={styles.viralityMetrics__body__hr} />

        <ViralityScoreBox score={8} />
      </div>
    </div>

  );
}
