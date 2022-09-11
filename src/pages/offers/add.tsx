import withVerification from '@/lib/with-verification';
import UserRole from '@/models/enums/UserRole';
import { GetServerSidePropsContext } from 'next/types';
import JobOfferForm from '@/components/offers/add/JobOfferForm';

import classes from '@/styles/add-offer.module.scss';

const AddJobOfferPage = () => {
  return (
    <div id="feedWraper" className={classes.wrapper}>
      <div id="feedBodyContent" className={classes.body}>
        <JobOfferForm />
      </div>
    </div>
  );
};
export default AddJobOfferPage;

export const getServerSideProps = withVerification(
  (_context: GetServerSidePropsContext) => ({ props: {} }),
  [UserRole.Company]
);
