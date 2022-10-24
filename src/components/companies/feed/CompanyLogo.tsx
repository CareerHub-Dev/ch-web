import { getImage } from '@/lib/api/image';
import Image from 'next/image';
import classes from './CompanyLogo.module.scss';

const CompanyLogo: React.FC<{
  imageId?: string | null;
  companyName: string;
}> = ({ imageId, companyName }) => {
  const imageSrc = imageId ? getImage(imageId) : '/company-dummy-logo.png';

  return (
    <Image
      className={classes.logo}
      src={imageSrc}
      width={400}
      height={400}
      alt={companyName}
    />
  );
};
export default CompanyLogo;
