import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ToolTip from './ToolTip';

export default {
  title: 'GroupShop/ToolTip',
  component: ToolTip,
} as ComponentMeta<typeof ToolTip>;

const Template: ComponentStory<typeof ToolTip> = (args) => <ToolTip {...args} />;

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
