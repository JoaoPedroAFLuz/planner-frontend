import { Link2, Tag, X } from "lucide-react";

import { useCreateLink } from "@hooks/useCreateLink";
import { useLinksByActivityCode } from "@hooks/useLinksByActivityCode";

import { Button } from "@components/button";
import { Form } from "@components/form";
import { createLinkSchema, CreateLinkType } from "@dtos/create-link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CreateLinkModalProps {
  activityCode: string;
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  activityCode,
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { isCreateLinkPending, createLink } = useCreateLink();
  const { refetch } = useLinksByActivityCode(activityCode);

  const form = useForm<CreateLinkType>({
    resolver: zodResolver(createLinkSchema),
  });

  async function handleCreateLink(data: CreateLinkType) {
    await createLink({
      activityCode,
      ...data,
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

        <Form.Root
          form={form}
          onSubmit={form.handleSubmit(handleCreateLink)}
          className="space-y-4"
        >
          <Form.Field>
            <Form.Input
              name="title"
              size="full"
              placeholder="Título"
              leftIcon={<Tag className="size-5 text-zinc-400" />}
              containerClassName="bg-zinc-950 border-zinc-800"
            />

            <Form.ErrorMessage field="title" />
          </Form.Field>

          <Form.Field>
            <Form.Input
              name="url"
              size="full"
              placeholder="Url"
              leftIcon={<Link2 className="size-5 text-zinc-400" />}
              containerClassName="bg-zinc-950 border-zinc-800"
            />

            <Form.ErrorMessage field="url" />
          </Form.Field>

          <Button type="submit" size="full" disabled={isCreateLinkPending}>
            {isCreateLinkPending ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </Form.Root>
      </div>
    </div>
  );
}
