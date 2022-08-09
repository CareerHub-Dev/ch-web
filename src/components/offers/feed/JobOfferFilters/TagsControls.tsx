import { useSelector } from 'react-redux';
import useAppDispatch from '@/hooks/useAppDispatch';
import { selectTags } from '@/store/job-offers-feed';
import JobOfferTags from '../../common/JobOfferTags';

const TagsControls = () => {
  const dispatch = useAppDispatch();
  const tags = useSelector(selectTags);

  return (
    <>
      <label htmlFor="tags" className="g__text-bold">
        Теги
      </label>
      {tags.length === 0 ? (
        <div className="g__center">Тегів не обрано</div>
      ) : (
        <JobOfferTags tags={tags} variant="dark" />
      )}
    </>
  );
};
export default TagsControls;
