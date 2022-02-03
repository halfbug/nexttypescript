/* eslint-disable jsx-quotes */
import React from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import {
  Row, Col,
  TabPane, TabContainer, Tab, Nav,
} from 'react-bootstrap';
import { FaStore, FaBullhorn } from 'react-icons/fa';
import { FiLayout } from 'react-icons/fi';
import styles from 'styles/DbSetting.module.scss';
import BrandInfo from 'components/Forms/BrandInfo';
import GeneralSettings from 'components/Forms/Dashboard/GeneralSettings';
import LayoutSettings from 'components/Forms/Dashboard/LayoutSettings';

const Settings: NextPage = () => (
  <Page headingText="Settings" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
    <Row className={styles.setting_tab}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="General">
        <Row>
          <Col lg={12}>
            <Nav>
              <Nav.Item className='col-lg-4'>
                <Nav.Link eventKey="General">
                  <Row className={styles.setting_tab_general}>
                    <Col>
                      <FaStore size={24} />
                      <h4>
                        General
                      </h4>
                      <TabPane eventKey="General" title="General" />
                    </Col>
                  </Row>

                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='col-lg-4'>
                <Nav.Link eventKey="Layout">
                  <Row className={styles.setting_tab_layout}>
                    <Col>
                      <FiLayout size={24} />
                      <h4>
                        Layout
                      </h4>
                      <TabPane eventKey="Layout" title="Layout" />
                    </Col>
                  </Row>

                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='col-lg-4'>
                <Nav.Link eventKey="Marketing">
                  <Row className={styles.setting_tab_marketing_tool}>
                    <Col>
                      <FaBullhorn size={24} />
                      <h4>
                        Marketing Tools
                      </h4>
                      <TabPane eventKey="Marketing" title="Marketing" />
                    </Col>
                  </Row>

                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="General">
                <GeneralSettings />
              </Tab.Pane>
              <Tab.Pane eventKey="Layout">
                <LayoutSettings />
              </Tab.Pane>
              <Tab.Pane eventKey="Marketing">
                adasd
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Row>
  </Page>
  // <div className="grid">
  // eslint-disable-next-line max-len
  //   <Page headingText="Settings" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
  //     <Row className={styles.setting_tab}>
  //       <TabContainer id="uncontrolled-tab-example">
  //         <div className="col-lg-3">
  //           <Col className={styles.setting_tab_general}>
  //             <FaStore size={24} color="#835CC6" />
  //             <h4>
  //               General
  //             </h4>
  //             <TabPane eventKey="General" title="General" />
  //           </Col>
  //         </div>
  //         <div className="col-lg-3">
  //           <Col className={styles.setting_tab_layout}>
  //             <TabPane eventKey="Layout" title="Layout" />
  //             <FiLayout size={24} color="#F7BC7D" />
  //             <h4>Layout</h4>
  //           </Col>
  //         </div>
  //         <div className="col-lg-3">
  //           <Col className={styles.setting_tab_marketing_tool}>
  //             <FaBullhorn size={24} color="#F28BF4" />
  //             <TabPane eventKey="Marketing Tools" title="Marketing Tools" />
  //             <h4>Marketing Tools</h4>
  //           </Col>
  //         </div>
  //       </TabContainer>
  //     </Row>
  //     <h3 className={styles.setting_tab_heading}>Brand Details</h3>
  //     <Row className={styles.setting_col}>
  //       <div className="col-lg-8">
  //         <Col className={styles.setting_col_purplebox}>
  //           <BrandInfo />
  //         </Col>
  //       </div>
  //       <div className="col-lg-4">
  //         <Col className={styles.setting_col_greenbox}>
  //           <h4 className={styles.setting_col_subheading}>Your Industry</h4>
  //           {' '}
  //           <select
  //             className="form-select"
  //             aria-label="Default select example"
  //             name="industry"
  //           >
  //             <option selected>Click to select</option>
  //             <option value="1">One</option>
  //             <option value="2">Two</option>
  //             <option value="3">Three</option>
  //           </select>
  //         </Col>
  //       </div>
  //     </Row>
  //   </Page>
  // </div>
);

export default Settings;
