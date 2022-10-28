import { getImage } from '@/lib/api/image';
import Image from 'next/future/image';
import classes from './CompanyLogo.module.scss';

const CompanyLogo: React.FC<{
  imageId?: string | null;
}> = ({ imageId }) => {
  const logo = imageId ? getImage(imageId) : '/company-dummy-logo.png';

  return (
    <div className={classes.wrapper}>
      <Image alt="Company Logo" src={logo} />
    </div>
  );
};
export default CompanyLogo;
