import useImageFetch from '@/hooks/useImageFetch';
import Image from 'next/image';
import classes from './CompanyLogo.module.scss';

const CompanyLogo: React.FC<{
  imageId: string;
}> = ({ imageId }) => {
  const logoQuery = useImageFetch({
    imageId,
  });

  const logo = (logoQuery.data as string) || '/company-dummy-logo.png';

  return (
    <div className={classes.wrapper}>
      <img alt="Company Logo" src={logo} />
    </div>
  );
};
export default CompanyLogo;
