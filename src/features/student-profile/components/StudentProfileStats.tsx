import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import StudentProfileStat from "./StudentProfileStat";
import {
  getStudentCompanySubscriptionsAmount,
  getStudentStudentSubscriptionsAmount,
  getStudentJobOfferSubscriptionsAmount,
} from "@/lib/api/student";

export default function StudentProfileStats({
  studentId,
}: {
  studentId: string;
}) {
  return (
    <dl className="grid grid-cols-1 gap-5">
      {stats.map((stat, statIndex) => (
        <StudentProfileStat
          {...mapStatToProps(stat, studentId)}
          key={statIndex}
        />
      ))}
    </dl>
  );
}

const stats = [
  {
    name: "Підписники",
    icon: UsersIcon,
    queryFn: getStudentStudentSubscriptionsAmount,
    onClick: () => console.log("Followers"),
  },
  {
    name: "Відстежувані вакансії",
    icon: EnvelopeOpenIcon,
    queryFn: getStudentJobOfferSubscriptionsAmount,
    onClick: () => console.log("Followed jobs"),
  },
  {
    name: "Відстежувані компанії",
    icon: CursorArrowRaysIcon,
    queryFn: getStudentCompanySubscriptionsAmount,
    onClick: () => console.log("Followed companies"),
  },
];

function mapStatToProps(stat: (typeof stats)[number], studentId: string) {
  const queryFn = stat.queryFn(studentId);
  return {
    ...stat,
    studentId,
    queryFn,
  };
}
