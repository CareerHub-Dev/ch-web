import { ComponentMeta, ComponentStory } from '@storybook/react';
import LoadingSpinner from './LoadingSpinner';

const Template: ComponentStory<typeof LoadingSpinner> = (args) => (
  <LoadingSpinner {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

export default {
  title: 'UI/LoadingSpinner',
  component: LoadingSpinner,
} as ComponentMeta<typeof LoadingSpinner>;
