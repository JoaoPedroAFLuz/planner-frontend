import { Link2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { CreateLinkModal } from "./create-link-modal";

interface Link {
  tripCode: string;
  linkCode: string;
  title: string;
  url: string;
}

export function ImportantLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  const { tripCode } = useParams();

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }

  useEffect(() => {
    api.get(`/trips/${tripCode}/links`).then((response) => {
      setLinks(response.data);
    });
  }, [tripCode]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links Importantes</h2>

      <div className="space-y-5">
        {links.map((link) => (
          <div
            key={link.linkCode}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
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

      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5" />

        <span>Cadastrar novo link</span>
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </div>
  );
}
