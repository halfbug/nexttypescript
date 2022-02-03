import React, { useContext, useEffect } from 'react';
import Header from 'components/Layout/Header/Header';
import { Col, Container, Row } from 'react-bootstrap';
// import './page.css';
import { useQuery } from '@apollo/client';
import { GET_STORE } from 'store/store.graphql';
import { useRouter } from 'next/router';
import { StoreContext } from 'store/store.context';
import styles from 'styles/Sidebar.module.scss';
import SideBar from './SideBar';
import Dynamicpages from './Dynamicpages';

interface PageProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
  headingText: string;
  children: {}
}

const Page = ({
  user, onLogin, onLogout, onCreateAccount, children, headingText,
}: PageProps) => {
  const { store } = useContext(StoreContext);

  return (
    <Container fluid>
      <SideBar />
      <div className={styles.rightcontentwrap}>
        <Row>
          <Col className="mt-4">
            <Row className="text-start">
              <Col>
                {' '}
                <Header
                  user={user}
                  onLogin={onLogin}
                  onLogout={onLogout}
                  onCreateAccount={onCreateAccount}
                  headingText={headingText}
                />
              </Col>

            </Row>
            <Row>
              {children}
            </Row>

          </Col>
        </Row>

      </div>
    </Container>
  );
};
Page.defaultProps = {
  user: {},
};

export default Page;
