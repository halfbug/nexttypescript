import { useMutation } from '@apollo/client';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { ADD_DEAL_PRODUCT } from 'store/store.graphql';
import { IGroupshop } from 'types/groupshop';
import { IProduct } from 'types/store';
import ProductsSearch from '../ProductsSearch/ProductsSearch';

const OnBoardingAddProduct = ({ open }: any) => {
  const [showProduct, setShowProduct] = useState(false);

  const [addDealProduct] = useMutation<IGroupshop>(ADD_DEAL_PRODUCT);

  const { gsctx, dispatch } = useContext(GroupshopContext);

  useEffect(() => {
    if (open) {
      setShowProduct(open);
    }
  }, [open]);

  const getSelectedProduct = async (data: IProduct[], ids: string[]) => {
    const productObject: any = ids.map((ele) => ({
      productId: ele,
      type: 'deal',
      addedBy: gsctx.members[0].orderDetail.customer.firstName,
      customerIP: gsctx.members[0].orderDetail.customer.ip,
    }));

    const Data: any = {
      ...gsctx.obSettings,
      step: 2,
    };
    const uniqueDealProducts = _.uniq([...gsctx.dealProducts ?? [], ...productObject ?? []]);
    dispatch({ type: 'UPDATE_GROUPSHOP', payload: { ...gsctx, dealProducts: uniqueDealProducts, obSettings: { ...gsctx.obSettings, ...Data } } });

    await addDealProduct({
      variables: {
        updateGroupshopInput: {
          id: gsctx.id,
          dealProducts: uniqueDealProducts,
          obSettings: {
            ...Data,
          },
        },
      },
    });
  };
  return (
    <div>
      <ProductsSearch
        show={showProduct}
        handleClose={() => { setShowProduct(false); }}
        pending={false}
        getData={getSelectedProduct}
        allowSelectAll
        isCreateGS
      />
    </div>
  );
};

export default OnBoardingAddProduct;
