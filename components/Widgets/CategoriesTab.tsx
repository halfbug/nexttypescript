/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import styles from 'styles/Drops.module.scss';

export default function CategoriesTab() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const tabCategoriesMockData = [
    {
      name: 'All',
    },
    {
      name: 'Beauty',
      subCategories: [
        {
          name: 'Skin',
        },
        {
          name: 'Hair',
        },
        {
          name: 'Nails',
        },
        {
          name: 'Serums',
        },
        {
          name: 'Face',
        },
        {
          name: 'Body',
        },
        {
          name: 'Feet',
        },
      ],

    },
    {
      name: 'Electronics',
      subCategories: [
        {
          name: 'Headphones',
        },
        {
          name: 'Air Conditioners',
        },
        {
          name: 'Laptops',
        },
        {
          name: 'Mobiles',
        },
        {
          name: 'Washing Machines',
        },
        {
          name: 'Study Lamps',
        },
      ],
    },
    {
      name: 'Clothes & Fashion',
      subCategories: [
        {
          name: 'Shirts',
        },
      ],
    },
    {
      name: 'Health & Wellness',
      subCategories: [
        {
          name: 'Juices',
        },
      ],
    },
    {
      name: 'Food & Beverage',
      subCategories: [
        {
          name: 'Coca Cola',
        },
      ],
    },
    {
      name: 'Home',
      subCategories: [
        {
          name: 'Door Bell',
        },
      ],
    },
    {
      name: 'Entertainment',
      subCategories: [
        {
          name: 'Headphones',
        },
      ],
    },
    {
      name: 'Men’s Fashion',
      subCategories: [
        {
          name: 'Tee Shirts',
        },
      ],
    },
  ];

  const onCategoryClick = (item: any) => {
    setSelectedCategory(item);
    if (tabCategoriesMockData && tabCategoriesMockData.length) {
      const temp = tabCategoriesMockData?.filter((el) => el?.name === item);

      if (temp && temp.length) {
        const d = temp[0].subCategories;
        setSelectedSubCategory(d ? d[0].name : '');
      }
      console.log(item);
    }
  };
  const onSubCategoryClick = (subItem: any) => {
    setSelectedSubCategory(subItem);
    console.log(subItem);
  };

  return (
    <>
      <div className={styles.drops__categoriesTab}>
        {tabCategoriesMockData.map((item) => (
          <div className={styles.drops__categoriesTab__itemWrapper}>
            <div
              className={[styles.drops__categoriesTab__item,
                item.name === selectedCategory
                  ? styles.drops__categoriesTab__item__selected
                  : styles.drops__categoriesTab__item__notSelected].join(' ')}
              onClick={() => onCategoryClick(item.name)}
            >
              {item.name}
            </div>
            <hr
              className={item.name === selectedCategory
                ? styles.drops__categoriesTab__item__selected__border
                : styles.drops__categoriesTab__item__notSelected__border}
            />
          </div>
        ))}
      </div>
      <div className={styles.drops__subCategoriesTab}>
        {tabCategoriesMockData.map((item) => (
          item.name === selectedCategory
            ? (
              item.subCategories?.map((subItem) => (
                <div
                  className={[styles.drops__subCategoriesTab__item,
                    subItem.name === selectedSubCategory
                      ? styles.drops__subCategoriesTab__item__selected
                      : styles.drops__subCategoriesTab__item__notSelected].join(' ')}
                  onClick={() => onSubCategoryClick(subItem.name)}
                >
                  {subItem.name}
                </div>
              ))
            )
            : <></>
        ))}
      </div>
    </>
  );
}
