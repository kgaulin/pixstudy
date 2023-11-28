import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { Heading } from "@pixstudy/ui";

export default function Nav() {
  return (
    <header className="flex items-center justify-between border-b border-dark p-4">
      <Link href="/">
        <Heading as="h3">Pixstudy</Heading>
      </Link>
      <UserButton />
    </header>
  );
}
