import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InfoBox from './InfoBox';

export default {
  title: 'GroupShop/InfoBox',
  component: InfoBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    show: { control: 'boolean' },
  },
} as ComponentMeta<typeof InfoBox>;

const Template: ComponentStory<typeof InfoBox> = () => <InfoBox mes="How does this work?" />;

export const Main = Template.bind({});
Main.args = {
  // show: true,
  // showhandleClose: () => false,
};
