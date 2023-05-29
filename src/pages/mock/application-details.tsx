import {
  CheckIcon,
  HandThumbUpIcon,
  PaperClipIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import CommonLayout from "@/components/layout/CommonLayout";
import cn from "classnames";

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: HandThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Отрмано подання",
    date: "13.04.2023",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Запрошено на співбесіду",
    date: "16.04.2023",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Інтерв'ю завершене",
    date: "18.04.2023",
    datetime: "2020-10-04",
  },
];

export default function ApplicationDetailsMock() {
  return (
    <main className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                width={64}
                height={64}
                className="h-16 w-16 rounded-full"
                src="/default-avatar.png"
                alt=""
              />
              <span
                className="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {"Сергій Бурцев"}
            </h1>
            <p className="text-sm font-medium text-gray-500">
              {"Подання на "}
              <a href="#" className="text-gray-900">
                Front End Developer
              </a>
              {", "}
              <time dateTime="2023-04-11">{"13.04.2023"}</time>
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {"Відхилити"}
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {"Прийняти"}
          </button>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="applicant-information-title"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {"Інформація про кандидата"}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {"Персональні дані кандидата"}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {"Електронна пошта"}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {"serhii.burtsev@nure.ua"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {"Телефон"}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      +1 555-555-5555
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      {"Резюме"}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <div className="rounded-md border border-gray-200">
                        <div className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-2 w-0 flex-1 truncate">
                              {"serhii_burtsev_resume.docx"}
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href={"#"}
                              className="font-medium text-blue-600 hover:text-blue-500"
                            >
                              {"Завантажити"}
                            </a>
                          </div>
                        </div>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <a
                  href="#"
                  className="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                >
                  {"Показати резюме"}
                </a>
              </div>
            </div>
          </section>
        </div>

        <section
          aria-labelledby="timeline-title"
          className="lg:col-span-1 lg:col-start-3"
        >
          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <h2
              id="timeline-title"
              className="text-lg font-medium text-gray-900"
            >
              {"Історія"}
            </h2>

            <div className="mt-6 flow-root">
              <ul role="list" className="-mb-8">
                {timeline.map((item, itemIdx) => (
                  <li key={item.id}>
                    <div className="relative pb-8">
                      {itemIdx !== timeline.length - 1 ? (
                        <span
                          className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={cn(
                              item.type.bgColorClass,
                              "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                            )}
                          >
                            <item.type.icon
                              className="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              {item.content}
                            </p>
                          </div>

                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime={item.datetime}>{item.date}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-col justify-stretch">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {"Прийняти на роботу"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

ApplicationDetailsMock.getLayout = CommonLayout;
