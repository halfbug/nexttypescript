import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// import Dialogue from './dialogue';
import Step5 from './step5';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Onboarding/Step5',
  component: Step5,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    children: { control: 'text' },
  },
} as ComponentMeta<typeof Step5>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Step5> = (args:any) => <Step5 {...args} />;

export const Main = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Main.args = {
  show: true,

};
