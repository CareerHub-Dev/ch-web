import useAppDispatch from '@/hooks/useAppDispatch';
import { selectSearchTerm, setSearchTerm } from '@/store/job-offers-feed';
import { useSelector } from 'react-redux';

const SearchTerm = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const searchTermChangeHandler = (event: any) => {
    dispatch(setSearchTerm(event.target.value));
  };
  return (
    <>
      <label htmlFor="title" className="g__text-bold">
        Назва
      </label>
      <input
        id="title"
        type="search"
        value={searchTerm}
        onChange={searchTermChangeHandler}
      />
    </>
  );
};
export default SearchTerm;
