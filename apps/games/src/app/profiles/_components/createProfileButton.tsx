"use client";

import { useState, useTransition } from "react";

import {
  Avatar,
  Button,
  Card,
  ColorPicker,
  Dialog,
  Icon,
  Input,
  Interface,
} from "~/app/_components/ui";
import { useDocument } from "~/app/_hooks/useDocument";
import { createProfile as actionCreateProfile } from "../_actions";

export default function CreateProfileButton() {
  const [showModal, setShowModal] = useState(false);

  const [currentColor, setCurrentColor] = useState("#DAF5F0");
  const [name, setName] = useState("");
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const document = useDocument();

  const [isPending, startTransition] = useTransition();

  const createProfile = () => {
    startTransition(async () => {
      await actionCreateProfile(name, currentColor);
      setShowModal(false);
    });
  };

  return (
    <>
      {!!document && (
        <Dialog
          open={showModal}
          onOpenChange={setShowModal}
          title="Créer un profile"
          target={document.body}
          trigger={
            <Button
              shape="none"
              variant="none"
              className="flex-col"
              onClick={() => setShowModal(true)}
            >
              <Card className="flex h-40 w-40 flex-col items-center justify-center bg-primary">
                <div className="my-auto h-20 w-20">
                  <Icon icon="Add"></Icon>
                </div>
              </Card>
              <Interface className="mt-2" size="lg">
                Ajouter un profile
              </Interface>
            </Button>
          }
          content={
            <div className="flex h-full grow flex-col">
              <Avatar
                color={currentColor}
                name={name}
                className="mx-auto my-4 h-36 w-36"
              ></Avatar>

              <form className="flex h-full w-full grow flex-col">
                <div className="mt-4 flex flex-col gap-2 px-4">
                  <label htmlFor="name" className="text-label-md font-bold">
                    Nom du profile
                  </label>
                  <Input
                    variant="flat"
                    id="name"
                    placeholder="Kevin"
                    value={name}
                    onChange={onNameChange}
                  ></Input>
                </div>

                <div className="mt-4 flex flex-col gap-2 px-4">
                  <label htmlFor="name" className="text-label-md  font-bold">
                    Couleur
                  </label>
                  <ColorPicker
                    currentColor={currentColor}
                    onCurrentColorChange={setCurrentColor}
                    colors={[
                      "#DAF5F0",
                      "#B5D2AD",
                      "#FDFD96",
                      "#F8D6B3",
                      "#FCDFFF",
                      "#E3DFF2",
                      "#A7DBD8",
                      "#BAFCA2",
                      "#FFDB58",
                      "#FFA07A",
                    ]}
                  ></ColorPicker>
                </div>

                <Button
                  type="button"
                  className="mx-4 mb-4 mt-auto"
                  disabled={!name && isPending}
                  onClick={createProfile}
                >
                  Créer le profile
                </Button>
              </form>
            </div>
          }
        ></Dialog>
      )}
    </>
  );
}
