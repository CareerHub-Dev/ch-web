import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import { type InferGetServerSidePropsType } from "next";
import Head from "next/head";
import ProfileHeader from "@/features/student-profile/components/ProfileHeader";
import StudentProfileInfo from "@/features/student-profile/components/StudentProfileInfo";
import FollowedStudents from "@/features/student-profile/components/FollowedStudents";
import RecentPosts from "@/features/student-profile/components/RecentPosts";
import StudentStats from "@/features/student-profile/components/StudentStats";
import StudentProfileModals from "@/features/student-profile/components/StudentProfileModals";

export default function StudentProfilePage({
    isSelf,
    studentId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Head>
                <meta name="description" content="Student profile" />
            </Head>
            <StudentProfileModals />
            <ProfileHeader isSelf={isSelf} studentId={studentId} />

            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                    <StudentProfileInfo accountId={studentId} />
                    <StudentStats accountId={studentId} />
                </div>
                <aside className="lg:col-span-1 lg:col-start-3">
                    <div className="space-y-4">
                        <section aria-labelledby="recently-followed-students">
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6">
                                    <h2
                                        id="recently-followed-students-heading"
                                        className="text-base font-medium text-gray-900"
                                    >
                                        {"Підписки"}
                                    </h2>
                                    <FollowedStudents accountId={studentId} />
                                </div>
                            </div>
                        </section>
                        <section aria-labelledby="recent-posts">
                            <div className="rounded-lg bg-white shadow">
                                <div className="p-6">
                                    <h2
                                        id="recent-posts-heading"
                                        className="text-base font-medium text-gray-900"
                                    >
                                        {"Останні публікації"}
                                    </h2>
                                    <RecentPosts />
                                </div>
                            </div>
                        </section>
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
