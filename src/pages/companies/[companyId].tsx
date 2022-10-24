import useSession from '@/hooks/useSession';
import useShallowRoutes from '@/hooks/useShallowRoutes';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanyDetails } from '@/lib/api/remote/companies';
import { useRouter } from 'next/router';
import CompanyHeader from '@/components/companies/details/CompanyHeader';
import CompanyBody from '@/components/companies/details/CompanyBody';
import { protectedSsr } from '@/lib/protected-ssr';

const CompanyDetailsPage = () => {
  const router = useRouter();
  const companyId = router.query.companyId as string;
  const { data: session } = useSession();
  const token = session?.jwtToken as string;

  const companyQuery = useQuery(
    ['company', companyId],
    fetchCompanyDetails({
      token,
      companyId,
    }),
    {
      enabled: token !== null,
      onError: (err: any) =>
        alert(err.message || 'Помилка при завантаженні компанії'),
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
  const {
    id,
    companyName,
    companyMotto,
    companyDescription,
    companyLogo,
    companyBanner,
  } = companyQuery.data;

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
  allowedRoles: ['Student', 'Company'],
});
