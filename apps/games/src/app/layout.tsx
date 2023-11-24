import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "@pixstudy/ui/style.css";
import "~/styles/globals.css";

import { headers } from "next/headers";
import { frFR } from "@clerk/localizations";
import { neobrutalism } from "@clerk/themes";

import { TRPCReactProvider } from "./providers";

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "PixStudy",
  description: "Application for kids learning and playing games",
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      localization={frFR}
      appearance={{
        baseTheme: neobrutalism,
        variables: {
          colorPrimary: "#AE7AFF",
          colorDanger: "#E99898",
          colorSuccess: "#98E9AB",
          colorWarning: "#FAE8A4",
          colorText: "#000000",
          colorTextOnPrimaryBackground: "#000000",
          colorTextSecondary: "#000000",
          colorBackground: "transparent",
        },
      }}
    >
      <html lang="en">
        <body className="min-h-screen bg-ground">
          <TRPCReactProvider headers={headers()}>
            {props.children}
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
