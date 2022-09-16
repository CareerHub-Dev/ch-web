import classes from './CompanyCard.module.scss';

type Props = {
  icon: React.FC;
  value: string;
};

const CompanyInfoBlock = ({ icon, value }: Props) => {
  const Icon = icon;
  return (
    <p className={classes.info}>
      <span>
        <Icon />
      </span>
      <span>{value}</span>
    </p>
  );
};
export default CompanyInfoBlock;
