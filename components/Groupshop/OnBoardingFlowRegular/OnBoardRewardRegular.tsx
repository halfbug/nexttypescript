import Button from 'components/Buttons/Button/Button';
import React, { useContext, useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Modal,
} from 'react-bootstrap';
import styles from 'styles/OnBoardingFlowRegular.module.scss';
import GroupshopIcon from 'assets/images/groupshop-icon.svg';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { GroupshopContext } from 'store/groupshop.context';
import { useMutation } from '@apollo/client';
import { IGroupshop } from 'types/groupshop';
import { ADD_DEAL_PRODUCT } from 'store/store.graphql';
import useCode from 'hooks/useCode';
import useLogo from 'hooks/useLogo';

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
  const storeLogo = useLogo();

  const {
    shop, discountCode, ownerCode,
  } = useCode();
  const Router = useRouter();

  const { gsctx, dispatch } = useContext(GroupshopContext);

  const FormValues: TypeFormValues = {
    isEmailChecked: true,
    isTextChecked: true,
    PhoneNumber: null,
  };

  const validationSchema = yup.object({
    PhoneNumber: yup
      .number().nullable()
      .when('isTextChecked', {
        is: true,
        then: yup.number().required('Must enter number')
          .test('len', 'Must be exactly 10 digits', (val = 0) => val.toString().length === 10)
          .typeError('Please must specify a number'),
      }),
  });

  const {
    handleSubmit, values, handleChange, touched, errors,
  }: any = useFormik({
    initialValues: FormValues,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (value, { validateForm }) => {
      validateForm(value);
      const temp: any = {
        allowEmails: values.isEmailChecked,
        allowTexts: values.isTextChecked,
        mobileNumber: values.PhoneNumber ? (`+1${values.PhoneNumber}`) : '0',
      };
      const data = {
        ...gsctx.obSettings,
        ...temp,
        step: 2,
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
    },
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
            {/* <LeEsableIcon /> */}
            <img src={storeLogo} className={styles.reward__modal__body__mainiconMobile} alt="brand logo" />
            <div className={styles.reward__modal__body__mainiconarea__vertical_seprator} />
            <GroupshopIcon className={styles.reward__modal__body__mainiconarea__icon} />
          </div>
          <h2>
            Getting rewards
          </h2>
          <div className={styles.reward__modal__body__description}>
            We’ll
            automatically refund
            your cashback rewards to the payment
            method used on your last
            {' '}
            {gsctx.store?.brandName}
            {' '}
            order.
          </div>
          <div className={[styles.reward__modal__body__box1, styles.reward__modal__body__description2, 'd-lg-block d-none'].join(' ')}>
            <p className={[styles.reward__modal__body__description, styles.reward__modal__body__description2].join(' ')}>
              After you’ve earned 100% of your order in cashback, you’ll
              <strong>
                {' '}
                keep earning
                {' '}
                {gsctx?.discountCode?.percentage}
                %
                {' '}
                of every order
                {' '}
              </strong>
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
          <div className={styles.reward__modal__body__infoMobile}>
            Opt-in to email and SMS notifications so we can notify you when you earn cashback.
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
                <InputGroup.Text
                  id="basic-addon1"
                  className={['rounded-0 border-end', styles.reward__modal__body__checkArea__preTxt,
                  ].join(' ')}
                >
                  +1

                </InputGroup.Text>
                <FormControl
                  placeholder=""
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  className={styles.reward__modal__body__checkArea__input}
                  name="PhoneNumber"
                  onChange={(e) => { handleChange(e); }}
                  isInvalid={!!errors.PhoneNumber}
                  isValid={values.PhoneNumber && !errors.PhoneNumber}
                  maxLength={10}
                  title={errors.PhoneNumber}
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
            Curate your favorite products from
            {' '}
            {gsctx.store?.brandName}
            {' '}
            so you can
            shop and share them with friends!
          </div>

          <div className="d-flex justify-content-center my-4">
            <Button
              className={styles.reward__modal__body__btn}
              onClick={handleSubmit}
            >
              Customize
            </Button>
            <Button
              className={styles.reward__modal__body__btnMobile}
              onClick={handleSubmit}
            >
              Customize
            </Button>
          </div>
          <div className={styles.reward__modal__body__btnskip} onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
            Skip for now
          </div>
          <div className={styles.reward__modal__body__btnskipMobie} onClick={() => { handleClose(); }} onKeyDown={() => { handleClose(); }} role="button" tabIndex={0}>
            Skip for now
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default OnBoardRewardsRegular;
