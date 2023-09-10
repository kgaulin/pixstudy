import { useState } from "react";
import { HiArchiveBox, HiPencil } from "react-icons/hi2";
import { api } from "~/utils/api";
import { onChange, onEnterKey } from "~/utils/keyEventUtil";

export default function WordItem({ name, id }: { name: string; id: string }) {
  const [newName, setNewName] = useState(name);
  const deleteWordMutation = api.wordlyWords.delete.useMutation();
  const editNameMutation = api.wordlyWords.editName.useMutation();
  const [showEditInput, setShowEditInput] = useState(false);

  const editName = () => {
    editNameMutation.mutate({ name: newName, id: id });
    setShowEditInput(false);
  };

  return (
    <li className=" hover:bg-gray-50">
      <div className="flex w-full  justify-between gap-x-6 px-5 py-5">
        <div className="flex gap-x-4">
          <div className="min-w-0 flex-auto">
            {showEditInput ? (
              <input
                autoFocus
                type="text"
                name="name"
                onChange={(e) => onChange(e, setNewName)}
                onKeyDown={(e) => onEnterKey(e, editName)}
                className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                value={newName}
              />
            ) : (
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {name}
              </p>
            )}
          </div>
        </div>
        <div className=" self-center">
          <button className="mr-5" onClick={() => setShowEditInput(true)}>
            <HiPencil className="h-4 w-4  text-gray-900"></HiPencil>
          </button>
          <button onClick={() => deleteWordMutation.mutate({ id: id })}>
            <HiArchiveBox className="h-4 w-4  text-red-500"></HiArchiveBox>
          </button>
        </div>
      </div>
    </li>
  );
}
