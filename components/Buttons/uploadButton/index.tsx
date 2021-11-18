import * as React from 'react';
import styles from 'styles/UploadLogo.module.scss';
import { Form, ProgressBar } from 'react-bootstrap';
import CloudUp from 'assets/images/cloud-icon.svg';
import axios from 'axios';

export interface IUploadLogoProps {
//  // setFieldValue: (text:string, text:string)=>void;
//   // eslint-disable-next-line no-unused-vars
//   // setFieldValue(name:string, loc:string)?: any,
  // eslint-disable-next-line no-unused-vars
  handleLogo(files: any): any;
//   // setFieldValue: any;
}

// eslint-disable-next-line no-unused-vars
export default function UploadLogo({ handleLogo }:IUploadLogoProps) {
  const front = React.useRef(null);
  const onButtonClick = (ref:any) => {
    // `current` points to the mounted text input element
    ref.current.click();
  };
  const [feedback, setfeedback] = React.useState<null | string>(null);
  const [logo, setlogo] = React.useState<null | string>(null);
  const handleImageUpload = (e: any) => {
    // console.log(e.target.files);
    try {
      if (e.target.files) {
        const files:any = Array.from(e.target.files);
        // const formData = new FormData();
        // const { name }:string = files[0];
        // console.log('..................', files[0]);
        // setFieldValue('logoImage', 'someImage.jpg');
        // handleLogo(files[0]);
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' },
        };
        console.log('.......', files[0]);
        const fd = new FormData();
        fd.append('file', files[0]);
        axios.post('http://localhost:5000/upload', fd, config)
          .then((res) => console.log(res))
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
