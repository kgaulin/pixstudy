import { useRouter } from "next/router";
import { useState } from "react";
import { HiSpeakerWave, HiXMark } from "react-icons/hi2";
import { api } from "~/utils/api";
import { onChange, onEnterKey } from "~/utils/keyEventUtil";

export default function WordlyGame() {
  const [word, setWord] = useState("");
  const { query } = useRouter();
  const id = query.id as string;
  const settings = api.wordlyGameSettings.getOne.useQuery({ id: id });

  const validateWord = () => {};

  if (settings.isLoading) {
    return <div>chargement en cours ...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-4xl ">
      <div className="flex items-center justify-between space-x-4 ">
        <button
          className={`
              group
                inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50  `}
        >
          <HiXMark
            className={`h-6 w-6  transition duration-150 ease-in-out group-hover:text-opacity-80`}
            aria-hidden="true"
          />
        </button>

        <div className="h-2.5 w-full rounded-full bg-gray-200 ">
          <div
            className="h-2.5 rounded-full bg-blue-600"
            style={{ width: "45%" }}
          ></div>
        </div>
      </div>
      <h2 className="mt-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Quel est le mot nommé ?
      </h2>

      <div className="flex w-full flex-col items-center justify-center">
        <button
          className={`
          mt-12
         inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  `}
        >
          <HiSpeakerWave
            className={`h-12 w-12  transition duration-150 ease-in-out group-hover:text-opacity-80`}
            aria-hidden="true"
          />
        </button>
        <input
          autoFocus
          type="text"
          name="word"
          onChange={(e) => onChange(e, setWord)}
          onKeyDown={(e) => onEnterKey(e, validateWord)}
          className="lock mt-12 w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          value={word}
        />
        <button
          className={` mt-12
         inline-flex items-center rounded-md bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  `}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
