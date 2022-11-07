import useProtectedQuery from '@/hooks/useProtectedQuery';
import { getCompany } from '@/lib/api/company';
import { useRouter } from 'next/router';
import CompanyBanner from '@/components/companies/details/CompanyBanner';
import CompanyHeader from '@/components/companies/details/CompanyHeader';
import CompanyDescription from '@/components/companies/details/CompanyDescription';
import { protectedSsr } from '@/lib/protected-ssr';
import axiosMiddleware from '@/lib/middleware/axiosMiddleware';
import CommonLayout from '@/components/layout/CommonLayout';

import { type CompanyDetails } from '@/lib/api/company/schemas';
import { type InferGetServerSidePropsType } from 'next/types';

const CompanyDetailsPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ company }) => {
  const router = useRouter();
  const companyId = router.query.companyId as string;

  const companyQuery = useProtectedQuery(
    ['company', companyId],
    getCompany(companyId),
    {
      initialData: company,
    }
  );

  if (companyQuery.isLoading) {
    return <div>Завантаження компанії...</div>;
  }
  if (companyQuery.isError) {
    return <div>Помилка при завантаженні компанії</div>;
  }
  const { id, name, motto, description, logo, banner } = companyQuery.data;

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-md rounded-b-lg mb-8">
      <CompanyBanner imageId={banner} />
      <div className="p-4">
        <CompanyHeader id={id} name={name} motto={motto} companyLogo={logo} />
        <CompanyDescription description={description} />
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
