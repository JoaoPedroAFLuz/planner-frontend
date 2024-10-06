import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { InviteParticipantType } from "@dtos/invite-participant";
import { useInviteParticipantToTrip } from "@hooks/use-invite-participants";
import { useParticipantsByTripCode } from "@hooks/use-participants-by-trip-code";
import { useRemoveParticipantFromTrip } from "@hooks/use-remove-participant";

import { Button } from "@components/button";
import { InviteParticipantsModal } from "@components/invite-participants-modal";
import { UserDTO } from "@dtos/user";

interface ParticipantsProps {
  owner?: UserDTO;
}

export function Participants({ owner }: ParticipantsProps) {
  const [isManagingParticipantsModalOpen, setIsManagingParticipantsModalOpen] =
    useState(false);

  const { tripCode } = useParams();
  const { inviteParticipantsToTrip } = useInviteParticipantToTrip();
  const { removeParticipantFromTrip } = useRemoveParticipantFromTrip();
  const {
    participants,
    isFetchingGetParticipantsByTripCode,
    refetchParticipantsByTripCode: refetchGetAllByTripCode,
  } = useParticipantsByTripCode(tripCode!);

  function openManagingParticipantsModal() {
    setIsManagingParticipantsModalOpen(true);
  }

  async function addEmailToInvite({ email }: InviteParticipantType) {
    if (!email) {
      toast.error("Por favor, preencha o campo de e-mail");
      return;
    }

    if (participants.find((participant) => participant.email === email)) {
      toast.warn("Participante com esse e-mail já foi convidado");
      return;
    }

    await inviteParticipantsToTrip({
      tripCode: tripCode!,
      email,
    });

    await refetchGetAllByTripCode();
  }

  async function removeParticipant(participantEmail: string) {
    const participantCode = participants.find(
      ({ email }) => email === participantEmail,
    )?.code;

    if (!participantCode) {
      return;
    }

    await removeParticipantFromTrip({
      tripCode: tripCode!,
      participantCode,
    });

    await refetchGetAllByTripCode();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Participantes</h2>

      {owner && (
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {owner.name || `Dono`}
              </span>

              <span className="block truncate text-sm text-zinc-400">
                {owner.email}
              </span>
            </div>

            <CheckCircle2 className="size-5 shrink-0 text-pink-400" />
          </div>
        </div>
      )}

      {isFetchingGetParticipantsByTripCode && (
        <p className="text-sm text-zinc-400">Carregando participantes...</p>
      )}

      {!isFetchingGetParticipantsByTripCode && (
        <div className="space-y-5">
          {participants.map((participant, index) => (
            <div
              key={participant.code}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name || `Participante ${index + 1}`}
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
          removeEmailToInvite={removeParticipant}
        />
      )}
    </div>
  );
}
