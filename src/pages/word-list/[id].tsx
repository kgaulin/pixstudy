import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  HiChevronLeft,
  HiOutlineArrowUturnLeft,
  HiPlay,
} from "react-icons/hi2";
import MoreWordList from "~/components/buttons/moreWordList";
import Words from "~/components/list/words";
import type { WordlySettings } from "~/types/wordlyTypes";
import { api } from "~/utils/api";

export default function WordListId() {
  const router = useRouter();
  const id = router.query.id as string;
  const wordList = api.wordlyWordList.getOne.useQuery({ id: id });
  const words = api.wordlyWords.getAll.useQuery({ id: id });
  const lastestUnfinishGame = api.wordlyGameSettings.getLast.useQuery({
    wordListId: id,
    status: "started",
  });
  const isStartButtonDisabled: boolean = (words.data?.length ?? 0) < 1;
  const gameSettingsMutation = api.wordlyGameSettings.create.useMutation({
    async onSuccess(data) {
      await router.push(`/games/wordly/${data.id}`);
    },
  });

  const createSettings = () => {
    const wordsData = words.data;
    if (wordsData?.length) {
      const settings: WordlySettings = {
        currentWord: wordsData[0]!.name,
        correctlySpelledWords: [],
        notCorrectlySpelledWords: [],
        gameWords: wordsData.map((w) => w.name),
      };
      gameSettingsMutation.mutate({ wordListId: wordList.data!.id, settings });
    }
  };

  const resumeGame = async () => {
    if (lastestUnfinishGame.data != null) {
      try {
        await router.push(`/games/wordly/${lastestUnfinishGame.data?.id}`);
      } catch (e) {}
    }
  };

  return (
    <>
      <Head>
        <title>Wordly</title>
        <meta name="description" content="Learn word week word" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-9 flex min-h-screen w-full flex-col items-center ">
        <div className="  mx-auto w-full max-w-4xl">
          <div className="flex flex-col px-5 ">
            <Link href="/" className="mb-4 flex items-center">
              <HiChevronLeft className="mr-1"></HiChevronLeft>
              <span>retour</span>
            </Link>
            <div className=" flex min-w-0 items-baseline">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {wordList.data?.name}
              </h2>

              <MoreWordList
                id={id}
                name={wordList.data?.name ?? ""}
              ></MoreWordList>

              <div className="ml-auto  flex  gap-5">
                {!!lastestUnfinishGame.data && (
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={resumeGame}
                  >
                    <HiOutlineArrowUturnLeft className="h-6 w-6 text-gray-900"></HiOutlineArrowUturnLeft>
                    Reprendre
                  </button>
                )}

                <button
                  type="button"
                  disabled={isStartButtonDisabled}
                  onClick={createSettings}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                >
                  <HiPlay className="h-6 w-6 text-white"></HiPlay>
                  Commencer
                </button>
              </div>
            </div>
            <Words id={id}></Words>
          </div>
        </div>
      </main>
    </>
  );
}
