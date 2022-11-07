const SocialInfoBlock: React.FC<{
  value: string;
  title: string;
}> = ({ value, title }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center bg-lightBlueAccent rounded-lg px-8 py-2">
      <p>{value}</p>
      <label className="text-darkerBlue">{title}</label>
    </div>
  );
};
export default SocialInfoBlock;
