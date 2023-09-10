import { ChangeEvent, useContext, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { api } from "~/utils/api";
import { onEnterKey } from "~/utils/keyEventUtil";
import FormDialog from "../dialogs/formDialog";
import { ToastContext } from "../toast/toast-context";
import MenuButton from "./menuButton";

export default function EditWordList({
  id,
  name,
  onClick,
}: {
  id: string;
  name: string;
  onClick: () => void;
}) {
  const { pushToast } = useContext(ToastContext)!;
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(name);

  const editMutation = api.wordlyWordList.editName.useMutation({
    onSuccess: () => {
      pushToast({
        message: `La liste de mots ${name} a été renommée avec success ${newName}`,
        type: "success",
      });
    },
    onError: () => {
      pushToast({
        message: `Une erreur c'est produite lors de la modification de la liste de mots ${name}`,
        type: "negative",
      });
    },
  });

  const onEdit = () => {
    editMutation.mutate({ name: newName, id });
    setIsOpen(false);
    onClick();
  };

  const onOpenDialog = () => {
    setIsOpen(true);
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNewName(e.target.value);
  }

  return (
    <>
      <MenuButton
        name={"Éditer"}
        icon={
          <HiPencil className="h-6 w-6 text-gray-600  group-hover:text-indigo-600 "></HiPencil>
        }
        description={"Modifier le nom de la liste"}
        onClick={onOpenDialog}
      ></MenuButton>

      <FormDialog
        onSave={onEdit}
        saveButtonName={"Éditer"}
        title="Éditer le nom de la liste"
        isSaveButtonDisabled={
          !newName || editMutation.isLoading || newName === name
        }
        isLoading={editMutation.isLoading}
        onClose={() => setIsOpen(false)}
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
              value={newName}
              onChange={handleChange}
              onKeyDown={(e) => onEnterKey(e, onEdit)}
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
