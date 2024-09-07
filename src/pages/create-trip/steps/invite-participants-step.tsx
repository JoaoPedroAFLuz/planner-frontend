import { ArrowRight, UserRoundPlus } from "lucide-react";

import { Button } from "@components/button";

interface InviteParticipantsStepProps {
  emailsToInvite: string[];
  openParticipantsModal: () => void;
  openConfirmTripModal: () => void;
}

export function InviteParticipantsStep({
  emailsToInvite,
  openParticipantsModal,
  openConfirmTripModal,
}: InviteParticipantsStepProps) {
  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <button
        type="button"
        onClick={openParticipantsModal}
        className="flex flex-1 items-center gap-2 text-left"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />

        {emailsToInvite.length > 0 ? (
          emailsToInvite.length > 1 ? (
            <span>{`${emailsToInvite.length} pessoas convidadas`}</span>
          ) : (
            <span>1 pessoa convidada</span>
          )
        ) : (
          <span className="flex-1 text-lg text-zinc-400">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <div className="h-6 w-px bg-zinc-800" />

      <Button onClick={openConfirmTripModal}>
        <span>Confirmar viagem</span>

        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
