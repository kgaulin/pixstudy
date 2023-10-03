import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { HiSpeakerWave, HiXMark } from "react-icons/hi2";
import EndGame from "~/components/endGame";
import Feedback from "~/components/feedback";
import { useFocus } from "~/hooks/useFocus";
import type { WordlySettings } from "~/types/wordlyTypes";
import { api } from "~/utils/api";
import { onChange, onEnterKey } from "~/utils/keyEventUtil";
type Status = "success" | "error";

export default function WordlyGame() {
  const [word, setWord] = useState("");
  const [status, setStatus] = useState<Status>("success");
  const [showFeedback, setShowFeedback] = useState(false);
  const [previousWord, setPreviousWord] = useState("");
  const [showEndGame, setShowEndGame] = useState(false);
  const { back, query } = useRouter();
  const id = query.id as string;
  const gameSettings = api.wordlyGameSettings.getOne.useQuery({ id: id });
  const settingsMutation = api.wordlyGameSettings.update.useMutation();
  const [inputRef, setInputFocus] = useFocus();
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [selectedVoice, setSelectedVoices] =
    useState<SpeechSynthesisVoice | null>(null);

  const getSettings = useMemo(() => {
    return gameSettings.data?.settings;
  }, [gameSettings.data?.settings]);

  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );

  function endGame(): void {
    setShowEndGame(true);
  }

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(
      gameSettings.data?.settings.currentWord ?? ""
    );

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [gameSettings.data?.settings.currentWord]);

  useEffect(() => {
    const speechSynthesis = window.speechSynthesis;
    const speechVoices = speechSynthesis
      .getVoices()
      .filter((v) => v.lang === "fr-CA");
    setVoices(speechVoices);
    setSelectedVoices(
      speechVoices.find((v) => v.name === "Amélie") ?? speechVoices[0] ?? null
    );
    setSynth(speechSynthesis);
  }, []);

  const handlePlay = () => {
    if (utterance && !isSpeaking) {
      setIsSpeaking(true);
      utterance.voice = selectedVoice;
      utterance.lang = "fr-CA";
      utterance.rate = 0.3;
      utterance.pitch = 1;
      utterance.onerror = (e) => console.log(e);
      utterance.onend = () => setIsSpeaking(false);
      synth?.speak(utterance);
    }
    setInputFocus();
  };

  const calculateProgressPourcentage = () => {
    if (!getSettings?.currentWord) {
      return 100;
    }

    const currentIndex: number =
      getSettings?.gameWords?.findIndex(
        (w) => w === getSettings?.currentWord
      ) ?? 0;
    const wordLength: number = getSettings?.gameWords?.length ?? 1;

    return Math.round((currentIndex / wordLength) * 100);
  };

  const progressPourcentage = calculateProgressPourcentage();

  const changeSelectedVoice = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedVoices(
      voices.find((v) => v.name === event.target.value) ?? null
    );
  };

  const validateWord = () => {
    if (getSettings?.gameWords && !showFeedback) {
      const currentWordIndex =
        getSettings.gameWords?.findIndex(
          (w) => w === getSettings.currentWord
        ) ?? 0;
      setPreviousWord(getSettings?.gameWords[currentWordIndex] ?? "");

      let nextWord = null;
      if (
        getSettings.gameWords &&
        currentWordIndex < getSettings.gameWords.length - 1
      ) {
        nextWord = getSettings.gameWords[currentWordIndex + 1]!;
      }

      const status =
        currentWordIndex === getSettings.gameWords.length - 1
          ? "finished"
          : "started";

      if (
        word.toLowerCase().trim() ===
        getSettings.currentWord?.toLowerCase().trim()
      ) {
        const newSettings: WordlySettings = {
          ...getSettings,
          currentWord: nextWord,
          correctlySpelledWords: [
            ...getSettings.correctlySpelledWords,
            getSettings.currentWord,
          ],
        };

        settingsMutation.mutate({
          status,
          id,
          settings: newSettings,
        });

        setShowFeedback(true);
        setStatus("success");
      } else {
        const newSettings: WordlySettings = {
          ...getSettings,
          currentWord: nextWord,
          notCorrectlySpelledWords: [
            ...getSettings.notCorrectlySpelledWords,
            getSettings.currentWord!,
          ],
        };

        settingsMutation.mutate({
          status,
          id,
          settings: newSettings,
        });

        setShowFeedback(true);
        setStatus("error");
      }
    }
  };

  if (gameSettings.isLoading) {
    return <div>chargement en cours ...</div>;
  }

  return (
    <>
      <div className="mx-auto w-full max-w-4xl ">
        <div className="flex items-center justify-between space-x-4 ">
          <button
            onClick={() => back()}
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
              style={{ width: `${progressPourcentage}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h2 className="mt-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Quel est le mot nommé ?
          </h2>
          <label
            htmlFor="voices"
            className=" ml-auto text-sm font-medium text-gray-900"
          >
            Changer de voix
          </label>
          <select
            id="voices"
            onChange={changeSelectedVoice}
            value={selectedVoice?.name}
            className="rounded-lg border border-gray-300 bg-gray-50  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            {voices.map((v) => (
              <option
                key={v.name}
                value={v.name}
                selected={v.name === selectedVoice?.name}
              >
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <button
            onClick={handlePlay}
            disabled={!getSettings?.currentWord && isSpeaking}
            className={`
          mt-12
         inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  disabled:opacity-50`}
          >
            <HiSpeakerWave
              className={`h-12 w-12  transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden="true"
            />
          </button>
          <input
            ref={inputRef}
            autoComplete="off"
            autoFocus
            type="text"
            name="word"
            disabled={!getSettings?.currentWord}
            onChange={(e) => onChange(e, setWord)}
            onKeyDown={(e) => onEnterKey(e, validateWord)}
            className="lock mt-12 w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
            value={word}
          />
          <button
            disabled={!word.length && !getSettings}
            onClick={() =>
              getSettings?.currentWord ? validateWord() : endGame()
            }
            className={` mt-12
         inline-flex items-center rounded-md bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 `}
          >
            {progressPourcentage === 100 ? "Terminer" : "Valider"}
          </button>
        </div>
      </div>
      {showFeedback && (
        <Feedback
          status={status}
          onNext={() => {
            setShowFeedback(false);
            setWord("");
          }}
          currentWord={previousWord}
        ></Feedback>
      )}

      {showEndGame && (
        <EndGame
          correctlySpelledWords={getSettings?.correctlySpelledWords.length ?? 0}
          totalWords={getSettings?.gameWords.length ?? 0}
        ></EndGame>
      )}
    </>
  );
}
