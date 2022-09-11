import useAuth from '@/hooks/useAuth';

const WithVerification = (component: React.FC<any>) => {
  const Component = component;

  return function WithVerificationComponent(
    props: WithVerificationComponentProps<any>
  ) {
    const { authDataConsistency, ...restProps } = props;
    const auth = useAuth();
    if (authDataConsistency === 'error') {
      auth.logout();
      return null;
    }
    return <Component {...restProps} />;
  };
};
export default WithVerification;
