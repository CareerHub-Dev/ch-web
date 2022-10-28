import { Fragment } from 'react';

type Props<T> = {
  renderItem: (item: T, ...args: any) => JSX.Element;
  keyExtractor: (item: T, index: number) => string | number;
  items: T[];
};

const GenericList = <T extends unknown>({
  renderItem,
  keyExtractor,
  items,
}: Props<T>) => {
  return (
    <Fragment>
      {items.map((item, index) => (
        <Fragment key={keyExtractor(item, index)}>{renderItem(item)}</Fragment>
      ))}
    </Fragment>
  );
};
export default GenericList;
