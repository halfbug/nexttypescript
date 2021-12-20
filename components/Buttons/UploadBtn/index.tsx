/* eslint-disable react/jsx-indent */
import * as React from 'react';
import styles from 'styles/UploadLogo.module.scss';
import { Form, ProgressBar } from 'react-bootstrap';
import CloudUp from 'assets/images/cloud-icon.svg';
import axios from 'axios';
import { StoreContext } from 'store/store.context';
import { IStore } from 'types/store';

// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

interface IUploadButtonProps {
 setFieldValue(field: string, value: string): any;
 icon? : React.ReactNode;
 field: string;
 className?: string;
}

// eslint-disable-next-line no-unused-vars
export default function UploadButton({
  setFieldValue, icon, field, className,
}:IUploadButtonProps) {
  const front = React.useRef(null);
  const { store }: IStore = React.useContext(StoreContext);

  const onButtonClick = (ref:any) => {
    // `current` points to the mounted text input element
    ref.current.click();
  };
  const [feedback, setfeedback] = React.useState<null | string>(null);
  const [logo, setlogo] = React.useState<null | string>(null);
  const [progress, setprogress] = React.useState<boolean>(false);
  const handleImageUpload = (e: any) => {
    try {
      if (e.target.files) {
        const files:any = Array.from(e.target.files);
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' },
        };
        const fd = new FormData();
        const shopName = store.shop.split('.');
        const imgExt = files[0].name.split('.')[1];
        fd.append('image', files[0], `${shopName[0]}_${_.uniqueId(field)}.${imgExt}`);
        setprogress(true);
        axios.post(`${process.env.API_URL}/upload`, fd, config)
          .then((res) => {
            const fileS3Url: string = res.data.data.Location;

            setFieldValue(field, fileS3Url);
            setprogress(false);
          })
          .catch((err) => console.log(err));

        setlogo(URL.createObjectURL(files[0]));
      }
    } catch (ex) {
      console.log(ex);
      setfeedback(JSON.stringify(ex));
    }
  };
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
              <img src={logo} alt="logo" />
              { progress
              && <ProgressBar animated now={100} className={styles['upload-logo--progress']} />}
            </>
          )
          : icon }
      </Form.Group>
      <Form.Control.Feedback type="invalid">
        {feedback}
      </Form.Control.Feedback>
    </>
  );
}

UploadButton.defaultProps = {
  icon: <>
    <CloudUp className={styles['upload-logo--icon']} />
    <Form.Label>Upload Logo</Form.Label>

        </>,
  className: '',
};