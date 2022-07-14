import styles from 'styles/Header.module.scss';
import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { FaEye, FaAngleDown } from 'react-icons/fa';
import { StoreContext } from 'store/store.context';

interface HeaderProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
  headingText: string
}

const Header = ({
  // eslint-disable-next-line no-unused-vars
  user, onLogin, onLogout, onCreateAccount, headingText,
}: HeaderProps) => {
  const { store: { brandName } } = React.useContext(StoreContext);
  return (
    <header className={styles.header}>
      <Row>
        <Col>
          <h1>
            {headingText}
          </h1>
        </Col>

        <Col className={styles.header_btn_div}>
          <div className={styles.header_head_btn1}>
            <div className={styles.header__overlay}>
              <div className={styles.header__overlayText}>Coming Soon</div>
            </div>
            <Button className={styles.header_btn} size="lg">
              View Groupshop
            </Button>
          </div>

          <div className={styles.header_head_btn2}>
            Welcome
            {'  '}
            {brandName}
            {/* <Button className={styles.header_btn} size="lg">
            LESABLE
            {' '}
            <FaAngleDown size={20} />
          </Button> */}
          </div>
        </Col>
      </Row>

    </header>
  );
};

Header.defaultProps = {
  user: {},
};

export default Header;
