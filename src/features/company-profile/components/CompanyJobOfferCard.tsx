import { CompanyJobOffer } from "@/lib/api/company/schemas";
import { getJobOfferLogo } from "@/lib/api/image";
import format from "date-fns/format";
import Image from "next/image";
import Link from "next/link";

export default function CompanyJobOfferCard({
    id,
    title,
    endDate,
    image,
    companyLogo,
}: CompanyJobOffer & { companyLogo: string | undefined | null }) {
    const formattedEndDate = format(new Date(endDate), "dd.MM.yyyy");
    const jobOfferLogo = getJobOfferLogo(image, companyLogo);
    const jobOfferUrl = `/job-offers/${id}`;

    return (
        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-400">
            <div className="flex-shrink-0">
                <Image
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-md"
                    src={jobOfferLogo}
                    alt={`job offer logo: ${title}`}
                />
            </div>
            <div className="min-w-0 flex-1">
                <Link href={jobOfferUrl} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="truncate text-sm text-gray-500">
                        {`Закінчується ${formattedEndDate}`}
                    </p>
                </Link>
            </div>
        </div>
    );
}
