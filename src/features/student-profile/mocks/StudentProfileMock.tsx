import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import StudentStatsMock from "./StudentStatsMock";
import Image from "next/image";

const whoToFollow = [
  {
    name: "Микола Берковський",
    handle: "ПЗПІи-19-1",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Юлія Коба",
    handle: "ПЗПІи-19-1",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Микита Іванов",
    handle: "ПЗПІи-19-1",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
const trendingPosts = [
  {
    id: 1,
    user: {
      name: "Floyd Miles",
      imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    body: 'Каждому человеку на земле необходимо подписаться на телеграмм-канал "debiki в кружочках". И это не обсуждается.',
    comments: 291,
  },
  {
    id: 2,
    user: {
      name: "Floyd Miles",
      imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    body: "All we do is Kuk.",
    comments: 2,
  },
  {
    id: 3,
    user: {
      name: "Floyd Miles",
      imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    body: "Just image Writing the whole really (I mean, REALLY) large app in Typescript and seeign VSCode going slideshow trying to process the whole LSP stuff. Hate it.",
    comments: 4,
  },
];

export default function StudentProfileSkeleton() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                height={128}
                width={128}
                className="h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
              <span
                className="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Бурцев Сергій</h1>
          </div>
        </div>
        <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Редагувати
          </button>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          <section aria-labelledby="student-information-title">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="student-information-title"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Загальна інформація
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Персональний профіль студента
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {"Група"}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {"ПЗПІи-19-1"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {"Пошта"}
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
                      {"+1 555-555-5555"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {"День народження"}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {"1999-01-01"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <StudentStatsMock />
          {/* Description list*/}
        </div>
        <aside className="lg:col-span-1 lg:col-start-3">
          <div className="space-y-4">
            <section aria-labelledby="who-to-follow-heading">
              <div className="rounded-lg bg-white shadow">
                <div className="p-6">
                  <h2
                    id="who-to-follow-heading"
                    className="text-base font-medium text-gray-900"
                  >
                    Підписки
                  </h2>
                  <div className="mt-6 flow-root">
                    <ul role="list" className="-my-4 divide-y divide-gray-200">
                      {whoToFollow.map((user) => (
                        <li
                          key={user.handle}
                          className="flex items-center space-x-3 py-4"
                        >
                          <div className="flex-shrink-0">
                            <Image
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              <a href={user.href}>{user.name}</a>
                            </p>
                            <p className="text-sm text-gray-500">
                              <a href={user.href}>{"@" + user.handle}</a>
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <button
                              type="button"
                              className="inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium text-indigo-700 hover:text-indigo-800"
                            >
                              <ArrowRightIcon
                                className="-ml-1 mr-0.5 h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      Дивитися більше
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section aria-labelledby="trending-heading">
              <div className="rounded-lg bg-white shadow">
                <div className="p-6">
                  <h2
                    id="trending-heading"
                    className="text-base font-medium text-gray-900"
                  >
                    Останні пости
                  </h2>
                  <div className="mt-6 flow-root">
                    <ul role="list" className="-my-4 divide-y divide-gray-200">
                      {trendingPosts.map((post) => (
                        <li key={post.id} className="flex space-x-3 py-4">
                          <div className="flex-shrink-0">
                            <Image
                              className="h-8 w-8 rounded-full"
                              src={post.user.imageUrl}
                              alt={post.user.name}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-gray-800">{post.body}</p>
                            <div className="mt-2 flex">
                              <span className="inline-flex items-center text-sm">
                                <button
                                  type="button"
                                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                >
                                  <ChatBubbleLeftEllipsisIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  <span className="font-medium text-gray-900">
                                    {post.comments}
                                  </span>
                                </button>
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      Дивитися більше
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </>
  );
}
