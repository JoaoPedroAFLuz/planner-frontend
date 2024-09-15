import { ConfirmTripType } from "@dtos/confirm-trip";
import { DestinationAndDateType } from "@dtos/destination-and-date";
import { InviteParticipantType } from "@dtos/invite-participant";
import { useCreateTripMutation } from "@hooks/useCreateTripMutation";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useCreateTrip() {
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [isParticipantsInputVisible, setIsParticipantsInputVisible] =
    useState(false);

  const [confirmTrip, setConfirmTrip] = useState<ConfirmTripType | null>(null);
  const [destinationAndDate, setDestinationAndDate] =
    useState<DestinationAndDateType | null>(null);

  const { isPendingCreateTrip, createTripMutation } = useCreateTripMutation();

  const navigate = useNavigate();

  function hideParticipantsInput() {
    setIsParticipantsInputVisible(false);
  }

  function openParticipantsModal() {
    setIsParticipantsModalOpen(true);
  }

  function closeParticipantsModal() {
    setIsParticipantsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addEmailToInvite({ email }: InviteParticipantType) {
    if (!email) {
      toast.error("Por favor, preencha o campo de e-mail");
      return;
    }

    if (emailsToInvite.includes(email)) {
      toast.warn("E-mail já adicionado na lista");
      return;
    }

    setEmailsToInvite((prevState) => [...prevState, email]);
  }

  function removeEmailToInvite(emailToRemove: string) {
    setEmailsToInvite((prevState) =>
      prevState.filter((emailToInvite) => emailToInvite !== emailToRemove),
    );
  }

  function onSelectDestinationAndDate(
    destinationAndDateData: DestinationAndDateType,
  ) {
    setDestinationAndDate(destinationAndDateData);
    setIsParticipantsInputVisible(true);
  }

  async function onConfirmTrip(confirmTripData: ConfirmTripType) {
    setConfirmTrip(confirmTripData);

    await createTrip(confirmTripData);

    closeConfirmTripModal();
  }

  async function createTrip(confirmTripData: ConfirmTripType) {
    try {
      if (!destinationAndDate || !confirmTripData) {
        return null;
      }

      const { destination, eventStartAndEndDates } = destinationAndDate;

      const { ownerName, ownerEmail } = confirmTripData;

      const { tripCode } = await createTripMutation({
        ownerName,
        ownerEmail,
        destination,
        emailsToInvite,
        startsAt: eventStartAndEndDates?.from,
        endsAt: eventStartAndEndDates?.to,
      });

      toast.success("Viagem criada com sucesso!");
      navigate(`trips/${tripCode}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }

  return {
    confirmTrip,
    emailsToInvite,
    isPendingCreateTrip,
    isConfirmTripModalOpen,
    isParticipantsModalOpen,
    isParticipantsInputVisible,
    destination: destinationAndDate?.destination,
    eventStartAndEndDates: destinationAndDate?.eventStartAndEndDates,
    onConfirmTrip,
    addEmailToInvite,
    removeEmailToInvite,
    openConfirmTripModal,
    openParticipantsModal,
    closeConfirmTripModal,
    hideParticipantsInput,
    closeParticipantsModal,
    onSelectDestinationAndDate,
  };
}
