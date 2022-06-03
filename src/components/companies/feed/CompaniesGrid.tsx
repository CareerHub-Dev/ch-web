import CompanyCard from './CompanyCard';
import classes from './CompaniesGrid.module.scss';

type Props = {
  companies: Array<{
    companyId: string;
    companyName: string;
    companyDescription: string;
    companyLogo: string;
    totalSubscribers: number;
    totalJobOffers: number;
  }>;
};

const CompaniesGrid = ({ companies }: Props) => (
  <div className={classes.grid}>
    {companies.map((company) => (
      <CompanyCard key={company.companyId} company={company} />
    ))}
  </div>
);
export default CompaniesGrid;
