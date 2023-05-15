import { protectedSsr } from "@/lib/protected-ssr";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import useSelfStudentQuery from "@/hooks/useStudentSelfQuery";
import useShallowRoutes from "@/hooks/useShallowRoutes";
import CommonLayout from "@/components/layout/CommonLayout";
import NavigationItems from "@/components/student-profile/edit/NavigationItems";
import GeneralInfo from "@/components/student-profile/edit/GeneralInfo";
import AvatarEdit from "@/components/student-profile/edit/AvatarEdit";
import EditPageHeader from "@/components/student-profile/edit/EditPageHeader";
import ChangePassword from "@/components/student-profile/edit/ChangePassword";
import { getImage } from "@/lib/api/image";
import defaultAvatar from "@/resources/images/default-avatar.png";
import { type InferGetServerSidePropsType } from "next";

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

const EditStudentPage: NextPageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = function () {
    const { changeSection, currentSection } = useShallowRoutes({
        defaultSection: "general",
    });
    const { data: studentData, isLoading, isError } = useSelfStudentQuery();
    const currentAvatar = studentData?.photo
        ? getImage(studentData.photo)
        : defaultAvatar;

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
};

EditStudentPage.getLayout = CommonLayout;

export default EditStudentPage;

export const getServerSideProps = protectedSsr({
    allowedRoles: ["Student"],
    getProps: async (context) => {
        console.log("context.query", context.query);

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
