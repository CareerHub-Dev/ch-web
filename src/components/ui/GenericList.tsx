import { Fragment } from 'react';

const GenericList = <T extends unknown>({
  items,
  renderItem,
  keyExtractor = (_item, index) => index,
}: {
  items: T[];
  renderItem: (item: T, ...args: any) => JSX.Element;
  keyExtractor?: (item: T, index: number) => string | number;
}) => {
  return (
    <Fragment>
      {items.map((item, index) => (
        <Fragment key={keyExtractor(item, index)}>{renderItem(item)}</Fragment>
      ))}
    </Fragment>
  );
};
export default GenericList;
