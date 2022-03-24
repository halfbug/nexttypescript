/* eslint-disable quotes */
import * as React from 'react';
import {
  Form, Row, Col, InputGroup, Container, Button,
} from 'react-bootstrap';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useMutation } from '@apollo/client';
import { UPDATE_CAMPAIGN } from 'store/store.graphql';
import {
  Facebook, Youtube, Instagram, Pinterest, Twitter, Tiktok, CheckCircle,
} from 'react-bootstrap-icons';
import styles from 'styles/Knowledgebase.module.scss';
import { IStore } from 'types/store';
import IconButton from 'components/Buttons/IconButton';

interface IValues {
    facebook: string;
    youtube: string,
    instagram: string;
    twitter: string;
    pinterest: string;
    tiktok: string;
}

export default function ConnectSocialMedia() {
  const [, setParams] = useQueryString();
  const [smUrl, setsmUrl] = React.useState('instagram');

  const [addSM, { data, loading, error }] = useMutation<IStore>(UPDATE_CAMPAIGN);
  const { store, dispatch } = React.useContext(StoreContext);
  const [smState, setstate] = React.useState({
    facebook: '',
    youtube: '',
    instagram: '',
    tiktok: '',
    pinterest: '',
    twitter: '',
  });
  React.useEffect(() => {
    if (store?.campaigns) {
      const arr:any = store.campaigns.filter((item:any) => item.id === store.singleEditCampaignId);
      if (arr[0].socialLinks != null) {
        const {
          socialLinks: {
            facebook, instagram, tiktok, pinterest, twitter, youtube,
          },
        } = arr[0];
        setstate({
          facebook, instagram, tiktok, pinterest, twitter, youtube,
        });
      }
    }
  }, []);

  const validationSchema = yup.object({
    facebook: yup
      .string()
      .min(10, 'Too Short')
      .max(200, 'Too Long !! Invalid length'),

  });
  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: smState,
    enableReinitialize: true,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const {
        facebook, instagram, tiktok, pinterest, twitter, youtube,
      } = valz;
      const smObj: null | any = await addSM({
        variables: {
          updateCampaignInput: {
            storeId: store.id,
            id: store.singleEditCampaignId,
            socialLinks: {
              facebook,
              youtube,
              instagram,
              tiktok,
              pinterest,
              twitter,
            },
          },
        },
      });
      const updatedCampaigns = store?.campaigns?.map((item:any) => {
        if (item.id === smObj.id) {
          return smObj;
        }
        return item;
      });
      dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: updatedCampaigns } });
    },
  });
  return (

    <section className={styles.Kb_gradBox}>
      <Col>
        <h4>Connect</h4>
      </Col>
      <Row>
        <div className="col-8 d-flex ">
          <Button
            className={['px-1 me-1', styles.Kb_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('instagram')}
          >
            <Instagram className="fs-3 fw-bold" />
          </Button>
          <Button
            className={['px-1 me-1', styles.Kb_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('youtube')}
          >
            <Youtube className="fs-3 fw-bold" />
          </Button>
          <Button
            className={['px-1 mx-1', styles.Kb_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('tiktok')}
          >
            <Tiktok className="fs-3 fw-bold" />

          </Button>
          <Button
            className={['px-1 mx-1', styles.Kb_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('twitter')}
          >
            <Twitter className="fs-3 fw-bold" />

          </Button>
          <Button
            className={['px-1 mx-1', styles.Kb_btn_circle].join(' ')}
            variant="secondary"
            onClick={() => setsmUrl('facebook')}
          >
            <Facebook className="fs-3 fw-bold" />
          </Button>
        </div>
      </Row>

    </section>

  );
}
