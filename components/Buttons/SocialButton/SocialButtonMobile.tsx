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
  text?: string;
}>;

const SocialButtonMobile = ({
  url, network, text, children, ...props
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
            text: `${text} ${url}`,
          })}
        />
      )}

    {network === 'Youtube'
      && (
        <Youtube
          className="fs-3 fw-bold"
          onClick={() => navigator?.share({
            title: 'Groupshop',
            text: `${text} ${url}`,
          })}
        />
      )}

    {network === 'Facebook'
      && (
        <Facebook
          className="fs-3 fw-bold"
          onClick={() => navigator?.share({
            title: 'Groupshop',
            text: `${text} ${url}`,
          })}
        />
      )}

    {network === 'Pinterest'
      && (
      <Pinterest
        className="fs-3 fw-bold"
        onClick={() => navigator?.share({
          title: 'Groupshop',
          text: `${text} ${url}`,
        })}
      />
      )}

    {network === 'Twitter'
      && (
      <Twitter
        className="fs-3 fw-bold"
        onClick={() => navigator?.share({
          title: 'Groupshop',
          text: `${text} ${url}`,
        })}
      />
      )}

    {network === 'Tiktok'
      && (
        <Tiktok
          className="fs-3 fw-bold"
          onClick={() => navigator?.share({
            title: 'Groupshop',
            text: `${text} ${url}`,
          })}
        />
      )}

    {network === 'Email'
      && (
      <Chat
        className="fs-3 fw-bold"
        onClick={() => navigator?.share({
          title: 'Groupshop',
          text: `${text} ${url}`,
        })}
      />
      )}

  </Button>
);

SocialButtonMobile.defaultProps = {
  text: '',
};

export default SocialButtonMobile;
