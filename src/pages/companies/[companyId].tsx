import useAuth from '@/hooks/useAuth';
import useShallowRoutes from '@/hooks/useShallowRoutes';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanyDetails } from '@/lib/api/remote/companies';
import { useRouter } from 'next/router';
import CompanyHeader from '@/components/companies/details/CompanyHeader';
import CompanyBody from '@/components/companies/details/CompanyBody';
import protectedSsr from '@/lib/protected-ssr';

const CompanyDetailsPage = () => {
  const router = useRouter();
  const companyId = router.query.companyId as string;
  const { accessToken } = useAuth();
  const companyQuery = useQuery(
    ['company', companyId],
    fetchCompanyDetails({
      token: accessToken as string,
      companyId,
    }),
    {
      enabled: accessToken !== null,
      onError: (err: any) =>
        alert(err.message || 'Помилка при завантаженні компанії'),
    }
  );
  const { currentSection, changeSection } = useShallowRoutes({
    url: `/companies/${companyId}`,
    defaultSection: 'about',
  });

  if (companyQuery.isLoading) {
    return <div>Завантаження компанії...</div>;
  }
  if (companyQuery.isError) {
    return <div>Помилка при завантаженні компанії</div>;
  }
  const {
    id,
    companyName,
    companyMotto,
    companyDescription,
    companyLogo,
    companyBanner,
  } = companyQuery.data;
  console.log(companyMotto);

  return (
    <>
      <CompanyHeader
        id={id}
        name={companyName}
        motto={companyMotto}
        companyLogo={companyLogo}
        companyBanner={companyBanner}
        currentSection={currentSection}
        changeSection={changeSection}
      />
      <CompanyBody
        description={companyDescription}
        currentSection={currentSection}
      />
    </>
  );
};
export default CompanyDetailsPage;

export const getServerSideProps = protectedSsr({
  allowedRoles: ['Student'],
})();
