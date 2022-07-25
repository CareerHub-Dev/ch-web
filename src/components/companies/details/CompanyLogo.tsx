import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanyLogo } from '@/lib/api/remote/companies';
import Image from 'next/image';
import classes from './CompanyLogo.module.scss';

const CompanyLogo: React.FC<{
  companyId: string;
}> = ({ companyId }) => {
  const { accessToken } = useAuth();
  const logoQuery = useQuery(
    ['companyLogo', companyId],
    fetchCompanyLogo({ token: accessToken as string, companyId }),
    { enabled: accessToken !== null }
  );

  const logo = (logoQuery.data as string) || '/company-dummy-logo.png';

  return (
    <Image
      alt="Company Logo"
      className={classes.logo}
      src={logo}
      width={400}
      height={400}
    />
  );
};
export default CompanyLogo;
