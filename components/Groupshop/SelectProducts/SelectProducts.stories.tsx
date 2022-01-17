import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectProducts from './SelectProducts';

export default {
  title: 'GroupShop/SelectProducts',
  component: SelectProducts,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    name: { control: 'text' },
  },
} as ComponentMeta<typeof SelectProducts>;

const Template: ComponentStory<typeof SelectProducts> = (args) => <SelectProducts {...args} />;

export const Small = Template.bind({});
Small.args = {
  name: 'LE SABLÉ',
};
