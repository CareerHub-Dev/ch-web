import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchStudentCvs } from '@/lib/api/remote/student';
import LinkButton from '@/components/ui/LinkButton';
import CVItem from './CVItem';
import CVActions from './CVActions';

import classes from './CVBoard.module.scss';

const CVBoard = () => {
  const { session } = useAuth();
  const accessToken = session?.jwtToken as string;
  const accountId = session?.accountId as string;
  const [actionModalIsOpen, setActionModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const cvsQuery = useQuery(
    ['cvs', accountId],
    fetchStudentCvs({
      accessToken,
      accountId,
    }),
    {
      enabled: accessToken !== null,
      onError: (err: any) =>
        console.log(err.message || 'Помилка при завантаженні резюме'),
    }
  );
  const cvs = cvsQuery.data || [];
  const selectedItem =
    cvs.find((item: any) => item.id === selectedItemId) || null;

  const openActionModalHandler = (id: string) => {
    setSelectedItemId(id);
    setActionModalIsOpen(true);
  };

  const closeActionModalHandler = (deleted?: boolean) => {
    setActionModalIsOpen(false);
    if (deleted) {
      cvsQuery.refetch();
    }
  };

  return (
    <>
      {actionModalIsOpen && (
        <CVActions
          title={selectedItem?.title}
          cvId={selectedItem?.id}
          onClose={closeActionModalHandler}
        />
      )}
      <div className={classes.wrapper}>
        <LinkButton link="/cv-builder">Додати</LinkButton>
        <div className={classes.items}>
          {cvsQuery.isLoading ? (
            <p>...</p>
          ) : cvs.length === 0 ? (
            <p>Немає резюме</p>
          ) : (
            cvs.map((item: any) => (
              <CVItem
                key={item.id}
                {...item}
                onClick={openActionModalHandler}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};
export default CVBoard;
