import useAuth from '@/hooks/useAuth';
import useSections from '@/hooks/useSections';
import { GetServerSidePropsContext } from 'next';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanyDetails } from '@/lib/api/remote/companies';
import { useRouter } from 'next/router';
import CompanyHeader from '@/components/companies/details/CompanyHeader';
import CompanyBody from '@/components/companies/details/CompanyBody';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import verifySessionData from '@/lib/api/local/helpers/verify-session-data';
import UserRole from '@/models/enums/UserRole';
import AuthorizationError from '@/models/errors/AuthorizationError';

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
  const { currentSection, changeSection } = useSections({
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let accessAllowed = false;
  try {
    const sessionData = await verifySessionData(context.req);
    accessAllowed = verifyAuthority(sessionData, [UserRole.Student]);
  } catch {
    accessAllowed = false;
  }
  if (!accessAllowed) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
