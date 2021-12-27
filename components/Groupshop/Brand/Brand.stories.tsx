import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Brand from './Brand';

export default {
  title: 'GroupShop/Brand',
  component: Brand,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    name: { control: 'text' },
  },
} as ComponentMeta<typeof Brand>;

const Template: ComponentStory<typeof Brand> = (args) => <Brand {...args} />;

export const Small = Template.bind({});
Small.args = {
  name: 'LE SABLÉ',
};
