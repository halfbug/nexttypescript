import * as React from 'react';
import ProductLogo from 'assets/images/viral-product-icon.svg';
import styles from 'styles/ViralityScoreBox.module.scss';

const ViralityScoreBox = (props: { score: any; }) => {
  const { score } = props;

  return (
    <div className={styles.viralityScoreBox}>

      <div className={styles.viralityScoreBox__score_area}>
        <div className={styles.viralityScoreBox__score_area__txt}>
          Virality Score
        </div>
        <div className={styles.viralityScoreBox__score_area__tag}>{score}</div>
      </div>
      <div className={styles.viralityScoreBox__infoBox}>
        <div className={styles.viralityScoreBox__infoBox__logo}><ProductLogo /></div>
        <div className={styles.viralityScoreBox__infoBox__detail}>
          <div className={styles.viralityScoreBox__infoBox__detail__txt}>
            Insert waves here
          </div>
          <div className={styles.viralityScoreBox__infoBox__detail__generated}>
            $395 generated
          </div>
          <div className={styles.viralityScoreBox__infoBox__detail__buys}>🛒  39 buys</div>
        </div>
      </div>
    </div>

  );
};

export default ViralityScoreBox;
