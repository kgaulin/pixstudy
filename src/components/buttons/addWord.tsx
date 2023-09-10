import { ChangeEvent, useState } from "react";
import { HiPlusSmall } from "react-icons/hi2";
import { api } from "~/utils/api";
import { onEnterKey } from "~/utils/keyEventUtil";

export default function AddWord({ id }: { id: string }) {
  const [showWordInput, setShowWordInput] = useState(false);
  const [name, setName] = useState("");
  const addWordMutation = api.wordlyWords.create.useMutation();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  const createWord = () => {
    addWordMutation.mutate({ name, wordListId: id });
    setName("");
  };

  const onAddWordClick = () => {
    setShowWordInput(true);
  };

  return (
    <div className="mt-5">
      {showWordInput ? (
        <input
          autoFocus
          value={name}
          type="text"
          name="name"
          onChange={handleChange}
          onKeyDown={(e) => onEnterKey(e, createWord)}
          className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="école"
        />
      ) : (
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={onAddWordClick}
        >
          <HiPlusSmall className="h-6 w-6 text-gray-900"></HiPlusSmall>
          Ajouter un mot
        </button>
      )}
    </div>
  );
}
