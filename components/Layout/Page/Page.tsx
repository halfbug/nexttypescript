import React from 'react';
import Header from 'components/Layout/Header/Header';
import { Col, Container, Row } from 'react-bootstrap';
// import './page.css';
import styles from 'styles/Sidebar.module.scss';
import useStore from 'hooks/useStore';
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
