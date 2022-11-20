import CompanyJobOffersListItem from './CompanyJobOffersListItem';

import { type CompanyJobOffersArray } from '@/lib/api/company/schemas';

const CompanyJobOffersList = ({ items }: { items: CompanyJobOffersArray }) => {
  return (
    <>
      <h3>Вакансії</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <CompanyJobOffersListItem item={item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default CompanyJobOffersList;
