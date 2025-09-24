import { useState } from "react";

export type BoardSortOptions =
  | "createdAt"
  | "updatedAt"
  | "lastOpenedAt"
  | "name";

export type BoardsFilters = {
  search: string;
  sort: BoardSortOptions;
};

export function useBoardsFilters() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<BoardSortOptions>("lastOpenedAt");

  return {
    search,
    sort,
    setSearch,
    setSort,
  };
}
