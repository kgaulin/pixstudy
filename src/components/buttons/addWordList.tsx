import { ChangeEvent, useState } from "react";
import { HiPlusSmall } from "react-icons/hi2";
import { api } from "~/utils/api";
import { onEnterKey } from "~/utils/keyEventUtil";
import FormDialog from "../dialogs/formDialog";

export default function () {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const wordListQuery = api.wordlyWordList.create.useMutation({
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  function closeModal() {
    setIsOpen(false);
    setName("");
  }

  function openModal() {
    setIsOpen(true);
  }

  function createWordList() {
    wordListQuery.mutate({ name });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  return (
    <>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="sm:ml-3">
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <HiPlusSmall className="h-6 w-6 text-white"></HiPlusSmall>
            Créer une nouvelle liste
          </button>
        </span>
      </div>

      <FormDialog
        onSave={createWordList}
        saveButtonName={"Créer"}
        title="Créer une nouvelle liste"
        isSaveButtonDisabled={!name || wordListQuery.isLoading}
        isLoading={wordListQuery.isLoading}
        onClose={closeModal}
        isOpen={isOpen}
      >
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        ></label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              onKeyDown={(e) => onEnterKey(e, createWordList)}
              id="name"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="semaine 1"
            />
          </div>
        </div>
      </FormDialog>
    </>
  );
}
