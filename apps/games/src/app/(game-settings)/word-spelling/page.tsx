import { Button, Heading, Icon } from "@pixstudy/ui";

export const runtime = "edge";

export default function WordSpellingpage() {
  return (
    <main className="flex h-full flex-col items-center">
      <div className="container mt-4 flex flex-col justify-center px-8 py-8 md:px-0">
        <div className="flex items-center justify-between">
          <Heading as="h2" className="my-4">
            Mes listes de mots
          </Heading>
          <Button className="flex gap-2 bg-primary">
            <Icon icon="Add" className="h-4"></Icon>
            <span>Créer une nouvelle liste</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
