import type { UseQueryResult } from '@tanstack/react-query';
import CompanyCard from './CompanyCard';
import classes from './CompaniesGrid.module.scss';

const CompaniesGrid: React.FC<{
  query: UseQueryResult<any, any>;
}> = ({ query }) => {
  const { data, isLoading, isError } = query;
  if (isLoading) {
    return <div>Завантажуємо...</div>;
  }
  if (isError) {
    return <div>{`Помилка :(`}</div>;
  }

  console.log(data);

  return (
    <div className={classes.grid}>
      {data.map((company: any) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};
export default CompaniesGrid;
