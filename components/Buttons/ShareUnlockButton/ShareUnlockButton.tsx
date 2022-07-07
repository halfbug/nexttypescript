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

}& React.ComponentPropsWithoutRef<'button'> & PopoverButtonProps & Omit<PopoverButtonProps, 'icon'>

const ShareUnlockButton = ({
  label, className, shareurl, placement, disabled, popContent, icon, onClick,
}: ShareButtonProps) => {
  const { gsctx, banner } = useDeal();
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
            <Col className="p-0 d-flex justify-content-center"><SocialButton network="Email" url={shareurl} /></Col>
            <Col className="p-0 d-flex justify-content-center"><SocialButton network="Instagram" url={shareurl} /></Col>
            <Col className="p-0 d-flex justify-content-center"><SocialButton network="Pinterest" url={shareurl} media={banner} /></Col>
            <Col className="p-0 d-flex justify-content-center"><SocialButton network="Twitter" url={shareurl} /></Col>
            <Col className="p-0 d-flex justify-content-center"><SocialButton network="Facebook" url={shareurl} /></Col>
          </Row>
        </div>
      </div>
      )}
      label={label}
      className={className}
      // icon={icon ?? <Send size={18} />}
      placement={placement}
    />
  );
};

export default ShareUnlockButton;
