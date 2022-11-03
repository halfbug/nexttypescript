import * as React from 'react';
import { Col } from 'react-bootstrap';
import styles from 'styles/Knowledgebase.module.scss';
import SocialButton from 'components/Buttons/SocialButton/SocialButton';

const ConnectSocialMedia = () => (

  <section className={styles.Kb_gradBox}>
    <Col>
      <h4>Connect</h4>
    </Col>
    <section className="d-flex justify-content-start px-0">
      <div className="ms-0">
        {' '}
        <SocialButton network="Instagram" url="https://www.instagram.com/groupshopit/" />
      </div>

      <div className="mx-1">
        {' '}
        <SocialButton network="Youtube" url="https://www.youtube.com/channel/UC5wNrCmFz1CYt4jfY5pA5fA" />
        {' '}
      </div>

      <div className="mx-1">
        {' '}
        <SocialButton network="Tiktok" url="https://www.tiktok.com/@groupshopit?lang=en" />
        {' '}
      </div>
      <div className="mx-1">
        {' '}
        <SocialButton network="Twitter" url="https://www.instagram.com/groupshopit/" />
        {' '}
      </div>
    </section>

  </section>

);

export default ConnectSocialMedia;
