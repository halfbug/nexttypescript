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
  const [id, setId] = useState<string>('');
  const { gsctx, dispatch } = useAppContext();

  const { favorite } = gsctx;

  const { loading, data } = useQuery(GET_COLLECTIONS_BY_CATEGORY_ID, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
    skip: !id,
  });

  useEffect(() => {
    if (categories) {
      const temp = categories?.slice()?.sort((a, b) => a.sortOrder - b.sortOrder) ?? [];
      const body = {
        categoryId: 'favproducts',
        collections: [],
        parentId: null,
        sortOrder: 0,
        subCategories: [],
        title: 'Your Favs',
      };
      if (favorite?.length) {
        setCategoryArray([body, ...temp]);
      } else {
        dispatch({
          type: 'UPDATE_GROUPSHOP',
          payload: {
            ...gsctx,
            selectedCategory: '',
          },
        });
        setInitialCategory();
        setCategoryArray(temp);
        setId(gsctx.firstCategory?.categoryId ?? '');
      }
    }
  }, [categories, favorite]);

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
    if (gsctx && gsctx.firstCategory) {
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
    dispatch({
      type: 'UPDATE_GROUPSHOP',
      payload: {
        ...gsctx,
        selectedCategory: item.categoryId,
      },
    });
    setSelectedCategory(item);
    setSelectedSubCategory('');
    setId(item.categoryId);
    scrollToTop();
  };

  const onSubCategoryClick = (subItem: any) => {
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
          <div className={styles.drops__categoriesTab__itemWrapper}>
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
