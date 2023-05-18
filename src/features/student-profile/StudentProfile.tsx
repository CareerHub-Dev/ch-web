import ProfileHeader from "./components/ProfileHeader";

export default function StudentProfile({
    isSelf,
    studentId,
}: {
    isSelf: boolean;
    studentId: string;
}) {
    return (
        <>
            <ProfileHeader isSelf={isSelf} accountId={studentId} />
        </>
    );
}
