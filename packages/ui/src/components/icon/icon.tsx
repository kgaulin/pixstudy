import { HTMLAttributes, Suspense, useMemo } from "react";

import { icons } from "./icons";

export type IconName = keyof typeof icons;

interface Props extends HTMLAttributes<HTMLDivElement> {
  icon: IconName;
  className?: string;
  rotate?: number;
}

export const Icon = ({ icon, className, rotate, color, ...rest }: Props) => {
  const SvgIcon = useMemo(() => icons[icon], [icon]);

  if (!SvgIcon) return null;

  return (
    <div
      className={className}
      aria-label={icon}
      role="img"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
      {...rest}
    >
      <Suspense fallback={null}>
        <SvgIcon style={{ width: "100%", height: "100%" }} />
      </Suspense>
    </div>
  );
};
