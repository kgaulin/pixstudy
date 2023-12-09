"use client";

import { useState } from "react";

import { Button, Icon, Input, ListView } from "~/app/_components/ui";
import { api } from "~/utils/api";

const LoadingList = () => (
  <div className="mt-10 flex h-full items-center justify-center">
    <Icon icon="Progress" className="h-20 w-20 animate-spin"></Icon>
  </div>
);

export const WordSpellingWordList = (props: { wordSpellingListId: string }) => {
  const { data, isLoading } = api.wordSpellingWord.all.useQuery({
    wordSpellingListId: props.wordSpellingListId,
  });
  const [newWord, setNewWord] = useState("");
  const utils = api.useUtils();
  const { mutate, isPending, variables } =
    api.wordSpellingWord.create.useMutation({
      onSettled: () => utils.wordSpellingWord.invalidate(),
    });

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createNewWord();
    }
  };
  const createNewWord = () => {
    if (!isPending && newWord) {
      mutate({
        wordSpellingListId: props.wordSpellingListId,
        name: newWord,
      });
      setNewWord("");
    }
  };

  const renderItem = (item: NonNullable<typeof data>[number]) => (
    <div key={item.id} className="p-4">
      {item.name}
    </div>
  );
  const renderPendingItem = (
    item: Partial<NonNullable<typeof data>[number]>,
  ) => <div className="p-4 opacity-50">{item.name}</div>;

  return (
    <div className="flex flex-col">
      <Input
        placeholder="Ajouter un mot"
        onKeyDown={onEnter}
        appendIcon={
          <Button
            shape="square"
            variant="flat"
            className="bg-primary"
            disabled={!newWord || isPending}
            onClick={createNewWord}
          >
            <Icon icon="Add" className="h-2 w-2"></Icon>
          </Button>
        }
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
      ></Input>
      {isLoading ? (
        <LoadingList></LoadingList>
      ) : (
        <ListView
          className="mt-4 bg-light"
          variant="flat"
          renderItem={renderItem}
          items={data ?? []}
          pendingItem={variables}
          isPending={isPending}
          renderPendingItem={renderPendingItem}
          key="name"
        ></ListView>
      )}
    </div>
  );
};
