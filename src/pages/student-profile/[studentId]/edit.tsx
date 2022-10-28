import { getSelfStudent } from '@/lib/api/student';
import { protectedSsr } from '@/lib/protected-ssr';
import { type InferGetServerSidePropsType } from 'next';
import { type Student } from '@/lib/schemas/Student';
import useSelfStudentQuery from '@/hooks/useStudentSelfQuery';
import useShallowRoutes from '@/hooks/useShallowRoutes';

import CommonLayout from '@/components/layout/CommonLayout';
import NavigationItems from '@/components/student-profile/edit/NavigationItems';
import GeneralInfo from '@/components/student-profile/edit/GeneralInfo';
import AvatarEdit from '@/components/student-profile/edit/AvatarEdit';
import EditPageHeader from '@/components/student-profile/edit/EditPageHeader';
import ChangePassword from '@/components/student-profile/edit/ChangePassword';
import { getImage } from '@/lib/api/image';
import createAxiosInstance from '@/lib/axios/create-instance';
import defaultAvatar from '@/resources/images/default-avatar.png';

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
> = ({ student }) => {
  const { changeSection, currentSection } = useShallowRoutes({
    sections,
    defaultSection: 'general',
  });
  const { data: syncData } = useSelfStudentQuery({
    initialData: student,
  });
  const currentAvatar = syncData?.photo
    ? getImage(syncData.photo)
    : defaultAvatar;

  return (
    <div
      className="mx-8 lg:mx-auto max-w-full lg:max-w-[978px] bg-white px-4 rounded-md shadow-md
      transition-all ease-in-out duration-200"
    >
      <div className="grid grid-cols-[auto_1fr] gap-8">
        <EditPageHeader
          avatarData={currentAvatar}
          firstName={syncData?.firstName ?? student.firstName}
          lastName={syncData?.lastName ?? student.lastName}
          groupName={syncData?.studentGroup?.name ?? student.studentGroup?.name}
        />
        <NavigationItems
          items={navigationItems}
          onChangeRoute={changeSection}
        />
        <section className="px-4 py-2 col-span-2 md:col-auto">
          {currentSection === 'general' ? (
            <GeneralInfo initialData={syncData} />
          ) : currentSection === 'avatar' ? (
            <AvatarEdit initialData={currentAvatar} />
          ) : (
            <ChangePassword />
          )}
        </section>
      </div>
    </div>
  );
};

EditStudentPage.getLayout = CommonLayout;

export default EditStudentPage;

export const getServerSideProps = protectedSsr<{ student: Student }>({
  allowedRoles: ['Student'],
  getProps: async (context) => {
    const studentId = context.query.studentId as string;
    const { accountId } = context.session;
    if (studentId !== accountId) {
      return {
        redirect: {
          destination: `/student-profile/${accountId}/edit`,
          permanent: false,
        },
      };
    }
    const student = await getSelfStudent(
      createAxiosInstance({
        data: context.session,
      })
    );
    return { props: { student } };
  },
});
