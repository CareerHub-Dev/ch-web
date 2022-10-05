import protectedServerSideProps from '@/lib/protected-server-side-props';
import UserRole from '@/lib/schemas/UserRole';
import { GetServerSidePropsContext } from 'next/types';
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

export const getServerSideProps = protectedServerSideProps(['Company']);
