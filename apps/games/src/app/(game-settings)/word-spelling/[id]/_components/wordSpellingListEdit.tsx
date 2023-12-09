"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Dialog, Input } from "~/app/_components/ui";
import { api } from "~/utils/api";

export const WordSpellingListEdit = (props: {
  id: string;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const { data } = api.wordSpellingList.byId.useQuery({ id: props.id });
  const [name, setName] = useState(data?.name ?? "");
  const router = useRouter();
  const updateWordSpellingListMutation =
    api.wordSpellingList.update.useMutation({
      onSuccess: () => {
        router.refresh();
        setOpen(false);
      },
    });
  const updateWordSpellingList = () => {
    updateWordSpellingListMutation.mutate({
      id: props.id,
      name,
    });
  };

  return (
    <Dialog
      trigger={props.children}
      open={open}
      title={"Éditer le nom de la liste"}
      onOpenChange={setOpen}
    >
      <div className="flex flex-col gap-4">
        <div className="mt-4 flex flex-col gap-2">
          <label htmlFor="name" className="text-label-lg font-bold">
            Nom de la liste
          </label>
          <Input
            id="name"
            type="text"
            variant="flat"
            className="p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            disabled={!name || updateWordSpellingListMutation.isPending}
            onClick={updateWordSpellingList}
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
