import StudentProfileMock from "@/features/student-profile/mocks/StudentProfileMock";
import CommonLayout from "@/components/layout/CommonLayout";

export default function StudentProfileMockPage() {
    return <StudentProfileMock />;
}

StudentProfileMockPage.getLayout = CommonLayout;
