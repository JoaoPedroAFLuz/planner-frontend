import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { DestinationAndDateType } from "@dtos/destination-and-date";
import { InviteParticipantType } from "@dtos/invite-participant";
import { useCreateTripMutation } from "@hooks/use-create-trip";

export function useCreateTrip() {
  const [participantsEmail, setParticipantsEmail] = useState<string[]>([]);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [isParticipantsInputVisible, setIsParticipantsInputVisible] =
    useState(false);

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

    if (participantsEmail.includes(email)) {
      toast.warn("E-mail já adicionado na lista");
      return;
    }

    setParticipantsEmail((prevState) => [...prevState, email]);
  }

  function removeEmailToInvite(emailToRemove: string) {
    setParticipantsEmail((prevState) =>
      prevState.filter((emailToInvite) => emailToInvite !== emailToRemove),
    );
  }

  function onSelectDestinationAndDate(
    destinationAndDateData: DestinationAndDateType,
  ) {
    setDestinationAndDate(destinationAndDateData);
    setIsParticipantsInputVisible(true);
  }

  async function onConfirmTrip() {
    await createTrip();

    closeConfirmTripModal();
  }

  async function createTrip() {
    try {
      if (!destinationAndDate) {
        return null;
      }

      const { destination, eventStartAndEndDates } = destinationAndDate;

      const { tripCode } = await createTripMutation({
        destination,
        participantsEmail,
        startsAt: eventStartAndEndDates?.from,
        endsAt: eventStartAndEndDates?.to,
      });

      toast.success("Viagem criada com sucesso!");
      navigate(`/trips/${tripCode}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }

  return {
    participantsEmail,
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
