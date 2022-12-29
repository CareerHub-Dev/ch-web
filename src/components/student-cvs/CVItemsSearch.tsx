export default function CVItemsSearch() {
  return (
    <div className="flex m-4 gap-4">
      <input
        type="search"
        placeholder="Пошук за назвою"
        className="form-input p-2 w-full"
      />
      <select className="form-input p-2 bg-blue-500 text-white ">
        <option>Сорутвати</option>
      </select>
    </div>
  );
}
