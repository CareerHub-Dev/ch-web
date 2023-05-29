import CompanyPostsForStudents from "./CompanyPostsForStudents";
import CompanySelfPosts from "./CompanySelfPosts";

export default function CompanyPosts({ companyId }: { companyId: string }) {
  if (companyId === "self") {
    return <CompanySelfPosts />;
  }

  return <CompanyPostsForStudents companyId={companyId} />;
}
