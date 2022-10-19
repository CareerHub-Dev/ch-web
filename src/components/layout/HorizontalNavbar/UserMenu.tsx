
import Link from "next/link";
import UserMenuPopper from "./UserMenuPopper";

const UserMenu = () => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <UserMenuPopper />
          <Link href="/my-profile" passHref>
            <a className="ml-4 text-primaryGrayDarker hover:text-primaryBlack">
              Мій профіль
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
} 
export default UserMenu;