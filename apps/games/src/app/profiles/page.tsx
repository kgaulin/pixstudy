import { Heading } from "~/app/_components/ui";
import { api } from "~/utils/server-api";
import CreateProfileButton from "./_components/createProfileButton";
import ProfileList from "./_components/profileList";

export const runtime = "edge";

export default async function ProfilesPage() {
  const profiles = await api.profiles.all.query();
  return (
    <main className="flex h-full flex-col items-center ">
      <div className="container mt-4 flex flex-col items-center justify-center px-8 py-8 md:px-0">
        <Heading as="h1" className="my-4">
          Qui joue?
        </Heading>
      </div>

      <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-3 lg:grid-cols-4">
        <ProfileList profiles={profiles}></ProfileList>
        <CreateProfileButton></CreateProfileButton>
      </div>
    </main>
  );
}
