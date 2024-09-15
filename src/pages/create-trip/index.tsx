import { useCreateTrip } from "./useCreateTrip";

import { InviteParticipantsModal } from "@components/invite-participants-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDate } from "./destination-and-date";
import { InviteParticipants } from "./invite-participants";

export function CreateTripPage() {
  const {
    destination,
    confirmTrip,
    emailsToInvite,
    isPendingCreateTrip,
    eventStartAndEndDates,
    isConfirmTripModalOpen,
    isParticipantsModalOpen,
    isParticipantsInputVisible,
    onConfirmTrip,
    addEmailToInvite,
    removeEmailToInvite,
    openConfirmTripModal,
    openParticipantsModal,
    closeConfirmTripModal,
    hideParticipantsInput,
    closeParticipantsModal,
    onSelectDestinationAndDate,
  } = useCreateTrip();

  return (
    <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="w-full max-w-4xl space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="timely" />

          <p className="text-lg text-zinc-300">
            Facilite o planejamento da sua viagem com o timely - tudo em um só
            app.
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDate
            isParticipantsInputVisible={isParticipantsInputVisible}
            hideParticipantsInput={hideParticipantsInput}
            onSelectDestinationAndDate={onSelectDestinationAndDate}
          />

          {isParticipantsInputVisible && (
            <InviteParticipants
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openParticipantsModal={openParticipantsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pelo time.ly você automaticamente concorda{" "}
          <br />
          com nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isParticipantsModalOpen && (
        <InviteParticipantsModal
          emailsToInvite={emailsToInvite}
          addEmailToInvite={addEmailToInvite}
          removeEmailToInvite={removeEmailToInvite}
          closeParticipantsModal={closeParticipantsModal}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          confirmTrip={confirmTrip}
          destination={destination!}
          isPendingCreateTrip={isPendingCreateTrip}
          eventStartAndEndDates={eventStartAndEndDates!}
          onConfirmTrip={onConfirmTrip}
          closeConfirmTripModal={closeConfirmTripModal}
        />
      )}
    </div>
  );
}
