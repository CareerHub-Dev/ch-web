import React from 'react';
import classes from '@/styles/admin/dashboard.module.scss';
import AdminNavbar from '@/components/admin/Navbar';

const AdminDashboard = () => {
  return (
    <div className={classes.root}>
      <AdminNavbar />
      <div className={classes.workspace}>
        {new Array(10).fill(<div className={classes.gridItem}>134</div>)}
      </div>
    </div>
  );
};

export default AdminDashboard;

// export async function getStaticProps() {
//   return {
//     props: {},
//   };
// }
