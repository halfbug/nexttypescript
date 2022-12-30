/* eslint-disable no-param-reassign */

const useDiscoverSortingGS = (matchingGS: any, matchingStoreIds: any) => {
  const showingGS: any = [];
  const matchingGs: any = JSON.parse(JSON.stringify(matchingGS));
  if (matchingGs.length && matchingStoreIds.length) {
    matchingGs.forEach((el: any) => {
      const tempProduct: any = [];
      el?.popularProducts?.sort((a: any, b: any) => b.purchaseCount - a.purchaseCount);
      el?.popularProducts?.forEach((ele: any) => {
        if (tempProduct.length < 4 && !tempProduct.map((item:any) => item.id).includes(ele.id) && ele.status === 'ACTIVE') {
          tempProduct.push(ele);
        }
      });
      if (tempProduct.length < 4) {
        el?.bestSeller?.sort((a: any, b: any) => b.purchaseCount - a.purchaseCount);
        el?.bestSeller?.forEach((ele: any) => {
          if (tempProduct.length < 4 && !tempProduct.map((item:any) => item.id).includes(ele.id) && ele.status === 'ACTIVE') {
            tempProduct.push(ele);
          }
        });
      }
      showingGS.push({
        logoImage: el?.logoImage,
        brandName: el?.brandName,
        customerName: el?.members[0]?.orderDetail?.customer,
        discount: el?.groupshops?.discountCode?.percentage,
        storeId: el.id,
        products: tempProduct,
        url: el?.groupshops?.url,
        members: el?.members,
      });
    });
    const finalGS:any = matchingStoreIds.map((prod:any) => showingGS.find(
      (el:any) => el.storeId === prod,
    )).filter((el:any) => el);
    return finalGS;
  }
  return showingGS;
};
export default useDiscoverSortingGS;
