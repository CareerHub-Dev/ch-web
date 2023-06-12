import { useJobOffersFeedStore } from "../store/job-offers-feed-store";

export default function JobOfferSearchBox() {
  const search = useJobOffersFeedStore((s) => s.search);
  const setSearch = useJobOffersFeedStore((s) => s.setSearch);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <input
      type="search"
      name="search"
      id="search"
      value={search}
      onChange={handleSearchChange}
      placeholder={"Пошук"}
      className="block w-full mr-8 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
    />
  );
}
