import { protectedSsr } from "@/lib/protected-ssr";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import useSelfStudentQuery from "@/hooks/useStudentSelfQuery";
import useShallowRoutes from "@/hooks/useShallowRoutes";
import CommonLayout from "@/components/layout/CommonLayout";
import AvatarEdit from "@/features/student-profile-edit/AvatarEdit";
import { getImageWithDefault } from "@/lib/api/image";
import EditPageHeader from "@/features/student-profile-edit/EditPageHeader";
import NavigationItems from "@/features/student-profile-edit/NavigationItems";
import GeneralInfo from "@/features/student-profile-edit/GeneralInfo";
import ChangePassword from "@/features/student-profile-edit/ChangePassword";

const navigationItems = [
  {
    title: "Загальне",
    section: "general",
  },
  {
    title: "Аватар",
    section: "avatar",
  },
  {
    title: "Пароль",
    section: "password",
  },
];

function EditStudentPage() {
  const { changeSection, currentSection } = useShallowRoutes({
    defaultSection: "general",
  });
  const { data: studentData, isLoading, isError } = useSelfStudentQuery();
  const currentAvatar = getImageWithDefault(studentData?.photo, "Student");
  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  if (isError) {
    return <div>Помилка при завантаженні</div>;
  }

  return (
    <div className="mx-auto max-w-full lg:max-w-[978px] bg-white px-4 rounded-md shadow-md transition-all ease-in-out duration-200">
      <div className="grid grid-cols-[auto_1fr] gap-8">
        <EditPageHeader
          avatarData={currentAvatar}
          firstName={studentData.firstName}
          lastName={studentData.lastName}
          groupName={studentData.studentGroup.name}
        />
        <NavigationItems
          items={navigationItems}
          onChangeRoute={changeSection}
        />
        <section className="px-4 py-2 col-span-2 md:col-auto">
          {currentSection === "general" ? (
            <GeneralInfo initialData={studentData} />
          ) : currentSection === "avatar" ? (
            <AvatarEdit initialData={currentAvatar} />
          ) : (
            <ChangePassword />
          )}
        </section>
      </div>
    </div>
  );
}

EditStudentPage.getLayout = CommonLayout;

export default EditStudentPage;

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Student"],
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
    return { props: {} };
  },
});
