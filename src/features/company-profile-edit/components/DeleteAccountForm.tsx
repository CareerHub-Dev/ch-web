import PrimaryButton from "@/components/ui/PrimaryButton";

export default function DeleteAccountForm() {
    return (
        <>
            <div>
                <h2 className="text-base font-semibold leading-7">
                    {"Видалити акаунт"}
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                    Більше не хочете користуватися нашим сервісом? Ви можете
                    видалити свій обліковий запис тут. Цю дію не можна
                    відмінити. Уся інформація, пов’язана з цим обліковим
                    записом, буде видалена назавжди.
                </p>
            </div>

            <form className="flex items-start md:col-span-2">
                <PrimaryButton type="submit" variant="red">
                    {"Так, видалити акаунт"}
                </PrimaryButton>
            </form>
        </>
    );
}
