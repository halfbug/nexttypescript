import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductCard from './ProductCard';

export default {
  title: 'GroupShop/ProductCard',
  component: ProductCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    isrc: { control: 'text' },
  },
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => <ProductCard {...args} />;

export const Small = Template.bind({});
Small.args = {
  isrc: 'https://static-01.daraz.pk/p/bddacc10cdf258fb1daa001db136dfb3.jpg_340x340q80.jpg_.web',
};
