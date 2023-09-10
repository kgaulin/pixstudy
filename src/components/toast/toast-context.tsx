import type { ReactNode } from "react";
import { createContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Toast from "./toast";

type ToastType = {
  message: string;
  type: "success" | "warning" | "negative";
  action?: () => void;
  id: string;
};

type pushToastType = (toast: Omit<ToastType, "id">) => void;

type toastContextType = {
  toasts: ToastType[];
  pushToast: pushToastType;
} | null;

const ToastContext = createContext<toastContextType>(null);

const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, dispatch] = useState<ToastType[]>([]);

  const pushToast = (toast: Omit<ToastType, "id">): void => {
    dispatch((t) => [...t, { ...toast, id: uuidv4() }]);
  };

  const remove = (id: string) => {
    dispatch((t) => t.filter((tt) => tt.id != id));
  };

  const contextValue = useMemo(() => {
    return { toasts, pushToast };
  }, [toasts]);

  return (
    <ToastContext.Provider value={contextValue}>
      <>
        <div className="fixed right-5 top-5 z-40 flex flex-col space-y-2">
          {toasts.map((t) => (
            <Toast
              remove={remove}
              id={t.id}
              key={t.id}
              message={t.message}
              action={t.action}
              type={t.type}
            ></Toast>
          ))}
        </div>
        {children}
      </>
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastContextProvider };
