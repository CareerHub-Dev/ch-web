import useProtectedQuery from "./useProtectedQuery"
import { getSelfStudent } from "@/lib/api/student"

const useSelfStudentQuery = () => {
  const query = useProtectedQuery(["selfStudent"], getSelfStudent)
  return query;
}
export default useSelfStudentQuery;