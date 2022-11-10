import React from 'react';
import styles from 'styles/QrStoreDetails.module.scss';
import {
  Button,
} from 'react-bootstrap';
import Smile from 'assets/images/smile.svg';
import Link from 'next/link';

interface IErrorProps {
  brandName: string;
  shop: any;
  setShowWelcome: any;
  setShowError: any;
  storeLink: string;
}

export default function QrErrorScreen({
  brandName, setShowWelcome, setShowError, shop, storeLink,
}: IErrorProps) {
  return (
    <div className={styles.QRContainer__content__congratswrapper3}>
      <div className={styles.QRContainer__content__congrats}>
        <div className={styles.QRContainer__YR__Logo}>
          <Smile />
          <Smile />
          <Smile />
        </div>
        <h2>
          We couldn’t locate a Groupshop with this email!
        </h2>
        <p className="mt-3 mb-2">
          <strong>
            Haven’t shopped on
            {' '}
            {brandName}
            {' '}
            yet?
          </strong>
          <br />
          Place your first order and you’ll receive your own Groupshop
          {' '}
          to share with friends and earn 100% cashback on your order.
        </p>
        <div>
          <Link
            href={{
              pathname: `https://${storeLink}`,
            }}
          >
            <a target="_blank">
              <Button className={styles.QRContainer__btnGroupShop}>
                Shop
                {' '}
                {brandName}
              </Button>
            </a>
          </Link>
        </div>
        <div>
          or
          {' '}
          <Link
            href={{
              pathname: '/qr-code/[shop]',
              query: { shop },
            }}
          >
            <a
              href=""
              onClick={() => {
                setShowWelcome(true);
                setShowError(false);
              }}
            >
              try again with a different email
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
