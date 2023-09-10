export default function Feedback({
  onNext,
  currentWord,
  status,
}: {
  onNext: () => void;
  currentWord: string;
  status: "success" | "error";
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0">
      <div
        className={`absolute bottom-0 left-0 top-2/3  flex w-full ${
          status === "success" ? "bg-green-100" : "bg-red-100"
        }  `}
      >
        <div className="mx-8 flex w-full items-center justify-between">
          <p
            className={status === "success" ? "text-green-500" : "text-red-500"}
          >
            {status === "success"
              ? "Félicitation vous avez bien écrit le mot"
              : "Bien essayer! La bonne réponse est "}
            <strong className="font-bold">&nbsp; {currentWord}</strong>
          </p>
          <button
            onClick={onNext}
            className={`rounded-md ${
              status == "success"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }   px-4 py-3 text-lg font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 `}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
