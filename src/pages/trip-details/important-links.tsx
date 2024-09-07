import { Link2, Plus } from "lucide-react";
import { useState } from "react";

import { useLinksByActivityCode } from "../../hooks/useLinksByActivityCode";

import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";

interface LinksProps {
  activityCode: string;
}

export function Links({ activityCode }: LinksProps) {
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  const { links, isFetching } = useLinksByActivityCode(activityCode);

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Links</h2>

        {isFetching && (
          <p className="text-sm text-zinc-400">Carregando links...</p>
        )}

        {!isFetching && (
          <div className="space-y-5">
            {links.length === 0 && (
              <p className="text-sm text-zinc-400">
                Não há links para esta atividade.
              </p>
            )}

            {links.length > 0 &&
              links.map((link) => (
                <div
                  key={link.linkCode}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <span className="block text-base font-medium text-zinc-100">
                      {link.title}
                    </span>

                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate text-sm text-zinc-400 hover:text-zinc-200"
                    >
                      {link.url}
                    </a>
                  </div>

                  <Link2 className="size-5 shrink-0 text-zinc-400" />
                </div>
              ))}
          </div>
        )}
      </div>

      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5" />

        <span>Cadastrar novo link</span>
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal
          activityCode={activityCode}
          closeCreateLinkModal={closeCreateLinkModal}
        />
      )}
    </div>
  );
}
