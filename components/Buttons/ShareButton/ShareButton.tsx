/* eslint-disable import/no-unresolved */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Send } from 'react-bootstrap-icons';
import {
  Col, Row,
} from 'react-bootstrap';
import CopyToClipboard from 'components/Buttons/CopyToClipboard/CopyToClipboard';
import { useQRCode } from 'next-qrcode';
import useDeal from 'hooks/useDeal';
import PopoverButton, { PopoverButtonProps } from '../PopoverButton/PopoverButton';
import SocialButton from '../SocialButton/SocialButton';

type ShareButtonProps = {
  shareurl: string;
  fullshareurl: string;

}& React.ComponentPropsWithoutRef<'button'> & PopoverButtonProps & Omit<PopoverButtonProps, 'icon'>

const ShareButton = ({
  label, className, popoverClassName, shareurl, fullshareurl, placement, disabled, popContent, icon,
  onClick,
}: ShareButtonProps) => {
  const {
    gsctx, banner, socialText, nativeShareText,
  } = useDeal();
  const { discountCode: { percentage } } = gsctx;
  const { Canvas } = useQRCode();
  return (
    <PopoverButton
      disabled={disabled}
      onClick={onClick}
      popContent={popContent ?? (
      <div className="pt-1">
        <h4 className={styles.groupshop__give_off}>
          Give friends
          {' '}
          { percentage }
          % off
        </h4>
        <CopyToClipboard value={shareurl} />
        <div className={styles.groupshop__share_social_icons}>
          <Row className="p-3">
            <Col className="p-0 d-flex justify-content-center"><SocialButton text={socialText} network="Email" url={shareurl} /></Col>
            <Col className="p-0 d-flex justify-content-center"><SocialButton text={socialText} network="Instagram" url={shareurl} /></Col>
            <Col className="p-0 d-flex justify-content-center"><SocialButton text={socialText} network="Pinterest" url={shareurl} media={banner} /></Col>
            <Col className="p-0 d-flex justify-content-center"><SocialButton text={socialText} network="Twitter" url={shareurl} /></Col>
            <Col className="p-0 d-flex justify-content-center"><SocialButton text={socialText} network="Facebook" url={shareurl} /></Col>
          </Row>
        </div>
        <Row className="flex-column text-center p-2">
          {/* <Col><h3>Shop, share, earn</h3></Col>
        <Col>
          <p>
            Send special discounts to your
            friends by sharing this Groupshop page
            with them. If you also shopped from this
            page, you’ll earn cashback every time they shop with you.
          </p>

        </Col> */}
          <Col>
            <Canvas
              text={`${fullshareurl}/qrscan&mobile`}
              options={{
                type: 'image/jpeg',
                quality: 0.3,
                level: 'L',
                margin: 3,
                scale: 4,
                width: 105,
                color: {
                  dark: '#000000',
                  light: '#FFFFFF',
                },
              }}
            />
            {/* <QRCode onClick={() => navigator?.share({
              title: 'Groupshop',
              text: `Send special discounts to your friends by sharing this ${shareurl}`,
            })}
            /> */}
          </Col>
          <Col><h6 className={styles.groupshop__scan_share}>Scan to share on mobile</h6></Col>
        </Row>
      </div>
      )}
      label={label}
      className={className}
      popoverClassName={popoverClassName}
      icon={icon ?? <Send size={18} />}
      placement="top-start"
    />
  );
};

export default ShareButton;
