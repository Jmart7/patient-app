import { type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function TextArea({
  label,
  error,
  id,
  className = "",
  ...rest
}: TextAreaProps) {
  const textareaId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={className}>
      <label
        htmlFor={textareaId}
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

      <textarea
        id={textareaId}
        className={`
          w-full rounded-lg border px-3.5 py-2.5 text-sm
          outline-none transition-colors duration-150 resize-y
          font-[inherit] placeholder:text-slate-400
          ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-200"
              : "border-slate-200 bg-slate-50 focus:border-brand-600 focus:ring-1 focus:ring-brand-100"
          }
        `}
        rows={4}
        {...rest}
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}