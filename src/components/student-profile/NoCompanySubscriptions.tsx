import NoSubscriptions from './NoSubscriptions';

const NoCompanySubscriptions = ({ isSelf }: { isSelf: boolean }) => {
  return (
    <NoSubscriptions
      isSelf={isSelf}
      text={`Поки що немає підписок на компанії...`}
      suggestionText={`Знайти цікаву компанію`}
      suggestionHref="/companies"
    />
  );
};
export default NoCompanySubscriptions;
