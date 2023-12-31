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
  isDrops?: boolean;
}>;

const SocialButtonMobile = ({
  url, network, text, children, isDrops, ...props
}: SocialButtonProps & CustomPropsType) => {
  const getDropsRedirection = (type: string) => {
    if (typeof window !== 'undefined') {
      switch (type) {
        case 'Instagram': {
          return (
            <Instagram
              className="fs-3 fw-bold"
              onClick={() => window.open(url)}
            />
          );
        }
        case 'Pinterest': {
          return (
            <Pinterest
              className="fs-3 fw-bold"
              onClick={() => window.open(url)}
            />
          );
        }
        case 'Twitter': {
          return (
            <Twitter
              className="fs-3 fw-bold"
              onClick={() => window.open(url)}
            />
          );
        }
        case 'Facebook': {
          return (
            <Facebook
              className="fs-3 fw-bold"
              onClick={() => window.open(url)}
            />
          );
        }
        // case 'Email': {
        //   return (
        //     <Chat
        //       className="fs-3 fw-bold"
        //       onClick={() => window.open(url)}
        //     />
        //   );
        // }
        default: return '';
      }
    }
    return false;
  };

  return (

    <Button
      className={['rounded-circle p-2', styles[`groupshop_${network.toLowerCase()} `]].join(' ')}
      variant="default"
      style={{ color: 'black', background: '#F0F0F0' }}
      target="_blank"
    >
      {
      isDrops && getDropsRedirection(network)
    }
      {!isDrops && network === 'Instagram'
      && (
        <Instagram
          className="fs-3 fw-bold"
          onClick={() => navigator?.share({
            title: 'Groupshop',
            text: `${text} ${url}`,
          })}
        />
      )}

      {!isDrops && network === 'Youtube'
      && (
        <Youtube
          className="fs-3 fw-bold"
          onClick={() => navigator?.share({
            title: 'Groupshop',
            text: `${text} ${url}`,
          })}
        />
      )}

      {!isDrops && network === 'Facebook'
      && (
        <Facebook
          className="fs-3 fw-bold"
          onClick={() => navigator?.share({
            title: 'Groupshop',
            text: `${text} ${url}`,
          })}
        />
      )}

      {!isDrops && network === 'Pinterest'
      && (
      <Pinterest
        className="fs-3 fw-bold"
        onClick={() => navigator?.share({
          title: 'Groupshop',
          text: `${text} ${url}`,
        })}
      />
      )}

      {!isDrops && network === 'Twitter'
      && (
      <Twitter
        className="fs-3 fw-bold"
        onClick={() => navigator?.share({
          title: 'Groupshop',
          text: `${text} ${url}`,
        })}
      />
      )}

      {!isDrops && network === 'Tiktok'
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
};

SocialButtonMobile.defaultProps = {
  text: '',
  isDrops: false,
};

export default SocialButtonMobile;
