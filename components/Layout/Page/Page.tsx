import React from 'react';
import Header from 'components/Layout/Header/Header';
import { Col, Container, Row } from 'react-bootstrap';
// import './page.css';
import styles from 'styles/Sidebar.module.scss';
import useStore from 'hooks/useStore';
import Head from 'next/head';
import SideBar from './SideBar';

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
  // const { store } = useContext(StoreContext);
  const store = useStore();

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Container fluid>
        <SideBar />
        <div className={styles.rightcontentwrap}>
          <Row>
            <Col className="mt-2">
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
              <Row className={styles.rightcontentwrap__body}>
                {children}
              </Row>

            </Col>
          </Row>

        </div>
      </Container>
    </>
  );
};
Page.defaultProps = {
  user: {},
};

export default Page;
