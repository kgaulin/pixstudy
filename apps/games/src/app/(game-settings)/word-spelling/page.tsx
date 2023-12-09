import { Heading } from "~/app/_components/ui";
import { WordSpellingCreateButton } from "./_components/wordSpelingCreateButton";
import { WordSpellingList } from "./_components/wordSpellingList";

export const runtime = "edge";

export default function WordSpellingpage() {
  return (
    <main className="flex h-full flex-col items-center">
      <div className="container mt-4 flex flex-grow flex-col justify-center px-8 py-8 md:px-0">
        <div className="items-center justify-between md:flex md:flex-row">
          <Heading as="h2" className="my-4">
            Mes listes de mots
          </Heading>
          <WordSpellingCreateButton></WordSpellingCreateButton>
        </div>
        <WordSpellingList></WordSpellingList>
      </div>
    </main>
  );
}
