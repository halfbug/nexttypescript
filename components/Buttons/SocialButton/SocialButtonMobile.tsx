import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import {
  FacebookShareButton, TwitterShareButton, PinterestShareButton, EmailShareButton, EmailIcon,
} from 'react-share';
import {
  Facebook, Instagram, Pinterest, Twitter, Tiktok, Youtube, Chat,
} from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { CustomPropsType } from 'types/groupshop';

type SocialButtonProps = React.PropsWithChildren<{
  network: 'Instagram' | 'Facebook' | 'Pinterest' | 'Twitter' | 'Tiktok' | 'Youtube' |'Email';
  url: string;
}>;

const SocialButtonMobile = ({
  url, network, children, ...props
}: SocialButtonProps & CustomPropsType) => (

  <Button
    className={['rounded-circle p-2', styles[`groupshop_${network.toLowerCase()} `]].join(' ')}
    variant="default"
    style={{ color: 'black', background: '#F0F0F0' }}
    target="_blank"
  >
    {network === 'Instagram'
      && (
        <Instagram
          className="fs-3 fw-bold"
          onClick={() => navigator?.share({
            title: 'Groupshop',
            text: `Send special discounts to your friends by sharing this ${url}`,
          })}
        />
      )}

    {network === 'Youtube'
      && (
        <Youtube
          className="fs-3 fw-bold"
          onClick={() => navigator?.share({
            title: 'Groupshop',
            text: `Send special discounts to your friends by sharing this ${url}`,
          })}
        />
      )}

    {network === 'Facebook'
      && (
        <Facebook
          className="fs-3 fw-bold"
          onClick={() => navigator?.share({
            title: 'Groupshop',
            text: `Send special discounts to your friends by sharing this ${url}`,
          })}
        />
      )}

    {network === 'Pinterest'
      && (
      <Pinterest
        className="fs-3 fw-bold"
        onClick={() => navigator?.share({
          title: 'Groupshop',
          text: `Send special discounts to your friends by sharing this ${url}`,
        })}
      />
      )}

    {network === 'Twitter'
      && (
      <Twitter
        className="fs-3 fw-bold"
        onClick={() => navigator?.share({
          title: 'Groupshop',
          text: `Send special discounts to your friends by sharing this ${url}`,
        })}
      />
      )}

    {network === 'Tiktok'
      && (
        <Tiktok
          className="fs-3 fw-bold"
          onClick={() => navigator?.share({
            title: 'Groupshop',
            text: `Send special discounts to your friends by sharing this ${url}`,
          })}
        />
      )}

    {network === 'Email'
      && (
      <Chat
        className="fs-3 fw-bold"
        onClick={() => navigator?.share({
          title: 'Groupshop',
          text: `Send special discounts to your friends by sharing this ${url}`,
        })}
      />
      )}

  </Button>
);

// SocialButton.defaultProps = {
//   message: undefined,
// };

export default SocialButtonMobile;
