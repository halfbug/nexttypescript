/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Send } from 'react-bootstrap-icons';
import {
  Button, Col, OverlayTrigger, Popover, Row,
} from 'react-bootstrap';
import CopyToClipboard from 'components/Buttons/CopyToClipboard/CopyToClipboard';
import PopoverButton, { PopoverButtonProps } from '../PopoverButton/PopoverButton';
import SocialButton from '../SocialButton/SocialButton';
import QRCode from '../../../assets/images/qr-code.svg';

type ShareButtonProps = {
  shareurl: string;

}& React.ComponentPropsWithoutRef<'button'> & PopoverButtonProps & Omit<PopoverButtonProps, 'icon'>

const ShareButton = ({
  label, className, shareurl, placement, disabled, popContent, icon, onClick,
}: ShareButtonProps) => (
  <PopoverButton
    disabled={disabled}
    onClick={onClick}
    popContent={popContent ?? (
      <div className="pt-1">
        <CopyToClipboard value={shareurl} />
        <Row className="p-2">
          <Col className="p-0 d-flex justify-content-center"><SocialButton network="Email" url={shareurl} /></Col>
          <Col className="p-0 d-flex justify-content-center"><SocialButton network="Instagram" url={shareurl} /></Col>
          <Col className="p-0 d-flex justify-content-center"><SocialButton network="Pinterest" url={shareurl} /></Col>
          <Col className="p-0 d-flex justify-content-center"><SocialButton network="Twitter" url={shareurl} /></Col>
          <Col className="p-0 d-flex justify-content-center"><SocialButton network="Facebook" url={shareurl} /></Col>
        </Row>
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
          <Col><QRCode /></Col>
          <Col><h6>Scan to share on mobile</h6></Col>
        </Row>
      </div>
    )}
    label={label}
    className={className}
    icon={icon ?? <Send size={16} />}
    placement={placement}
  />

);

export default ShareButton;
