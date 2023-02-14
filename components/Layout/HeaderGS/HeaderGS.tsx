/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import styles from 'styles/Groupshop.module.scss';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'components/Buttons/Button/Button';
import {
  Col, Row, Button, Container,
} from 'react-bootstrap';
import { ArrowDown, CaretDown, Eye } from 'react-bootstrap-icons';
import SettingsIcon from 'assets/images/settings-icon-black.svg';
import Button2 from 'components/Buttons/Button2/Button2';
import { GroupshopContext } from 'store/groupshop.context';
import useSteps from 'hooks/useSteps';
import { useRouter } from 'next/router';
import useCode from 'hooks/useCode';
import useDeal from 'hooks/useDeal';

interface HeaderProps {
  LeftComp: React.ReactNode;
  RightComp: React.ReactNode;
}

const Header = ({
  LeftComp, RightComp,
}: HeaderProps) => {
  const { gsctx } = useContext(GroupshopContext);
  const { isDrops } = useDeal();
  const [step, setStep] = useState<string>('');
  const { stepModal } = useSteps(step);
  const Router = useRouter();
  const { ownerCode } = useCode();

  useEffect(() => {
    setStep('');
  }, [Router]);

  const editStoreProfile = () => {
    if (ownerCode) {
      setStep('2');
    }
  };

  return (
    <Navbar bg="light" className={styles.groupshop}>
      <Container fluid>
        <Row className="w-100 align-items-center gx-0">
          <Col xs={{ span: 4, order: 1 }} md={{ span: 4, order: 1 }}>{LeftComp}</Col>
          <Col xs={{ span: 4, order: 2 }} md={{ span: 4, order: 2 }} className="text-center">
            <Navbar.Brand href="#home" className="m-0"><img src={isDrops ? '/images/logo.svg' : `${process.env.IMAGE_PATH}/ms-logo-svg.svg`} alt="Groupshop" width={150} /></Navbar.Brand>
          </Col>
          <Col
            xs={{ span: 4, order: 3 }}
            md={{ span: 4, order: 3 }}
            className={styles.groupshop__last}
          >
            {/* <SettingsIcon className={styles.groupshop__settingsicon} /> */}
            {/* {gsctx?.obSettings?.step === 3 && ownerCode ? <Button2 variant="primary"
             onClick={() => { editStoreProfile(); }}>Customize</Button2> : <></>} */}
            {RightComp}
            {stepModal()}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

// Header.defaultProps = {
//   user: {},
// };

export default Header;
