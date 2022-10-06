import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Col, Container, Dropdown, Row,
} from 'react-bootstrap';
import styles from 'styles/PageNotFound.module.scss';
import Link from 'next/link';

const PageNotFound: NextPage = () => (
  <>
    <Head>
      <title>404 - Page not found</title>
    </Head>
    <section className={styles.Kb}>
      <Container>
        <Row className={styles.page_not_found}>

          <Col lg={12}>
            <div className={['pe-0 me-0', styles.Kb_notfoundsec].join(' ')}>
              <div className={styles.Kb_notfound}>
                <div className={styles.Kb_notfound4}>
                  <h1>404</h1>
                </div>
                <h2>Oops! This Page Could Not Be Found</h2>
                <p>
                  Sorry but the page you are looking for does not exist,
                  have been removed. Name changed or is temporarily unavailable

                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </>
);

export default PageNotFound;
