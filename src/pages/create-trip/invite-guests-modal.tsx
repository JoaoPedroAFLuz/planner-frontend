import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";

import { Button } from "../../components/button";
import { Input } from "../../components/input";

interface InviteGuestsModalProps {
  emailsToInvite: string[];
  closeGuestsModal: () => void;
  addEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailToInvite: (email: string) => void;
}

export function InviteGuestsModal({
  emailsToInvite,
  closeGuestsModal,
  addEmailToInvite,
  removeEmailToInvite,
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecione convidados</h2>

            <button type="button" onClick={closeGuestsModal}>
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

        <form
          onSubmit={addEmailToInvite}
          className="flex items-center rounded-lg border border-zinc-800 bg-zinc-950 p-2.5"
        >
          <div className="flex flex-1 items-center gap-2 p-2">
            <AtSign className="size-5 text-zinc-400" />

            <Input
              name="email"
              type="email"
              size="full"
              placeholder="Digite o e-mail do convidado"
            />
          </div>

          <Button type="submit">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
