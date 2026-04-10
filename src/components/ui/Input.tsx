import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  className = "",
  ...rest
}: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label.endsWith("*") ? (
          <>
            {label.slice(0, -1)}
            <span className="text-red-500">*</span>
          </>
        ) : (
          label
        )}
      </label>

      <input
        id={inputId}
        className={`
          w-full rounded-lg border px-3.5 py-2.5 text-sm
          outline-none transition-colors duration-150
          placeholder:text-slate-400
          ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-200"
              : "border-slate-200 bg-slate-50 focus:border-brand-600 focus:ring-1 focus:ring-brand-100"
          }
        `}
        {...rest}
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}