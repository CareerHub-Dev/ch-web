import NoSubscriptions from './NoSubscriptions';

const NoStudentSubscriptions = ({ isSelf }: { isSelf: boolean }) => {
  return (
    <NoSubscriptions
      isSelf={isSelf}
      text={`Поки що немає підписок на інших студентів...`}
      suggestionText={`Знайти інших студентів`}
      suggestionHref="/students"
    />
  );
};
export default NoStudentSubscriptions;
