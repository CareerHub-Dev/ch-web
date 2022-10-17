import { getSelfStudent } from '@/lib/api/student';
import protectedSsr from '@/lib/protected-ssr';
import { InferGetServerSidePropsType } from 'next';
import useSelfStudentQuery from '@/hooks/useStudentSelfQuery';
import useImageQuery from '@/hooks/useImageQuery';
import useShallowRoutes from '@/hooks/useShallowRoutes';

import CommonLayout from '@/components/layout/CommonLayout';
import NavigationItems from '@/components/student-profile/edit/NavigationItems';
import GeneralInfo from '@/components/student-profile/edit/GeneralInfo';
import AvatarEdit from '@/components/student-profile/edit/AvatarEdit';
import EditPageHeader from '@/components/student-profile/edit/EditPageHeader';

const navigationItems = [
  {
    title: 'Загальне',
    section: 'general',
  },
  {
    title: 'Аватар',
    section: 'avatar',
  },
  {
    title: 'Пароль',
    section: 'password',
  },
];

const sections = navigationItems.map((item) => item.section);

const EditStudentPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ studentData }) => {
  const { changeSection, currentSection } = useShallowRoutes({
    defaultSection: 'general',
    sections,
  });
  const { data: syncData } = useSelfStudentQuery({
    initialData: studentData,
  });
  const syncPhotoId = syncData?.photoId;
  const { data: imageData } = useImageQuery({
    imageId: syncPhotoId,
    enabled: !!syncPhotoId,
  });

  return (
    <div className="md:max-w-[978px] md:mx-auto bg-white mx-auto mt-2">
      <div className="grid grid-cols-[auto_1fr] gap-8">
        <EditPageHeader
          avatarData={imageData}
          firstName={syncData?.firstName ?? studentData.firstName}
          lastName={syncData?.lastName ?? studentData.lastName}
          groupName={
            syncData?.studentGroup?.name ?? studentData.studentGroup?.name
          }
        />
        <NavigationItems
          items={navigationItems}
          onChangeRoute={changeSection}
        />
        <section className="px-4 py-2 ">
          {currentSection === 'general' ? (
            <GeneralInfo initialData={syncData} />
          ) : currentSection === 'avatar' ? (
            <AvatarEdit initialData={imageData} />
          ) : null}
        </section>
      </div>
    </div>
  );
};

EditStudentPage.getLayout = CommonLayout();

export default EditStudentPage;

export const getServerSideProps = protectedSsr({ allowedRoles: ['Student'] })(
  async (context) => {
    const studentId = context.query.studentId as string;
    const { accountId, jwtToken } = context.session;

    if (studentId !== accountId) {
      return {
        redirect: {
          destination: `/student-profile/${accountId}/edit`,
          permanent: false,
        },
      };
    }
    const studentData = await getSelfStudent(jwtToken)();

    return {
      props: {
        studentData,
      },
    };
  }
);
