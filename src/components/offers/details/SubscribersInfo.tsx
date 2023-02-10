import useSession from '@/hooks/useSession';
import { useQuery } from '@tanstack/react-query';
import { fetchJobOfferSubscribedStudentsAmount } from '@/lib/api/remote/jobOffers';
import InfoItem from './InfoItem';
import { UserGroupIcon } from '@heroicons/react/24/outline';

const SubscribersInfo: React.FC<{ jobOfferId: string }> = ({ jobOfferId }) => {
  const { data: session } = useSession();
  const accessToken = session?.jwtToken as string;
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
    <InfoItem icon={<UserGroupIcon />}>
      <span>{`Підписки: ${subscribersAmount}`}</span>
    </InfoItem>
  );
};
export default SubscribersInfo;
