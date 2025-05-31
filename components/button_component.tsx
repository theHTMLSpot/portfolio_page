import { button } from "@/types/ui_types";

export default function Button({
  onClick,
  type,
  disabled,
  className,
  children,
}: button) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`bg-accent text-foreground hover:bg-accent/80 h-auto w-full max-w-md rounded-md px-4 py-2 ${className}`}
    >
      {children}
    </button>
  );
}
