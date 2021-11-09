import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// import Dialogue from './dialogue';
import Step3 from './step3';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Onboarding/Step3',
  component: Step3,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    children: { control: 'text' },
  },
} as ComponentMeta<typeof Step3>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Step3> = (args:any) => <Step3 {...args} />;

export const Main = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Main.args = {
  show: true,

};
