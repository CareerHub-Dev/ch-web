import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { fetchJobOfferSubscribedStudentsAmount } from '@/lib/api/remote/jobOffers';
import InfoItem from './InfoItem';
import PeopleIcon from '@/components/ui/icons/PeopleIcon';

const SubscribersInfo: React.FC<{ jobOfferId: string }> = ({ jobOfferId }) => {
  const { accessToken } = useAuth();
  const { data, isLoading } = useQuery(
    ['jobOffer', jobOfferId, 'subscriptions', 'amount'],
    fetchJobOfferSubscribedStudentsAmount({
      token: accessToken as string,
      jobOfferId,
    }),
    {
      enabled: !!accessToken,
    }
  );
  const subscribersAmount = isLoading ? '...' : (data as number);
  return (
    <InfoItem icon={PeopleIcon}>
      <span>{`Підписки: ${subscribersAmount}`}</span>
    </InfoItem>
  );
};
export default SubscribersInfo;
