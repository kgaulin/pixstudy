"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Dialog, Icon, Input } from "~/app/_components/ui";
import { api } from "~/utils/api";

export function WordSpellingCreateButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const utils = api.useUtils();
  const { mutate, isPending } = api.wordSpellingList.create.useMutation({
    onSuccess: async (data) => {
      await utils.wordSpellingList.invalidate();
      setOpen(false);
      router.push(`/word-spelling/${data.id}`);
    },
  });
  const [name, setName] = useState("");
  const onCreate = () => {
    if (!name) return;
    mutate({ name: name });
  };
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onCreate();
    }
  };

  return (
    <Dialog
      title="Créer une nouvelle liste"
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="flex gap-4 bg-primary">
          <Icon icon="Add" className="h-4"></Icon>
          <span>Créer une nouvelle liste</span>
        </Button>
      }
    >
      <div className="mt-8 flex flex-col">
        <label
          htmlFor="createWordSpellingList"
          className="text-label-lg font-bold"
        >
          Nom de la liste
        </label>
        <Input
          variant="flat"
          className="mt-1 border border-dark p-2"
          id="createWordSpellingList"
          placeholder="Les pirates"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyUp={onEnter}
        ></Input>
        <Button className="mt-8" disabled={isPending} onClick={onCreate}>
          Créer
        </Button>
      </div>
    </Dialog>
  );
}
