import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanyLinks } from '@/lib/api/remote/companies';
import classes from './CompanyLinks.module.scss';

const CompanyLinks: React.FC<{
  companyId: string;
}> = ({ companyId }) => {
  const { accessToken } = useAuth();
  const linksQuery = useQuery(
    ['company', companyId, 'links'],
    fetchCompanyLinks({
      accessToken,
      companyId,
    }),
    {}
  );
  const links = linksQuery.data || [];
  const linksAreEmpty = links.length === 0;

  if (linksAreEmpty) {
    return null;
  }

  return (
    <ul className={classes.links}>
      {links.map((link: any) => (
        <li key={link.id}>
          <a href={link.uri} target="_blank" rel="noreferrer">
            {link.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
export default CompanyLinks;
