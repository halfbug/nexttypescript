import React, { useState, useEffect } from 'react';
import {
  Form, Button,
} from 'react-bootstrap';
// import Button from 'components/Buttons/Button/Button';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_DEAL_PRODUCT } from 'store/store.graphql';
import { GroupshopContext } from 'store/groupshop.context';
import { DealProduct, IGroupshop } from 'types/groupshop';
import useIP from 'hooks/useIP';

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

  // get grouphshop context
  const {
    gsctx,
    dispatch,
  } = React.useContext(GroupshopContext);

  const { id, dealProducts: dealProductsCtx } = gsctx;

  // get client IP
  const [clientIP] = useIP();

  const validationSchema = yup.object({
    username: yup
      .string()
      .required('Name is required.')
      .min(1, 'Too Short please give least one characters')
      .max(10, 'Too Long !! only 10 characters allowed.'),

  });

  // const { showSuccess } = useAlert();
  const {
    handleSubmit, values, handleChange, touched, errors,
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
      console.log('🚀 ~ file: AddDealProduct.tsx ~ line 63 ~ onSubmit: ~ products', products);

      // merge selected products with groupshop deal prodcuts

      const dealProducts = products?.map(
        (productId) => {
          const preProduct = dealProductsCtx?.find((prd) => prd.productId === productId);
          const newProduct:DealProduct = {
            productId, addedBy: username, customerIP: clientIP, type: 'deal',
          };
          return preProduct ?? newProduct;
        },
      );

      await addDealProduct({
        variables: {
          updateGroupshopInput: {
            id,
            dealProducts,

          },
        },
      });
      handleClose({});
      // update context
      dispatch({
        type: 'UPDATE_GROUPSHOP',
        payload: {
          ...gsctx,
          popularProducts: [...gsctx?.store?.products?.filter(
            ({ id: pid }:{ id:string}) => products?.includes(pid),
          ) || [],
          ...gsctx?.popularProducts || []],
          dealProducts,
          addedProducts: [...dealProducts || []],
        },
      });
    },
  });

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
        <Form.Control.Feedback type="invalid">
          {errors.username}
        </Form.Control.Feedback>
        <Button type="submit">Add</Button>
      </Form.Group>

    </Form>
  );
}
