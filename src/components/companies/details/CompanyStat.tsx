import cn from "classnames";

const CompanyStat = ({
  value,
  title,
}: {
  value: number | undefined;
  title: string;
}) => {
  const noValue = value === undefined;

  return (
    <div
      className={cn(
        `flex flex-col justify-center items-center text-center rounded-lg 
        text-white bg-lightBlueAccent px-8 py-2`,
        noValue && "animate-pulse"
      )}
    >
      <p>{noValue ? "..." : value}</p>
      <label>{title}</label>
    </div>
  );
};
export default CompanyStat;
