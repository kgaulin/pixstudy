"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { Button, Card, Heading, Interface } from "~/app/_components/ui";
import { selectProfile } from "../_actions";

interface ProfileListProps {
  readonly profiles: { id: string; name: string; color: string }[];
}

export default function ProfileList(props: ProfileListProps) {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const onSelectProfile = (profileId: string) =>
    startTransition(async () => {
      await selectProfile(profileId, searchParams.get("redirect") ?? "/");
    });

  return (
    <>
      {props.profiles.map((profile) => (
        <Button
          disabled={isPending}
          key={profile.id}
          onClick={() => onSelectProfile(profile.id)}
          shape="none"
          variant="none"
          className="flex-col"
        >
          <Card
            className="flex h-40 w-40 flex-col items-center justify-center "
            style={{ backgroundColor: profile.color }}
          >
            <div className="my-auto flex h-20 w-20 items-center justify-center">
              <Heading className="mt-2" as="h2">
                {profile.name.substring(0, 2).toLocaleUpperCase()}
              </Heading>
            </div>
          </Card>
          <Interface className="mt-2" size="lg">
            {profile.name}
          </Interface>
        </Button>
      ))}
    </>
  );
}
