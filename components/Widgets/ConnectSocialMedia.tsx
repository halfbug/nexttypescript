import * as React from 'react';
import { Col } from 'react-bootstrap';
import styles from 'styles/Knowledgebase.module.scss';
import SocialButtonLinks from 'components/Buttons/SocialButtonLinks/SocialButtonLinks';

const ConnectSocialMedia = () => (

  <section className={styles.Kb_gradBox}>
    <Col>
      <h4>Connect</h4>
    </Col>
    <section className="d-flex justify-content-start px-0">
      <div className="ms-0">
        {' '}
        <SocialButtonLinks network="Instagram" url="https://www.instagram.com/groupshopit/" />
      </div>

      <div className="mx-1">
        {' '}
        <SocialButtonLinks network="Youtube" url="https://www.youtube.com/channel/UC5wNrCmFz1CYt4jfY5pA5fA" />
        {' '}
      </div>

      <div className="mx-1">
        {' '}
        <SocialButtonLinks network="Tiktok" url="https://www.tiktok.com/@groupshopit?lang=en" />
        {' '}
      </div>
      <div className="mx-1">
        {' '}
        <SocialButtonLinks network="Twitter" url="https://twitter.com/groupshopit" />
        {' '}
      </div>
    </section>

  </section>

);

export default ConnectSocialMedia;
