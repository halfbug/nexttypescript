import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Footer from './FooterGS';

export default {
  title: 'GroupShop/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Tophead = Template.bind({});
Tophead.args = {
  LeftComp: <span> Left Component</span>,
  RightComp: <span> Right Component </span>,
};
