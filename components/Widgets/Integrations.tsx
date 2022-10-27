/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import styles from 'styles/Marketing.module.scss';
import {
  Row, Col, FormControl, InputGroup, Accordion, Card, useAccordionButton, ToggleButton,
} from 'react-bootstrap';
import Inte from 'assets/images/Integrations.svg';
import Fa from 'assets/images/FacebookPixel.svg';
import Ga from 'assets/images/GooglePixel.svg';
import Ta from 'assets/images/TikTokPixel.svg';
import PrivateKeyIcon from 'assets/images/private-key-icon.svg';
import AttentiveSetupIcon from 'assets/images/attentive-setup.svg';
import PostscriptSetupIcon from 'assets/images/postscript-setup.svg';
import SMTPSetupIcon from 'assets/images/smtp-setup.svg';
import GreenTickIcon from 'assets/images/green-tick.svg';
import PlusIcon from 'assets/images/plus-icon.svg';
import MinusIcon from 'assets/images/minus-icon.svg';
import TooltipIcon from 'assets/images/tooltip-icon.svg';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import { Check2Circle } from 'react-bootstrap-icons';

export interface ICustomToggleProps {
  children: any;
  eventKey: any;
  [x: string]: any;
}

export interface IntegrationProps {
  values: any;
  handleForm: any;
}

function CustomToggle({
  children, eventKey,
}: ICustomToggleProps) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div onClick={decoratedOnClick} aria-hidden="true">
      {children}
    </div>
  );
}

export default function Integrations({ values, handleForm } : IntegrationProps) {
  const [activeId, setActiveId] = useState('0');
  const [open, setOpen] = useState(true);

  const openCloseAccordian = (id: any) => {
    setActiveId(id);
    if (activeId === id) {
      setOpen(!open);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <h3>Integrations</h3>
      <section className={styles.marketing__box_1}>
        <h4 className="mt-0">
          Connect your pixels
        </h4>
        <p className="mt-2">Track customer data and behavior on your online store</p>
        <div>
          <Row>
            <div className="d-flex">
              <Fa className="me-2" />
              <Col lg={6} className={styles.marketing_inputIconBox}>
                <InputGroup className="mb-3 ">
                  <FormControl
                    placeholder="Enter Facebook Pixel"
                    value={values.settings?.marketing?.facebookPixels}
                    onChange={(e) => {
                      handleForm('settings.marketing.facebookPixels', e.currentTarget.value);
                    }}
                  />
                  <div className={styles.marketing__input_tooltip}><TooltipIcon /></div>
                </InputGroup>
                {/* <InfoCircle className="styles.marketing_inputIcon" fill="0F0E0E" /> */}
              </Col>
            </div>
          </Row>
          <Row>
            <div className="d-flex">
              <Ta className="me-2" />
              <Col lg={6}>
                <InputGroup className="mb-3 ">
                  <FormControl
                    placeholder="Enter Tik Tok Pixel (Coming soon)"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={values?.settings?.marketing?.tiktokPixels}
                    onChange={(e) => {
                      handleForm('settings.marketing.tiktokPixels', e.currentTarget.value);
                    }}
                    disabled
                  />
                  <div className={styles.marketing__input_tooltip}><TooltipIcon /></div>
                </InputGroup>
              </Col>
            </div>
          </Row>
          <Row>
            <div className="d-flex">
              <Ga className="me-2" />
              <Col lg={6}>
                <InputGroup className="mb-3 ">
                  <FormControl
                    placeholder="Enter Google Pixel"
                    value={values?.settings?.marketing?.googlePixels}
                    onChange={(e) => {
                      handleForm('settings.marketing.googlePixels', e.currentTarget.value);
                    }}
                  />
                  <div className={styles.marketing__input_tooltip}><TooltipIcon /></div>
                </InputGroup>
              </Col>
            </div>
          </Row>
        </div>
      </section>
      {/* <section className={styles.marketing__box_1}>
        <div className={styles.marketing__overlay}>
          <div className={styles.marketing__overlayText}>Coming Soon</div>
        </div>
        <Row>
          <Col lg={1} className={['me-0 mt-2', styles.marketing__box_1__inte].join(' ')}>
            <Inte />
          </Col>
          <Col lg={11} className="px-0">
            <h4 className="mt-0">
              Integrations
            </h4>
            <p>Enhance your Groupshop experience with email and SMS marketing solutions.</p>
            <Accordion defaultActiveKey={activeId}>
              <Card className={styles.marketing__collapse}>
                <Card.Header className={styles.marketing__collapse__header}>
                  <div>
                    <PrivateKeyIcon />
                    <span className={styles.marketing__collapse__header__txt}>Klaviyo setup</span>
                  </div>
                  <div onClick={() => openCloseAccordian('0')} aria-hidden="true">
                    <CustomToggle eventKey="0">
                      {(activeId === '0' && open) ? (
                        <MinusIcon />
                      ) : (
                        <PlusIcon />
                      )}
                    </CustomToggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="mx-5">
                    <div className="d-flex align-items-center">
                      <InputGroup>
                        <FormControl
                          placeholder="Enter Private API Key"
                          aria-label="privatekey"
                        />
                      </InputGroup>
                      <WhiteButton
                        type="submit"
                        className={['px-2 py-1 ms-2 ', styles.marketing_DownloadBtn].join(' ')}

                      >
                        Test API
                      </WhiteButton>
                    </div>
                    <section className={['mt-2 ms-1 d-flex align-items-center',
                    styles.marketing__valid].join(' ')}>
                      <GreenTickIcon />
                      <span className="ms-2">Your Private API Key is Valid</span>
                    </section>
                    <Row>
                      <ToggleButton
                        variant="outline-success"
                        className={['mx-3 mt-3 mb-2', styles.marketing__submitbtn].join(' ')}
                        id="joinExisting-e"
                        value={1}
                      >
                        <Check2Circle className="fs-4" />
                        {' '}
                        Submit
                      </ToggleButton>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className={styles.marketing__collapse}>
                <Card.Header className={styles.marketing__collapse__header}>
                  <div>
                    <AttentiveSetupIcon />
                    <span className={styles.marketing__collapse__header__txt}>Attentive setup</span>
                  </div>
                  <div onClick={() => openCloseAccordian('1')} aria-hidden="true">
                    <CustomToggle eventKey="1">
                      {(activeId === '1' && open) ? (
                        <MinusIcon />
                      ) : (
                        <PlusIcon />
                      )}
                    </CustomToggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>body here</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className={styles.marketing__collapse}>
                <Card.Header className={styles.marketing__collapse__header}>
                  <div>
                    <PostscriptSetupIcon />
                    <span className={styles.marketing__collapse__header__txt}>
                      Postscript setup
                    </span>
                  </div>
                  <div onClick={() => openCloseAccordian('2')} aria-hidden="true">
                    <CustomToggle eventKey="2">
                      {(activeId === '2' && open) ? (
                        <MinusIcon />
                      ) : (
                        <PlusIcon />
                      )}
                    </CustomToggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>body here</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className={styles.marketing__collapse}>
                <Card.Header className={styles.marketing__collapse__header}>
                  <div>
                    <SMTPSetupIcon />
                    <span className={styles.marketing__collapse__header__txt}>
                      SMTP/Other email client setup
                    </span>
                  </div>
                  <div onClick={() => openCloseAccordian('3')} aria-hidden="true">
                    <CustomToggle eventKey="3">
                      {(activeId === '3' && open) ? (
                        <MinusIcon />
                      ) : (
                        <PlusIcon />
                      )}
                    </CustomToggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>body here</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </section> */}
    </>
  );
}
