import { useQuery } from '@apollo/client';
import useAppContext from 'hooks/useAppContext';
import React, { useCallback, useEffect, useState } from 'react';
import { GET_COLLECTIONS_BY_CATEGORY_ID } from 'store/store.graphql';
import styles from 'styles/Drops.module.scss';
import { Categories, subCategories } from 'types/groupshop';

interface PropsType {
  categories: Categories[];
}

export default function CategoriesTab({ categories = [] }: PropsType) {
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>({});
  const [id, setId] = useState<string>('');
  const { gsctx, dispatch } = useAppContext();

  const { loading, data } = useQuery(GET_COLLECTIONS_BY_CATEGORY_ID, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
    skip: !id,
  });

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
    if (gsctx && gsctx.firstCategory) {
      const { categories: categoryArr, firstCategory } = gsctx;
      if (categoryArr) {
        const init = categoryArr.find((ele) => ele.categoryId === firstCategory.categoryId);
        setSelectedCategory(init);
      }
    }
  }, []);

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

  const onCategoryClick = (item: any) => {
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
      const ele = document.getElementById('dropsProductSections')?.offsetTop ?? 0;
      window.scroll({
        top: (ele - 270),
        behavior: 'smooth',
      });
    }, 700);
  }, [selectedCategory]);

  return (
    <>
      <div className={styles.drops__categoriesTab}>
        {categories?.slice()?.sort((a, b) => a.sortOrder - b.sortOrder)?.map((item: Categories) => (
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
