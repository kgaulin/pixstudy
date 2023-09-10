import Head from "next/head";
import AddWordList from "~/components/buttons/addWordList";
import WordList from "~/components/list/wordList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Wordly</title>
        <meta name="description" content="Learn word week word" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-9 flex min-h-screen w-full flex-col items-center ">
        <div className="  mx-auto w-full max-w-4xl">
          <div className="px-5 lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Mes listes de mots
              </h2>
            </div>
            <AddWordList></AddWordList>
          </div>
          <WordList></WordList>
        </div>
      </main>
    </>
  );
}
