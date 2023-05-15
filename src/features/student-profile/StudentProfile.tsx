import ProfileHeader from "./components/ProfileHeader";

export default function StudentProfile(props: {
    isSelf: boolean;
    studentId: string;
}) {
    return (
        <>
            <ProfileHeader {...props} />
        </>
    );
}
