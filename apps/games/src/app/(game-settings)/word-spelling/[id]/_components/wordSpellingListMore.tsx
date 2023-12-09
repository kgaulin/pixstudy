"use client";

import { useRouter } from "next/navigation";

import { Button, Icon, Interface, Popover } from "~/app/_components/ui";
import { api } from "~/utils/api";
import { WordSpellingListEdit } from "./wordSpellingListEdit";

export const WordSpellingListMore = (props: { wordSpellingListId: string }) => {
  const router = useRouter();
  const deleteWordSpellingListMutation =
    api.wordSpellingList.delete.useMutation({
      onSuccess: () => {
        router.push("/word-spelling");
      },
    });
  const deleteWordSpellingList = () => {
    deleteWordSpellingListMutation.mutate(props.wordSpellingListId);
  };

  return (
    <Popover
      trigger={
        <Button shape="none" variant="none">
          <Icon icon="MoreVert" className="w-8"></Icon>
        </Button>
      }
    >
      <ul className="flex flex-col gap-4">
        <li className="border-b-2 border-transparent hover:border-dark ">
          <WordSpellingListEdit id={props.wordSpellingListId}>
            <Button
              shape="none"
              variant="none"
              className="flex items-center gap-4"
            >
              <Icon icon="Edit" />

              <div className="flex flex-col items-start">
                <Interface size="lg" className="font-bold">
                  Éditer
                </Interface>
                <Interface size="sm">Modifier le nom de la liste</Interface>
              </div>
            </Button>
          </WordSpellingListEdit>
        </li>
        <li className="border-b-2 border-transparent hover:border-negative ">
          <Button
            shape="none"
            variant="none"
            className="flex items-center gap-4"
            onClick={deleteWordSpellingList}
            disabled={deleteWordSpellingListMutation.isPending}
          >
            <Icon icon="Delete" className=" text-negative" />

            <div className="flex flex-col items-start">
              <Interface size="lg" className="font-bold text-negative">
                Supprimer
              </Interface>
              <p className="text-label-sm text-negative">
                Supprimer définitivement la liste de mot
              </p>
            </div>
          </Button>
        </li>
      </ul>
    </Popover>
  );
};
