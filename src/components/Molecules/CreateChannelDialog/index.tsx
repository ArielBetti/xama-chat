"use client";

import Button from "@/components/Atoms/Button";
import Input from "@/components/Atoms/Input";
import Modal from "@/components/Atoms/Modal";
import { useCreateChannelMutation } from "@/queries/useCreateChannelMutation";
import { useUser } from "@/store/user";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const CreateChannelDialog = () => {
  const user = useUser();
  const { mutate: handleCreateChannel } = useCreateChannelMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);

  const createChannel = () => {
    handleCreateChannel(
      {
        description,
        slug: title,
        userId: `${user?.sessionId}`,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setCreateChannelModalOpen(false);
        },
      }
    );
  };

  return (
    <Modal
      open={createChannelModalOpen}
      setModalOpen={setCreateChannelModalOpen}
      modalTrigger={
        <button>
          <PlusSmallIcon className="h-6 w-6" />
        </button>
      }
    >
      <div className="flex flex-col item-center justify-center gap-4">
        <h2 className="font-semibold text-lg">Crie um canal</h2>
        <div className="mt-5 flex flex-col item-center justify-center gap-4 max-w-sm">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Nome"
            placeholder="Escreva um nome"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Descrição"
            placeholder="Quer descrever seu canal?"
          />
        </div>
        <div className="flex">
          <Button className="mt-5" onClick={() => createChannel()}>
            <PlusSmallIcon className="h-6 w-6" />
            Criar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateChannelDialog;
