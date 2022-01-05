/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from 'react-bootstrap';
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
  children: <>
    <h5 className="text-center fw-bold">Card Title</h5>
    <p className="text-center mb-1">
      Some quick example.
    </p>
    <p className="text-center fw-bold fs-5 mb-0">
      $20
    </p>
    <Button variant="primary" className="rounded-pill w-75">Add to Cart</Button>
    <Button variant="outline-primary" className="m-1 rounded-pill">test</Button>

  </>,
};
