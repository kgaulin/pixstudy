import { Heading } from "~/app/_components/ui";
import { api } from "~/utils/server-api";
import { WordSpellingListMore } from "./_components/wordSpellingListMore";
import { WordSpellingWordList } from "./_components/wordSpellingWordList";

export const runtime = "edge";

export default async function WordSpellingpage({
  params,
}: {
  params: { id: string };
}) {
  const wordSpellingList = await api.wordSpellingList.byId.query({
    id: params.id,
  });

  return (
    <main className="flex h-full flex-col items-center">
      <div className="container mt-4 flex flex-grow flex-col justify-center px-8 py-8 md:px-0">
        <div className="flex  items-center gap-4">
          <Heading as="h2" className="my-4">
            {wordSpellingList?.name}
          </Heading>
          <WordSpellingListMore
            wordSpellingListId={params.id}
          ></WordSpellingListMore>
        </div>
        <WordSpellingWordList
          wordSpellingListId={params.id}
        ></WordSpellingWordList>
      </div>
    </main>
  );
}
