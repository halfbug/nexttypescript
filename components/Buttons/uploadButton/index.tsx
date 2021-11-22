import * as React from 'react';
import styles from 'styles/UploadLogo.module.scss';
import { Form, ProgressBar } from 'react-bootstrap';
import CloudUp from 'assets/images/cloud-icon.svg';
import axios from 'axios';
import { StoreContext } from 'store/store.context';
import { IStore } from 'types/store';

export interface IUploadLogoProps {
 setFieldValue(field: string, value: string): any;
//   // eslint-disable-next-line no-unused-vars
//   // setFieldValue(name:string, loc:string)?: any,
  // eslint-disable-next-line no-unused-vars
 // handleLogo(files: any): any;
//   // setFieldValue: any;
}

// eslint-disable-next-line no-unused-vars
export default function UploadLogo({ setFieldValue }:IUploadLogoProps) {
  const front = React.useRef(null);
  const { store }: IStore = React.useContext(StoreContext);

  const onButtonClick = (ref:any) => {
    // `current` points to the mounted text input element
    ref.current.click();
  };
  const [feedback, setfeedback] = React.useState<null | string>(null);
  const [logo, setlogo] = React.useState<null | string>(null);
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
        fd.append('image', files[0], `${shopName[0]}_logo.${imgExt}`);

        axios.post(`${process.env.API_URL}/upload`, fd, config)
          .then((res) => {
            const fileS3Url: string = res.data.data.Location;

            setFieldValue('logoImage', fileS3Url);
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
      <Form.Group className={styles['upload-logo']} controlId="brandinfo.uploadbutton" onClick={() => onButtonClick(front)}>
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
              <ProgressBar animated now={100} className={styles['upload-logo--progress']} />
            </>
          )
          : (
            <>
              <CloudUp className={styles['upload-logo--icon']} />
              <Form.Label>Upload Logo</Form.Label>
            </>
          )}
      </Form.Group>
      <Form.Control.Feedback type="invalid">
        {feedback}
      </Form.Control.Feedback>
    </>
  );
}
