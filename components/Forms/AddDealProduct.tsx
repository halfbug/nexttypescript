/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  Form, Row, Col, InputGroup, Button,
} from 'react-bootstrap';
// import Button from 'components/Buttons/Button/Button';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_DEAL_PRODUCT } from 'store/store.graphql';
import { GroupshopContext } from 'store/groupshop.context';
import { DealProduct, IGroupshop } from 'types/groupshop';
import useUtilityFunction from 'hooks/useUtilityFunction';

interface IValues {
  username: string;
  selectedProducts: string[] | undefined;

}
type TAddDealProduct ={
    selectedProducts: string[] | undefined;
    handleClose(e: any): any;
}

export default function AddDealProduct({ selectedProducts, handleClose }:TAddDealProduct) {
  const [addDealProduct] = useMutation<IGroupshop>(ADD_DEAL_PRODUCT);
  const {
    gsctx,
    dispatch,
  } = React.useContext(GroupshopContext);
  const { cleanTypename } = useUtilityFunction();
  const { id, dealProducts: dealProductsCtx, allProducts: allProductsCtx } = gsctx;
  const validationSchema = yup.object({
    username: yup
      .string()
      .required('Name is required.')
      .min(5, 'Too Short please give least five characters')
      .max(20, 'Too Long !! only 20 characters allowed.'),

  });

  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: {
      username: '',
      selectedProducts,

    },
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (valz, { validateForm }:FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const { username, selectedProducts: products } = valz;

      const dealProducts: DealProduct[] = [...products?.map((productId) => {
        const product:DealProduct = {
          productId, addedBy: username, customerIP: 'tofix', type: 'deal',
        };
        return product;
      }) || [], ...dealProductsCtx?.map(
        ({
          addedBy, customerIP, productId, type,
        }) => ({
          addedBy, customerIP, productId, type,
        }),
      ) || []];

      await addDealProduct({
        variables: {
          updateGroupshopInput: {
            id,
            dealProducts,

          },
        },
      });
      handleClose({});
      dispatch({ type: 'UPDATE_GROUPSHOP', payload: { ...gsctx, allProducts: [...gsctx?.store?.products?.filter(({ id: pid }:{ id:string}) => products?.includes(pid)) || [], ...gsctx?.allProducts || []], dealProducts } });
    //   setParams({ ins: 2 });
      // console.log(valz);
      // setTimeout(() => resetForm(), 5000);
    },
  });
  console.log('🚀 ~ file: AddDealProduct.tsx ~ line 64 ~ AddDealProduct ~ values', values);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="d-flex" controlId="username">
        <Form.Control
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          isInvalid={touched.username && !!errors.username}
          placeholder="Your Name ..."
          className="me-1"
        />
        <Button type="submit">Add</Button>
      </Form.Group>

    </Form>
  );
}
