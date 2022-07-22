import { ComponentMeta, ComponentStory } from '@storybook/react';
import NavMenu from '.';

const Template: ComponentStory<typeof NavMenu> = (args: any) => (
  <NavMenu {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

export default {
  title: 'Admin/NavMenu',
  component: NavMenu,
} as ComponentMeta<typeof NavMenu>;
