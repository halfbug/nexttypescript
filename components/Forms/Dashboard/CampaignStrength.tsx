/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Overview.module.scss';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import { Accordion, Container } from 'react-bootstrap';
import GradientProgressBar from 'components/Groupshop/GradientProgressBar/GradientProgressBar';
import ElectricIcon from 'assets/images/Electric-icon.svg';

export default function CampaignStrength() {
  return (
    <Container>
      <div className={styles.strength}>
        <div className={styles.strength__header}>
          <h3>Campaign Strength</h3>
        </div>
        <div className={styles.strength__barArea}>
          <GradientProgressBar progress={60} className={styles.strength__progressBar} />
          <ElectricIcon />
        </div>
        <Accordion className={styles.strength__acc}>
          <Accordion.Item eventKey="0" className="border-0 border-bottom">
            <Accordion.Header className={styles.strength__ques}>
              <div className={styles.strength__ques__name}>
                Enable email/SMS marketing
              </div>
            </Accordion.Header>
            <Accordion.Body className={styles.strength__acc_body}>
              It’s a personalized shopping page we create
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="border-0 border-bottom">
            <Accordion.Header className={styles.strength__ques}>
              <div className={styles.strength__ques__name}>
                Recover abandoned carts
              </div>
            </Accordion.Header>
            <Accordion.Body className={styles.strength__acc_body}>
              It’s a personalized shopping page we create
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="border-0 border-bottom">
            <Accordion.Header className={styles.strength__ques}>
              <div className={styles.strength__ques__name}>
                Customize product page banners
              </div>
            </Accordion.Header>
            <Accordion.Body className={styles.strength__acc_body}>
              It’s a personalized shopping page we create
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className={['mt-3', styles.strength__viewAll].join(' ')}>
          <WhiteButton>View all settings</WhiteButton>
        </div>

        <div className={`${styles.strength__experience} mt-5`}>
          <div className="mt-3">
            <RightArrowIcon />
          </div>
          <div className={`${styles.strength__experience__trow}`}>
            Maximize your Groupshop experience
          </div>
          <div className={`${styles.strength__experience__brow} mb-3`}>
            Get access to tips
            {' '}
            &
            {' '}
            tricks to transform your brand with us.
          </div>
        </div>
      </div>
    </Container>
  );
}

const ArrowIcon = () => (
  <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.75005 8.8751C1.53671 8.8751 1.32338 8.78934 1.16088 8.61872C0.835046 8.2766 0.835046 7.7236 1.16088 7.38147L3.91505 4.4896L1.26505 1.60822C0.945879 1.25997 0.955046 0.706096 1.28588 0.370971C1.61755 0.0358458 2.14505 0.0454708 2.46421 0.391971L5.68255 3.89197C5.99838 4.23585 5.99421 4.78097 5.67255 5.11872L2.33921 8.61872C2.17671 8.78934 1.96338 8.8751 1.75005 8.8751Z" fill="#CFB9E4" />
  </svg>
);

const RightArrowIcon = () => (
  <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.7071 8.70711C19.0976 8.31658 19.0976 7.68342 18.7071 7.29289L12.3431 0.928932C11.9526 0.538408 11.3195 0.538408 10.9289 0.928932C10.5384 1.31946 10.5384 1.95262 10.9289 2.34315L16.5858 8L10.9289 13.6569C10.5384 14.0474 10.5384 14.6805 10.9289 15.0711C11.3195 15.4616 11.9526 15.4616 12.3431 15.0711L18.7071 8.70711ZM0 9H18V7H0V9Z" fill="black" />
  </svg>
);
