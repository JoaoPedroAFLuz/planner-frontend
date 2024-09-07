import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/button";
import { useParticipantsByTripCode } from "../../hooks/useParticipantsByTripCode";

export function Guests() {
  const { tripCode } = useParams();
  const { participants, isFetching } = useParticipantsByTripCode(tripCode!);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      {isFetching && (
        <p className="text-sm text-zinc-400">Carregando convidados...</p>
      )}

      {!isFetching && (
        <div className="space-y-5">
          {participants.map((participant, index) => (
            <div
              key={participant.code}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name || `Convidado ${index}`}
                </span>

                <span className="block truncate text-sm text-zinc-400">
                  {participant.email}
                </span>
              </div>

              {participant.confirmedAt ? (
                <CheckCircle2 className="size-5 shrink-0 text-pink-400" />
              ) : (
                <CircleDashed className="size-5 shrink-0 text-zinc-400" />
              )}
            </div>
          ))}
        </div>
      )}

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />

        <span>Gerenciar convidados</span>
      </Button>
    </div>
  );
}
