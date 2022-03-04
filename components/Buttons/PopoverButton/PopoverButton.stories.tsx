import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PopoverButton from './PopoverButton';

export default {
  title: 'GroupShop/PopoverButton',
  component: PopoverButton,
} as ComponentMeta<typeof PopoverButton>;

const Template: ComponentStory<typeof PopoverButton> = (args) => <PopoverButton {...args} />;

export const plane = Template.bind({});
plane.args = {

  popContent: <div>test component</div>,
  label: 'Earn Cashback',
};

export const basic = Template.bind({});
basic.args = {

  popContent: <div>test component</div>,
  label: 'Invite',
};
