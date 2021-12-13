/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Header.module.scss';

// import Button from 'components/Buttons/Button/Button';
import { Col, Row, Button } from 'react-bootstrap';
import { ArrowDown, CaretDown, Eye } from 'react-bootstrap-icons';
// import './header.css';

interface HeaderProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
  headingText: string
}

const Header = ({
  user, onLogin, onLogout, onCreateAccount, headingText,
}: HeaderProps) => (
  <header>
    <div className="wrapper">
      <Row>
        <Col>
          <div>

            <h1 className={styles.h1}>{headingText}</h1>
          </div>
        </Col>
        <Col>
          <div className={styles.btn_div}>
            <Col className={styles.head_btn}>
              <Eye color="black" size={20} />
              <Button variant="light">
                View Groupshop
              </Button>
            </Col>
            { ' ' }
            <Col className={styles.head_btn2}>
              <Button variant="light">
                LE SABLE
              </Button>
              <CaretDown color="black" size={20} />
            </Col>
          </div>
        </Col>
      </Row>
    </div>
  </header>
);

Header.defaultProps = {
  user: {},
};

export default Header;
