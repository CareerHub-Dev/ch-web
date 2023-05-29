import CompanyInfoBlock from "./CompanyInfoBlock";
import { BriefcaseIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import CompanyLogo from "./CompanyLogo";
import Link from "next/link";

import { type CompanyInFeed } from "@/lib/api/company/schemas";

const CompanyCard = ({ company }: { company: CompanyInFeed }) => {
  return (
    <div className="bg-primaryWhite p-8 rounded-md shadow-md">
      <div className="flex gap-4 mb-4">
        <CompanyLogo imageId={company.logo} companyName={company.name} />
        <div className="flex flex-col">
          <CompanyInfoBlock
            value={company.amountSubscribers.toString()}
            icon={
              <UserGroupIcon
                title="Кількість підписників"
                className="h-6 w-6"
              />
            }
          />
          <CompanyInfoBlock
            value={company.amountJobOffers.toString()}
            icon={
              <BriefcaseIcon title="Кількість вакансій" className="h-6 w-6" />
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-xl">{company.name}</h1>
        <p className="text-lightBlueAccent text-sm leading-relaxed">
          {company.motto}
        </p>
        <Link
          className="w-full py-2 bg-primaryBlue text-white rounded-lg text-center
            hover:bg-darkBlueAccent hover:text-lightBlue
            transition-all duration-200"
          href={`/companies/${company.id}`}
        >
          Більше
        </Link>
      </div>
    </div>
  );
};
export default CompanyCard;
