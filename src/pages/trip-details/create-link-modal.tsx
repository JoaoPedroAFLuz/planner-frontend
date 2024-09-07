import { Link2, Tag, X } from "lucide-react";
import { FormEvent } from "react";

import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { useCreateLink } from "../../hooks/useCreateLink";
import { useLinksByActivityCode } from "../../hooks/useLinksByActivityCode";

interface CreateLinkModalProps {
  activityCode: string;
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  activityCode,
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { isPending, mutateAsync } = useCreateLink();
  const { refetch } = useLinksByActivityCode(activityCode);

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title") as string;
    const url = data.get("url") as string;

    await mutateAsync({
      activityCode,
      title,
      url,
    });

    await refetch();

    closeCreateLinkModal();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[540px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>

            <button type="button" onClick={closeCreateLinkModal}>
              <X className="size-5 cursor-pointer text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links.
          </p>
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <form onSubmit={createLink} className="space-y-3">
          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />

            <Input name="title" size="full" placeholder="Título" />
          </div>

          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Link2 className="size-5 text-zinc-400" />

            <Input name="url" size="full" placeholder="Url" />
          </div>

          <Button type="submit" size="full" disabled={isPending}>
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
