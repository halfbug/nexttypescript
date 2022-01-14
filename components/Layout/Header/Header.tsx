/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Header.module.scss';
import { Col, Row, Button } from 'react-bootstrap';
import { FaEye, FaAngleDown } from 'react-icons/fa';

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
  <header className={styles.header}>
    <div className="wrapper">
      <Row>
        <Col>

          <h1>
            {' '}
            {headingText}
          </h1>

        </Col>
        <Col className={styles.head_btn}>

          <div className={styles.head_btn_head_btn1}>
            <Button className="styles.header_" variant="outline-primary" size="lg">
              <FaEye size={16} />
              { ' ' }
              View Groupshop
            </Button>
          </div>
          <div className="">
            <Button className="" variant="outline-primary" size="lg">
              LE SABLE
              { ' ' }
              <FaAngleDown size={16} />
            </Button>
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
