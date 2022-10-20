import useImageQuery from '@/hooks/useImageQuery';
import Image from 'next/future/image';
import classes from './CompanyLogo.module.scss';

const CompanyLogo: React.FC<{
  imageId: string;
}> = ({ imageId }) => {
  const logoQuery = useImageQuery({
    imageId,
  });

  const logo = (logoQuery.data as string) || '/company-dummy-logo.png';

  return (
    <div className={classes.wrapper}>
      <Image alt="Company Logo" src={logo} />
    </div>
  );
};
export default CompanyLogo;
