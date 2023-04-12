import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRef, useState, FormEventHandler } from "react";
import useToast from "@/hooks/useToast";
import { activateAccount } from "@/lib/api/account";
import ModalLoading from "@/components/ui/Modal/ModalLoading";
import ItemsSelection from "@/components/ui/ItemsSelection";
import parseUnknownError from "@/lib/parse-unknown-error";

const roleItems = [
  { id: "student", name: "Я студент" },
  { id: "company", name: "Я співробітник компанії" },
];

export function ActivateAccountForm() {
  const tokenInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const router = useRouter();
  const [role, setRole] = useState(roleItems.at(0)!);
  const activateAccountMutation = useMutation(
    ["activate-account"],
    activateAccount,
    {
      onSuccess: () => {
        toast.success("Аккаунт успішно активовано");
        router.push("/auth/login");
      },
      onError: (error) => {
        toast.error(parseUnknownError(error));
      },
    }
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const token = tokenInputRef.current!.value;
    if (token.length === 0) {
      tokenInputRef.current?.focus();
      return;
    }

    activateAccountMutation.mutate({ token, role: role.id });
  };

  return (
    <form id="activate-form" className="space-y-6" onSubmit={handleSubmit}>
      <ModalLoading show={activateAccountMutation.isLoading} />
      <ItemsSelection
        items={roleItems}
        selectedItem={role}
        setSelected={setRole}
      />
      <input
        type="text"
        ref={tokenInputRef}
        placeholder="Введіть код активації"
        className="px-3 py-2 block w-full appearance-none shadow-sm rounded-md border focus:outline-none sm:text-sm transition-all ease-in-out duration-200 border-gray-300 placeholder-gray-400  focus:border-blue-500 focus:ring-blue-500"
      />
      <button
        disabled={activateAccountMutation.isLoading}
        className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ease-in-out duration-200 disabled:opacity-50 disabled:cursor-wait"
      >
        {"Активувати"}
      </button>
    </form>
  );
}
