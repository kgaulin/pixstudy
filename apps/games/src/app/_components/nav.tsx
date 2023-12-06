import { cookies } from "next/headers";
import Link from "next/link";

import { AvatarPopover } from "~/app/_components/avatarPopover";
import { Heading } from "~/app/_components/ui";

export default function Nav() {
  const cookieStore = cookies();
  const profileId = cookieStore.get("profile");

  return (
    <header className="flex items-center justify-between border-b border-dark p-4">
      <Link href="/">
        <Heading as="h3">Pixstudy</Heading>
      </Link>
      <AvatarPopover profileId={profileId?.value}></AvatarPopover>
    </header>
  );
}
