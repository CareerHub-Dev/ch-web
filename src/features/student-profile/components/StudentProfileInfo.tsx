export default function StudentProfileInfo() {
  return (
    <section aria-labelledby="student-information-title">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2
            id="student-information-title"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Загальна інформація
          </h2>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{"Група"}</dt>
              <dd className="mt-1 text-sm text-gray-900">{"ПЗПІи-19-1"}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{"Пошта"}</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {"serhii.burtsev@nure.ua"}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{"Телефон"}</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {"+1 555-555-5555"}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                {"День народження"}
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{"1999-01-01"}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
