import classes from './CompanyCard.module.scss';

type Props = {
  icon: JSX.Element;
  value: string;
};

const CompanyInfoBlock = ({ icon, value }: Props) => {
  return (
    <p className={classes.info}>
      <span>{icon}</span>
      <span>{value}</span>
    </p>
  );
};
export default CompanyInfoBlock;
