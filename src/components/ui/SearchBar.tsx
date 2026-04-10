interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search patients...",
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm">
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full rounded-lg border border-slate-200 bg-slate-50
          py-2.5 pl-10 pr-3.5 text-sm outline-none
          placeholder:text-slate-400
          transition-colors duration-150
          focus:border-brand-600 focus:ring-1 focus:ring-brand-100
        "
      />
    </div>
  );
}