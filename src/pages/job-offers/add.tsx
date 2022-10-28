import { protectedSsr } from '@/lib/protected-ssr';
import JobOfferForm from '@/components/offers/add/JobOfferForm';

import classes from '@/styles/add-offer.module.scss';

const AddJobOfferPage = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <JobOfferForm />
      </div>
    </div>
  );
};
export default AddJobOfferPage;

export const getServerSideProps = protectedSsr({
  allowedRoles: ['Company'],
});
