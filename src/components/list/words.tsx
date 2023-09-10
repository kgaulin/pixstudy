import { api } from "~/utils/api";
import AddWord from "../buttons/addWord";
import WordItem from "../wordItem";

export default function Words({ id }: { id: string }) {
  const words = api.wordlyWords.getAll.useQuery({ id: id });

  return (
    <ul role="list" className="mt-5 divide-y divide-gray-100">
      {words.data?.map((word) => (
        <WordItem key={word.id} name={word.name} id={word.id}></WordItem>
      ))}
      <li>
        <AddWord id={id}></AddWord>
      </li>
    </ul>
  );
}
