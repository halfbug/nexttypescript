import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import {
  Facebook, Instagram, Pinterest, Twitter, Tiktok, Youtube, Link,
} from 'react-bootstrap-icons';
import { Button, Row, Col } from 'react-bootstrap';

type SocialButtonLinksProps = React.PropsWithChildren<{
  network: 'Instagram' | 'Facebook' | 'Pinterest' | 'Twitter' | 'Tiktok' | 'Youtube' |'Email';
  url: string;
}>;

const SocialButtonLinks = ({ url, network }: SocialButtonLinksProps) => {
  console.log('');
  return (
    <div>
      { network === 'Instagram' && url !== '' && (
        <Button
          className={['rounded-circle p-2 mx-1', styles.groupshop_instagram].join(' ')}
          variant="default"
          style={{ color: 'black', background: '#F0F0F0' }}
          target="_blank"
          href={url}
        >
          <Instagram className="fs-3 fw-bold" size={18} />
        </Button>
      ) }
      { network === 'Youtube' && url !== '' && (
        <Button
          className={['rounded-circle p-2 mx-1', styles.groupshop_youtube].join(' ')}
          variant="default"
          style={{ color: 'black', background: '#F0F0F0' }}
          target="_blank"
          href={url}
        >
          <Youtube className="fs-3 fw-bold" size={18} />
        </Button>
      ) }
      { network === 'Twitter' && url !== '' && (
        <Button
          className={['rounded-circle p-2 mx-1', styles.groupshop_instagram].join(' ')}
          variant="default"
          style={{ color: 'black', background: '#F0F0F0' }}
          target="_blank"
          href={url}
        >
          <Twitter className="fs-3 fw-bold" size={18} />
        </Button>
      ) }
      { network === 'Tiktok' && url !== '' && (
        <Button
          className={['rounded-circle p-2 mx-1', styles.groupshop_tiktok].join(' ')}
          variant="default"
          style={{ color: 'black', background: '#F0F0F0' }}
          target="_blank"
          href={url}
        >
          <Tiktok className="fs-3 fw-bold" size={18} />
        </Button>
      ) }
      { network === 'Facebook' && url !== '' && (
        <Button
          className={['rounded-circle p-2 mx-1', styles.groupshop_facebook].join(' ')}
          variant="default"
          style={{ color: 'black', background: '#F0F0F0' }}
          target="_blank"
          href={url}
        >
          <Facebook className="fs-3 fw-bold" size={18} />
        </Button>
      ) }
    </div>
  );
};

// SocialButtonLinks.defaultProps = {
//   link: '',
// };

export default SocialButtonLinks;
