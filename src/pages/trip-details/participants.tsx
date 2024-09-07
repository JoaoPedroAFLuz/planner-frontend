import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/button";
import { useInviteParticipant } from "../../hooks/useInviteParticipant";
import { useParticipantsByTripCode } from "../../hooks/useParticipantsByTripCode";
import { InviteParticipantsModal } from "../create-trip/invite-participants-modal";

export function Participants() {
  const [isManagingParticipantsModalOpen, setIsManagingParticipantsModalOpen] =
    useState(false);

  const { tripCode } = useParams();
  const { mutateAsync } = useInviteParticipant();
  const { participants, isFetching, refetch } = useParticipantsByTripCode(
    tripCode!,
  );

  function openManagingParticipantsModal() {
    setIsManagingParticipantsModalOpen(true);
  }

  async function addEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const emailToInvite = data.get("email") as string;

    if (!emailToInvite) {
      return console.error("Por favor, preencha o campo de e-mail");
    }

    if (participants.find(({ email }) => email === emailToInvite)) {
      return console.warn("Participante com esse e-mail já foi convidado");
    }

    event.currentTarget.reset();

    await mutateAsync({ tripCode: tripCode!, email: emailToInvite });
    await refetch();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Participantes</h2>

      {isFetching && (
        <p className="text-sm text-zinc-400">Carregando participantes...</p>
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
                  {participant.name || `Participante ${index}`}
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

      <Button
        variant="secondary"
        size="full"
        onClick={openManagingParticipantsModal}
      >
        <UserCog className="size-5" />

        <span>Gerenciar participantes</span>
      </Button>

      {isManagingParticipantsModalOpen && (
        <InviteParticipantsModal
          emailsToInvite={participants.map(({ email }) => email)}
          closeParticipantsModal={() =>
            setIsManagingParticipantsModalOpen(false)
          }
          addEmailToInvite={addEmailToInvite}
          removeEmailToInvite={() => {}}
        />
      )}
    </div>
  );
}
