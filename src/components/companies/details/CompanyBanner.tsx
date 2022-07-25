import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanyBanner } from '@/lib/api/remote/companies';
import Image from 'next/image';
import classes from './CompanyBanner.module.scss';

const CompanyBanner: React.FC<{
  companyId: string;
}> = ({ companyId }) => {
  const { accessToken } = useAuth();
  const bannerQuery = useQuery(
    ['banner', companyId],
    fetchCompanyBanner({
      token: accessToken as string,
      companyId,
    }),
    {
      enabled: accessToken !== null,
    }
  );

  const banner = (bannerQuery.data as string) || '/company-dummy-banner.png';

  return (
    <Image
      id="banner"
      alt="Company Banner"
      width={1800}
      height={400}
      src={banner}
      className={classes.banner}
    />
  );
};
export default CompanyBanner;
