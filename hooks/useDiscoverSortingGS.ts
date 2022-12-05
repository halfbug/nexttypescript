/* eslint-disable no-param-reassign */

const useDiscoverSortingGS = (matchingGS: any, matchingStoreIds: any) => {
  const showingGS: any = [];
  const matchingGs: any = JSON.parse(JSON.stringify(matchingGS));
  if (matchingGs.length && matchingStoreIds.length) {
    matchingGs.sort((a: any, b: any) => a.numMembers - b.numMembers);
    matchingStoreIds.forEach((ele: any) => {
      showingGS.push({ storeId: ele, groupshops: [] });
    });
    matchingGs?.forEach((ele: any) => {
      const tempEle: any = ele?.dealProducts?.map((item: any) => ({
        ...item,
        productData: ele?.InventoryProducts?.find(
          (InvProd: any) => InvProd?.id === item?.productId,
        ),
      }));
      ele.dealProducts = tempEle;
      showingGS.forEach((item: any) => item.storeId === ele.storeId
                && item.groupshops.push(ele));
    });
    showingGS.forEach((item: any) => {
      if (item.groupshops.length) {
        const minVal: any = Math.min(...item.groupshops.map((data: any) => data.numMembers));
        const minRandom: any = item.groupshops.filter((data: any) => data.numMembers === minVal);
        const random: any = Math.floor(Math.random() * minRandom.length);
        item.groupshops = item.groupshops[random];
      } else {
        item.groupshops = {};
      }
    });
    const temp: any[] = [];
    if (showingGS.length > 0) {
      const tempGS: any = JSON.parse(JSON.stringify(showingGS));
      tempGS.forEach((el: any) => {
        const tempProd: any = [];
        const tempIds: any = [];
        el.groupshops?.popularProducts?.forEach((elem: any) => {
          if (tempIds.length < 4) {
            tempProd.push(elem); tempIds.push(elem.id);
          }
        });
        if (tempIds.length < 4) {
          el.groupshops?.dealProducts?.forEach((elem: any) => {
            if (!tempIds.includes(elem.productId) && tempIds.length < 4) {
              tempProd.push(elem.productData); tempIds.push(elem.productData.id);
            }
          });
        }
        if (tempIds.length < 4) {
          el.groupshops?.bestSeller?.forEach((elem: any) => {
            if (!tempIds.includes(elem.id) && tempIds.length < 4) {
              tempProd.push(elem); tempIds.push(elem.id);
            }
          });
        }
        if (el?.groupshops?.storeId) {
          temp.push({
            logoImage: el?.groupshops?.store?.logoImage,
            brandName: el?.groupshops?.store?.brandName,
            customerName: el?.groupshops?.members,
            discount: el?.groupshops?.discountCode?.percentage,
            storeId: el.storeId,
            products: tempProd,
            url: el?.groupshops?.url,
            members: el?.groupshops?.members,
          });
        }
      });
    }
    return temp;
  }
  return [];
};
export default useDiscoverSortingGS;
