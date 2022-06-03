import { useState } from 'react';
import ModalWithBackdrop from '@/components/ui/Modal/ModalWithBackdrop';
import CVItem from './CVItem';

import classes from './CVBoard.module.scss';

const dummyItems = [
  {
    id: '1',
    title: 'C++',
    creationDate: '2020-01-01',
    lastEditingDate: '2020-01-02',
  },
];

const CVBoard: React.FC<{}> = () => {
  const [actionModalIsOpen, setActionModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const selectedItem = dummyItems.find((item) => item.id === selectedItemId);

  const openActionModalHandler = (id: string) => {
    setSelectedItemId(id);
    setActionModalIsOpen(true);
  };

  const closeActionModalHandler = () => {
    setActionModalIsOpen(false);
  };

  return (
    <>
      {actionModalIsOpen && (
        <ModalWithBackdrop onClose={closeActionModalHandler} overrideOverlayClass={classes.overlay}>
          <div className={classes.actions}>
            <h2>{selectedItem?.title}</h2>
            <button id="editButton">Редагувати</button>
            <button id="downloadButton">Скачати файл</button>
          </div>
        </ModalWithBackdrop>
      )}
      <div className={classes.wrapper}>
        {dummyItems.map((item) => (
          <CVItem key={item.title} {...item} onClick={openActionModalHandler} />
        ))}
      </div>
    </>
  );
};
export default CVBoard;
