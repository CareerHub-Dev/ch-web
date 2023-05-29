import Link from "next/link";

export default function AuthLinksMobile() {
  return (
    <div className="mt-6">
      <Link
        href="/auth/register"
        className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 transition-all ease-in-out duration-200"
      >
        {"Зареєструватися"}
      </Link>
      <p className="mt-6 text-center text-base font-medium text-gray-500">
        {"Вже маєте акаунт? "}
        <Link
          href="/auth/login"
          className="text-blue-600 hover:text-blue-500 transition-all ease-in-out duration-200"
        >
          {"Увійти"}
        </Link>
      </p>
    </div>
  );
}
