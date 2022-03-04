import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import {
  FacebookShareButton, TwitterShareButton, PinterestShareButton, EmailShareButton, EmailIcon,
} from 'react-share';
import {
  Facebook, Instagram, Pinterest, Twitter, Tiktok, Youtube, Chat,
} from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';

type SocialButtonProps = React.PropsWithChildren<{
  network: 'Instagram' | 'Facebook' | 'Pinterest' | 'Twitter' | 'Tiktok' | 'Youtube' |'Email';
  url: string;
}>;

const SocialButton = ({
  url, network, children,
}: SocialButtonProps) => (

  <Button className={['rounded-pill p-2', styles[`groupshop_${network.toLowerCase()}`]].join(' ')} variant="secondary" href={url} target="_blank">
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
        <FacebookShareButton
          url={url}
          quote="Send special discounts to your friends by sharing this Groupshop page with them. If you also shopped from this page, you’ll earn cashback every time they shop with you."
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
          media="https://uploads-ssl.webflow.com/61897c94beba7addd32eff3a/618b60f014f6282a172433d0_dashboard-new.png"
          title="Groupshop"
          url={url}
        >
          <Pinterest className="fs-3 fw-bold" />
        </PinterestShareButton>
      )}

    {network === 'Twitter'
      && (
        <TwitterShareButton
          title="Groupshop"
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
            text: `Send special discounts to your friends by sharing this ${url}`,
          })}
        />
      )}

    {network === 'Email'
      && (
        <EmailShareButton
          subject="Groupshop"
          body="Send special discounts to your friends by sharing your Groupshop"
          url={url}
        >
          <Chat className="fs-3 fw-bold" />
        </EmailShareButton>
      )}

  </Button>
);

// SocialButton.defaultProps = {
//   message: undefined,
// };

export default SocialButton;
