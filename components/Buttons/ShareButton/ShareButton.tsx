/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Send } from 'react-bootstrap-icons';
import {
  Col, Row,
} from 'react-bootstrap';
import CopyToClipboard from 'components/Buttons/CopyToClipboard/CopyToClipboard';
import { GroupshopContext } from 'store/groupshop.context';
import { useQRCode } from 'next-qrcode';
import PopoverButton, { PopoverButtonProps } from '../PopoverButton/PopoverButton';
import SocialButton from '../SocialButton/SocialButton';

type ShareButtonProps = {
  shareurl: string;

}& React.ComponentPropsWithoutRef<'button'> & PopoverButtonProps & Omit<PopoverButtonProps, 'icon'>

const ShareButton = ({
  label, className, shareurl, placement, disabled, popContent, icon, onClick,
}: ShareButtonProps) => {
  const { gsctx, dispatch } = useContext(GroupshopContext);
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
          <Row className="p-2">
            <Col className="p-0 d-flex justify-content-center"><SocialButton network="Email" url={shareurl} /></Col>
            <Col className="p-0 d-flex justify-content-center"><SocialButton network="Instagram" url={shareurl} /></Col>
            <Col className="p-0 d-flex justify-content-center"><SocialButton network="Pinterest" url={shareurl} /></Col>
            <Col className="p-0 d-flex justify-content-center"><SocialButton network="Twitter" url={shareurl} /></Col>
            <Col className="p-0 d-flex justify-content-center"><SocialButton network="Facebook" url={shareurl} /></Col>
          </Row>
        </div>
        <Row className="flex-column text-center">
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
              text={shareurl}
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
      icon={icon ?? <Send size={16} />}
      placement={placement}
    />
  );
};

export default ShareButton;
