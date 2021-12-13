import React, { useContext, useEffect } from 'react';
import Header from 'components/Layout/Header/Header';
import { Col, Container, Row } from 'react-bootstrap';
// import './page.css';
import { useQuery } from '@apollo/client';
import { GET_STORE } from 'store/store.graphql';
import { useRouter } from 'next/router';
import { StoreContext } from 'store/store.context';
import SideBar from './SideBar';
import Review from './Review';

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
    <Container>
      <Row>
        <Col md={3} className="border-end mt-4">
          <SideBar />
          <Review />
        </Col>
        <Col md={9} className="mt-4">
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

    </Container>
  );
};
Page.defaultProps = {
  user: {},
};

export default Page;
