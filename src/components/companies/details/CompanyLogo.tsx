import { getImage } from '@/lib/api/image';
import Image from 'next/image';
import classes from './CompanyLogo.module.scss';

const CompanyLogo: React.FC<{
  imageId?: string | null;
}> = ({ imageId }) => {
  const logo = imageId ? getImage(imageId) : '/company-dummy-logo.png';

  return (
    <Image
      alt="Company Logo"
      src={logo}
      width={180}
      height={180}
      className={classes.img}
    />
  );
};
export default CompanyLogo;
