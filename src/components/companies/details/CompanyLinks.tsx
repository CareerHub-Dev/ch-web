import classes from "./CompanyLinks.module.scss";

const CompanyLinks: React.FC<{
    companyId: string;
}> = () => {
    const links: string[] = [];
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
