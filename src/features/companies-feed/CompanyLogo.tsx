import { getImage } from "@/lib/api/image";
import Image from "next/image";

const CompanyLogo: React.FC<{
  imageId?: string | null;
  companyName: string;
}> = ({ imageId, companyName }) => {
  const imageSrc = imageId ? getImage(imageId) : "/company-dummy-logo.png";

  return (
    <Image
      className="aspect-square rounded-xl overflow-hidden w-20 lg:w-32"
      src={imageSrc}
      width={200}
      height={200}
      alt={companyName}
    />
  );
};
export default CompanyLogo;
