import Button from 'components/Buttons/Button/Button';
import React, { useContext, useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Modal,
} from 'react-bootstrap';
import styles from 'styles/OnBoardingFlowRegular.module.scss';
import LeEsableIcon from 'assets/images/lesable.svg';
import GroupshopIcon from 'assets/images/groupshop-icon.svg';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { GroupshopContext } from 'store/groupshop.context';
import { useMutation } from '@apollo/client';
import { IGroupshop } from 'types/groupshop';
import { ADD_DEAL_PRODUCT } from 'store/store.graphql';
import useCode from 'hooks/useCode';

interface Props {
  open: Boolean
}
interface TypeFormValues {
  isEmailChecked: Boolean;
  isTextChecked: Boolean;
  PhoneNumber: Number | null;
}

const OnBoardRewardsRegular = ({ open }: Props) => {
  const [addDealProduct] = useMutation<IGroupshop>(ADD_DEAL_PRODUCT);
  const [show, setShow] = useState<Boolean>(false);
  const {
    shop, discountCode, ownerCode,
  } = useCode();
  const Router = useRouter();

  const { gsctx, dispatch } = useContext(GroupshopContext);

  const FormValues: TypeFormValues = {
    isEmailChecked: true,
    isTextChecked: true,
    PhoneNumber: 0,
  };

  const validationSchema = yup.object({
    PhoneNumber: yup
      .number()
      .when('isTextChecked', {
        is: true,
        then: yup.number().required('Must enter number'),
      }).typeError('you must specify a number'),
  });

  const {
    handleSubmit, values, handleChange, touched, errors,
  }: any = useFormik({
    initialValues: FormValues,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => { },
  });

  const handleClose = () => {
    setShow(false);
    if (shop && ownerCode && discountCode) {
      Router.push(`/${shop}/deal/${discountCode}/owner&${ownerCode}`);
    }
  };

  const handleShow = () => { setShow(true); };

  useEffect(() => {
    setShow(open);
  }, [open]);

  const moveForward = async () => {
    if (values.isTextChecked && !values.PhoneNumber) {
      return;
    }
    const temp: any = {
      allowEmails: values.isEmailChecked,
      allowTexts: values.isTextChecked,
      mobileNumber: values.PhoneNumber ? (`+1${values.PhoneNumber}`) : '0',
    };
    const data = {
      ...gsctx.obSettings,
      ...temp,
      step: 1,
    };
    dispatch({ type: 'UPDATE_GROUPSHOP', payload: { ...gsctx, obSettings: { ...gsctx.obSettings, ...data } } });

    await addDealProduct({
      variables: {
        updateGroupshopInput: {
          id: gsctx.id,
          obSettings: {
            ...data,
          },
        },
      },
    });

    // if (shop && ownerCode && discountCode) {
    // Router.push(`/${shop}/deal/${discountCode}/${ownerCode}/2`);
    // }
  };

  return (
    <>
      <div onClick={handleShow} onKeyDown={handleShow} role="button" tabIndex={0}>onbaording rewards</div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
        backdrop="static"
        dialogClassName={styles.reward__modal}
        contentClassName={styles.reward__modal__content}
      >
        <Modal.Header className={styles.reward__modal__closebtnlg} />
        <div className={styles.reward__modal__imgBox}>
          <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />
        </div>
        <Modal.Body className={styles.reward__modal__body}>
          <div className={styles.reward__modal__body__mainiconarea}>
            <LeEsableIcon />
            <div className={styles.reward__modal__body__mainiconarea__vertical_seprator} />
            <GroupshopIcon className={styles.reward__modal__body__mainiconarea__icon} />
          </div>
          <h2>
            Getting rewards
          </h2>
          <div className={styles.reward__modal__body__description}>
            We’ll
            <strong> automatically refund </strong>
            your cashback rewards to the payment
            method you used on your last
            {' '}
            {gsctx.store?.brandName}
            {' '}
            order.
          </div>
          <div className={styles.reward__modal__body__box1}>
            <p className={styles.reward__modal__body__description}>
              After you’ve earned 100% of your order in cashback, you’ll
              <strong> keep earning 15% of every order </strong>
              made on your Groupshop.
            </p>
          </div>

          <div className={styles.reward__modal__body__iconsRowdollar}>
            🤑 🤑 🤑
          </div>

          <div className={styles.reward__modal__body__seprator} />
          <div className={styles.reward__modal__body__info}>
            ✨ Opt-in to email and SMS notifications so we can notify you when someone shops
            from your page and you’ve earned rewards.
          </div>

          <div className={styles.reward__modal__body__checkArea}>
            <div>
              <Form onSubmit={handleSubmit}>
                <Form.Check
                  className={styles.reward__modal__body__checkArea__checkbox}
                  type="checkbox"
                  checked={values.isEmailChecked}
                >
                  <Form.Check.Input type="checkbox" checked={values.isEmailChecked} name="isEmailChecked" onChange={(e) => { handleChange(e); }} className={styles.reward__modal__body__checkArea__checkbox__check} />
                  <Form.Check.Label>
                    Email me notifications
                  </Form.Check.Label>
                </Form.Check>
              </Form>

              <div className={styles.reward__modal__body__checkArea__txt}>
                We don’t sell or share your information.
                You can unsuscribe at any time.
              </div>
            </div>
            <div>
              <Form.Check
                className={styles.reward__modal__body__checkArea__checkbox}
                type="checkbox"
                checked={values.isTextChecked}
              >
                <Form.Check.Input type="checkbox" checked={values.isTextChecked} name="isTextChecked" onChange={(e) => { handleChange(e); }} isInvalid={touched.isTextChecked && !!errors.isTextChecked} className={styles.reward__modal__body__checkArea__checkbox__check} />
                <Form.Check.Label>
                  Text me about my rewards
                </Form.Check.Label>
              </Form.Check>

              <InputGroup className={styles.reward__modal__body__checkArea__inputGroup}>
                <InputGroup.Text id="basic-addon1" className={styles.reward__modal__body__checkArea__preTxt}>+1</InputGroup.Text>
                <FormControl
                  placeholder=""
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  className={styles.reward__modal__body__checkArea__input}
                  name="PhoneNumber"
                  onChange={(e) => { handleChange(e); }}
                  isInvalid={!!errors.PhoneNumber
                  || (values.isTextChecked && !values.PhoneNumber.length)}
                  isValid={values.PhoneNumber.length === 10}
                  minLength={10}
                  maxLength={10}
                  title={errors.PhoneNumber ? errors.PhoneNumber : ''}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors?.PhoneNumber}
              </Form.Control.Feedback>
              <div className={styles.reward__modal__body__checkArea__txt1}>
                By checking this box, you agree to receive recurring personalized marketing text
                messages from Groupshop at the cell number entered below. Msg & data rates may
                apply. View Terms & Privacy
              </div>
            </div>
          </div>

          <div className={styles.reward__modal__body__seprator1} />

          <div className={styles.reward__modal__body__iconsRow}>
            😍 😍 😍
          </div>

          <div className={styles.reward__modal__body__readyTxt}>
            Ready to customize your Groupshop store?
          </div>

          <div className={styles.reward__modal__body__description1}>
            Curate your favorite products, add a welcome message and link your
            socials by customizing your Groupshop.
          </div>

          <div className="d-flex justify-content-center my-4">
            <Button
              className={styles.reward__modal__body__btn}
              onClick={moveForward}
            >
              Customize
            </Button>
            <Button
              className={styles.reward__modal__body__btnMobile}
              onClick={moveForward}
            >
              Next
            </Button>
          </div>
          <div className={styles.reward__modal__body__btnskip} onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
            Skip for now
          </div>
          <div className={styles.reward__modal__body__btnskipMobie} onClick={() => { handleClose(); }} onKeyDown={() => { handleClose(); }} role="button" tabIndex={0}>
            Skip to shop
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default OnBoardRewardsRegular;
