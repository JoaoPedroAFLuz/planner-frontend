import { FormEvent, useState } from "react";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";

import { useCreateTrip } from "../../hooks/useCreateTrip";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { InviteParticipantsModal } from "./invite-participants-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteParticipantsStep } from "./steps/invite-participants-step";

export function CreateTripPage() {
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [isParticipantsInputVisible, setIsParticipantsInputVisible] =
    useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const navigate = useNavigate();
  const { mutateAsync } = useCreateTrip();

  function showParticipantsInput() {
    setIsParticipantsInputVisible(true);
  }

  function hideParticipantsInput() {
    setIsParticipantsInputVisible(false);
  }

  function openParticipantsModal() {
    setIsParticipantsModalOpen(true);
  }

  function closeParticipantsModal() {
    setIsParticipantsModalOpen(false);
  }

  function addEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const emailToInvite = data.get("email") as string;

    if (!emailToInvite) {
      return console.error("Por favor, preencha o campo de e-mail");
    }

    if (emailsToInvite.includes(emailToInvite)) {
      return console.warn("E-mail já adicionado na lista");
    }

    setEmailsToInvite((prevState) => [...prevState, emailToInvite]);

    event.currentTarget.reset();
  }

  function removeEmailToInvite(emailToRemove: string) {
    setEmailsToInvite((prevState) =>
      prevState.filter((emailToInvite) => emailToInvite !== emailToRemove),
    );
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !ownerName ||
      !ownerEmail ||
      !destination ||
      !eventStartAndEndDates?.from ||
      !eventStartAndEndDates?.to
    ) {
      return;
    }

    const { tripCode } = await mutateAsync({
      ownerName,
      ownerEmail,
      destination,
      emailsToInvite,
      startsAt: eventStartAndEndDates?.from,
      endsAt: eventStartAndEndDates?.to,
    });

    navigate(`trips/${tripCode}`);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="w-full max-w-4xl space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />

          <p className="text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            eventStartAndEndDates={eventStartAndEndDates}
            isParticipantsInputVisible={isParticipantsInputVisible}
            setDestination={setDestination}
            setEventStartAndEndDates={setEventStartAndEndDates}
            showParticipantsInput={showParticipantsInput}
            hideParticipantsInput={hideParticipantsInput}
          />

          {isParticipantsInputVisible && (
            <InviteParticipantsStep
              emailsToInvite={emailsToInvite}
              openParticipantsModal={openParticipantsModal}
              openConfirmTripModal={openConfirmTripModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
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
          closeParticipantsModal={closeParticipantsModal}
          addEmailToInvite={addEmailToInvite}
          removeEmailToInvite={removeEmailToInvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          destination={destination}
          eventStartAndEndDates={eventStartAndEndDates}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          closeConfirmTripModal={closeConfirmTripModal}
        />
      )}
    </div>
  );
}
