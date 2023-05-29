import { getImage } from "@/lib/api/image";
import Image from "next/image";

const CompanyBanner: React.FC<{
  imageId?: string | null;
}> = ({ imageId }) => {
  const banner = imageId ? getImage(imageId) : "/company-dummy-banner.png";

  return (
    <Image
      alt="Company Banner"
      src={banner}
      width={1280}
      height={256}
      className="w-full h-full object-cover max-h-64"
    />
  );
};
export default CompanyBanner;
