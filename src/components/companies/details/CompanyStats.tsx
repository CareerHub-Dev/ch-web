import useProtectedQuery from '@/hooks/useProtectedQuery';
import {
  getCompanySubscribersAmount,
  getCompanyJobOffersAmount,
} from '@/lib/api/company';
import SocialInfoBlock from './SocialInfoBlock';
import FollowButton from './FollowButton';

const CompanyStats = ({ companyId }: { companyId: string }) => {
  const { data: subscribers } = useProtectedQuery(
    ['company', companyId, 'subscriptions', 'amount'],
    getCompanySubscribersAmount(companyId)
  );
  const { data: jobOffers } = useProtectedQuery(
    ['company', companyId, 'jobOffers', 'amount'],
    getCompanyJobOffersAmount(companyId)
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 grid-cols-2">
        <SocialInfoBlock title="Підписники" value={subscribers} />
        <SocialInfoBlock title="Вакансії" value={jobOffers} />
      </div>
      <FollowButton companyId={companyId} />
    </div>
  );
};
export default CompanyStats;
