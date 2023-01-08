export default function Stage3() {
  return (
    <div className="space-y-4">
      <label
        htmlFor="goals"
        className="block text-xl font-medium leading-6 text-gray-900 sm:mt-px sm:pt-2"
      >
        Цілі
      </label>
      <div className="sm:col-span-2">
        <textarea
          id="goals"
          name="goals"
          rows={3}
          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          defaultValue={''}
        />
        <p className="mt-2 text-sm text-gray-500">
          Напишіть не більше 200 слів про свої цілі у праці
        </p>
      </div>
    </div>
  );
}
