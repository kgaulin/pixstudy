import { Button, Heading, Icon, ListView } from "@pixstudy/ui";

export const runtime = "edge";

export default function WordSpellingpage() {
  const items = [
    { id: 1, name: "Liste 1" },
    { id: 2, name: "Liste 2" },
  ];

  const renderItem = (item: (typeof items)[number]) => <div>{item.name}</div>;

  return (
    <main className="flex h-full flex-col items-center">
      <div className="container mt-4 flex flex-col justify-center px-8 py-8 md:px-0">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <Heading as="h2" className="my-4">
            Mes listes de mots
          </Heading>
          <Button className="flex gap-2 bg-primary">
            <Icon icon="Add" className="h-4"></Icon>
            <span>Créer une nouvelle liste</span>
          </Button>
        </div>
        <ListView
          className="mt-4 bg-light"
          variant="flat"
          items={items}
          renderItem={renderItem}
          key="id"
        ></ListView>
      </div>
    </main>
  );
}
