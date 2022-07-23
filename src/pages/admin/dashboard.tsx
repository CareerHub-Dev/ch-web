import React from 'react';
import classes from '@/styles/admin/dashboard.module.scss';
import AdminNavbar from '@/components/admin/Navbar';

const AdminDashboard = () => {
  return (
    <div className={classes.root}>
      <AdminNavbar />
    </div>
  );
};

export default AdminDashboard;

// export async function getStaticProps() {
//   return {
//     props: {},
//   };
// }
