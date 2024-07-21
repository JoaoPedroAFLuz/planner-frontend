import {
  ArrowRight,
  AtSign,
  Calendar,
  MapPin,
  Plus,
  Settings2,
  User,
  UserRoundPlus,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    "joao.pedro.luz@hotmail.com",
    "mirellanicolebatista@hotmail.com",
  ]);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
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

  return (
    <div className="bg-pattern flex h-screen items-center justify-center bg-center bg-no-repeat">
      <div className="w-full max-w-4xl space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />

          <p className="text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <div className="shadow-shape flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4">
            <div className="flex flex-1 items-center gap-2">
              <MapPin className="size-5 text-zinc-400" />

              <input
                type="text"
                placeholder="Para onde você vai?"
                disabled={isGuestsInputOpen}
                className="w-full bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />

              <input
                type="text"
                placeholder="Quando?"
                disabled={isGuestsInputOpen}
                className="w-48 bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>

            <div className="h-6 w-px bg-zinc-800" />

            {isGuestsInputOpen ? (
              <button
                onClick={closeGuestsInput}
                className="flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-2 font-medium text-zinc-200 hover:bg-zinc-700"
              >
                Alterar local/data
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button
                onClick={openGuestsInput}
                className="flex items-center gap-2 rounded-lg bg-pink-300 px-5 py-2 font-medium text-pink-900 hover:bg-pink-200"
              >
                Continuar
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          {isGuestsInputOpen && (
            <div className="shadow-shape flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4">
              <button
                type="button"
                onClick={openGuestsModal}
                className="flex flex-1 items-center gap-2 text-left"
              >
                <UserRoundPlus className="size-5 text-zinc-400" />

                {emailsToInvite.length > 0 ? (
                  emailsToInvite.length > 1 ? (
                    <span>{`${emailsToInvite.length} pessoas convidadas`}</span>
                  ) : (
                    <span>1 pessoa convidada</span>
                  )
                ) : (
                  <span className="flex-1 text-lg text-zinc-400">
                    Quem estará na viagem?
                  </span>
                )}
              </button>

              <div className="h-6 w-px bg-zinc-800" />

              <button
                onClick={openConfirmTripModal}
                className="flex items-center gap-2 rounded-lg bg-pink-300 px-5 py-2 font-medium text-pink-900 hover:bg-pink-200"
              >
                Confirmar viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
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

      {isGuestsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="shadow-shape w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione convidados</h2>

                <button type="button" onClick={closeGuestsModal}>
                  <X className="size-5 cursor-pointer text-zinc-400" />
                </button>
              </div>

              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
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

                <input
                  name="email"
                  type="email"
                  placeholder="Digite o e-mail do convidado"
                  className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-pink-300 px-5 py-2 font-medium text-pink-900 hover:bg-pink-200"
              >
                Convidar
                <Plus className="size-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {isConfirmTripModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="shadow-shape w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Confirmar criação de viagem
                </h2>

                <button type="button" onClick={closeConfirmTripModal}>
                  <X className="size-5 cursor-pointer text-zinc-400" />
                </button>
              </div>

              <p className="text-sm text-zinc-400">
                Para concluir a criação da viagem para{" "}
                <span className="font-semibold text-zinc-100">
                  Vitória da Conquista, Brasil
                </span>{" "}
                nas datas de{" "}
                <span className="font-semibold text-zinc-100">
                  20 a 26 de Dezembro de 2024
                </span>{" "}
                preencha seus dados abaixo:
              </p>
            </div>

            <div className="h-px w-full bg-zinc-800" />

            <form onSubmit={openConfirmTripModal} className="space-y-3">
              <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
                <User className="size-5 text-zinc-400" />

                <input
                  name="name"
                  placeholder="Seu nome completo"
                  className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                />
              </div>

              <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
                <AtSign className="size-5 text-zinc-400" />

                <input
                  name="email"
                  type="email"
                  placeholder="Seu e-mail pessoal"
                  className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-pink-300 px-5 font-medium text-pink-900 hover:bg-pink-200"
              >
                Confirmar criação da viagem
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
