import { ComponentMeta, ComponentStory } from '@storybook/react';
import { default as NavMenuItem, Props } from '.';

const Template: ComponentStory<typeof NavMenuItem> = (args: Props) => (
  <NavMenuItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

export default {
  title: 'Admin/NavMenuItem',
  component: NavMenuItem,
} as ComponentMeta<typeof NavMenuItem>;
