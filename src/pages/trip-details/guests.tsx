import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface Participant {
  tripCode: string;
  code: string;
  name: string;
  email: string;
  confirmedAt: Date;
}

export function Guests() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const { tripCode } = useParams();

  useEffect(() => {
    if (!tripCode) {
      return;
    }

    api.get(`/trips/${tripCode}/participants`).then((response) => {
      setParticipants(response.data);
    });
  }, [tripCode]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div
            key={participant.code}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name || `Convidado ${index + 1}`}
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

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />

        <span>Gerenciar convidados</span>
      </Button>
    </div>
  );
}
