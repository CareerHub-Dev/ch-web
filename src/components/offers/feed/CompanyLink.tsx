import MailAtIcon from '@/components/ui/icons/MailAtIcon';
import Link from 'next/link';
import classes from './CompanyLink.module.scss';

const CompanyLink: React.FC<{ companyId: string; companyName: string }> = ({
  companyId,
  companyName,
}) => {
  return (
    <div className={classes.link}>
      <MailAtIcon />
      <Link href={`companies/${companyId}`} passHref>
        <address>{companyName}</address>
      </Link>
    </div>
  );
};
export default CompanyLink;
