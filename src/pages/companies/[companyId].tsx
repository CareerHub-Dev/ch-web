import useAuth from '@/hooks/useAuth';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanyDetails } from '@/lib/api/remote/companies';
import { useRouter } from 'next/router';
import CompanyHeader from '@/components/companies/details/CompanyHeader';
import CompanyBody from '@/components/companies/details/CompanyBody';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import verifySessionData from '@/lib/api/local/helpers/verify-session-data';
import UserRole from '@/models/enums/UserRole';

const CompanyDetailsPage = () => {
  const companyId = useRouter().query.companyId as string;
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

  if (companyQuery.isLoading) {
    return <div>Завантаження компанії...</div>;
  }
  if (companyQuery.isError) {
    return <div>Помилка при завантаженні компанії</div>;
  }
  const { id, companyName, companyMoto, companyDescription } =
    companyQuery.data;

  return (
    <>
      <CompanyHeader
        id={id}
        name={companyName}
        moto={companyMoto}
        links={[]}
        isFollowed={false}
      />
      <CompanyBody description={companyDescription} />
    </>
  );
};
export default CompanyDetailsPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const sessionData = await verifySessionData(context.req);
  const accessAllowed = verifyAuthority(sessionData, [UserRole.Student]);

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
