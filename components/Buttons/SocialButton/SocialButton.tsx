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

const SocialButton = ({
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
        <FacebookShareButton
          url={url}
          // quote="Send special discounts to your friends by sharing this
          // Groupshop page with them. If you also shopped from this page,
          // you’ll earn cashback every time they shop with you."
          quote={`${text} ${url}`}
          hashtag="#Groupshop"
          // description="aiueo"
          className="Demo__some-network__share-button"
        >
          <Facebook className="fs-3 fw-bold" />
        </FacebookShareButton>
      )}

    {network === 'Pinterest'
      && (
        <PinterestShareButton
          media={props.media}
          // title="Groupshop"
          title={`${text}`}
          url={url}
        >
          <Pinterest className="fs-3 fw-bold" />
        </PinterestShareButton>
      )}

    {network === 'Twitter'
      && (
        <TwitterShareButton
          // title="Groupshop"
          title={`${text}`}
          url={url}
          hashtags={['groupshop', 'shopwithfriends']}
        >
          <Twitter className="fs-3 fw-bold" />
        </TwitterShareButton>
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
        <EmailShareButton
          subject="Groupshop"
          body={`${text}`}
          url={url}
        >
          <Chat className="fs-3 fw-bold" />
        </EmailShareButton>
      )}

  </Button>
);

SocialButton.defaultProps = {
  text: '',
};

export default SocialButton;
