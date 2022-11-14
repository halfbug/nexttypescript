import React, { useState, useEffect } from 'react';
import styles from 'styles/QrStoreDetails.module.scss';
import Link from 'next/link';
import {
  Button,
} from 'react-bootstrap';
import CopyIcon from 'assets/images/copy-icon.svg';

interface IAuthProps {
  activeGroupshops: any;
  email: string;
  brandName: string;
}
interface ICardItemProps {
  gs: any;
}

export default function QrAuthScreen({
  activeGroupshops, email, brandName,
}: IAuthProps) {
  const [customerName, setcustomerName] = useState('');

  useEffect(() => {
    if (activeGroupshops.length) {
      setcustomerName(`${activeGroupshops[0].customer?.firstName} ${activeGroupshops[0].customer?.lastName}`);
    }
    console.log('activeGroupshops', activeGroupshops);
  }, [activeGroupshops]);

  return (
    <>
      <div className={styles.QRContainer__content__heading}>
        <span>Account</span>
        {email}
      </div>
      <hr className={styles.QRContainer__content__container__hr1} />
      <h2 className={styles.QRContainer__content__container__title}>
        Hey
        {' '}
        {customerName}
        , here are all your Groupshops:
      </h2>
      {/* current brand's GS */}
      <div className="mb-3 pb-3">
        <p>
          {brandName}
          {' '}
          Groupshops
        </p>
        <hr className={styles.QRContainer__content__container__hr2} />
        {
          activeGroupshops.length && activeGroupshops
            .filter((gs: any) => gs?.shop?.brandName === brandName).length === 0
              && <p>No Results Found</p>
        }
      </div>
      <div className={styles.activeGroupshops}>
        {
          activeGroupshops.length && activeGroupshops
            .filter((gs: any) => gs?.shop?.brandName === brandName)
            .map((gs: any) => (
              <CardItem gs={gs} />
            ))
        }
      </div>
      {/* other brand's GS */}
      {activeGroupshops.length && activeGroupshops
        .filter((gs: any) => gs?.shop?.brandName !== brandName).length !== 0
        && (
        <div className="mb-3">
          <div>
            <p>
              You have Groupshops with other brands...
            </p>
            <hr className={styles.QRContainer__content__container__hr2} />
          </div>
          <div style={{ maxHeight: '320px', overflowY: 'auto' }} className={[styles.activeGroupshops, 'overflow-y-scroll'].join(' ')}>
            {
            activeGroupshops.length && activeGroupshops
              .filter((gs: any) => gs?.shop?.brandName !== brandName)
              .map((gs: any) => (
                <CardItem gs={gs} />
              ))
          }
          </div>
        </div>
        )}
    </>
  );
}

const CardItem = ({ gs }: ICardItemProps) => {
  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = gs?.isExpired
      ? `${window.location.href.slice(0, window.location.href.indexOf('/qr-code/'))}${gs?.groupshop?.url}/status&activated`
      : `${window.location.href.slice(0, window.location.href.indexOf('/qr-code/'))}${gs?.groupshop?.url}`;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <div key={gs.name} style={{ cursor: 'auto' }} className={styles.cardItem}>
      <div className={styles.cardItem__Wrapper}>
        <div className={styles.cardImg}>
          <img src={gs?.shop?.logoImage} className="img-fluid" alt="Brand Logo" />
        </div>
        <div className={styles.cardDetail}>
          <h2>
            {gs?.shop?.brandName}
          </h2>
          <p>
            <span>Order #</span>
            <span>{gs.name.replace('#', '')}</span>
          </p>
          <div className={styles.BtnGroup}>
            <button type="button" className="btn btn-light">
              $
              {
            gs.refundDetail
              ? Math.abs(gs?.refundDetail
                .reduce((
                  previousValue: any, currentValue: any,
                ) => (Number(previousValue) + Number(currentValue.amount)), 0)) : 0
            }
              {/* /$
              {
            gs.refundDetail
              ? Math.abs(gs?.refundDetail
                .reduce((
                  previousValue: any, currentValue: any,
                ) => (Number(previousValue) + Number(currentValue.amount)), 0)) : 0
            } */}
              {' '}
              cashback earned

            </button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div>
          <Link
            key={gs?.name}
            href={gs?.isExpired ? `${gs?.groupshop?.url}/status&activated` : gs?.groupshop?.url}
          >
            <a target="_blank">
              <Button className={styles.QRContainer__btnGroupShop}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right-square me-2" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z" />
                </svg>
                {' '}
                {' '}
                View Groupshop
              </Button>
            </a>
          </Link>
        </div>
        <div className="d-flex justify-content-end" style={{ cursor: 'pointer' }}>
          <CopyIcon className="mt-2" />
          <button
            type="button"
            className="btn btn-link p-1"
            onClick={() => copyToClipboard()}
          >
            <u>Copy Link</u>
          </button>
        </div>
      </div>
    </div>
  );
};
