import React, { useState, useEffect } from 'react';
import {
  Form, Button, Spinner,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_DEAL_PRODUCT, ADD_DEAL_PRODUCT_PARTNER } from 'store/store.graphql';
import { GroupshopContext } from 'store/groupshop.context';
import { DealProduct, IGroupshop } from 'types/groupshop';
import useIP from 'hooks/useIP';
import useGtm from 'hooks/useGtm';
import useAppContext from 'hooks/useAppContext';
import useDeal from 'hooks/useDeal';

interface IValues {
  username: string;
  selectedProducts: string[] | undefined;

}
type TAddDealProduct ={
    selectedProducts: string[] | undefined;
    handleClose(e: any): any;
}

export default function AddDealProduct({ selectedProducts, handleClose }:TAddDealProduct) {
  // get grouphshop context
  // const {
  //   gsctx,
  //   dispatch,
  // } = React.useContext(GroupshopContext);
  const { gsctx, dispatch, isGroupshop } = useAppContext();
  const [addDealProduct] = useMutation<IGroupshop>(
    isGroupshop ? ADD_DEAL_PRODUCT : ADD_DEAL_PRODUCT_PARTNER,
  );

  const { id, dealProducts: dealProductsCtx } = gsctx;
  const [loadingSubmit, setloadingSubmit] = useState(false);
  console.log('🚀 ~ file: AddDealProduct.tsx ~ line 40 ~ AddDealProduct ~ gsctx', gsctx);

  let app = 0;
  function paginationScroll() {
    if (app === 0) {
      app = (document.getElementById('popularproducts')?.offsetHeight) ?? 0;
    }
    window.scroll({
      top: (app ?? 0) + 400,
      behavior: 'smooth',
    });
  }

  // get client IP
  const [clientIP] = useIP();
  const { isInfluencer } = useDeal();
  console.log('🚀 ~ file: ~ isInfluencer', isInfluencer);

  const { googleButtonCode } = useGtm();

  const validationSchema = yup.object({
    username: yup
      .string()
      .required('Name is required.')
      .min(1, 'Too Short please give least one characters')
      .max(10, 'Too Long !! only 10 characters allowed.'),

  });
  useEffect(() => {
    if (gsctx?.partnerDetails?.fname && isInfluencer) {
      values.username = gsctx?.partnerDetails?.fname;
    }
  }, [gsctx?.partnerDetails?.fname]);

  // const { showSuccess } = useAlert();
  const {
    handleSubmit, values, handleChange, touched, errors,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: {
      username: isInfluencer ? gsctx?.partnerDetails?.fname ?? '' : '',
      // username: '',
      selectedProducts,

    },
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (valz, { validateForm }:FormikHelpers<IValues>) => {
      console.log('im in submit');
      setloadingSubmit(true);
      googleButtonCode('addproduct-complete');
      if (validateForm) validateForm(valz);
      const { username, selectedProducts: products } = valz;
      console.log('🚀 ~ file: AddDealProduct.tsx ~ line87 ~ onSubmit: ~ products', products);

      // merge selected products with groupshop deal prodcuts

      const sdealProducts = products?.map(
        (productId) => {
          const preProduct = dealProductsCtx?.find((prd) => prd.productId === productId);
          const newProduct:DealProduct = isGroupshop ? {
            productId, addedBy: username, customerIP: clientIP, type: 'deal',
          } : {
            // eslint-disable-next-line max-len
            // productId, addedBy: isInfluencer ? fname : username, customerIP: clientIP, type: 'deal', isInfluencer,
            productId, addedBy: username, customerIP: clientIP, type: 'deal', isInfluencer,
          };
          return preProduct ?? newProduct;
        },
      );
      // unique by complete object
      const dealProducts = _.uniq([...gsctx.dealProducts ?? [], ...sdealProducts ?? []]);

      if (isGroupshop) {
        await addDealProduct({
          variables: {
            updateGroupshopInput: {
              id,
              dealProducts,
            },
          },
        });
      } else {
        // if (
        // gsctx?.partnerDetails?.fname === null &&
        // gsctx?.partnerDetails?.shopifyCustomerId === null
        // ) {
        //   await addDealProduct({
        //     variables: {
        //       updatePartnersInput: {
        //         id,
        //         partnerDetails: {
        //           fname: username.split(' ')[0],
        //           lname: username.split(' ')[1],
        //           email: gsctx?.partnerDetails?.email,
        //           shopifyCustomerId: null,
        //         },
        //       },
        //     },
        //   });
        // }
        const obj = isInfluencer ? {
          fname: username.split(' ')[0],
          lname: username.split(' ')[1],
          email: gsctx?.partnerDetails?.email,
          shopifyCustomerId: null,
        } : gsctx?.partnerDetails ?? null;
        await addDealProduct({
          variables: {
            updatePartnersInput: {
              id,
              dealProducts,
              partnerDetails: obj,
            },
          },
        });
      }
      handleClose({});
      setloadingSubmit(false);

      // update context
      console.log('🚀 ~ file: AddDealProduct.tsx ~ line 155 ~ onSubmit: ~ isInfluencer', isInfluencer);
      console.log(_.uniq([...gsctx?.store?.products?.filter(
        ({ id: pid }:{ id:string}) => products?.includes(pid),
      ) || []]), 'inf2');
      let influencerProducts;
      let partnerDetails;
      if (isInfluencer) {
        influencerProducts = _.uniq([...gsctx?.store?.products?.filter(
          ({ id: pid }:{ id:string}) => products?.includes(pid),
        ) || []]);
      }
      if (!isGroupshop) {
        partnerDetails = {
          fname: username.split(' ')[0],
          lname: username.split(' ')[1] ?? '',
          email: gsctx?.partnerDetails?.email ?? '',
          shopifyCustomerId: gsctx?.partnerDetails?.shopifyCustomerId ?? null,
        };
      }
      dispatch({
        type: 'UPDATE_GROUPSHOP',
        payload: {
          ...gsctx,
          popularProducts: _.uniq([...gsctx?.store?.products?.filter(
            ({ id: pid }:{ id:string}) => products?.includes(pid),
          ) || [],
          ...gsctx?.popularProducts || []]),
          dealProducts,
          addedProducts: [...dealProducts || []],
          partnerDetails: !isGroupshop && isInfluencer ? partnerDetails
            : gsctx?.partnerDetails ?? null,
          influencerProducts: isInfluencer ? influencerProducts : gsctx?.influencerProducts,
        },
      });

      paginationScroll();
    },
  });

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="d-flex" controlId="username">
        <Form.Control
          type="text"
          name="username"
          // value={isInfluencer ? gsctx?.partnerDetails?.fname : values.username}
          value={values.username}
          onChange={handleChange}
          isInvalid={touched.username && !!errors.username}
          placeholder="Your Name ..."
          className={isInfluencer ? 'mx-5 w-75' : 'me-1'}
        />
        <Form.Control.Feedback type="invalid">
          {errors.username}
        </Form.Control.Feedback>
        {loadingSubmit ? <Spinner animation="border" /> : <Button type="submit">Add</Button>}
      </Form.Group>

    </Form>
  );
}
