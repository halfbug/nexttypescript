import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductsSearch from './ProductsSearch';

export default {
  title: 'GroupShop/ProductsSearch',
  component: ProductsSearch,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    show: { control: 'boolean' },
  },
} as ComponentMeta<typeof ProductsSearch>;

const Template: ComponentStory<typeof ProductsSearch> = (args) => <ProductsSearch {...args} />;

export const Main = Template.bind({});
Main.args = {
  show: true,
  handleClose: () => false,
};
