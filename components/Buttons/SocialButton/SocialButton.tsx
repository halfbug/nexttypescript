import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import {
  Facebook, Instagram, Pinterest, Twitter, Tiktok,
} from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';

type SocialButtonProps =React.PropsWithChildren<{
  network: 'Instagram' | 'Facebook' | 'Pinterest' | 'Twitter'| 'Tiktok' ;
    url: string ;
}>;

const SocialButton = ({
  url, network, children,
}: SocialButtonProps) => (

  <Button className={['rounded-pill p-2', styles[`groupshop_${network.toLowerCase()}`]].join(' ')} variant="secondary" href={url} target="_blank">
    {network === 'Instagram'
    && <Instagram className="fs-3 fw-bold" />}

    {network === 'Facebook'
    && <Facebook className="fs-3 fw-bold" />}

    {network === 'Pinterest'
    && <Pinterest className="fs-3 fw-bold" />}

    {network === 'Twitter'
    && <Twitter className="fs-3 fw-bold" />}

    {network === 'Tiktok'
    && <Tiktok className="fs-3 fw-bold" />}

  </Button>
);

// SocialButton.defaultProps = {
//   message: undefined,
// };

export default SocialButton;
