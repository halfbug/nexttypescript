import React, { useState, useEffect } from 'react';
import {
  Form, Button, Spinner,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_DEAL_PRODUCT, ADD_DEAL_PRODUCT_CHANNEL, ADD_DEAL_PRODUCT_PARTNER } from 'store/store.graphql';
import { GroupshopContext } from 'store/groupshop.context';
import { DealProduct, IGroupshop } from 'types/groupshop';
import useIP from 'hooks/useIP';
import useGtm from 'hooks/useGtm';
import useAppContext from 'hooks/useAppContext';
import useDeal from 'hooks/useDeal';
import styles from 'styles/Groupshop.module.scss';
import useUtilityFunction from 'hooks/useUtilityFunction';

interface IValues {
  username: string;
  selectedProducts: string[] | undefined;

}
type TAddDealProduct ={
    selectedProducts: string[] | undefined;
    handleClose(e: any): any;
    isCreateGS: boolean;
}

export default function AddDealProduct({
  selectedProducts, handleClose,
  isCreateGS,
}:TAddDealProduct) {
  const {
    gsctx, dispatch, isGroupshop, isChannel,
  } = useAppContext();
  let dynamicFunc: any;
  if (isChannel) {
    [dynamicFunc] = useMutation<IGroupshop>(
      ADD_DEAL_PRODUCT_CHANNEL,
    );
  } else {
    [dynamicFunc] = useMutation<IGroupshop>(
      isGroupshop ? ADD_DEAL_PRODUCT : ADD_DEAL_PRODUCT_PARTNER,
    );
  }

  const {
    id, dealProducts: dealProductsCtx, discountCode, storeId,
  } = gsctx;
  const [loadingSubmit, setloadingSubmit] = useState(false);

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
  const { isInfluencer, isChannelOwner, getDealUserName } = useDeal();
  const { uniqueArray } = useUtilityFunction();
  console.log('🚀 ~ file: ~ isInfluencer', isInfluencer);

  const { googleButtonCode } = useGtm();

  const validationSchema = yup.object({
    username: yup
      .string()
      .required('Name is required.')
      .min(1, 'Too Short please give least one characters')
      .max(10, 'Too Long !! only 10 characters allowed.'),

  });
  // useEffect(() => {
  //   if (gsctx?.partnerDetails?.fname && isInfluencer) {
  //     values.username = gsctx?.partnerDetails?.fname;
  //   }
  // }, [gsctx?.partnerDetails?.fname, isInfluencer]);

  // const { showSuccess } = useAlert();
  const {
    handleSubmit, values, handleChange, touched, errors,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: {
      username: getDealUserName(),
      // username: '',
      selectedProducts,

    },
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (valz, { validateForm }:FormikHelpers<IValues>) => {
      setloadingSubmit(true);
      googleButtonCode('addproduct-complete');
      if (validateForm) validateForm(valz);
      const { username, selectedProducts: products } = valz;
      console.log('🚀 ~ file: AddDealProduct.tsx ~ line87 ~ onSubmit: ~ products', products);

      // merge selected products with groupshop deal prodcuts
      let ownerIP = '';

      if (dealProductsCtx && dealProductsCtx.length) {
        dealProductsCtx.forEach((p) => {
          if (p.type === 'owner') {
            ownerIP = p.customerIP;
          }
        });
      }
      const sdealProducts = products?.map(
        (productId) => {
          const preProduct = dealProductsCtx?.find((prd) => prd.productId === productId);
          let newProduct:DealProduct = isGroupshop ? {
            productId, addedBy: username, customerIP: clientIP, type: 'deal',
          } : {
            // eslint-disable-next-line max-len
            // productId, addedBy: isInfluencer ? fname : username, customerIP: clientIP, type: 'deal', isInfluencer,
            productId, addedBy: username, customerIP: clientIP, type: 'deal', isInfluencer,
          };

          if (isChannel) {
            newProduct = {
              productId, addedBy: username, customerIP: clientIP, type: isChannelOwner || !!ownerIP ? 'owner' : 'deal',
            };
          }
          return preProduct?.type === 'first' ? newProduct : preProduct ?? newProduct;
        },
      );
      // unique by complete object
      const dealProducts = _.uniq([...gsctx.dealProducts ?? [], ...sdealProducts ?? []]);
      if (isGroupshop) {
        await dynamicFunc({
          variables: {
            updateGroupshopInput: {
              id,
              dealProducts,
            },
          },
        });
      } else if (isChannel) {
        await dynamicFunc({
          variables: {
            updateChannelGroupshopInput: {
              id,
              storeId,
              discountCode,
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
        await dynamicFunc({
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
      let influencerProducts;
      let ownerChannelProducts;
      let partnerDetails;
      if (isInfluencer || isChannel) {
        influencerProducts = uniqueArray([...gsctx?.store?.products?.filter(
          ({ id: pid }:{ id:string}) => products?.includes(pid),
        ) || []]);
        ownerChannelProducts = uniqueArray([...gsctx?.store?.products?.filter(
          ({ id: pid }:{ id:string}) => products?.includes(pid),
        ) || []]);
      }
      if (!isGroupshop && !isChannel) {
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
          popularProducts: !(isInfluencer || isChannelOwner)
            ? _.uniq([...gsctx?.store?.products?.filter(
              ({ id: pid }:{ id:string}) => products?.includes(pid),
            ) || [],
            ...gsctx?.popularProducts || []]) : [],
          dealProducts,
          addedProducts: [...gsctx?.addedProducts ?? [], ...sdealProducts || []],
          refferalDealsProducts: [...gsctx?.refferalDealsProducts ?? [], ...sdealProducts?.filter((p) => p.type === 'deal') || []],
          partnerDetails: !isGroupshop && isInfluencer ? partnerDetails
            : gsctx?.partnerDetails ?? null,
          influencerProducts: isInfluencer ? influencerProducts : gsctx?.influencerProducts,
          ownerProducts: isChannelOwner || ownerIP === clientIP
            ? [...gsctx?.ownerProducts ?? [], ...ownerChannelProducts] : gsctx?.ownerProducts,
        },
      });

      paginationScroll();
    },
  });

  return (
    <Form noValidate onSubmit={handleSubmit}>
      {/* {isCreateGS ? (
        <Form.Group className="d-flex justify-content-center">
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            className="me-3 w-25"
          />
          <Button
            type="submit"
            className="rounded-pill fs-5 text-capitalize">Create Groupshop</Button>
        </Form.Group>
      )
        : ( */}
      <Form.Group className={isCreateGS ? 'd-flex justify-content-center' : 'd-flex'} controlId="username">
        { !isChannelOwner && (
        <div className={styles.groupshop_search_popover_addDeal}>
          <Form.Control
            type="text"
            name="username"
            // value={isInfluencer ? gsctx?.partnerDetails?.fname : values.username}
            value={values.username}
            onChange={handleChange}
            isInvalid={touched.username && !!errors.username}
            placeholder="Enter your first name"
            className={isCreateGS ? 'me-3' : 'me-1'}
          />
          <Form.Control.Feedback type="invalid" className="text-start">
            {errors.username}
          </Form.Control.Feedback>
        </div>
        )}
        {loadingSubmit ? <Spinner animation="border" /> : (
          <Button
            type="submit"
            className={isCreateGS ? [styles.groupshop_search_popover_dealBtn,
              'fs-5 text-capitalize'].join(' ')
              : styles.groupshop_search_popover_dealBtn}
          >
            {!isChannelOwner && (isInfluencer ? 'Create Groupshop' : 'Add')}
            {isChannelOwner && 'Save My Favs'}
          </Button>
        )}
      </Form.Group>
      {/* )} */}

    </Form>
  );
}
