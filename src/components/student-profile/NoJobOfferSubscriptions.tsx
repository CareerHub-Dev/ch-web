import NoSubscriptions from './NoSubscriptions';

const NoJobOfferSubscriptions = ({ isSelf }: { isSelf: boolean }) => {
  return (
    <NoSubscriptions
      isSelf={isSelf}
      text={`Поки що немає підписок на вакансії...`}
      suggestionText={`Знайти цікаву вакансію`}
      suggestionHref="/job-offers"
    />
  );
};
export default NoJobOfferSubscriptions;
