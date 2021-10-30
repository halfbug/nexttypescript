import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Dialogue from './dialogue';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Compnents/Dialogue',
  component: Dialogue,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    children: { control: 'text' },
  },
} as ComponentMeta<typeof Dialogue>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dialogue> = (args) => <Dialogue {...args} />;

export const Main = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Main.args = {
  show: true,
  children: <h1>this is main heading</h1>,
};
