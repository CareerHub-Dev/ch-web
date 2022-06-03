import { useState } from 'react';

const useTags = (initialValues: Array<string> = []) => {
  const [tags, setTags] = useState(initialValues);
  const normilzedTags = tags.map((tag) => tag.toLowerCase());

  const add = (tag: string) => {
    tag = tag.trim();
    const tagIsInvalid =
      normilzedTags.includes(tag.toLowerCase()) || tag.length === 0;
    if (tagIsInvalid) {
      return;
    }
    setTags([...tags, tag]);
  };

  const remove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const reset = () => {
    setTags([]);
  };

  return {
    tags,
    add,
    remove,
    reset,
  };
};
export default useTags;
