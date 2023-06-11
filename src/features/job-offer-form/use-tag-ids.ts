import { useState } from "react";

export default function useTagIds(initialValue: Tag[] = []) {
  const [tags, setTags] = useState<Tag[]>(initialValue);

  const add = (tag: Tag) => {
    if (tags.find((t) => t.id === tag.id) !== undefined) {
      return;
    }
    setTags([...tags, tag]);
  };

  const remove = (tag: Tag) => {
    setTags(tags.filter((t) => t.id !== tag.id));
  };

  const tagIds = tags.map((t) => t.id);

  return {
    tags,
    tagIds,
    add,
    remove,
  };
}
