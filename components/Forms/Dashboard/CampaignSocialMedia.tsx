/* eslint-disable react/require-default-props */
import _ from 'lodash';
import * as React from 'react';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';
import {
  Facebook, Instagram, Twitter, Tiktok,
} from 'react-bootstrap-icons';
import styles from 'styles/Groupshop.module.scss';

interface IProps {
  values?: any;
  errors?: any;
  setFieldValue?: any;
  handleSubmit?: any;
}

export default function CampaignSocialMedia({
  values, errors, setFieldValue, handleSubmit,
}: IProps) {
  const [smUrl, setsmUrl] = React.useState('instagram');

  const styleObj = {
    width: '248px',
  };

  const debounceHandleSubmit = React.useRef(
    _.debounce(handleSubmit, 500),
  ).current;

  const updateValues = (name: string, value: string) => {
    setFieldValue(name, value);
    debounceHandleSubmit();
  };

  return (
    <>
      <Row className="mb-2">
        <Col>
          <h4 className="">Add your social links</h4>
        </Col>
      </Row>
      <Row>
        <div className="col-8 d-flex ">
          <Button
            className={['px-1 me-1', styles.groupshop_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('instagram')}
          >
            <Instagram className="fs-3 fw-bold" />
          </Button>

          <Button
            className={['px-1 mx-1', styles.groupshop_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('tiktok')}
          >
            <Tiktok className="fs-3 fw-bold" />

          </Button>

          <Button
            className={['px-1 mx-1', styles.groupshop_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('twitter')}
          >
            <Twitter className="fs-3 fw-bold" />
          </Button>

          <Button
            className={['px-1 mx-1', styles.groupshop_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('facebook')}
          >
            <Facebook className="fs-3 fw-bold" />
          </Button>
        </div>
      </Row>
      <Row className="p-1 mt-2 ">
        <Col lg={10} className="d-flex">
          <Form.Group className="me-1" style={styleObj} controlId="sm">
            <Form.Control
              onChange={(e) => {
                updateValues(smUrl, e.currentTarget.value);
              }}
              name={smUrl}
              type="text"
              size="lg"
              placeholder={`Enter ${smUrl} account URL...`}
              value={values[smUrl]}
              isInvalid={values[smUrl]?.length && errors[smUrl]}
              isValid={(!errors[smUrl] && values[smUrl]?.length)}
              title={(values[smUrl]?.length && errors[smUrl]) ? errors[smUrl] : ''}
            />
            <Form.Control.Feedback type="invalid">
              {smUrl in values ? errors[smUrl] : ''}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
