import Image from 'next/image';
import classes from './CompanyHeader.module.scss';

type Props = {
  id: string;
  name: string;
  moto: string;
  logo: string;
  banner: string;
  links: Array<{ title: string; url: string }>;
  isFollowed: boolean;
};

const CompanyHeader = (props: Props) => {
  return (
    <div>
      <div className={classes.header}>
        <Image
          id="banner"
          alt="Company Banner"
          width={1800}
          height={400}
          src={props.banner}
          className={classes.banner}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <div className={classes['company-header']}>
            <Image
              alt="Company Logo"
              id="companyLogo"
              className={classes.logo}
              src={props.logo}
              width={400}
              height={400}
            />

            <div className={classes['company-info']}>
              <h1 className={classes['company-title']}>{props.name}</h1>
              {props.moto && (
                <h2 className={classes['company-moto']}>{props.moto}</h2>
              )}

              <ul className={classes['company-links']}>
                {props.links.map((element, index) => (
                  <li key={index}>
                    <a href={element.url} target="_blank" rel="noreferrer">
                      {element.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className={classes['measurement-section']}>
              <div className={classes['measurement-row']}>{'info-blocks'}</div>
              <button>Follow</button>
            </div>
          </div>
        </div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={classes['company-tabs']}>{'tabs'}</div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
