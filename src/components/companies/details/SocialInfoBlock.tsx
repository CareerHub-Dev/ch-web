import cn from 'classnames';

const SocialInfoBlock = ({
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
        `flex flex-col justify-center items-center text-center bg-lightBlueAccent rounded-lg px-8 
                        py-2`,
        noValue && 'animate-pulse'
      )}
    >
      <p className={cn(noValue && 'invisible')}>{value}</p>
      <label className={cn('text-darkerBlue', noValue && 'invisible')}>
        {title}
      </label>
    </div>
  );
};
export default SocialInfoBlock;
