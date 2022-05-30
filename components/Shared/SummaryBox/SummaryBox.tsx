import React from 'react';
import RevenueIcon from 'assets/images/total-revenue.png';
import CashBackIcon from 'assets/images/cashback-given.png';
import ScaleIcon from 'assets/images/average-of-order.png';
import ClickIcon from 'assets/images/unique-clicks.png';
import TrafficIcon from 'assets/images/traffic-value.png';
import PurchaseIcon from 'assets/images/number-of-purchase.png';
import Arrow1 from 'assets/images/arrow1.png';
import styles from './SummaryBox.module.scss';

const SummaryBox = (props: { label: any; value: any; iconType: any; arrowIcon: boolean }) => {
  const {
    label,
    value,
    iconType,
    arrowIcon,
  } = props;

  const renderIcon = (type: any) => {
    switch (type) {
      case 'RevenueIcon':
        return RevenueIcon.src;
      case 'CashBackIcon':
        return CashBackIcon.src;
      case 'ScaleIcon':
        return ScaleIcon.src;
      case 'ClickIcon':
        return ClickIcon.src;
      case 'TrafficIcon':
        return TrafficIcon.src;
      case 'PurchaseIcon':
        return PurchaseIcon.src;
      default:
        return '';
    }
  };

  const renderArrow = (type: any) => {
    switch (type) {
      case 'RevenueIcon':
        return Arrow1.src;
      case 'CashBackIcon':
        return Arrow1.src;
      case 'ScaleIcon':
        return Arrow1.src;
      case 'ClickIcon':
        return Arrow1.src;
      case 'TrafficIcon':
        return Arrow1.src;
      case 'PurchaseIcon':
        return Arrow1.src;
      default:
        return '';
    }
  };

  const renderStyle = (type: any) => {
    switch (type) {
      case 'RevenueIcon':
        return styles.revenue;
      case 'CashBackIcon':
        return styles.cashBack;
      case 'ScaleIcon':
        return styles.scale;
      case 'ClickIcon':
        return styles.click;
      case 'TrafficIcon':
        return styles.traffic;
      case 'PurchaseIcon':
        return styles.purchase;
      default:
        return '';
    }
  };

  // className={styles.s_box}
  return (
    <div className={[renderStyle(iconType), styles.s_box, styles.isActive_box].join(' ')}>
      <div className={styles.revenue_icon}>
        <div><img src={renderIcon(iconType)} alt="asaa" /></div>
        <div>
          {arrowIcon && (
            <img src={renderArrow(iconType)} alt="arrow" />
          )}
        </div>
      </div>
      <div className={styles.label}>
        {label}
      </div>
      <div className={styles.value}>
        {value}
      </div>
    </div>
  // <label className="label-text" {...props}>
  //   {children}
  //   {required && <span className="asterik">*</span>}
  // </label>
  );
};

export default SummaryBox;
