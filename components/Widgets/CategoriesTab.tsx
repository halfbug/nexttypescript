import { useQuery } from '@apollo/client';
import useAppContext from 'hooks/useAppContext';
import React, { useCallback, useEffect, useState } from 'react';
import { GET_COLLECTIONS_BY_CATEGORY_ID } from 'store/store.graphql';
import styles from 'styles/Drops.module.scss';
import { Categories, subCategories } from 'types/groupshop';

interface PropsType {
  searchRefresh: any;
  categories: Categories[];
}

export default function CategoriesTab({ categories = [], searchRefresh }: PropsType) {
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>({});
  const [categoryArray, setCategoryArray] = useState<any>([]);
  const [dataLoad, setdDataLoad] = useState<boolean>(true);
  const [id, setId] = useState<string>('');
  const { gsctx, dispatch } = useAppContext();

  const { favorite, firstCategory: initCategory, forYouSections } = gsctx;

  const { loading, data } = useQuery(GET_COLLECTIONS_BY_CATEGORY_ID, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
    skip: !id || id === 'favproducts' || id === 'forYou' || !dataLoad,
  });

  useEffect(() => {
    if (categories) {
      const temp = categories?.slice()?.sort((a, b) => a.sortOrder - b.sortOrder) ?? [];
      const body: any = {
        categoryId: 'favproducts',
        collections: [],
        parentId: null,
        sortOrder: 0,
        subCategories: [],
        title: 'Your Favs',
      };

      const forYou: any = {
        categoryId: 'forYou',
        collections: [],
        parentId: null,
        sortOrder: 0,
        subCategories: [],
        title: 'For You',
      };
      if (favorite?.length) {
        temp.unshift(body);
      }
      if (forYouSections?.length) {
        temp.unshift(forYou);
      }
      // setInitialCategory();
      setCategoryArray(temp);
    }
  }, [categories, favorite, forYouSections]);

  useEffect(() => {
    if ((!favorite?.length || !forYouSections?.length) && initCategory?.categoryId) {
      dispatch({
        type: 'UPDATE_GROUPSHOP',
        payload: {
          ...gsctx,
          selectedCategory: gsctx.forYouSections?.length ? 'forYou' : initCategory?.categoryId,
        },
      });
      setSelectedCategory(gsctx.forYouSections?.length ? {
        categoryId: 'forYou',
        collections: [],
        parentId: null,
        sortOrder: 0,
        subCategories: [],
        title: 'For You',
      } : initCategory);
      setId(gsctx.forYouSections?.length ? 'forYou' : initCategory?.categoryId);
    }
  }, [favorite, forYouSections]);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_GROUPSHOP',
      payload: {
        ...gsctx,
        loading,
      },
    });
  }, [loading]);

  useEffect(() => {
    setInitialCategory();
  }, []);

  const setInitialCategory = () => {
    if (gsctx.forYouSections?.length) {
      setSelectedCategory({
        categoryId: 'forYou',
        collections: [],
        parentId: null,
        sortOrder: 0,
        subCategories: [],
        title: 'For You',
      });
    } else if (gsctx && gsctx.firstCategory) {
      const { categories: categoryArr, firstCategory } = gsctx;
      if (categoryArr) {
        const init = categoryArr.find((ele) => ele.categoryId === firstCategory.categoryId);
        setSelectedCategory(init);
      }
    }
  };

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'UPDATE_GROUPSHOP',
        payload: {
          ...gsctx,
          loading,
          sections: data.collectionByCategory.sections,
          categories: [...gsctx.categories!.map(
            (cat: any) => {
              if (cat.categoryId === data.collectionByCategory.categoryId) {
                return (
                  {
                    ...cat,
                    sections: data.collectionByCategory.sections,
                  });
              }
              return cat;
            },
          )],
        },
      });
    }
  }, [data]);

  useEffect(() => {
    if (searchRefresh) {
      if (gsctx?.firstCategory) {
        setId(gsctx.firstCategory.categoryId);
      }
    } else if (gsctx?.selectedCategory) {
      setId(gsctx.selectedCategory);
    }
  }, [searchRefresh]);

  const onCategoryClick = (item: any) => {
    if (item.categoryId === gsctx.selectedCategory) {
      return;
    }
    const dataExist = (gsctx?.categories) ? gsctx?.categories.find(
      (ele) => ele.categoryId === item.categoryId,
    ) : '';
    if (dataExist && dataExist?.sections) {
      setdDataLoad(false);
      dispatch({
        type: 'UPDATE_GROUPSHOP',
        payload: {
          ...gsctx,
          selectedCategory: item.categoryId,
          sections: dataExist.sections,
        },
      });
    } else {
      setdDataLoad(true);
      dispatch({
        type: 'UPDATE_GROUPSHOP',
        payload: {
          ...gsctx,
          selectedCategory: item.categoryId,
        },
      });
    }
    setSelectedCategory(item);
    setSelectedSubCategory('');
    setId(item.categoryId);
    scrollToTop();
  };

  const onSubCategoryClick = (subItem: any) => {
    if (subItem.categoryId === gsctx.selectedCategory) {
      return;
    }
    const parentCategoryId = selectedCategory.categoryId;
    const findIndex = (gsctx?.categories)
      ? gsctx?.categories.findIndex((obj) => obj.categoryId === parentCategoryId) : 0;
    const dataExit = (gsctx?.categories?.[findIndex].subCategories)
      ? gsctx?.categories?.[findIndex].subCategories.find(
        (ele) => ele.categoryId === subItem.categoryId,
      ) : '';
    if (dataExit && dataExit?.sections) {
      setdDataLoad(false);
      dispatch({
        type: 'UPDATE_GROUPSHOP',
        payload: {
          ...gsctx,
          selectedCategory: subItem.categoryId,
          sections: dataExit.sections,
        },
      });
    } else {
      setdDataLoad(true);
    }
    if (id !== subItem.categoryId) {
      setSelectedSubCategory(subItem);
      setId(subItem.categoryId);
    } else {
      setSelectedSubCategory('');
      setId(selectedCategory.categoryId);
    }
    scrollToTop();
  };

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      const elHeaderSection = document.getElementById('dropsStickyHeaderSection')?.offsetHeight ?? 0;
      const elStickySection = document.getElementById('dropsStickyAreaSection')?.offsetHeight ?? 0;
      const elProductsSection = document.getElementById('dropsProductSections')?.offsetTop ?? 0;
      window.scroll({
        top: (elProductsSection - elHeaderSection - elStickySection),
        behavior: 'smooth',
      });
    }, 700);
  }, [selectedCategory]);

  return (
    <>
      <div className={styles.drops__categoriesTab}>
        {categoryArray?.map((item: Categories) => (
          <div className={styles.drops__categoriesTab__itemWrapper} key={item.categoryId}>
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() => {
                if (!loading) {
                  onCategoryClick(item);
                }
              }}
              className={[styles.drops__categoriesTab__item,
                item.categoryId === selectedCategory.categoryId
                  ? styles.drops__categoriesTab__item__selected
                  : styles.drops__categoriesTab__item__notSelected].join(' ')}
              onClick={() => {
                if (!loading) {
                  onCategoryClick(item);
                }
              }}
            >
              {item.title}
            </div>
            <hr
              className={item.categoryId === selectedCategory.categoryId
                ? styles.drops__categoriesTab__item__selected__border
                : styles.drops__categoriesTab__item__notSelected__border}
            />
          </div>
        ))}
      </div>
      {
        selectedCategory?.subCategories?.length
          ? (
            <div className={styles.drops__subCategoriesTab}>
              {selectedCategory?.subCategories
                ?.slice().sort((a: any, b: any) => a.sortOrder - b.sortOrder)
                ?.map((item: subCategories) => (
                  <div
                    key={item.categoryId}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => {
                      if (!loading) {
                        onSubCategoryClick(item);
                      }
                    }}
                    className={[styles.drops__subCategoriesTab__item,
                      item.categoryId === selectedSubCategory.categoryId
                        ? styles.drops__subCategoriesTab__item__selected
                        : styles.drops__subCategoriesTab__item__notSelected].join(' ')}
                    onClick={() => {
                      if (!loading) {
                        onSubCategoryClick(item);
                      }
                    }}
                  >
                    {item.title}
                  </div>
                ))}
            </div>
          )
          : <></>
      }

    </>
  );
}
