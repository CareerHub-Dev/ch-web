import { getImage } from '@/lib/api/image';
import Image from 'next/image';
import classes from './CompanyBanner.module.scss';

const CompanyBanner: React.FC<{
  imageId?: string | null;
}> = ({ imageId }) => {
  const banner = imageId ? getImage(imageId) : '/company-dummy-banner.png';

  return (
    <div className={classes.wrapper}>
      <Image alt="Company Banner" src={banner} />
    </div>
  );
};
export default CompanyBanner;
