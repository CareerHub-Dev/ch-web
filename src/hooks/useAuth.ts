import { useContext } from 'react';
import AuthContext from '@/store/auth-context';

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
export default useAuth;
