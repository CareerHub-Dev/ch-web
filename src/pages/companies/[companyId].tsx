import useShallowRoutes from '@/hooks/useShallowRoutes';
import useProtectedQuery from '@/hooks/useProtectedQuery';
import { getCompany } from '@/lib/api/company';
import { useRouter } from 'next/router';
import CompanyHeader from '@/components/companies/details/CompanyHeader';
import CompanyBody from '@/components/companies/details/CompanyBody';
import { protectedSsr } from '@/lib/protected-ssr';
import createAxiosInstance from '@/lib/axios/create-instance';
import CommonLayout from '@/components/layout/CommonLayout';

import { type CompanyDetails } from '@/lib/api/company/schemas';
import { type InferGetServerSidePropsType } from 'next/types';

const CompanyDetailsPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const router = useRouter();
  const companyId = router.query.companyId as string;

  const companyQuery = useProtectedQuery(
    ['company', companyId],
    getCompany(companyId),
    {
      initialData: props,
    }
  );
  const { currentSection, changeSection } = useShallowRoutes({
    defaultSection: 'about',
    sections: ['about'],
  });

  if (companyQuery.isLoading) {
    return <div>Завантаження компанії...</div>;
  }
  if (companyQuery.isError) {
    return <div>Помилка при завантаженні компанії</div>;
  }
  const { id, name, motto, description, logo, banner } = companyQuery.data;

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-md rounded-b-lg mb-8">
      <CompanyHeader
        id={id}
        name={name}
        motto={motto}
        companyLogo={logo}
        companyBanner={banner}
        currentSection={currentSection}
        changeSection={changeSection}
      />
      <CompanyBody description={description} currentSection={currentSection} />
    </div>
  );
};

CompanyDetailsPage.getLayout = CommonLayout;

export default CompanyDetailsPage;

export const getServerSideProps = protectedSsr<CompanyDetails>({
  allowedRoles: ['Student', 'Company'],
  getProps: async (context) => {
    const companyId = context.query.companyId as string;
    try {
      const company = await getCompany(companyId)(
        createAxiosInstance({
          data: context.session,
        })
      );
      return {
        props: company,
      };
    } catch (error) {
      return { notFound: true };
    }
  },
});
