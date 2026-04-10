import { useState } from "react";

interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
}

const PALETTE = [
  { bg: "bg-brand-50", text: "text-brand-800" },
  { bg: "bg-teal-50", text: "text-teal-800" },
  { bg: "bg-amber-50", text: "text-amber-800" },
  { bg: "bg-rose-50", text: "text-rose-800" },
  { bg: "bg-sky-50", text: "text-sky-800" },
  { bg: "bg-emerald-50", text: "text-emerald-800" },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getColorIndex(name: string): number {
  const code = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
  return code % PALETTE.length;
}

export default function Avatar({ src, name, size = 48 }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const showFallback =
    !src || typeof src !== "string" || !src.startsWith("http") || imgError;

  if (showFallback) {
    const colors = PALETTE[getColorIndex(name)];
    return (
      <div
        className={`
          flex shrink-0 items-center justify-center rounded-full
          font-semibold select-none
          ${colors.bg} ${colors.text}
        `}
        style={{ width: size, height: size, fontSize: size * 0.36 }}
        aria-hidden="true"
      >
        {getInitials(name || "?")}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setImgError(true)}
      className="shrink-0 rounded-full object-cover bg-slate-100"
      style={{ width: size, height: size }}
    />
  );
}