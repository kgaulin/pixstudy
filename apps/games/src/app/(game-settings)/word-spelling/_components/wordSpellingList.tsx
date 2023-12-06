"use client";

import { Icon, Interface, ListView } from "~/app/_components/ui";
import { api } from "~/utils/api";

export const WordSpellingList = () => {
  const { data, isLoading } = api.wordSpellingList.all.useQuery();
  const renderItem = (item: NonNullable<typeof data>[number]) => (
    <div key={item.id}>{item.name}</div>
  );

  if (isLoading) {
    return (
      <div className="mt-10 flex h-full items-center justify-center">
        <Icon icon="Progress" className="h-20 w-20 animate-spin"></Icon>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="mt-10 flex h-full items-center justify-center">
        <Interface size="lg">
          Aucune liste de mots n&apos;a été trouvé
        </Interface>
      </div>
    );
  }

  return (
    <ListView
      className="mt-4 bg-light"
      variant="flat"
      items={data}
      renderItem={renderItem}
      key="id"
    ></ListView>
  );
};
