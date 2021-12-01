import React from 'react';
import Modal from 'react-bootstrap/Modal';
// import styles from 'styles/Dialogue.module.scss';

interface DialogueProps {
  show : boolean,
  children: React.ReactNode,
  size? : 'xl' | 'sm' | 'lg' | undefined,
  className?: string,
}

/**
 * Primary UI component for user interaction
 */
const Dialogue = ({
  show,
  children,
  size = 'xl',
  className,
}: DialogueProps) => (
  <Modal
    show={show}
        // onHide={handleClose}
    backdrop="static"
    keyboard={false}
    size={size}
    fullscreen="lg-down"
    centered
  >
    {/* <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header> */}
    <Modal.Body className={className}>
      {/* <div className="mt-5"> */}
      {children}
      {/* </div> */}
    </Modal.Body>
    {/* <Modal.Footer>
        <Button variant="secondary">
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer> */}
  </Modal>

);
Dialogue.defaultProps = {
  size: 'xl',
  className: 'p-md-5 mt-3',
};

export default Dialogue;
