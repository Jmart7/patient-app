import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-800 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:scale-[0.98]",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
  ghost:
    "text-slate-600 hover:bg-slate-100 active:scale-[0.98]",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg px-4 py-2.5 text-sm font-medium
        transition-all duration-150 cursor-pointer
        ${variantClasses[variant]}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}