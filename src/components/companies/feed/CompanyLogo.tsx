import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { fetchCompanyLogo } from '@/lib/api/remote/companies';
import classes from './CompanyLogo.module.scss';

const CompanyLogo: React.FC<{
  companyId: string;
  companyName: string;
}> = ({ companyId, companyName }) => {
  const { accessToken } = useAuth();
  const { data, isLoading, isError } = useQuery(
    ['companyLogo', companyId],
    fetchCompanyLogo({
      token: accessToken as string,
      companyId,
    }),
    {
      enabled: accessToken !== null,
      useErrorBoundary: true,
      onError: (err: any) =>
        alert(err.message || 'Помилка при завантаженні логотипу компанії'),
    }
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const loadedImage = isError
    ? 'https://i.imgur.com/XqY6xjq.png'
    : (data as string);

  return (
    <Image
      className={classes.logo}
      src={loadedImage}
      width={400}
      height={400}
      alt={companyName}
    />
  );
};
export default CompanyLogo;
