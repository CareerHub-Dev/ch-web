import { AtSymbolIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import classes from './CompanyLink.module.scss';

const CompanyLink: React.FC<{ companyId: string; companyName: string }> = ({
  companyId,
  companyName,
}) => {
  return (
    <div className={classes.link}>
      <AtSymbolIcon />
      <Link href={`companies/${companyId}`}>{companyName}</Link>
    </div>
  );
};
export default CompanyLink;
