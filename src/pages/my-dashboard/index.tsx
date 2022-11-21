import { protectedSsr } from '@/lib/protected-ssr';

const CompanyDashboard = () => {
  return (
    <div className="text-center p-5 m-5 font-bold">
      Company Dashboard: In progress (components/company-dashboard/index.tsx)
    </div>
  );
};
export default CompanyDashboard;

export const getServerSideProps = protectedSsr({
  allowedRoles: ['Company'],
});
