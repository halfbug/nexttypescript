import React, { useCallback, useState } from 'react';
import {
  Toast, ToastContainer,
} from 'react-bootstrap';

const useAlert = () => {
  const [error, seterror] = useState<boolean>(false);
  const [errorMsg, seterrorMsg] = useState<string>('');
  const [success, setsuccess] = useState<boolean>(false);
  const [successMsg, setsuccessMsg] = useState<string>('');

  const showError = useCallback((message:string) => {
    seterrorMsg(message);
    seterror(true);
  }, [error]);
  const showSuccess = useCallback((message:string) => {
    setsuccessMsg(message);
    setsuccess(true);
  }, [success]);

  const AlertComponent = useCallback((): any => (
    <ToastContainer className="position-fixed bottom-0 end-0 mb-3 me-2" position="bottom-end">
      <Toast bg="danger" onClose={() => seterror(false)} show={error} delay={5000} autohide>
        <Toast.Header>

          <strong className="me-auto">!</strong>

        </Toast.Header>
        <Toast.Body className="text-white">{errorMsg}</Toast.Body>
      </Toast>
      <Toast bg="success" onClose={() => setsuccess(false)} show={success} delay={5000} autohide>
        <Toast.Header>

          <strong className="me-auto">!</strong>

        </Toast.Header>
        <Toast.Body className="text-white">{successMsg}</Toast.Body>
      </Toast>
    </ToastContainer>
  ), [error, errorMsg, success, successMsg]);
  return { AlertComponent, showError, showSuccess };
};
export default useAlert;
