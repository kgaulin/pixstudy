import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import DeleteWordList from "./deleteWordList";
import EditWordList from "./editWordList";

export default function MoreWordList({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <div className="">
      <Popover className="relative">
        <Popover.Button
          className={`
              group
                inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50  `}
        >
          <HiEllipsisVertical
            className={`h-6 w-6  transition duration-150 ease-in-out group-hover:text-opacity-80`}
            aria-hidden="true"
          />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
            {({ close }) => (
              <div className="p-4">
                <EditWordList
                  id={id}
                  name={name}
                  onClick={close}
                ></EditWordList>
                <DeleteWordList
                  id={id}
                  name={name}
                  onClick={close}
                ></DeleteWordList>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
