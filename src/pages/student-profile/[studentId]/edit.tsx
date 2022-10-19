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
import ChangePassword from '@/components/student-profile/edit/ChangePassword';

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

const sections = ['general', 'avatar', 'password'];

const EditStudentPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ studentData }) => {
  const { changeSection, currentSection } = useShallowRoutes({
    sections,
    defaultSection: 'general',
  });
  const { data: syncData, isLoading: loadingSyncData } = useSelfStudentQuery({
    initialData: studentData,
  });
  const syncPhotoId = syncData?.photoId;
  const { data: imageData, isLoading: loadingImage } = useImageQuery({
    imageId: syncPhotoId,
    enabled: !!syncPhotoId,
  });

  return (
    <div className="mx-8 lg:mx-auto max-w-full lg:max-w-[978px] bg-white my-2">
      <div className="grid grid-cols-[auto_1fr] gap-8">
        <EditPageHeader
          avatarLoading={loadingImage && !!syncPhotoId}
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
        <section className="px-4 py-2 col-span-2 md:col-auto">
          {currentSection === 'general' ? (
            <GeneralInfo initialData={syncData} />
          ) : currentSection === 'avatar' ? (
            <AvatarEdit
              initialData={imageData}
              loadingAvatar={loadingImage && !!syncPhotoId}
            />
          ) : (
            <ChangePassword />
          )}
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
