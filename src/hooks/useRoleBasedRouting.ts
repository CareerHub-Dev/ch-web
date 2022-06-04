import useAuth from './useAuth';
import { useRouter } from 'next/router';
import UserRole from '@/model/enums/UserRole';

const unauthrizedAllowedPaths = ['', '/', '/auth/[form]', '/404'];

const useRoleBasedRouting = () => {
  const { role } = useAuth();
  const router = useRouter();
  console.log(role);
  console.log(router.pathname);

  switch (role) {
    case UserRole.Student:
      // TODO: change it to student-only routes
      return true;
    default:
      return unauthrizedAllowedPaths.includes(router.pathname);
  }
};
export default useRoleBasedRouting;
