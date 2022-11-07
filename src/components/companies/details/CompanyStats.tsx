import useSession from '@/hooks/useSession';
import { useQuery } from '@tanstack/react-query';
import {
  fetchCompanyJobOffersAmount,
  fetchCompanySubscribersAmount,
} from '@/lib/api/remote/companies';
import SocialInfoBlock from './SocialInfoBlock';
import FollowButton from './FollowButton';

const CompanyStats: React.FC<{ companyId: string }> = ({ companyId }) => {
  const { data: session } = useSession();
  const accessToken = session?.jwtToken as string;
  const subscribersQuery = useQuery(
    ['company', companyId, 'subscriptions', 'amount'],
    fetchCompanySubscribersAmount({
      accessToken,
      companyId,
    }),
    {
      enabled: !!accessToken,
      onError: (error: any) => {
        alert && alert(error.message || 'Помилка при завантаженні компанії');
      },
    }
  );
  const jobOffersQuery = useQuery(
    ['company', companyId, 'jobOffers', 'amount'],
    fetchCompanyJobOffersAmount({
      accessToken,
      companyId,
    }),
    {
      onError: (error: any) => {
        alert && alert(error.message || 'Помилка при завантаженні компанії');
      },
    }
  );

  const subscribersAmount = subscribersQuery.isLoading
    ? '...'
    : subscribersQuery.data || '0';

  const jobOffersAmount = jobOffersQuery.isLoading
    ? '...'
    : jobOffersQuery.data || '0';

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 grid-cols-2">
        <SocialInfoBlock title="Підписники" value={subscribersAmount} />
        <SocialInfoBlock title="Вакансії" value={jobOffersAmount} />
      </div>
      <FollowButton companyId={companyId} />
    </div>
  );
};
export default CompanyStats;
