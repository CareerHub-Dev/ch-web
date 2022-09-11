import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { fetchJobOfferAppliedCvsAmount } from '@/lib/api/remote/jobOffers';
import InfoItem from './InfoItem';
import DocumentIcon from '@/components/ui/icons/DocumentIcon';

const AppliedCVsInfo: React.FC<{ jobOfferId: string }> = ({ jobOfferId }) => {
  const { accessToken } = useAuth();
  const { data, status } = useQuery(
    ['jobOfferDetails', jobOfferId, 'applied-cvs-amount'],
    fetchJobOfferAppliedCvsAmount({
      token: accessToken as string,
      jobOfferId,
    }),
    {
      enabled: !!accessToken,
    }
  );
  const cvsAppliedAmount = status === 'loading' ? '...' : (data as number);
  return (
    <InfoItem icon={DocumentIcon}>
      <span>{`Резюме: ${cvsAppliedAmount}`}</span>
    </InfoItem>
  );
};
export default AppliedCVsInfo;