import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import { type InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import ProfileHeader from "@/features/student-profile/components/ProfileHeader";
import StudentProfileInfo from "@/features/student-profile/components/StudentProfileInfo";
import StudentStats from "@/features/student-profile/components/StudentStats";
import StudentExperiences from "@/features/student-profile/components/StudentExperiences";
import FollowedStudentsSection from "@/features/student-profile/components/aside-sections/followed-students/FollowedStudentsSection";
import RecentPostsSection from "@/features/student-profile/components/aside-sections/recent-posts/RecentPostsSection";
import TabMenu from "@/features/student-profile/components/tab-menu/TabMenu";
import StudentPosts from "@/features/student-profile/components/StudentPosts";

export default function StudentProfilePage({
    isSelf,
    studentId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { query } = useRouter();
    const currentTab = query.tab;

    return (
        <>
            <Head>
                <meta name="description" content="Student profile" />
            </Head>
            <ProfileHeader isSelf={isSelf} accountId={studentId} />
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                    <TabMenu />
                    {currentTab === "posts" ? (
                        <StudentPosts isSelf={isSelf} accountId={studentId} />
                    ) : currentTab === "experience" ? (
                        <StudentExperiences
                            key={studentId}
                            isSelf={isSelf}
                            accountId={studentId}
                        />
                    ) : (
                        <>
                            <StudentProfileInfo accountId={studentId} />
                            <StudentStats
                                key={studentId}
                                isSelf={isSelf}
                                accountId={studentId}
                            />
                        </>
                    )}
                </div>
                <aside className="lg:col-span-1 lg:col-start-3">
                    <div className="space-y-4">
                        <FollowedStudentsSection
                            key={studentId}
                            isSelf={isSelf}
                            accountId={studentId}
                        />
                        <RecentPostsSection
                            isSelf={isSelf}
                            accountId={studentId}
                        />
                    </div>
                </aside>
            </div>
        </>
    );
}

StudentProfilePage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr<{
    isSelf: boolean;
    studentId: string;
}>({
    allowedRoles: ["Student"],
    getProps: async (context) => {
        const studentId = context.query.studentId as string;
        const { accountId } = context.session;
        const isSelf = studentId === accountId;

        return {
            props: {
                isSelf,
                studentId,
            },
        };
    },
});
