import { Dialog, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren, ReactNode } from "react";
import CircleSpinner from "../loading/circleSpinner";

export default function FormDialog({
  title,
  onSave,
  isSaveButtonDisabled = false,
  saveButtonName,
  isLoading = false,
  onClose,
  children,
  isOpen = false,
}: PropsWithChildren<{
  title?: string;
  onSave: () => void;
  saveButtonName: string;
  isSaveButtonDisabled: boolean;
  isLoading: boolean;
  onClose: () => void;
  children: ReactNode;
  isOpen: boolean;
}>) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title ?? ""}
                </Dialog.Title>

                <div className="mt-6 sm:col-span-4">{children}</div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900 disabled:opacity-50"
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    Annuler
                  </button>

                  <button
                    type="button"
                    onClick={onSave}
                    disabled={isSaveButtonDisabled}
                    className="rounded-md bg-indigo-600  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <CircleSpinner className="mx-3"></CircleSpinner>
                    ) : (
                      saveButtonName
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
