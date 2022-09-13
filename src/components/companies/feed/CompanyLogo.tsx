import useImageQuery from '@/hooks/useImageQuery';
import Image from 'next/image';
import classes from './CompanyLogo.module.scss';

const CompanyLogo: React.FC<{
  imageId: string;
  companyName: string;
}> = ({ imageId, companyName }) => {
  const { data } = useImageQuery({
    imageId,
    onError: (err: any) =>
      console.log(err.message || 'Помилка при завантаженні логотипу компанії'),
  });

  const loadedImage = (data as string) || '/company-dummy-logo.png';

  return (
    <Image
      className={classes.logo}
      src={loadedImage}
      width={400}
      height={400}
      alt={companyName}
    />
  );
};
export default CompanyLogo;
