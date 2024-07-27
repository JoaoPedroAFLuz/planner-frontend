import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

interface DestinationAndDateStepProps {
  isGuestsInputVisible: boolean;
  showGuestsInput: () => void;
  hideGuestsInput: () => void;
}

export function DestinationAndDateStep({
  isGuestsInputVisible,
  showGuestsInput,
  hideGuestsInput,
}: DestinationAndDateStepProps) {
  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />

        <input
          type="text"
          placeholder="Para onde você vai?"
          disabled={isGuestsInputVisible}
          className="w-full bg-transparent text-lg placeholder-zinc-400 outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />

        <input
          type="text"
          placeholder="Quando?"
          disabled={isGuestsInputVisible}
          className="w-48 bg-transparent text-lg placeholder-zinc-400 outline-none"
        />
      </div>

      <div className="h-6 w-px bg-zinc-800" />

      {isGuestsInputVisible ? (
        <button
          onClick={hideGuestsInput}
          className="flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-2 font-medium text-zinc-200 hover:bg-zinc-700"
        >
          <span>Alterar local/data</span>

          <Settings2 className="size-5" />
        </button>
      ) : (
        <button
          onClick={showGuestsInput}
          className="flex items-center gap-2 rounded-lg bg-pink-300 px-5 py-2 font-medium text-pink-900 hover:bg-pink-200"
        >
          <span>Continuar</span>

          <ArrowRight className="size-5" />
        </button>
      )}
    </div>
  );
}
