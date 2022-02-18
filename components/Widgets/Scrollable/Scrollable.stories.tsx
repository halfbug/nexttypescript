/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Scrollable from './Scrollable';

export default {
  title: 'Widgets/Scrollable',
  component: Scrollable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    name: { control: 'text' },
  },
} as ComponentMeta<typeof Scrollable>;

const Template: ComponentStory<typeof Scrollable> = (args) => <Scrollable {...args} />;

export const Horizontal = Template.bind({});
Horizontal.args = {
  width: '300px',
  children: <>
    <div className="d-flex w-50">
      <button type="button" className="Groupshop_groupshop_modal_detail_button_selected__3jA0j"><img src="https://cdn.shopify.com/s/files/1/0531/0821/1878/products/6d8a2bfbdcd51482a2b0eaac948acd21.jpg?v=1613474573" alt="image_0" style={{ width: '60px', height: '60px' }} /></button>
      <button type="button" className="Groupshop_groupshop_modal_detail_button__5yn9M"><img src="https://cdn.shopify.com/s/files/1/0531/0821/1878/products/e1a602299eadb59238aecf3781d184b7.jpg?v=1613474573" alt="image_1" style={{ width: '60px', height: '60px' }} /></button>
      <button type="button" className="Groupshop_groupshop_modal_detail_button__5yn9M"><img src="https://cdn.shopify.com/s/files/1/0531/0821/1878/products/1b19e25fcdd1d5f8a4aa625c02f0e04c.jpg?v=1613474573" alt="image_2" style={{ width: '60px', height: '60px' }} /></button>
      <button type="button" className="Groupshop_groupshop_modal_detail_button__5yn9M"><img src="https://cdn.shopify.com/s/files/1/0531/0821/1878/products/c7ba291151a4993bca678f735fbe78b4.jpg?v=1613474573" alt="image_3" style={{ width: '60px', height: '60px' }} /></button>
      <button type="button" className="Groupshop_groupshop_modal_detail_button__5yn9M"><img src="https://cdn.shopify.com/s/files/1/0531/0821/1878/products/fae150570c8ce6ddc4f787bf77b02c95.jpg?v=1613474573" alt="image_4" style={{ width: '60px', height: '60px' }} /></button>
    </div>
  </>,
};
