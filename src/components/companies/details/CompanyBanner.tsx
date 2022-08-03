import useImageFetch from '@/hooks/useImageFetch';
import Image from 'next/image';
import classes from './CompanyBanner.module.scss';

const CompanyBanner: React.FC<{
  imageId: string;
}> = ({ imageId }) => {
  const bannerQuery = useImageFetch({ imageId });

  const banner = (bannerQuery.data as string) || '/company-dummy-banner.png';

  return (
    <div className={classes.wrapper}>
      <img alt="Company Banner" src={banner} />
    </div>
  );
};
export default CompanyBanner;
