import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CopyToClipboard from './CopyToClipboard';

export default {
  title: 'GroupShop/CopyToClipboard',
  component: CopyToClipboard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: { control: 'text' },
  },
} as ComponentMeta<typeof CopyToClipboard>;

const Template: ComponentStory<typeof CopyToClipboard> = (args) => <CopyToClipboard {...args} />;

export const Small = Template.bind({});
Small.args = {
  value: 'LE SABLÉ',
};
