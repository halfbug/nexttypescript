import React, {Component} from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
// import Button from '../../Buttons/Button/Button';
import {Container} from 'react-bootstrap';
import HeadLogo from "../../../assets/images/Logo.svg";
import styles from 'styles/Step0.module.scss';
// import Cart from "assets/images/cart.svg";
// import Face from "../../../assets/images/dollarface.svg";

interface IStep0Props {
  show: boolean,
}

const Step0 = ({ show }:IStep0Props) => {
  console.log('welcome component');
  return (
    <Dialogue show={show}>
    <div className={styles['WelcomeModal']}>
      <Container className={styles['headText']} style={{ marginTop: "2.5vw" }}>
        <span>Welcome to</span>
        <img src={HeadLogo} style={{ marginTop: "0.5vw" }}  alt='' />
      </Container>
      <Container className={styles['recommendationText']} style={{ marginTop: "2.5vw" }}>
        <span>We know that nothing beats a friend’s recommendation.</span>
        <span style={{ marginTop: "1.5vw" }}>
          Groupshop makes shopping together a breeze with rewards that get your
          customers excited.
        </span>
      </Container>
      <Container className={styles['shoppingCartText']}>
        <div className={styles['shoppingCartCon']} style={{ marginTop: "1vw" }}>
          <span className={styles['emoji']}>
            {/* <img src={Cart} alt="cart"/> */}
            🛒</span>
          <span>
            When your customers <strong>shop</strong> from your store, we create
            a dedicated Groupshop page for them to <strong>share</strong> with
            friends.
          </span>
        </div>
        <div className={styles['shoppingCartCon']} style={{ marginTop: "1vw" }}>
          <span className={styles['emoji']}>
          🤑
            {/* <img src='/dollarface1.svg' alt="icon"/> */}
            </span>
          <span>
            Friends get a special discount and your customers
            <strong>earn</strong> real cashback every time someone shops with
            them.
          </span>
        </div>
      </Container>
      <Container className={styles['bottomText']} style={{ marginTop: "1vw" }}>
        <div className={styles['bottomTextCon']}>
          <span>FEWER PAID ADS,</span>
          <div className={styles['paidAdsDiv']}></div>
        </div>
        <div className={styles['bottomTextCon']}>
          <span>MORE ORGANIC LEADS</span>
          <div className={styles['organicLeadsDiv']}></div>
        </div>
        <div className={styles['btnCon']}>
          <button>GET STARTED</button>
        </div>
      </Container>
      </div>
    </Dialogue>
  );
};

export default Step0;
