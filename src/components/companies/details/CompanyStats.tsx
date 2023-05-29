import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import {
  getCompanySubscribersAmount,
  getCompanyJobOffersAmount,
} from "@/lib/api/company";
import CompanyStat from "./CompanyStat";
import FollowButton from "./FollowButton";

const CompanyStats = ({ companyId }: { companyId: string }) => {
  const { data: subscribers } = useProtectedQuery(
    ["company", companyId, "subscriptions", "amount"],
    getCompanySubscribersAmount(companyId)
  );
  const { data: jobOffers } = useProtectedQuery(
    ["company", companyId, "jobOffers", "amount"],
    getCompanyJobOffersAmount(companyId)
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 grid-cols-2">
        <CompanyStat title="Підписники" value={subscribers} />
        <CompanyStat title="Вакансії" value={jobOffers} />
      </div>
      <FollowButton companyId={companyId} />
    </div>
  );
};
export default CompanyStats;
