export function removeFromPaginatedCache(data: unknown, id: string) {
  const dataIsObject =
    typeof data === "object" && data !== null;
  if (dataIsObject) {
    const newData = { ...data };

    if ("pages" in newData && newData.pages instanceof Array) {
      newData.pages = newData.pages.map((page: unknown) => {
        if (
          typeof page === "object" &&
          page !== null &&
          "items" in page &&
          page.items instanceof Array
        ) {
          page.items = page.items.filter((item: unknown) => {
            if (
              typeof item === "object" &&
              item !== null &&
              "id" in item &&
              item.id === id
            ) {
              return false;
            }
            return true;
          });
        }
        return page;
      });
      return newData;
    }
  }
  return data;
}
