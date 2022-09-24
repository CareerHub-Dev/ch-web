import classes from './CompanyInfoBlock.module.scss';

type Props = {
  icon: React.FC;
  value: string;
};

const CompanyInfoBlock = ({ icon, value }: Props) => {
  const Icon = icon;
  return (
    <p className={classes.info}>
      <Icon />
      {value}
    </p>
  );
};
export default CompanyInfoBlock;
