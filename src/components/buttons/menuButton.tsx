import React from "react";

export default function MenuButton({
  name,
  className,
  icon,
  description,
  onClick,
}: {
  name: string;
  icon: React.ReactNode;
  className?: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
        {icon}
      </div>
      <div className="flex-auto">
        <button
          onClick={onClick}
          className={`block font-semibold text-gray-900 ${className ?? ""}`}
        >
          {name}
          <span className="absolute inset-0" />
        </button>
        <p className={`mt-1 text-gray-600 ${className ?? ""}`}>{description}</p>
      </div>
    </div>
  );
}
