import { cn } from "../utils";

export interface AvatarProps {
  readonly name: string;
  readonly color: string;
  readonly className?: string;
}

export const Avatar = ({
  className,
  name,
  color,
}: AvatarProps): JSX.Element => {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-dark text-heading-md font-bold",
        className,
      )}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
};
