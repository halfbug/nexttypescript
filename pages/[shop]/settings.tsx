/* eslint-disable jsx-quotes */
import React, { useState } from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import {
  Row, Col,
  TabPane, TabContainer, Tab, Nav,
} from 'react-bootstrap';
import { FaStore, FaBullhorn } from 'react-icons/fa';
import { FiLayout } from 'react-icons/fi';
import styles from 'styles/DbSetting.module.scss';
import GeneralSettings from 'components/Forms/Dashboard/GeneralSettings';
import LayoutSettings from 'components/Forms/Dashboard/LayoutSettings';
import MarketingSettings from 'components/Forms/Dashboard/MarketingSettings';
import PartnerToolLogo from 'assets/images/partner-tools.svg';
import PartnerToolTransparentLogo from 'assets/images/partner-tools-transparent.svg';
import MarketingLogo from 'assets/images/marketing-tool.svg';
import MarketingTransparentLogo from 'assets/images/marketing-tools-transparent.svg';
import LayoutLogo from 'assets/images/layout.svg';
import LayoutTransparentLogo from 'assets/images/feather-layout.svg';
import GeneralLogo from 'assets/images/general.svg';
import GeneralTransparentLogo from 'assets/images/awesome-store.svg';
import PartnerSettings from 'components/Forms/Dashboard/PartnerSettings';

const Settings: NextPage = () => {
  const [tab, setTab] = useState('General');

  return (
    <Page headingText="Settings" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
      <Row className={styles.setting_tab}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="General">
          <Row>
            <Col lg={12}>
              <Nav>
                <Nav.Item className='me-1'>
                  <Nav.Link eventKey="General">
                    <Row
                      onClick={() => setTab('General')}
                      className={tab === 'General' ? styles.setting_tab_general_active : styles.setting_tab_general}
                    >
                      <Col className='ps-0'>
                        {tab === 'General' ? <GeneralTransparentLogo /> : <GeneralLogo />}
                        <h4 className='pt-1'>
                          General
                        </h4>
                        <TabPane eventKey="General" title="General" />
                      </Col>
                    </Row>

                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mx-1'>
                  <Nav.Link eventKey="Layout">
                    <Row
                      onClick={() => setTab('Layout')}
                      className={tab === 'Layout' ? styles.setting_tab_layout_active : styles.setting_tab_layout}
                    >
                      <Col className='ps-0'>
                        {tab === 'Layout' ? <LayoutTransparentLogo /> : <LayoutLogo />}
                        <h4 className='pt-1'>
                          Layout
                        </h4>
                        <TabPane eventKey="Layout" title="Layout" />
                      </Col>
                    </Row>

                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mx-1'>
                  <Nav.Link eventKey="Marketing">
                    <Row
                      onClick={() => setTab('Marketing')}
                      className={tab === 'Marketing' ? styles.setting_tab_marketing_tool_active : styles.setting_tab_marketing_tool}
                    >
                      <Col className='ps-0'>
                        {tab === 'Marketing' ? <MarketingTransparentLogo /> : <MarketingLogo />}
                        <h4 className='pt-1'>
                          Marketing Tools
                        </h4>
                        <TabPane eventKey="Marketing" title="Marketing" />
                      </Col>
                    </Row>

                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mx-1'>
                  <Nav.Link eventKey="Affiliate">
                    <Row
                      onClick={() => setTab('Affiliate')}
                      className={tab === 'Affiliate' ? styles.setting_tab_affiliate_tool_active : styles.setting_tab_affiliate_tool}
                    >
                      <Col className='ps-0'>
                        {tab === 'Affiliate' ? <PartnerToolTransparentLogo /> : <PartnerToolLogo />}
                        <h4 className='pt-1'>
                          Partner Tools
                        </h4>
                        <TabPane eventKey="Affiliate" title="Affiliate" />
                      </Col>
                    </Row>

                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Tab.Content>
                <Tab.Pane eventKey="General">
                  <GeneralSettings />
                </Tab.Pane>
                <Tab.Pane eventKey="Layout">
                  <LayoutSettings />
                </Tab.Pane>
                <Tab.Pane eventKey="Marketing">
                  <MarketingSettings />
                </Tab.Pane>
                <Tab.Pane eventKey="Affiliate">
                  <PartnerSettings />
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
};

export default Settings;
