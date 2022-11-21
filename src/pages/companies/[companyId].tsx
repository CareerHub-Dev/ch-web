import { Fragment, useState } from 'react';
import useProtectedQuery from '@/hooks/useProtectedQuery';
import useProtectedPaginatedQuery from '@/hooks/useProtectedPaginatedQuery';
import { useDebounce } from 'usehooks-ts';
import { getCompany, getCompanyJobOffers } from '@/lib/api/company';
import CompanyBanner from '@/components/companies/details/CompanyBanner';
import CompanyHeader from '@/components/companies/details/CompanyHeader';
import CompanyDescription from '@/components/companies/details/CompanyDescription';
import CompanyJobOffersListItem from '@/components/companies/details/CompanyJobOffersListItem';
import LoadMore from '@/components/ui/LoadMore';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CommonLayout from '@/components/layout/CommonLayout';
import { protectedSsr } from '@/lib/protected-ssr';
import axiosMiddleware from '@/lib/middleware/axiosMiddleware';

import { type CompanyDetails } from '@/lib/api/company/schemas';
import { type InferGetServerSidePropsType } from 'next/types';

const CompanyDetailsPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ company }) => {
  const companyId = company.id;
  const [jobOfferSearch, setJobOfferSearch] = useState('');
  const debouncedJobOfferSearch = useDebounce(jobOfferSearch, 500);

  const params = {
    companyId,
    pageSize: 25,
    searchTerm: debouncedJobOfferSearch,
  };

  const companyQuery = useProtectedQuery(
    ['company', companyId],
    getCompany(companyId),
    {
      initialData: company,
    }
  );
  const companyJobOffersQuery = useProtectedPaginatedQuery({
    queryKey: ['companyJobOffers', companyId],
    getItems: getCompanyJobOffers,
    params,
  });

  if (companyQuery.isLoading) {
    return (
      <div className="flex justify-center mt-12">
        <LoadingSpinner />
      </div>
    );
  }
  if (companyQuery.isError) {
    return <p>Помилка при завантаженні компанії</p>;
  }
  const { id, name, motto, description, logo, banner } = companyQuery.data;

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-md rounded-b-lg mb-8">
      <CompanyBanner imageId={banner} />
      <div className="p-4">
        <CompanyHeader id={id} name={name} motto={motto} companyLogo={logo} />
        <CompanyDescription description={description} />

        <section className="p-4">
          <h3 className="text-2xl font-semibold">Вакансії</h3>
          <hr className="my-4" />
          <input
            type="search"
            className="w-full form-input px-4 py-2 text-sm mb-4"
            onChange={(e) => setJobOfferSearch(e.target.value)}
            value={jobOfferSearch}
            placeholder="Пошук"
          />
          {companyJobOffersQuery.isLoading ? (
            <div className="flex justify-center mt-12">
              <LoadingSpinner />
            </div>
          ) : companyJobOffersQuery.isError ? (
            <p>Помилка при завантаженні вакансій</p>
          ) : companyJobOffersQuery.data.pages.at(0)?.data.length === 0 ? (
            <p>Немає вакансій</p>
          ) : (
            companyJobOffersQuery.data.pages.map((page, pageIndex) => (
              <Fragment key={pageIndex}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {page.data.map((item, itemIndex) => (
                    <CompanyJobOffersListItem key={itemIndex} item={item} />
                  ))}
                </div>
              </Fragment>
            ))
          )}
          {companyJobOffersQuery.isFetchingNextPage ? (
            <div className="flex justify-center mt-12">
              <LoadingSpinner />
            </div>
          ) : companyJobOffersQuery.hasNextPage ? (
            <LoadMore onClick={companyJobOffersQuery.fetchNextPage} />
          ) : null}
        </section>
      </div>
    </div>
  );
};

CompanyDetailsPage.getLayout = CommonLayout;

export default CompanyDetailsPage;

export const getServerSideProps = protectedSsr<{ company: CompanyDetails }>({
  allowedRoles: ['Student', 'Company'],
  getProps: async (context) => {
    const companyId = context.query.companyId as string;
    try {
      const axios = axiosMiddleware(context);
      const company = await getCompany(companyId)(axios);
      return {
        props: { company },
      };
    } catch (error) {
      return { notFound: true };
    }
  },
});
