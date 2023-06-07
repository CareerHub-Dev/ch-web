import { type ReactNode } from "react";

const CompanyInfoBlock = ({
  icon,
  value,
}: {
  icon: ReactNode;
  value: string;
}) => {
  return (
    <p className="inline-flex items-center justify-center gap-2 text-lightBlueAccent">
      {icon}
      {value}
    </p>
  );
};
export default CompanyInfoBlock;
