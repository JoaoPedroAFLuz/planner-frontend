import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  inviteParticipantSchema,
  InviteParticipantType,
} from "@dtos/invite-participant";

import { Button } from "@components/button";
import { Form } from "./form";

interface InviteParticipantsModalProps {
  emailsToInvite: string[];
  closeParticipantsModal: () => void;
  addEmailToInvite: ({ email }: InviteParticipantType) => Promise<void> | void;
  removeEmailToInvite: (email: string) => void;
}

export function InviteParticipantsModal({
  emailsToInvite,
  closeParticipantsModal,
  addEmailToInvite,
  removeEmailToInvite,
}: InviteParticipantsModalProps) {
  const form = useForm<InviteParticipantType>({
    resolver: zodResolver(inviteParticipantSchema),
  });

  function handleInviteParticipant({ email }: InviteParticipantType) {
    addEmailToInvite({ email });

    form.reset();
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecione convidados</h2>

            <button
              type="button"
              className="rounded-full p-1 hover:bg-zinc-800"
              onClick={closeParticipantsModal}
            >
              <X className="size-5 cursor-pointer text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((emailToInvite) => (
            <div
              key={emailToInvite}
              className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
            >
              <span className="text-zinc-300">{emailToInvite}</span>

              <button
                type="button"
                onClick={() => removeEmailToInvite(emailToInvite)}
              >
                <X className="size-4 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <Form.Root
          form={form}
          onSubmit={form.handleSubmit(handleInviteParticipant)}
          className="flex items-center gap-2"
        >
          <Form.Field>
            <Form.Input
              name="email"
              type="email"
              size="full"
              placeholder="Digite o e-mail do convidado"
              autoFocus
              leftIcon={<AtSign className="size-5 text-zinc-400" />}
              containerClassName="bg-zinc-950 border-zinc-800"
            />
          </Form.Field>

          <Button type="submit">
            Convidar
            <Plus className="size-5" />
          </Button>
        </Form.Root>
      </div>
    </div>
  );
}
