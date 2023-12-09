"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/clerk-react";

import { api } from "~/utils/api";
import { useCurrentUrl } from "../_hooks/useCurrentUrl";
import { unSelectProfile } from "../profiles/_actions";
import { Avatar, Button, Icon, Interface, Popover } from "./ui";

export interface AvatarPopoverProps {
  readonly profileId: string | undefined;
}

export const AvatarPopover = ({ profileId }: AvatarPopoverProps) => {
  const { data } = api.profiles.byId.useQuery(
    { id: profileId! },
    { enabled: !!profileId },
  );

  const currentUrl = useCurrentUrl();
  const auth = useClerk();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const signOut = () => {
    startTransition(async () => {
      await unSelectProfile();
      await auth.signOut();
      router.push("/");
    });
  };

  return (
    <>
      {!!data && (
        <Popover
          trigger={
            <Button shape="none" variant="none">
              <Avatar
                className="h-12 w-12"
                color={data.color}
                name={data.name}
              ></Avatar>
            </Button>
          }
        >
          <ul className="flex flex-col gap-4">
            <li className="border-b-2 border-transparent hover:border-dark ">
              <Link
                href={`/profiles?redirect=${currentUrl}`}
                className="flex items-center gap-2"
              >
                <Icon icon="Profile" />
                <Interface>Changer de profile</Interface>
              </Link>
            </li>
            <li className="border-b-2 border-transparent hover:border-negative ">
              <Button
                shape="none"
                variant="none"
                onClick={signOut}
                className="flex items-center gap-2"
                disabled={pending}
              >
                <Icon icon="Logout" className="text-negative" />
                <Interface className="text-negative">Déconnexion</Interface>
              </Button>
            </li>
          </ul>
        </Popover>
      )}
    </>
  );
};
