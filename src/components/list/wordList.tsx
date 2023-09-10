import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";
import { api } from "~/utils/api";

export default function () {
  const items = api.wordlyWordList.getAll.useQuery();

  return (
    <ul role="list" className="mt-5 divide-y divide-gray-100">
      {items.data?.map((item) => (
        <li className=" hover:bg-gray-50" key={item.id}>
          <Link
            className="flex w-full  justify-between gap-x-6 px-5 py-5"
            href={{
              pathname: "/word-list/[id]",
              query: { id: item.id },
            }}
          >
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {item.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {item.wordsCount} {item.wordsCount > 1 ? "mots" : "mot"}
                </p>
              </div>
            </div>
            <div className=" self-center">
              <HiChevronRight className="h-4 w-4  text-gray-900"></HiChevronRight>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
