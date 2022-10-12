/* eslint-disable react/require-default-props */
/* eslint-disable quotes */
/* eslint-disable react/jsx-indent */
import * as React from 'react';
import styles from 'styles/UploadLogo.module.scss';
import {
  Row, Button, Form, ProgressBar,
} from 'react-bootstrap';
import CloudUp from 'assets/images/cloud-icon.svg';
import axios from 'axios';
import { StoreContext } from 'store/store.context';
import { IStore } from 'types/store';
import Replace from 'assets/images/replaceIcon.svg';
import { v4 as uuid } from 'uuid';

// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import WhiteButton from '../WhiteButton/WhiteButton';

interface IUploadButtonProps {
 setFieldValue(field: string, value: string): any;
 icon? : React.ReactNode;
 field: string;
 className?: string;
 value?: string;
 handleForm?: any;
 handleCustomBg?: any;
 url?: string;
}

// eslint-disable-next-line no-unused-vars
export default function UploadButton({
  setFieldValue, icon, field, className, value, handleForm, handleCustomBg,
  url,
}:IUploadButtonProps) {
  const front = React.useRef(null);
  const { store }: IStore = React.useContext(StoreContext);

  const onButtonClick = (ref:any) => {
    // `current` points to the mounted text input element
    ref.current.click();
  };
  // React.useEffect(() => {
  //   if (value) {
  //     setlogo(value);
  //     console.log("🚀 ~ file: index.tsx ~ line 40 ~ React.useEffect ~ value", value);
  //   }
  // }, []);

  const [feedback, setfeedback] = React.useState<null | string>(null);
  const [imagefeedback, setImagefeedback] = React.useState<null | string>(null);
  const [logo, setlogo] = React.useState<null | string>(null);
  const [progress, setprogress] = React.useState<boolean>(false);
  const apiFunc = async () => {
    if (url) {
      const { data: { data: dbUrl } } = await axios.get(`${process.env.API_URL}/image?key=${url}`);
      console.log("🚀 ~ file: index.tsx ~ line 51 ~ apiFunc ~ res", dbUrl);
      setlogo(dbUrl);
    }
  };
  React.useEffect(() => {
    apiFunc();
  }, [url]);

  const handleImageUpload = (e: any) => {
    try {
      console.log('im in upload');

      if (e.target.files) {
        const files:any = Array.from(e.target.files);
        console.log("🚀 ~ file: index.tsx ~ line 67 ~ handleImageUpload ~ files", files);
        const config = {
          headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' },
        };
        const fileType = files[0].type;
        const fileSize = files[0].size;
        if ((fileType === 'image/png' || fileType === 'image/jpg' || fileType === 'image/jpeg')) {
          setImagefeedback(null);
          const fd = new FormData();
          const shopName = store.shop.split('.');
          const imgExt = files[0].name.split('.');
          const imgExt1 = imgExt[imgExt.length - 1];
          const uniqueId = uuid();
          const uniqueLimitId = uniqueId.substring(uniqueId.length - 12);
          console.log("🚀 ~ file: index.tsx ~ line 83 ~ handleImageUpload ~ imgExt1", imgExt1);
          fd.append('image', files[0], `${shopName[0]}_${uniqueLimitId}.${imgExt1}`);
          fd.append('previousimage', `${url}`);
          setprogress(true);
          axios.post(`${process.env.API_URL}/image`, fd, config)
            .then((res) => {
              const fileS3Url: string = res.data.data.Location;

              setFieldValue(field, fileS3Url);
              setprogress(false);
              if (handleCustomBg) { handleCustomBg(field, fileS3Url); }
              if (handleForm) handleForm(field, fileS3Url);
            })
            .catch((err) => console.log(err));

          setlogo(URL.createObjectURL(files[0]));
        } else {
          setImagefeedback('Please upload png, jpg, jpeg format only.');
        }
      }
    } catch (ex) {
      console.log(ex);
      setfeedback(JSON.stringify(ex));
    }
  };
  // console.log(logo);

  return (
    <>
      <Form.Group className={[styles['upload-logo'], className].join(' ')} controlId="brandinfo.upload-button" onClick={() => onButtonClick(front)}>
        <input
          accept="image/png, image/jpg, image/jpeg"
          className="d-none"
          id="logoImage"
          name="logoImage"
          multiple={false}
          type="file"
          ref={front}
          onChange={handleImageUpload}
        />
        {logo
          ? (
            <>
            {/* // <div className={styles['upload-logo_replace']}> */}
              <img src={logo} alt="logo" />
              <div className={styles.replacBtn}><Button variant=""><Replace /></Button></div>
              { progress
              && <ProgressBar animated now={100} className={styles['upload-logo--progress']} />}
            </>
          )
          : icon }
      </Form.Group>
      <div className="text-danger">{imagefeedback}</div>
      <Form.Control.Feedback type="invalid">
        {feedback}
      </Form.Control.Feedback>
    </>
  );
}

UploadButton.defaultProps = {
  icon: <>
    <CloudUp className={styles['upload-logo--icon']} />
    <div className="mt-0">
      <Form.Label style={{ width: 'min-content' }}>
      Upload logo
      </Form.Label>
    </div>

        </>,
  className: '',
};
