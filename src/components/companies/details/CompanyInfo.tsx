import classes from './CompanyInfo.module.scss';

const CompanyInfo: React.FC<{
  name: string;
  moto?: string;
  links: Array<{ title: string; url: string }>;
}> = ({ name, moto, links }) => {
  const linksAvailable = links.length === 0;

  return (
    <div className={classes.info}>
      <h1 className={classes.title}>{name}</h1>
      {moto && <h2 className={classes.moto}>{moto}</h2>}

      {linksAvailable && (
        <ul className={classes.links}>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CompanyInfo;
