/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProdcutGrid from './ProductGrid';

export default {
  title: 'GroupShop/ProdcutGrid',
  component: ProdcutGrid,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    name: { control: 'text' },
  },
} as ComponentMeta<typeof ProdcutGrid>;

const Template: ComponentStory<typeof ProdcutGrid> = (args) => <ProdcutGrid {...args} />;

export const Grid = Template.bind({});
Grid.args = {
  products: [
    {
      featuredImage: 'https://cdn.shopify.com/s/files/1/0531/0821/1878/products/23dfee017bb5915cc43755528841b380.jpg?v=1613474781',
      id: 'gid://shopify/Product/6140915548326',
      title: 'THE LAST SUPPER | LEONARDO DA VINCI',
      price: '990.00',
      currencyCode: 'USD',
      lineItems: [
        {
          product: {
            id: 'gid://shopify/Product/6140915548326',
          },
          price: '990.00',
        },
      ],
    },
  ],
  children: <>
    <h2>Pick Out</h2>
    <p>this is the sub style for it</p>
  </>,
};
