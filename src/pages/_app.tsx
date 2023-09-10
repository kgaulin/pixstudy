import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { type AppType } from "next/app";
import { ToastContextProvider } from "~/components/toast/toast-context";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ToastContextProvider>
        <>
          <header className="bg-white">
            <nav
              className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="text-2xl font-semibold">Wordly</span>
                </a>
              </div>
              <div className="flex flex-1 justify-end">
                <UserButton afterSignOutUrl="/" />
              </div>
            </nav>
          </header>
          <Component {...pageProps} />
        </>
      </ToastContextProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
