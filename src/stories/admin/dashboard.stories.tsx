import AdminDashboard from '../../pages/admin/dashboard';
import { ComponentMeta, ComponentStory } from '@storybook/react';

const Template: ComponentStory<typeof AdminDashboard> = (args: any) => (
  <AdminDashboard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

export default {
  title: 'admin/dashboard',
  component: AdminDashboard,
} as ComponentMeta<typeof AdminDashboard>;
