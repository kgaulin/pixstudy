import { useRouter } from "next/router";

export default function EndGame({
  correctlySpelledWords,
  totalWords,
}: {
  correctlySpelledWords: number;
  totalWords: number;
}) {
  const router = useRouter();

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0">
      <div
        className={`absolute left-1/2 top-1/2 flex h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 transform flex-col rounded bg-white px-8 py-0 drop-shadow-xl`}
      >
        <h2 className="mt-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Résultat de la partie
        </h2>

        <h4 className="mb-auto mt-8 mt-auto self-center text-xl leading-7 text-gray-500 sm:truncate sm:text-3xl sm:tracking-tight">
          {correctlySpelledWords} {correctlySpelledWords > 1 ? "mots" : "mot"}{" "}
          réussie sur {totalWords}
        </h4>

        <button
          onClick={() => router.push("/")}
          className={`mb-4 mt-auto inline-flex items-center self-end rounded-md bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50`}
        >
          Retour aux listes de mots
        </button>
      </div>
    </div>
  );
}
