import Link from "next/link";

export default function AuthLinks() {
  return (
    <div className="flex items-center md:ml-12">
      <Link
        href="/auth/login"
        className="text-base font-medium text-gray-500 hover:text-gray-900 transition-all ease-in-out duration-200"
      >
        {"Увійти"}
      </Link>
      <Link
        href="/auth/register"
        className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 transition-all ease-in-out duration-200"
      >
        {"Зареєструватися"}
      </Link>
    </div>
  );
}
