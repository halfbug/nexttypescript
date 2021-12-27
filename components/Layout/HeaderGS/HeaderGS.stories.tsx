import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from './HeaderGS';

export default {
  title: 'GroupShop/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Tophead = Template.bind({});
Tophead.args = {
  LeftComp: <span> Left Component</span>,
  RightComp: <span> Right Component </span>,
};
