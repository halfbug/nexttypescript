/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import styles from 'styles/Marketing.module.scss';
import {
  Button,
} from 'react-bootstrap';
import Link from 'next/link';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import QrCodeImage from 'assets/images/qr-code-scan.png';

export default function CustomerActivation(
) {
  const gsURL = typeof window !== 'undefined' ? `${window?.location?.origin}` : '';
  return (
    <>
      <section className={styles.marketing__box_1}>
        <h4 className="d-flex align-items-center">
          Download Brand QR Code
          <span className={styles.badge}>Recommended</span>
        </h4>
        <p>
          Include a Groupshop QR code in your product packages
          to encourage customers to claim using Groupshop as soon as they receive their order.
        </p>
        <Button
          variant="link"
          type="submit"
          // variant="outline-primary"
          className={['px-4 py-1 text-decoration-none', styles.marketing_DownloadBtn].join(' ')}

        >
          <>
            <Link href={`${QrCodeImage.src}`}>
              <a className="text-decoration-none" target="_blank" style={{ cursor: 'pointer' }} download>
                Download QR Code
              </a>
            </Link>
          </>
        </Button>
        <Button variant="link" className={styles.marketing_LinkBtn}>
          <>
            <Link href={`${gsURL}/qr-code`}>
              <a target="_blank" style={{ cursor: 'pointer' }}>
                See how it works
              </a>
            </Link>
          </>
        </Button>
        <ArrowIcon />
        {/* <hr />
        <h4 className="d-flex align-items-center">
          Add a Groupshop info page to your footer
          <span className={styles.badge}>Recommended</span>
        </h4>
        <p className="mb-0">
          Educate your customers on how Groupshop works with how to’s and FAQs.
        </p>
        <Button variant="link" className={[' ms-0 ps-0 mt-0',
        styles.marketing_LinkBtn].join(' ')}>View and download our customizable template</Button>
        <ArrowIcon /> */}
      </section>

    </>
  );
}

const ArrowIcon = () => (
  <span className={styles.marketing__ArrowIcon}>
    <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.75005 8.8751C1.53671 8.8751 1.32338 8.78934 1.16088 8.61872C0.835046 8.2766 0.835046 7.7236 1.16088 7.38147L3.91505 4.4896L1.26505 1.60822C0.945879 1.25997 0.955046 0.706096 1.28588 0.370971C1.61755 0.0358458 2.14505 0.0454708 2.46421 0.391971L5.68255 3.89197C5.99838 4.23585 5.99421 4.78097 5.67255 5.11872L2.33921 8.61872C2.17671 8.78934 1.96338 8.8751 1.75005 8.8751Z" fill="#CFB9E4" />
    </svg>
  </span>
);
