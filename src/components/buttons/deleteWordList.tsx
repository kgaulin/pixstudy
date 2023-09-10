import { useRouter } from "next/router";
import { useContext } from "react";
import { HiArchiveBox } from "react-icons/hi2";
import { api } from "~/utils/api";
import { ToastContext } from "../toast/toast-context";
import MenuButton from "./menuButton";

export default function DeleteWordList({
  id,
  name,
  onClick,
}: {
  id: string;
  name: string;
  onClick: () => void;
}) {
  const router = useRouter();
  const { pushToast } = useContext(ToastContext)!;
  const deleteMutation = api.wordlyWordList.delete.useMutation({
    onSuccess: () => {
      pushToast({
        message: `La liste de mots ${name} a été supprimé avec success`,
        type: "success",
      });
      router.back();
    },
    onError: () => {
      pushToast({
        message:
          "Une erreur c'est produite lors de la suppression de la liste de mots ${name}",
        type: "negative",
      });
      router.back();
    },
  });

  const onDelete = () => {
    deleteMutation.mutate({ id });
    onClick();
  };

  return (
    <MenuButton
      name={"Suprimer"}
      icon={
        <HiArchiveBox className="h-6 w-6 text-gray-600 text-red-600 group-hover:text-indigo-600 group-hover:text-red-600"></HiArchiveBox>
      }
      description={"suprimer définitivement la liste de mots"}
      onClick={onDelete}
      className="text-red-600 group-hover:text-red-600"
    ></MenuButton>
  );
}
