"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { api } from "~/utils/server-api";

export async function selectProfile(profileId: string, redirectUrl: string) {
  const profile = await api.profiles.byId.query({ id: profileId });

  if (profile) {
    cookies().set("profile", profile.id, { secure: true });
    redirect(redirectUrl);
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function unSelectProfile() {
  cookies().delete("profile");
}

export async function createProfile(name: string, color: string) {
  const profile = await api.profiles.create.mutate({ name, color });

  if (profile) {
    revalidatePath("/profiles");
  }
}
