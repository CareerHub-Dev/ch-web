import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import {
  fetchCompanyJobOffersAmount,
  fetchCompanySubscribersAmount,
} from '@/lib/api/remote/companies';
import SocialInfoBlock from './SocialInfoBlock';
import FollowButton from './FollowButton';
import classes from './CompanySocials.module.scss';

const CompanySocials: React.FC<{ companyId: string }> = ({ companyId }) => {
  const { session } = useAuth();
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
    <div className={classes.social}>
      <div className={classes.blocks}>
        <SocialInfoBlock title="Підписники" value={subscribersAmount} />
        <SocialInfoBlock title="Вакансії" value={jobOffersAmount} />
      </div>
      <FollowButton companyId={companyId} />
    </div>
  );
};
export default CompanySocials;
