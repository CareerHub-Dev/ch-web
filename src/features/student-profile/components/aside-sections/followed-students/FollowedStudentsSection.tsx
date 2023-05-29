import FollowedStudentsList from "./FollowedStudentsList";

export default function FollowedStudentsSection({
  isSelf,
  accountId,
}: {
  isSelf: boolean;
  accountId: string;
}) {
  return (
    <section aria-labelledby="recently-followed-students">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2
            id="recently-followed-students-heading"
            className="text-base font-medium text-gray-900"
          >
            {"Підписки"}
          </h2>
          <FollowedStudentsList isSelf={isSelf} accountId={accountId} />
        </div>
      </div>
    </section>
  );
}
