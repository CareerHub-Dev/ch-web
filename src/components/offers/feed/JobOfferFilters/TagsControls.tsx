import useAppDispatch from '@/hooks/useAppDispatch';
import useProtectedQuery from '@/hooks/useProtectedQuery';
import { useBoolean, useDebounce } from 'usehooks-ts';
import { useSelector } from 'react-redux';
import {
  selectTagsSearch,
  setTagsSearch,
  selectTags,
} from '@/store/job-offers-feed';
import { getTags } from '@/lib/api/remote/tags';
import SelectedTags from './SelectedTags';
import Overlay from '@/components/ui/Overlay';
import TagsSuggestions from './TagsSuggestions';

import cn from 'classnames';
import classes from './JobOffersFilters.module.scss';

const TagsControls = () => {
  const tagsQuery = useProtectedQuery(['tags'], getTags);
  const dispatch = useAppDispatch();
  const selectedTags = useSelector(selectTags);
  const tagsSearch = useSelector(selectTagsSearch);
  const debouncedTagsSearch = useDebounce(tagsSearch, 500);
  const foundTags = !tagsQuery.data
    ? []
    : tagsQuery.data.filter(
        (item: Tag) =>
          item.name.toLowerCase().includes(debouncedTagsSearch.toLowerCase()) &&
          !selectedTags.some((tag: Tag) => tag.id === item.id)
      );
  const suggestionsAreShown = useBoolean(false);

  const tagsSearchChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setTagsSearch(event.target.value));
  };

  const tagsSearchFocusHandler = () => {
    suggestionsAreShown.setTrue();
  };

  const tagsSearchHideHandler = () => {
    suggestionsAreShown.setFalse();
  };

  return (
    <>
      <label htmlFor="tags" className="g__text-bold">
        {`Теги`}
      </label>
      <SelectedTags />
      <div className={cn(classes.controls, 'relative')}>
        <input
          id="tags"
          type="search"
          value={tagsSearch}
          onChange={tagsSearchChangeHandler}
          onFocus={tagsSearchFocusHandler}
        />
        <Overlay
          onOutsideClick={tagsSearchHideHandler}
          className={classes.overlay}
        >
          <TagsSuggestions
            items={foundTags}
            display={suggestionsAreShown.value}
          />
        </Overlay>
      </div>
    </>
  );
};
export default TagsControls;
