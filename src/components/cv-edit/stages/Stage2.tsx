export default function Stage2() {
  return (
    <div className="space-y-6 sm:space-y-5">
      <div>
        <h3 className="text-xl font-medium leading-6 text-gray-900">
          {'Фотографія'}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {'Цей крок є опціональним'}
        </p>
      </div>

      <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="photo"
          className="block text-sm font-medium text-gray-700"
        >
          Фото
        </label>
        <div className="mt-1 sm:mt-0">
          <div className="flex items-center flex-row-reverse">
            <button
              type="button"
              className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Змінити
            </button>
            <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
