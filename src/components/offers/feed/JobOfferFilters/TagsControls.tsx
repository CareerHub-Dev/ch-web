import SelectedTags from './SelectedTags';

const TagsControls = () => {
  return (
    <>
      <label htmlFor="tags" className="g__text-bold">
        {`Теги`}
      </label>
      <SelectedTags />
    </>
  );
};
export default TagsControls;
