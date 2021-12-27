import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Members from './Members';

export default {
  title: 'GroupShop/Members',
  component: Members,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    name: { control: 'text' },
  },
} as ComponentMeta<typeof Members>;

const Template: ComponentStory<typeof Members> = (args) => <Members {...args} />;

export const Small = Template.bind({});
Small.args = {
  name: 'LE SABLÉ',
};
